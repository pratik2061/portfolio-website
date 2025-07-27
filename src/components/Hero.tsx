/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Mail, Linkedin } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

export interface GitHubUserData {
  data: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string | null;
    company: string | null;
    blog: string;
    location: string | null;
    email: string | null;
    hireable: boolean | null;
    bio: string | null;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    user_view_type?: string; // Not standard, possibly a custom field
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
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium glass rounded-full border neon-glow">
            Available for Internship
          </span>
        </motion.div>
        <motion.div variants={itemVariants} className="mb-6">
          <img
            src={userData?.avatar_url}
            alt="Developer Profile"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 border-4 border-primary/20 hover:border-primary/40 transition-all duration-300"
          />
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-primary/90"
            variants={itemVariants}
          >
            {userData?.name}
          </motion.h2>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          variants={itemVariants}
        >
          <span className="gradient-text">Full Stack</span>
          <br />
          <span className="text-foreground">Developer</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Welcome — glad to have you here! I'm a software developer who enjoys
          building clean interfaces, smart backend systems, and seamless user
          interactions. Let's build something amazing together.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          variants={itemVariants}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md neon-glow animate-pulse-glow bg-primary text-white hover:bg-primary/90 transition"
          >
            <Mail className="mr-2 h-5 w-5" />
            Get In Touch
          </a>

          <a
            href="#projects"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md border border-input bg-background glass hover:bg-accent hover:text-accent-foreground transition"
          >
            <Github className="mr-2 h-5 w-5" />
            View Projects
          </a>
        </motion.div>

        <motion.div
          className="flex justify-center space-x-6 mb-12"
          variants={itemVariants}
        >
          <motion.a
            href="https://github.com/pratik2061"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 glass rounded-full hover:neon-glow transition-all duration-300"
          >
            <Github className="h-6 w-6" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/pratik-sharma-937909290/"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 glass rounded-full hover:neon-glow transition-all duration-300"
          >
            <Linkedin className="h-6 w-6" />
          </motion.a>
          <motion.a
            href="mailto:pratiksharma2061@gmail.com"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 glass rounded-full hover:neon-glow transition-all duration-300"
          >
            <Mail className="h-6 w-6" />
          </motion.a>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="h-6 w-6 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
