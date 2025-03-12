import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TypingAnimation from "@/components/TypingAnimation";
import ProjectCard from "@/components/ProjectCard";
import ProjectSkeleton from "@/components/ProjectSkeleton";
import gradify from "/projects/gradify.png";
import rapidkl from "/projects/rapidkl.png";
import utmtt from "/projects/utmtt.png";
import epic from "/projects/epic.png";

const projectsData = [
  {
    id: 1,
    title: "Gradify 📝",
    description:
      "A web-based platform built with Angular 19 & ASP.NET Core to simplify assignment submission & grading.",
    technologies: ["AngularJS", "ASP.NET", "Tailwind CSS", "TypeScript", "C#"],
    image: gradify,
    backgroundColor: "bg-indigo-100",
    code: "https://github.com/Zuhu162/Gradify",
  },
  {
    id: 2,
    title: "A* RapidKL pathfinder 🚄",
    description:
      "A node-edge based animated path visualization system for RapidKL, that uses the A*/Djikstra's algorithm to find the shortest path between two stations",
    technologies: ["ReactJS", "TypeScript", "Pathfinding Algorithms"],
    image: rapidkl,
    backgroundColor: "bg-white",
    code: "https://github.com/Zuhu162/AStar-MRT-PathFinder",
    live: "https://zuhu162.github.io/AStar-MRT-PathFinder/",
  },
  {
    id: 3,
    title: "UTM TimeTable Gen 💡",
    description:
      "Faculty of Computing - Lecturer and Student Course and Timetable System using FK UTM's API",
    technologies: ["NextJS", "Tailwind CSS"],
    image: rapidkl,
    backgroundColor: "bg-white",
    code: "https://github.com/Zuhu162/UTMFC-Timetable",
    live: "https://utmfc-timetable.vercel.app/",
  },
  {
    id: 4,
    title: "Epic Games Clone 🎮",
    description: "Faithful clone of the Epic Games Store UI",
    technologies: ["ReactJS", "Material-UI"],
    image: epic,
    backgroundColor: "bg-stone-950",
    code: "https://github.com/Zuhu162/epicgames-clone",
    live: "https://vigorous-montalcini-7eef92.netlify.app/",
  },
];

export default function Projects() {
  const [loading, setLoading] = useState(true);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const responseText =
    "Loading projects... compiling... debugging... oh wait, no errors? Must be a portfolio miracle! Here’s the best of what I’ve built so far.... because you deserve the best! 🚀";

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
          <div className="text-sm ">
            <span className="text-muted-foreground">
              Show me a list of Software Engineering projects that you've done
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
              {[1, 2, 3, 4].map((i) => (
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
                    backgroundColor={project.backgroundColor}
                    image={project.image}
                    code={project.code}
                    live={project.live}
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
