import { motion } from "framer-motion";
import TypingAnimation from "@/components/TypingAnimation";
import { useState } from "react";
import TechBadge from "@/components/TechBadge";
import UTMlogo from "/utm-logo.png";

export default function About() {
  const [typingComplete, setTypingComplete] = useState(false);
  const responseText =
    "Ah, an existential question! But let's keep it simple—I’m Zuhayer, a developer, problem solver, and occasional meme enthusiast. Here’s a bit about me...";

  const skillsData = [
    { name: "JavaScript (ES6)", color: "bg-yellow-500" },
    { name: "TypeScript", color: "bg-blue-500" },
    { name: "Java", color: "bg-yellow-600" },
    { name: "C#", color: "bg-purple-700" },
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
  ];

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <div className="user-bubble">
          <div className="text-sm text-right">
            <span className="text-muted-foreground">Who are you?</span>
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
          className="max-w-3xl mx-auto mt-12 space-y-6 text-left">
          <h2 className="text-2xl font-bold">Professional Background</h2>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 my-4">
            <a href="https://www.utm.my/" target="#blank">
              <div className="w-24 h-24 object-contain rounded-lg hover:-translate-y-2 duration-150 ease-in-out">
                <img
                  src={UTMlogo}
                  alt="UTM Logo"
                  className="w-24 h-24 object-contain rounded-lg"
                />
              </div>
            </a>
            <div>
              <p className="text-muted-foreground mb-2">
                I'm a final-year student at Universiti Teknologi Malaysia (UTM),
                currently surviving on coffee, deadlines, and the occasional
                burst of productivity.
              </p>
              <p className="text-muted-foreground mb-2">
                I build things for the web and mobile—sometimes they even work
                on the first try. My interests include full-stack development,
                debugging my own mistakes, and pretending to understand
                documentation on the first read. When I’m not coding, I’m
                probably:
              </p>
              <div className="text-muted-foreground">
                <li>ChatGPTing or Googling “why is my code not working”</li>
                <li>
                  ChatGPTing or Googling “why is my code working” (which is
                  scarier)
                </li>
                <li>
                  Working on side projects that I promise to finish someday
                </li>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-6">Tool Set</h2>
          <div className="flex flex-wrap">
            {skillsData.map((skill, index) => (
              <span
                key={index}
                className={`skill-badge ${skill.color} text-white`}>
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
