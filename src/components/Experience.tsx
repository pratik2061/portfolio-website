import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "./ui/button";

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-[320px] flex flex-col items-center justify-center px-4 py-16 relative">
      {/* Heading outside and centered */}
      <motion.h3
        className="text-3xl font-extrabold text-primary mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Experience
      </motion.h3>

      {/* Glass container */}
      <motion.div
        className="max-w-3xl glass p-8 rounded-xl shadow-lg border border-input"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-lg font-semibold text-foreground mb-2"
          variants={itemVariants}
        >
          Software Developer Intern
        </motion.div>

        <motion.div
          className="text-sm text-muted-foreground mb-4"
          variants={itemVariants}
        >
          Duration: 1 Month
        </motion.div>

        <motion.p
          className="text-base text-slate-500 mb-6"
          variants={itemVariants}
        >
          Worked on real-world projects, learning and applying full-stack
          development concepts. Gained hands-on experience with modern web
          technologies and teamwork.
        </motion.p>

        <motion.a
          href="https://www.refobe.com"
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
        >
          <Button>
            <motion.a
              href="https://www.refobe.com"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
            >
              Visit Refobe{" "}
              <FiArrowRight
                className="ml-2 inline-block"
                style={{ transform: "rotate(-40deg)" }}
                size={20}
              />
            </motion.a>
          </Button>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Experience;
