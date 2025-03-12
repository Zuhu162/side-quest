import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TypingAnimation from "@/components/TypingAnimation";
import ProjectCard from "@/components/ProjectCard";
import ProjectSkeleton from "@/components/ProjectSkeleton";

const projectsData = [
  {
    id: 1,
    title: "Gradify",
    description:
      "A web-based platform built with Angular 19 & ASP.NET Core to simplify assignment submission & grading for students and teachers.",
    technologies: ["Angular.JS", "ASP.NET", "Tailwind CSS"],
    image: "/projects/gradify.png",
  },
  {
    id: 2,
    title: "A* RapidKL pathfinder",
    description:
      "A node-edge based animated path visualization system for RapidKL, that uses the A*/Djikstra's algorithm to find the shortest path between two stations",
    technologies: ["TypeScript", "Node.js", "MongoDB"],
    image: "/projects/rapidkl.png",
  },
  {
    id: 3,
    title: "UTM TimeTable",
    description:
      "A collaborative workspace for teams with real-time document editing and project management features.",
    technologies: ["React", "Firebase", "WebSockets"],
    image: "/projects/utmtt.png",
  },
];

export default function Projects() {
  const [loading, setLoading] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const responseText =
    "All right, fetching you some fantastic SE projects... because you deserve the best! 🚀";

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
        <div className="bg-card p-4 rounded-xl text-left">
          <div className="text-sm">
            <span className="font-semibold">User: </span>
            <span className="text-muted-foreground">
              Show me a list of Software Engineering projects that can be done
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
        <div className="max-w-3xl mx-auto mt-12">
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
                    technologies={project.technologies}
                    image={project.image}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
