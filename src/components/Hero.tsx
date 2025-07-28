/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { ArrowDown, Github, Mail, Linkedin } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

export interface GitHubUserData {
  data: {
    name: string | null;
    avatar_url: string;
  };
}

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const [userData, setUserData] = useState<GitHubUserData["data"] | null>(null);
  const [bounceSettings, setBounceSettings] = useState({
    distance: 8,
    duration: 1.5,
  });

  const fetchGitHubData = async () => {
    try {
      const res = (await axios.get(
        "https://api.github.com/users/pratik2061"
      )) as GitHubUserData;
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGitHubData();

    const updateBounce = () => {
      if (window.innerWidth < 640) {
        setBounceSettings({ distance: 4, duration: 1 });
      } else {
        setBounceSettings({ distance: 8, duration: 1.5 });
      }
    };

    updateBounce();

    window.addEventListener("resize", updateBounce);
    return () => window.removeEventListener("resize", updateBounce);
  }, []);

  const handleScrollToNext = () => {
    const section = document.getElementById("about");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 overflow-hidden relative">
      <motion.div
        className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile image & name */}
        <motion.div variants={itemVariants} className="mb-2">
          <img
            src={userData?.avatar_url}
            alt="Developer Profile"
            className="w-40 h-40 md:w-56 md:h-56 rounded-full mx-auto mb-5 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-500"
          />
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2"
            variants={itemVariants}
          >
            {userData?.name?.toUpperCase()}
          </motion.h2>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-xl md:text-2xl font-light mb-6 leading-tight tracking-tight font-playfair text-slate-600"
          variants={itemVariants}
        >
          Full Stack Developer
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-sm md:text-base text-muted-foreground mb-6 max-w-lg mx-auto"
          variants={itemVariants}
        >
          Welcome! glad to have you here.I'm a software developer who enjoys
          building clean interfaces, smart backend systems, and seamless user
          interactions. Let's build something amazing together.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          variants={itemVariants}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-md bg-primary text-white hover:bg-primary/90 transition shadow"
          >
            <Mail className="mr-2 h-5 w-5" />
            Get In Touch
          </a>

          <a
            href="#projects"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-md border border-input bg-background glass hover:bg-accent hover:text-accent-foreground transition"
          >
            <Github className="mr-2 h-5 w-5" />
            View Projects
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          className="flex justify-center space-x-4 mb-20"
          variants={itemVariants}
        >
          <motion.a
            href="https://github.com/pratik2061"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 glass rounded-full hover:shadow-md transition-all duration-300"
          >
            <Github className="h-5 w-5" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/pratik-sharma-937909290/"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 glass rounded-full hover:shadow-md transition-all duration-300"
          >
            <Linkedin className="h-5 w-5" />
          </motion.a>
          <motion.a
            href="mailto:pratiksharma2061@gmail.com"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 glass rounded-full hover:shadow-md transition-all duration-300"
          >
            <Mail className="h-5 w-5" />
          </motion.a>
        </motion.div>

        {/* Arrow Down with scroll */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex justify-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: [-bounceSettings.distance, 0],
            opacity: 1,
          }}
          transition={{
            y: {
              duration: bounceSettings.duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            },
            opacity: {
              duration: 0.6,
              ease: "easeOut",
            },
          }}
        >
          <button onClick={handleScrollToNext} className="p-2">
            <ArrowDown className="h-6 w-6 text-blue-600" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
