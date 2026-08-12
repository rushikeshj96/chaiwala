import { MusicProvider } from './context/MusicContext';
import { ChaiTimerProvider } from './context/ChaiTimerContext';
import { Hero } from './components/Hero/Hero';
import { ChaiStory } from './components/ChaiStory/ChaiStory';
import { Footer } from './components/Footer/Footer';
import { MusicPlayer } from './components/MusicPlayer/MusicPlayer';

import { ChaiIllustration } from './components/ChaiIllustration/ChaiIllustration';
import { ChaiSpotifyButton } from './components/ChaiSpotifyButton/ChaiSpotifyButton';

function AppContent() {
  // const { track, playerState } = useMusicContext();

  return (
    <>

      <ChaiIllustration />
      <main className="relative z-10">
        <Hero />
        <ChaiStory />
        <Footer />
      </main>
      <MusicPlayer />
      <ChaiSpotifyButton />
    </>
  );
}

export default function App() {
  return (
    <ChaiTimerProvider>
      <MusicProvider>
        <AppContent />
      </MusicProvider>
    </ChaiTimerProvider>
  );
}
