export type PlaybackState = {
  isPaused: boolean;
  isBuffering: boolean;
  position: number;
  duration: number;
  track: {
    uri: string;
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[] };
  } | null;
  volume: number;
  isMuted: boolean;
  error?: boolean;
};

type StateChangeCallback = (state: PlaybackState) => void;
type ReadyCallback = () => void;

const YOUTUBE_PLAYLIST_ID = 'PLcXOVgUfk7ds';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

class YouTubeService {
  private player: any = null;
  private isReady = false;
  private isInitializing = false;
  private pollInterval: number | null = null;
  
  private stateCallbacks: Set<StateChangeCallback> = new Set();
  private readyCallbacks: Set<ReadyCallback> = new Set();
  
  private currentState: PlaybackState = {
    isPaused: true,
    isBuffering: false,
    position: 0,
    duration: 0,
    track: null,
    volume: 100,
    isMuted: false
  };

  loadApi(): void {
    if (this.isInitializing || this.isReady) return;
    this.isInitializing = true;

    // Add hidden container for YouTube player
    let container = document.getElementById('youtube-embed-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'youtube-embed-container';
      // Hide it completely but keep it in DOM
      container.style.cssText = 'position:fixed;bottom:-9999px;left:-9999px;width:1px;height:1px;opacity:0.01;pointer-events:none;z-index:-1;';
      
      const playerDiv = document.createElement('div');
      playerDiv.id = 'youtube-player';
      container.appendChild(playerDiv);
      
      document.body.appendChild(container);
    }

    if (window.YT && window.YT.Player) {
      this.initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        this.initPlayer();
      };
      
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    }
  }

  private initPlayer() {
    this.player = new window.YT.Player('youtube-player', {
      height: '100',
      width: '100',
      playerVars: {
        listType: 'playlist',
        list: YOUTUBE_PLAYLIST_ID,
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        origin: window.location.origin
      },
      events: {
        onReady: () => {
          this.isReady = true;
          this.isInitializing = false;
          
          if (this.player.getVolume) {
            this.updateState({
              volume: this.player.getVolume(),
              isMuted: this.player.isMuted()
            });
          }
          
          this.updateMetadata(); // In case it loads with first video metadata
          this.readyCallbacks.forEach(fn => fn());
        },
        onStateChange: (event: any) => {
          this.handleStateChange(event.data);
        },
        onError: (event: any) => {
          console.error("YouTube Player Error", event.data);
          this.next(); // Skip to next if video unplayable (e.g. copyright, region blocked)
        }
      }
    });
  }

  private handleStateChange(state: number) {
    const YT = window.YT;
    let isPaused = true;
    let isBuffering = false;

    if (state === YT.PlayerState.PLAYING) {
      isPaused = false;
      this.updateMetadata();
      this.startPolling();
    } else if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.CUED) {
      isPaused = true;
      this.stopPolling();
    } else if (state === YT.PlayerState.BUFFERING) {
      isPaused = false;
      isBuffering = true;
    } else if (state === YT.PlayerState.ENDED) {
      isPaused = true;
      this.stopPolling();
      // Playlist should auto advance, but just in case
    }

    this.updateState({
      isPaused,
      isBuffering
    });
  }

  private updateMetadata() {
    if (!this.player || !this.player.getVideoData) return;
    
    const data = this.player.getVideoData();
    if (!data || !data.video_id) return;

    let duration = 0;
    let position = 0;
    
    if (this.player.getDuration) {
        duration = this.player.getDuration() * 1000 || 0;
    }
    
    if (this.player.getCurrentTime) {
        position = this.player.getCurrentTime() * 1000 || 0;
    }

    this.updateState({
      duration,
      position,
      track: {
        uri: data.video_id,
        name: data.title,
        artists: [{ name: data.author }],
        album: { 
          images: [
            // Use hqdefault as it's the most reliable 4:3 high quality thumbnail
            { url: `https://i.ytimg.com/vi/${data.video_id}/hqdefault.jpg` }
          ] 
        }
      }
    });
  }

  private startPolling() {
    if (this.pollInterval) return;
    this.pollInterval = window.setInterval(() => {
      if (this.player && this.player.getCurrentTime && this.player.getDuration) {
        this.updateState({
          position: this.player.getCurrentTime() * 1000,
          duration: this.player.getDuration() * 1000
        });
      }
    }, 1000);
  }

  private stopPolling() {
    if (this.pollInterval) {
      window.clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  private updateState(updates: Partial<PlaybackState>) {
    this.currentState = { ...this.currentState, ...updates };
    this.stateCallbacks.forEach(fn => fn(this.currentState));
  }

  play(): void {
    this.player?.playVideo();
  }

  pause(): void {
    this.player?.pauseVideo();
  }
  
  togglePlay(): void {
    if (this.currentState.isPaused) {
      this.play();
    } else {
      this.pause();
    }
  }

  seekTo(seconds: number): void {
    this.player?.seekTo(seconds, true);
  }

  next(): void {
    this.player?.nextVideo();
  }

  previous(): void {
    this.player?.previousVideo();
  }

  setVolume(volume: number): void {
    if (this.player && this.player.setVolume) {
      this.player.setVolume(volume);
      if (this.player.isMuted() && volume > 0) {
        this.player.unMute();
      }
      this.updateState({ volume, isMuted: this.player.isMuted() });
    }
  }

  toggleMute(): void {
    if (this.player && this.player.isMuted) {
      const isCurrentlyMuted = this.currentState.isMuted || this.currentState.volume === 0;
      
      if (isCurrentlyMuted) {
        this.player.unMute();
        let newVolume = this.currentState.volume;
        if (newVolume === 0) {
          newVolume = 50;
          this.player.setVolume(newVolume);
        }
        this.updateState({ isMuted: false, volume: newVolume });
      } else {
        this.player.mute();
        this.updateState({ isMuted: true });
      }
    }
  }

  getCurrentState(): PlaybackState {
    return this.currentState;
  }
  
  getIsReady(): boolean {
    return this.isReady;
  }

  onStateChange(fn: StateChangeCallback): () => void {
    this.stateCallbacks.add(fn);
    return () => this.stateCallbacks.delete(fn);
  }

  onReady(fn: ReadyCallback): () => void {
    this.readyCallbacks.add(fn);
    if (this.isReady) {
      fn();
    }
    return () => this.readyCallbacks.delete(fn);
  }
}

// We keep exporting as spotifyService so we don't break existing imports
export const spotifyService = new YouTubeService();
