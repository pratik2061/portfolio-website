import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  {
    name: "React",
    logo: "../../public/logo/React.jpg",
  },
  {
    name: "TypeScript",
     logo: "../../public/logo/typescript.jpg",
  },
  {
    name: "Node js",
    logo: "../../public/logo/node.jpg",
  },
  {
    name: "Express js",
    logo: "../../public/logo/express.jpg",
  },
    {
    name: "Nest js",
    logo: "../../public/logo/nest.jpg",
  },
  {
    name: "PostgreSQL",
    logo: "../../public/logo/postgres.jpg",
  },
  {
    name: "MongoDB",
    logo: "../../public/logo/mongodb.jpg",
  },
  {
    name: "Docker",
    logo: "../../public/logo/docker.jpg",
  },
  {
    name: "Tailwind CSS",
    logo: "../../public/logo/tailwindcss.jpg",
  },
  {
    name: "Socket.IO",
    logo: "../../public/logo/socket.jpg",
  },
  {
    name: "Git",
    logo: "../../public/logo/git.jpg",
  },
  {
    name: "Prisma",
    logo: "../../public/logo/prisma.jpg",
  },
  {
    name: "Redux",
    logo: "../../public/logo/redux.jpg",
  },
    {
    name: "Zustand",
    logo: "../../public/logo/zustand.jpg",
  },
];

const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.15,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 relative"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
            Skills & Technologies
          </h2>

        </motion.div>

        {/* Tech Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {technologies.map(({ name, logo }) => (
            <motion.div
              key={name}
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
              }}
              className="glass p-3 md:p-5 rounded-xl flex flex-col items-center justify-center cursor-default transition-shadow duration-300"
            >
              <img
                src={logo}
                alt={`${name} logo`}
                className="w-10 h-10 md:w-28 md:h-20 object-contain mb-2 md:mb-3"
                loading="lazy"
                draggable={false}
              />
              <h3 className="text-xs md:text-sm font-semibold text-foreground select-none">
                {name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
