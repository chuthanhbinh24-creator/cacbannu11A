/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Flower2, Gift, Play, Building2, Car, Sparkles, CheckCircle2, XCircle, Trophy, ChevronLeft, ChevronRight, Music, Volume2, VolumeX } from 'lucide-react';

// --- CONFIGURATION ---
// Bạn có thể thay đổi link nhạc ở đây
const AUDIO_URL = "https://raw-blue-1w3wtkrnku.edgeone.app/mp32.mp3";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 md:right-8 z-[150] flex flex-col items-end gap-2">
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col items-end gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
                isPlaying ? 'bg-pink-500 text-white animate-pulse' : 'bg-white text-pink-500 border-2 border-pink-200'
              }`}
            >
              {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setShowControls(!showControls)}
        className="bg-white/60 backdrop-blur-sm p-2 rounded-full text-pink-400 hover:text-pink-600 transition-colors shadow-sm border border-pink-100"
        title={showControls ? "Ẩn điều khiển" : "Hiện điều khiển"}
      >
        <Music size={18} className={isPlaying ? "animate-spin-slow" : ""} />
      </button>

      <audio
        ref={audioRef}
        src={AUDIO_URL}
        loop
      />
    </div>
  );
};

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * (30 - 10) + 10,
      duration: Math.random() * (10 - 5) + 5,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
          style={{ left: heart.left }}
          className="absolute text-pink-400/40"
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

const FallingPetals = () => {
  const [petals, setPetals] = useState<{ id: number; left: string; size: number; duration: number; delay: number; rotate: number }[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * (24 - 12) + 12,
      duration: Math.random() * (12 - 7) + 7,
      delay: Math.random() * 10,
      rotate: Math.random() * 360,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: -50, x: 0, opacity: 0, rotate: petal.rotate }}
          animate={{ 
            y: '110vh', 
            x: [0, 50, -50, 20],
            opacity: [0, 1, 1, 0],
            rotate: petal.rotate + 360
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: 'linear',
          }}
          style={{ left: petal.left }}
          className="absolute text-pink-300/30"
        >
          <div className="w-4 h-6 bg-pink-400/40 rounded-full" style={{ width: petal.size, height: petal.size * 1.5, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} />
        </motion.div>
      ))}
    </div>
  );
};

const BloomingFlower = ({ onClick }: { onClick?: () => void }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        rotate: [-2, 2, -2]
      }}
      transition={{ 
        scale: { delay: 1, duration: 1.5, ease: "easeOut" },
        opacity: { delay: 1, duration: 1.5 },
        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
      whileHover={{ y: -30, scale: 1.15, rotate: 0 }}
      onClick={onClick}
      className="relative w-48 h-48 flex items-center justify-center cursor-pointer transition-all z-20"
    >
      {/* Stem */}
      <div className="absolute bottom-0 w-2 h-24 bg-green-500 rounded-full">
        {/* Leaves */}
        <motion.div
          animate={{ rotate: [0, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 -left-6 w-8 h-4 bg-green-600 rounded-full origin-right"
        />
        <motion.div
          animate={{ rotate: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-12 -right-6 w-8 h-4 bg-green-600 rounded-full origin-left"
        />
      </div>
      
      {/* Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: angle }}
          animate={{ 
            scale: 1, 
            rotate: [angle - 2, angle + 2, angle - 2] 
          }}
          transition={{ 
            scale: { delay: 1.5 + i * 0.1, duration: 0.8 },
            rotate: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }
          }}
          className="absolute w-16 h-24 bg-pink-500 rounded-full flower-petal opacity-90 shadow-lg"
          style={{ transformOrigin: 'bottom center', bottom: '50%' }}
        />
      ))}
      
      {/* Center */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="absolute w-12 h-12 bg-yellow-400 rounded-full z-10 shadow-inner"
      />
      
      {/* Tooltip hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 0], y: [10, -10, -20] }}
        transition={{ duration: 3, repeat: Infinity, delay: 4 }}
        className="absolute -top-12 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-pink-500 shadow-sm border border-pink-100 whitespace-nowrap"
      >
        Mở thư nè! 💌
      </motion.div>
    </motion.div>
  );
};

const PhotoFrame = ({ children, className, delay, onClick }: { children: React.ReactNode; className: string; delay: number; onClick?: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.8, type: "spring" }}
    onClick={onClick}
    className={`absolute w-40 h-56 md:w-56 md:h-72 bg-white p-2 rounded-2xl shadow-xl border-4 border-pink-200 flex flex-col items-center justify-center overflow-hidden animate-sway cursor-pointer hover:z-50 hover:scale-105 transition-transform ${className}`}
  >
    {children}
  </motion.div>
);

const Cityscape = () => {
  return (
    <div className="absolute bottom-0 w-full h-64 overflow-hidden pointer-events-none">
      {/* Buildings - Positioned above the road */}
      <div className="absolute bottom-12 w-full flex items-end justify-around opacity-60">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="bg-pink-800 w-16 shadow-lg"
            style={{ height: `${40 + Math.random() * 80}px` }}
          >
            <div className="grid grid-cols-2 gap-1 p-1">
              {Array.from({ length: 8 }).map((_, j) => (
                <div key={j} className="w-2 h-2 bg-yellow-200/40" />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Road - Black and Opaque */}
      <div className="absolute bottom-0 w-full h-12 bg-neutral-900 border-t-2 border-neutral-700">
        <div className="absolute top-1/2 w-full h-0.5 border-t border-dashed border-white/40" />
      </div>

      {/* Cars */}
      <div className="absolute bottom-4 w-full">
        <div className="animate-car-move absolute">
          <div className="flex items-center text-pink-400">
            <Car size={36} fill="currentColor" />
            <div className="ml-1 text-[10px] font-bold bg-white/80 px-1.5 py-0.5 rounded text-pink-600 shadow-sm">GIFT</div>
          </div>
        </div>
        <div className="animate-car-move-reverse absolute" style={{ bottom: '-15px' }}>
          <div className="flex items-center text-pink-300">
            <Car size={32} fill="currentColor" className="scale-x-[-1]" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Fireworks = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      decay: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 0.7; // Lighter alpha
        this.color = color;
        this.decay = Math.random() * 0.01 + 0.01;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // gravity
        this.alpha -= this.decay;
      }
    }

    const createFirework = (x: number, y: number) => {
      // Pastel colors as requested before
      const colors = ['#ffb3c6', '#fff4b3', '#b3fff0', '#ffb3ff', '#ffffff', '#ffd1b3', '#b3d9ff', '#d9ffb3'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const particleCount = Math.floor(Math.random() * 40) + 60;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    const loop = () => {
      ctx.fillStyle = 'rgba(255, 241, 242, 0.15)'; // Match bg-pink-50 roughly for trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (Math.random() < 0.04) {
        createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.5);
      }

      particles = particles.filter(p => p.alpha > 0);
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize();
    
    // Initial bursts
    for(let i = 0; i < 5; i++) {
      createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.5);
    }
    
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

const ZoomedPhoto = ({ photos, currentIndex, onClose, onNext, onPrev }: { photos: string[]; currentIndex: number; onClose: () => void; onNext: () => void; onPrev: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="relative max-w-4xl w-full aspect-[3/4] md:aspect-auto md:h-[80vh] bg-white p-3 rounded-3xl shadow-2xl flex flex-col items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute -top-12 right-0 text-white hover:text-pink-300 transition-colors"
      >
        <XCircle size={32} />
      </button>

      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          src={photos[currentIndex]}
          className="w-full h-full object-cover"
        />
        
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 p-3 rounded-full text-pink-600 backdrop-blur-md transition-all shadow-lg"
        >
          <ChevronLeft size={32} />
        </button>
        
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 p-3 rounded-full text-pink-600 backdrop-blur-md transition-all shadow-lg"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="mt-4 flex gap-2">
        {photos.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-pink-500 w-6' : 'bg-pink-200'}`}
          />
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const LetterModal = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[400] bg-pink-900/40 backdrop-blur-md flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ y: 100, opacity: 0, rotate: -5 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      exit={{ y: 100, opacity: 0, scale: 0.8 }}
      className="relative max-w-lg w-full bg-[#fff9f0] p-8 md:p-12 rounded-sm shadow-2xl border-t-[30px] border-pink-200"
      onClick={(e) => e.stopPropagation()}
      style={{
        boxShadow: '0 10px 30px rgba(0,0,0,0.1), inset 0 0 100px rgba(255,255,255,0.5)',
        backgroundImage: 'repeating-linear-gradient(#fff9f0, #fff9f0 30px, #e5e5e5 31px)'
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-pink-400 hover:text-pink-600 transition-colors"
      >
        <XCircle size={24} />
      </button>

      <div className="font-amsterdam text-4xl text-pink-600 mb-6 text-center">
        Gửi đến các bạn nữ lớp 11A!
      </div>

      <div className="space-y-4 text-pink-800 leading-relaxed font-medium">
        <p>
          Chúc các bạn luôn xinh đẹp, tự tin, học tập thật tốt và luôn tràn đầy năng lượng tích cực.
        </p>
        <p>
          Mong rằng mỗi ngày đến trường đều là một ngày vui với nhiều kỷ niệm đẹp bên bạn bè và thầy cô.
        </p>
        <p>
          Chúc các bạn luôn hạnh phúc và đạt được những ước mơ của mình.
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-4 -right-4 text-pink-300 opacity-50 rotate-12">
        <Flower2 size={80} />
      </div>
      <div className="absolute -top-10 -left-6 text-pink-200 opacity-40 -rotate-12">
        <Heart size={60} fill="currentColor" />
      </div>
    </motion.div>
  </motion.div>
);

export default function App() {
  const [stage, setStage] = useState<'loading' | 'intro' | 'main'>('loading');
  const [showVideo, setShowVideo] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const PHOTOS = [
    "https://files.catbox.moe/9nszlg.jpg",
    "https://files.catbox.moe/69nynj.jpg",
    "https://files.catbox.moe/dbjena.jpg",
    "https://files.catbox.moe/9nszlg.jpg",
  ];

  const handleNextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % PHOTOS.length : null));
  };

  const handlePrevPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev !== null ? (prev - 1 + PHOTOS.length) % PHOTOS.length : null));
  };

  useEffect(() => {
    const timer = setTimeout(() => setStage('intro'), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 font-sans text-pink-900 overflow-hidden relative">
      <FloatingHearts />
      <FallingPetals />
      <MusicPlayer />
      {stage === 'main' && <Fireworks />}

      <AnimatePresence mode="wait">
        {stage === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-pink-100"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Flower2 size={48} className="text-pink-500" />
            </motion.div>
            <p className="mt-4 font-medium animate-pulse">Đang chuẩn bị điều bất ngờ...</p>
          </motion.div>
        )}

        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-40 bg-pink-50/80 backdrop-blur-sm"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setStage('main')}
              className="group relative flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-200 group-hover:bg-pink-600 transition-colors">
                <Gift size={40} className="text-white animate-bounce" />
              </div>
              <span className="mt-6 text-xl font-bold text-pink-600 tracking-wide">NHẤP VÀO ĐỂ NHẬN QUÀ</span>
              <Sparkles className="absolute -top-4 -right-4 text-yellow-400 animate-pulse" />
            </motion.button>
          </motion.div>
        )}

        {stage === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-screen w-full flex flex-col items-center pt-12"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: -20, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center z-20 px-4"
            >
              <h1 className="text-5xl md:text-7xl font-amsterdam text-pink-600 drop-shadow-md mb-2">
                Chúc Mừng Ngày Quốc Tế Phụ Nữ
              </h1>
              <h2 className="text-7xl md:text-9xl font-amsterdam text-pink-400 drop-shadow-xl">
                8 - 3
              </h2>
            </motion.div>

            {/* Photo Frames Layout */}
            <div className="relative w-full max-w-4xl h-64 md:h-80 flex items-center justify-center z-10">
              {/* Top Pair - Wide apart */}
              <PhotoFrame 
                className="-top-6 md:-top-10 -left-4 md:-left-12 -rotate-6" 
                delay={3} 
                onClick={() => setSelectedPhotoIndex(0)}
              >
                <img src={PHOTOS[0]} className="w-full h-full object-cover rounded-xl" />
              </PhotoFrame>

              <PhotoFrame 
                className="-top-6 md:-top-10 -right-4 md:-right-12 rotate-6" 
                delay={3.2} 
                onClick={() => setSelectedPhotoIndex(1)}
              >
                <img src={PHOTOS[1]} className="w-full h-full object-cover rounded-xl" />
              </PhotoFrame>
              
              {/* Bottom Pair - Closer to center */}
              <PhotoFrame 
                className="bottom-0 left-20 md:left-40 -rotate-3" 
                delay={3.4} 
                onClick={() => setSelectedPhotoIndex(2)}
              >
                <img src={PHOTOS[2]} className="w-full h-full object-cover rounded-xl" />
              </PhotoFrame>

              <PhotoFrame 
                className="bottom-0 right-20 md:right-40 rotate-3" 
                delay={3.6} 
                onClick={() => setSelectedPhotoIndex(3)}
              >
                <img src={PHOTOS[3]} className="w-full h-full object-cover rounded-xl" />
              </PhotoFrame>

              <BloomingFlower onClick={() => setShowLetter(true)} />
            </div>

            <Cityscape />

            <AnimatePresence>
              {selectedPhotoIndex !== null && (
                <ZoomedPhoto 
                  photos={PHOTOS}
                  currentIndex={selectedPhotoIndex}
                  onClose={() => setSelectedPhotoIndex(null)}
                  onNext={handleNextPhoto}
                  onPrev={handlePrevPhoto}
                />
              )}
              {showLetter && (
                <LetterModal onClose={() => setShowLetter(false)} />
              )}
            </AnimatePresence>

            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5 }}
              className="mt-8 z-30 flex flex-col items-center"
            >
              <button
                onClick={() => setShowVideo(true)}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-pink-200 hover:bg-pink-500 hover:text-white transition-all group cursor-pointer"
              >
                <Play size={20} className="fill-current" />
                <span className="font-bold">BÍ MẬT KHÔNG THỂ TIẾT LỘ</span>
              </button>

              <AnimatePresence>
                {showVideo && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8"
                  >
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                    >
                      <button 
                        onClick={() => setShowVideo(false)}
                        className="absolute top-4 right-4 z-[110] bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                      <video 
                        src="https://videotourl.com/videos/1772986340031-62746bde-3112-47cf-88a0-b22398f579c6.mp4" 
                        controls 
                        autoPlay
                        className="w-full h-full object-contain" 
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              className="mt-4 text-pink-400 font-medium italic z-20"
            >
              Dành tặng cho các bạn nữ 11A!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
