export function Footer() {
  return (
    <footer
      className="py-12 px-4 text-center"
      style={{ background: 'var(--chai-dark)' }}
    >
      <div className="max-w-xl mx-auto">
        <p
          className="font-devanagari text-2xl font-bold mb-2"
          style={{ color: 'var(--chai-warm)' }}
        >
          चाय वाला
        </p>
        <p
          className="font-ui text-xs tracking-widest uppercase opacity-40 mb-4"
          style={{ color: 'var(--chai-cream)' }}
        >
          A digital chai stall
        </p>

        <a 
          href="mailto:rhushikeshjadhav96@gmail.com"
          className="inline-block font-ui text-sm mb-8 transition-opacity hover:opacity-80"
          style={{ color: 'var(--chai-warm)' }}
        >
          rhushikeshjadhav96@gmail.com
        </a>

        <div className="h-px w-24 mx-auto mb-8" style={{ background: 'rgba(212,136,42,0.25)' }} />

        <p className="font-ui text-xs opacity-30" style={{ color: 'var(--chai-cream)' }}>
          Music plays through YouTube's embedded player. No audio is hosted here; all
          rights belong to the respective labels, composers and performers.
        </p>
        <p className="font-ui text-xs opacity-20 mt-4" style={{ color: 'var(--chai-cream)' }}>
          © {new Date().getFullYear()} Chai Wala · Made with ☕ and nostalgia
        </p>
      </div>
    </footer>
  );
}
