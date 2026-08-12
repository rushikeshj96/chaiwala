import { motion } from 'framer-motion';
// import { ChaiTimer } from '../ChaiTimer/ChaiTimer';

export function ChaiStory() {
  return (
    <section
      id="chai-story"
      className="relative py-16 md:py-32 px-4 border-t border-white/5"
      style={{
        background: 'linear-gradient(to bottom, rgba(20, 10, 4, 0.8) 0%, rgba(14, 7, 2, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      aria-labelledby="story-heading"
    >

      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="story-heading"
            className="font-devanagari font-bold"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
              color: 'var(--chai-cream)',
              lineHeight: 1.2,
            }}
          >
            हमारी छोटी सी
            <br />
            <span style={{ color: 'var(--chai-warm)' }}>चाय की दुनिया</span>
          </h2>
          <p className="mt-4 font-ui text-sm tracking-widest uppercase opacity-50" style={{ color: 'var(--chai-cream)' }}>
            Our Little Chai World
          </p>
        </motion.div>

        {/* Story grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <div
              className="glass-panel rounded-2xl p-6 md:p-8"
              style={{ borderColor: 'rgba(212,136,42,0.15)' }}
            >
              <p
                className="font-devanagari text-xl leading-relaxed mb-6"
                style={{ color: 'var(--chai-cream)' }}
              >
                एक कप चाय,
                <br />
                थोड़ी सी बातें,
                <br />
                और थोड़ा सा सुकून.
              </p>
              <p
                className="font-ui text-sm leading-relaxed opacity-60 mb-8"
                style={{ color: 'var(--chai-cream)' }}
              >
                A cup of tea, a little conversation, and a little peace.
                That's all this digital chai stall is about — a warm corner
                of the internet where you can slow down, listen to some music,
                and breathe.
              </p>

              {/* Chai facts */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { hindi: 'दूध', en: 'Milk', icon: '🥛' },
                  { hindi: 'अदरक', en: 'Ginger', icon: '🫚' },
                  { hindi: 'इलायची', en: 'Cardamom', icon: '🌿' },
                  { hindi: 'चाय पत्ती', en: 'Tea Leaves', icon: '🍃' },
                ].map((item) => (
                  <div
                    key={item.en}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{ background: 'rgba(212,136,42,0.08)', border: '1px solid rgba(212,136,42,0.15)' }}
                  >
                    <span className="text-lg" aria-hidden="true">{item.icon}</span>
                    <div>
                      <p className="font-devanagari text-sm" style={{ color: 'var(--chai-warm)' }}>{item.hindi}</p>
                      <p className="font-ui text-xs opacity-50" style={{ color: 'var(--chai-cream)' }}>{item.en}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Timer + Brew guide */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            {/* <ChaiTimer /> */}

            <div className="w-full glass-panel rounded-2xl p-6">
              <h3
                className="font-devanagari text-base mb-4"
                style={{ color: 'var(--chai-warm)' }}
              >
                चाय बनाने का तरीका
              </h3>
              {[
                { step: '१', text: 'पानी उबालें', en: 'Boil water' },
                { step: '२', text: 'चाय पत्ती डालें', en: 'Add tea leaves' },
                { step: '३', text: 'अदरक और इलायची', en: 'Add ginger & cardamom' },
                { step: '४', text: 'दूध और चीनी', en: 'Add milk & sugar' },
                { step: '५', text: 'छानो और पियो', en: 'Strain and enjoy' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3 mb-3 last:mb-0">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: 'rgba(212,136,42,0.2)', color: 'var(--chai-warm)' }}
                  >
                    {item.step}
                  </span>
                  <div>
                    <span className="font-devanagari text-sm" style={{ color: 'var(--chai-cream)' }}>{item.text}</span>
                    <span className="font-ui text-xs opacity-40 ml-2" style={{ color: 'var(--chai-cream)' }}>({item.en})</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom warm gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(20,10,4,1) 0%, transparent 100%)' }}
        aria-hidden="true"
      />
    </section>
  );
}
