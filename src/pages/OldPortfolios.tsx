import { motion } from "framer-motion";
import TypingAnimation from "@/components/TypingAnimation";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import ProjectSkeleton from "@/components/ProjectSkeleton";

const projectsData = [
  {
    id: 1,
    title: "V2 (2023-2025)",
    description:
      "Made using NextJS, Tailwind, DaisyUI, Framer Motion and a bunch of 3rd party libraries",
    image: "/oldSites/2.JPG",
    technologies: ["NextJS", "DaisyUI", "Framer"],
    backgroundColor: "violet-100",
    live: "https://zuhu162.github.io/portfolio/",
  },
  {
    id: 2,
    title: "V1 (2019-2023)",
    description:
      "My first ever portfolio which landed me my first Software gig. Made using React paired with Material UI and a lot of heart",
    image: "/oldSites/1.JPG",
    backgroundColor: "white",
    technologies: ["ReactJS", "MUI"],
    live: "https://zuhu162.github.io/portfolio/",
  },
];

export default function PortfolioGenerator() {
  const [loading, setLoading] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const responseText =
    "Ah, the prequel. More animations, fewer reasons why. If you’re ready for a slightly flashier but equally questionable experience, here it is:";

  useEffect(() => {
    // Simulate loading after typing is complete
    if (typingComplete) {
      const timer = setTimeout(() => {
        setShowProjects(true);
        setLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [typingComplete]);

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-card p-4 rounded-xl text-right">
          <div className="text-sm">
            <span className="text-muted-foreground">
              What did your portfolio look like before this?
            </span>
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
          className="max-w-3xl mx-auto mt-12 text-center">
          <Sparkles className="h-16 w-16 mx-auto mb-4 text-blue-400" />
          <h2 className="text-2xl font-bold mb-4">Old is Gold</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3].map((i) => (
                <ProjectSkeleton key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectsData.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: project.id * 0.1 }}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    backgroundColor={project.backgroundColor}
                    image={project.image}
                    technologies={project.technologies}
                    live={project.live}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
