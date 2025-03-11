
import { motion } from "framer-motion";
import TypingAnimation from "@/components/TypingAnimation";
import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function PortfolioGenerator() {
  const [typingComplete, setTypingComplete] = useState(false);
  const responseText = "I'd be delighted to help you create your own software engineer portfolio! Let me know your preferences and I'll design something beautiful for you.";

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-card p-4 rounded-xl text-left">
          <div className="text-sm">
            <span className="font-semibold">User: </span>
            <span className="text-muted-foreground">Make me a SE portfolio</span>
          </div>
        </div>
        
        <div className="bg-secondary/30 p-4 rounded-xl text-left mt-4">
          <TypingAnimation 
            text={responseText} 
            onComplete={() => setTypingComplete(true)}
          />
        </div>
      </div>

      {typingComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mt-12 text-center"
        >
          <Sparkles className="h-16 w-16 mx-auto mb-4 text-blue-400" />
          <h2 className="text-2xl font-bold mb-4">Portfolio Generator</h2>
          <p className="text-muted-foreground mb-8">
            This feature is coming soon! I'm working on an AI-powered portfolio generator
            that will create a custom portfolio site based on your experience and preferences.
          </p>
          <div className="p-4 bg-secondary/30 rounded-xl inline-block">
            <p className="text-sm">
              🚧 Under construction 🚧
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
