import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, Variants } from 'framer-motion';
import { ArrowDown, Volume2, VolumeX } from 'lucide-react';
const heroVideoWebm = '/Video-Hero-Background.webm';
const heroVideoMp4 = '/Video-Hero-Background.mp4';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', 'true');
      const attemptPlay = () => {
        video.play().catch((err) => {
          console.log('Autoplay attempt handled:', err);
        });
      };
      attemptPlay();
      // Re-trigger play on user interaction if browser blocked initial autoplay
      const handleUserInteraction = () => {
        if (video.paused) {
          attemptPlay();
        }
      };
      window.addEventListener('touchstart', handleUserInteraction, { once: true });
      window.addEventListener('click', handleUserInteraction, { once: true });

      return () => {
        window.removeEventListener('touchstart', handleUserInteraction);
        window.removeEventListener('click', handleUserInteraction);
      };
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.12,
        duration: 0.85,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    }),
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#0D1117]"
    >
      {/* ── Hero Video Background Layer ───────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#0D1117]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-90 contrast-105 transition-opacity duration-1000"
        >
          <source src={heroVideoWebm} type="video/webm" />
          <source src={heroVideoMp4} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      </div>

      {/* ── Light Subtle Dark Overlays for Text Legibility (Without Obscuring Video) ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/80 via-transparent to-black/30 pointer-events-none z-0" />

      {/* Bottom fade for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0D1117] to-transparent pointer-events-none z-10" />

      {/* Subtle brand blue glow accent */}
      <div className="absolute bottom-10 left-0 w-[500px] h-[300px] bg-primary/15 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Audio toggle control */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-8 right-8 z-30 p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-110 active:scale-95 shadow-xl flex items-center gap-2 text-xs font-medium"
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4 text-white/80" />
            <span className="hidden sm:inline">Unmute Video</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-primary animate-pulse" />
            <span className="hidden sm:inline">Mute Sound</span>
          </>
        )}
      </button>

      {/* Video playback control badges in top right */}


      {/* ── Hero Text & Actions Content ────────────────────────────────── */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-28 pb-32">
        {/* Eyebrow badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white text-sm font-medium mb-8 shadow-xl"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse flex-shrink-0" />
          Brightline Dental Studio
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] text-white mb-6 max-w-3xl drop-shadow-md"
        >
          Your Smile,<br />
          <span className="text-primary italic drop-shadow-lg">Reimagined.</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-lg md:text-xl text-white/85 mb-12 max-w-xl leading-relaxed drop-shadow-sm font-normal"
        >
          Modern care, gentle touch. Experience a new standard of dentistry
          designed for your comfort and confidence.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/contact"
            className="bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all hover:shadow-2xl hover:shadow-primary/40 active:scale-95 text-center shadow-lg"
          >
            Book a Visit
          </Link>
          <Link
            href="/about"
            className="bg-white/15 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-medium hover:bg-white/25 transition-all active:scale-95 text-center shadow-lg"
          >
            Meet Our Team
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5 text-white/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
