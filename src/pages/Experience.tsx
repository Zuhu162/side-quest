
import { motion } from "framer-motion";
import TypingAnimation from "@/components/TypingAnimation";
import { useState } from "react";
import { Briefcase, Calendar } from "lucide-react";

export default function Experience() {
  const [typingComplete, setTypingComplete] = useState(false);
  const responseText = "Here's a summary of my professional journey and the experiences that have shaped my career.";

  return (
    <div className="container">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="bg-card p-4 rounded-xl text-left">
          <div className="text-sm">
            <span className="font-semibold">User: </span>
            <span className="text-muted-foreground">Show me your experience</span>
          </div>
        </div>
        
        <div className="bg-secondary/30 p-4 rounded-xl text-left">
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
          className="max-w-3xl mx-auto mt-8 space-y-8"
        >
          <div className="relative border-l border-border pl-6 ml-3">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
              <Briefcase className="w-3 h-3" />
            </div>
            <div className="mb-6">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>2021 - Present</span>
              </div>
              <h3 className="text-xl font-bold">Senior Software Engineer</h3>
              <p className="text-muted-foreground mb-2">Tech Innovations Inc.</p>
              <p className="text-sm text-muted-foreground">
                Led development of core features for a SaaS platform. Mentored junior developers and implemented CI/CD pipelines to improve deployment efficiency.
              </p>
            </div>
          </div>

          <div className="relative border-l border-border pl-6 ml-3">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
              <Briefcase className="w-3 h-3" />
            </div>
            <div className="mb-6">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>2019 - 2021</span>
              </div>
              <h3 className="text-xl font-bold">Software Developer</h3>
              <p className="text-muted-foreground mb-2">Digital Solutions Ltd</p>
              <p className="text-sm text-muted-foreground">
                Designed and implemented RESTful APIs and microservices. Collaborated with design teams to create responsive UIs for web applications.
              </p>
            </div>
          </div>

          <div className="relative border-l border-border pl-6 ml-3">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
              <Briefcase className="w-3 h-3" />
            </div>
            <div>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>2018 - 2019</span>
              </div>
              <h3 className="text-xl font-bold">Junior Web Developer</h3>
              <p className="text-muted-foreground mb-2">WebCraft Studio</p>
              <p className="text-sm text-muted-foreground">
                Developed and maintained client websites using JavaScript frameworks. Optimized website performance and implemented responsive designs.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
