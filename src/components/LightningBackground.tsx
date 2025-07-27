import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LightningBeam {
  id: number;
  left: number;
  delay: number;
  height: number;
}

const LightningBackground = () => {
  const [beams, setBeams] = useState<LightningBeam[]>([]);

  useEffect(() => {
    const generateBeams = () => {
      const newBeams: LightningBeam[] = [];
      for (let i = 0; i < 8; i++) {
        newBeams.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 4,
          height: 60 + Math.random() * 40,
        });
      }
      setBeams(newBeams);
    };

    generateBeams();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Lightning beams */}
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute w-0.5 lightning-beam"
          style={{
            left: `${beam.left}%`,
            height: `${beam.height}%`,
            top: '20%',
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: beam.delay,
            repeat: Infinity,
            repeatDelay: 3 + Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default LightningBackground;