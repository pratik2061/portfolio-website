import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "./ui/button";

const Exp_data = [
  {
    title: "Frontend Developer Intern",
    time: "Duration: 2 Months",
    description:
      "            Worked on real-world projects, learning and applying full-stack development concepts. Gained hands-on experience with modern web technologies and teamwork.",
    link: "https://www.refobe.com",
    button_txt: "Refobe",
  },
  {
    title: "Backend Developer ",
    time: "Duration: Dec-2025 - Present",
    description:
      "Building and maintaining server-side applications, ensuring robust performance and scalability. Collaborating with frontend developers to integrate user-facing elements with server logic.",
    link: "https://www.synthbitgroup.com/",
    button_txt: "Synthbit Group",
  },
];

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
    <section className="w-full bg-background px-4 py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <motion.h3
          className="text-3xl font-extrabold text-primary mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h3>
        {Exp_data.map((data, index) => (
          <motion.div
            className="w-full max-w-5xl mx-auto bg-muted/10 p-8 my-6 rounded-xl shadow border border-input"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={index}
          >
            <motion.div
              className="text-lg font-semibold text-foreground mb-2"
              variants={itemVariants}
            >
              {data.title}
            </motion.div>

            <motion.div
              className="text-sm text-muted-foreground mb-4"
              variants={itemVariants}
            >
              {data.time}
            </motion.div>

            <motion.p
              className="text-base text-slate-400 mb-6"
              variants={itemVariants}
            >
              {data.description}
            </motion.p>

            <motion.a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
            >
              <Button>
                Visit {data.button_txt}{" "}
                <FiArrowRight
                  className="ml-2 inline-block"
                  style={{ transform: "rotate(-40deg)" }}
                  size={20}
                />
              </Button>
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
