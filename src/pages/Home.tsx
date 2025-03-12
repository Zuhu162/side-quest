
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center relative"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
          Zuhayer Adnan Siddique
        </h1>
        <h2 className="text-xl md:text-2xl text-muted-foreground mb-8">
          Software Engineer
        </h2>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute -top-16 right-0 md:right-0 max-w-xs"
        >
          <div className="bg-secondary p-4 rounded-xl text-sm text-left">
            <p>
              Welcome to my portfolio! Since AI is going to take over my job, I'm mimicking an AI chatbot. Shhh 🤫 Don't tell anyone.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
