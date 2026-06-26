import { motion } from 'framer-motion';

const BackgroundCanvas = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0a192f] overflow-hidden">
      {/* Container for the blurred blobs */}
      <div className="absolute inset-0 filter blur-[80px] md:blur-[120px]">
        
        {/* Blob 1: Teal */}
        <motion.div
          animate={{
            x: [-100, 100, -100],
            y: [-100, 100, -100],
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[10%] left-[10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-secondary/20 rounded-full"
        />

        {/* Blob 2: Blue */}
        <motion.div
          animate={{
            x: [100, -100, 100],
            y: [100, -100, 100],
            rotate: [360, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-blue-600/15 rounded-full"
        />
      </div>

      {/* Noise Texture (Very subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  );
};

export default BackgroundCanvas;