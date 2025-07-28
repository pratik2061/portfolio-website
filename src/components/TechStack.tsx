import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Tailwind CSS",
    logo: "https://imgs.search.brave.com/iVq-vnKDxsqDQl2aqvMmqhz6mrul_N8FAKNDv2Wk0DI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YXJlc291cmNlLnNm/bzIuZGlnaXRhbG9j/ZWFuc3BhY2VzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8wOS8xMDE3MDYx/MC9UYWlsd2luZC1D/U1MtTG9nby1QTkcu/cG5n",
  },
  {
    name: "Socket.IO",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Prisma",
    logo: "https://www.svgrepo.com/show/354210/prisma.svg",
  },
  {
    name: "Redux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },
  {
    name: "Axios",
    logo: "https://avatars.githubusercontent.com/u/32372333?s=200&v=4",
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
                className="w-10 h-10 md:w-16 md:h-16 object-contain mb-2 md:mb-3"
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
