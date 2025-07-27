import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const technologies = [
  { name: 'React', level: 95, color: 'from-blue-500 to-cyan-500' },
  { name: 'TypeScript', level: 90, color: 'from-blue-600 to-blue-800' },
  { name: 'Node.js', level: 88, color: 'from-green-500 to-green-700' },
  { name: 'Python', level: 85, color: 'from-yellow-500 to-yellow-600' },
  { name: 'PostgreSQL', level: 82, color: 'from-blue-700 to-indigo-600' },
  { name: 'AWS', level: 80, color: 'from-orange-500 to-red-500' },
  { name: 'Docker', level: 85, color: 'from-blue-400 to-blue-600' },
  { name: 'GraphQL', level: 78, color: 'from-pink-500 to-purple-600' },
];

const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            These are the technologies I work with to build amazing digital experiences
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              className="glass p-6 rounded-xl hover:neon-glow transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-foreground">{tech.name}</h3>
                <span className="text-primary font-medium">{tech.level}%</span>
              </div>
              
              <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${tech.color} rounded-full relative`}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${tech.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating tech icons */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + Math.sin(i) * 20}%`,
              }}
              animate={{
                y: [-10, 10],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;