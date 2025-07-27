import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass border-b' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="text-xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            &lt;Developer/&gt;
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 relative"
                whileHover={{ y: -2 }}
              >
                {item.name}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
            <Button size="sm" className="neon-glow">
              Hire Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="glass"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden overflow-hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-2 glass mt-2 rounded-lg">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-foreground hover:text-primary transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
                whileHover={{ x: 10 }}
              >
                {item.name}
              </motion.a>
            ))}
            <div className="px-4 pt-2">
              <Button size="sm" className="w-full neon-glow">
                Hire Me
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;