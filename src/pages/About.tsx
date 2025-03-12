
import { motion } from "framer-motion";
import TypingAnimation from "@/components/TypingAnimation";
import { useState } from "react";
import TechBadge from "@/components/TechBadge";

export default function About() {
  const [typingComplete, setTypingComplete] = useState(false);
  const responseText = "Hello! I'm Zuhayer, a software engineer passionate about building exceptional web applications and exploring new technologies.";

  const skillsData = [
    { name: "JavaScript (ES6)", color: "bg-yellow-500" },
    { name: "TypeScript", color: "bg-blue-500" },
    { name: "HTML5", color: "bg-orange-500" },
    { name: "CSS3", color: "bg-blue-400" },
    { name: "Node.js", color: "bg-green-600" },
    { name: "Express.js", color: "bg-gray-600" },
    { name: "React.js", color: "bg-blue-600" },
    { name: "Next.js", color: "bg-black" },
    { name: "React Native", color: "bg-purple-500" },
    { name: "Redux Toolkit", color: "bg-purple-600" },
    { name: "PostgreSQL", color: "bg-blue-700" },
    { name: "MongoDB", color: "bg-green-700" },
    { name: "Git", color: "bg-orange-600" },
    { name: "C#", color: "bg-purple-700" },
  ];

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <div className="user-bubble">
          <div className="text-sm">
            <span className="font-semibold">User: </span>
            <span className="text-muted-foreground">Tell me about yourself</span>
          </div>
        </div>
        
        <div className="ai-bubble mt-4">
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
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 my-4">
            <img 
              src="/utm-logo.png" 
              alt="UTM Logo" 
              className="w-24 h-24 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/150?text=UTM";
              }}
            />
            <div>
              <p className="text-muted-foreground mb-2">
                I'm a final year software engineering student from UTM
              </p>
              <p className="text-muted-foreground">
                I'm a skilled software engineer with expertise in frontend and backend development.
                I specialize in building responsive web applications using modern JavaScript frameworks.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mt-6">Skills</h2>
          <div className="flex flex-wrap">
            {skillsData.map((skill, index) => (
              <span 
                key={index} 
                className={`skill-badge ${skill.color} text-white`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
