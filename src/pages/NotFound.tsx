import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { CosmicLayout } from "@/components/CosmicLayout";
import { Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <CosmicLayout>
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center glass-card p-8 rounded-3xl max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-6xl mb-4"
          >
            🌙
          </motion.div>
          <h1 className="font-display text-4xl text-gradient-gold mb-4">404</h1>
          <p className="text-muted-foreground mb-6">
            The stars couldn't find this page in the cosmic realm
          </p>
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:glow-gold transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Return to the Stars
          </a>
        </motion.div>
      </div>
    </CosmicLayout>
  );
};

export default NotFound;
