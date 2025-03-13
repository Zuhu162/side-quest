import { motion } from "framer-motion";
import TypingAnimation from "@/components/TypingAnimation";
import { useState } from "react";
import { Briefcase, Calendar } from "lucide-react";
import TechBadge from "@/components/TechBadge";

export default function Experience() {
  const [typingComplete, setTypingComplete] = useState(false);
  const responseText =
    "Ah, experience—the thing everyone wants but no one wants to give you a chance to get. Luckily, I’ve gathered a fair bit! Here’s where I’ve worked and what I’ve done 😀";

  return (
    <div className="container">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="bg-card p-4 rounded-xl text-left">
          <div className="text-sm text-right">
            <span className="text-muted-foreground">
              Tell me about your professional experience
            </span>
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
          className="max-w-3xl mx-auto mt-8 space-y-8">
          <div className="relative border-l border-border pl-6 ml-3">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
              <Briefcase className="w-3 h-3" />
            </div>
            <div className="mb-6">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Jan 2024 - Jul 2024</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Wev Developer</h3>
              <div className="block md:flex gap-2">
                <p className="text-muted-foreground mb-2">
                  Summer Digital Agency
                </p>
                <TechBadge label="Brisbane, Australia" />
              </div>

              <p className="text-sm text-muted-foreground">
                Worked with a team of designers to deploy and create responsive
                and animated UIs for web applications. Utlizing fundamental web
                design concepts with HTML5, CSS3, and JS.
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
                <span>Jan 2023 - Feb 2024</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Software Engineer</h3>
              <div className="block md:flex gap-2">
                <p className="text-muted-foreground">AFUBot</p>
                <TechBadge label="Johor, Malaysia" />
              </div>
              <p className="text-sm text-muted-foreground">
                Built a control panel for a Food devlivery robot using ReactJS
                and NodeJS as well as working in a cross-functional team of
                engineers across multiple disciplines to build a functional
                robot for our university. Additionally also built a website
                using ThreeJS to create a visually stunning landing page with a
                3D model of the robot made with AutoCAD.
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
                <span>Aug 2023 - Feb 2024</span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                Software Engineer Intern
              </h3>
              <div className="block md:flex gap-2">
                <p className="text-muted-foreground mb-2">
                  Ronas Network and Services
                </p>
                <TechBadge label="Cyberjaya, Malaysia" />
              </div>
              <p className="text-sm text-muted-foreground">
                Worked in a dynamic team of developers and designers to launch
                CyberProtekt, a security testing app integrated into the
                company’s main website, which now serves 76+ companies.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
