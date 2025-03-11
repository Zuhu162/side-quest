
import { motion } from "framer-motion";
import TypingAnimation from "@/components/TypingAnimation";
import { useState } from "react";

export default function About() {
  const [typingComplete, setTypingComplete] = useState(false);
  const responseText = "Hello! I'm Zuhayer, a software engineer passionate about building exceptional web applications and exploring new technologies.";

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-card p-4 rounded-xl text-left">
          <div className="text-sm">
            <span className="font-semibold">User: </span>
            <span className="text-muted-foreground">Tell me about yourself</span>
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
          className="max-w-3xl mx-auto mt-12 space-y-6 text-left"
        >
          <h2 className="text-2xl font-bold">Professional Background</h2>
          <p className="text-muted-foreground">
            I'm a skilled software engineer with expertise in frontend and backend development.
            I specialize in building responsive web applications using modern JavaScript frameworks.
          </p>
          
          <h2 className="text-2xl font-bold">Skills</h2>
          <ul className="list-disc pl-5 text-muted-foreground">
            <li>JavaScript/TypeScript</li>
            <li>React & Next.js</li>
            <li>Node.js & Express</li>
            <li>Database design (SQL & NoSQL)</li>
            <li>RESTful API development</li>
            <li>Cloud services (AWS/Azure)</li>
          </ul>
        </motion.div>
      )}
    </div>
  );
}
