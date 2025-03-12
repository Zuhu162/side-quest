import { useState } from "react";
import { Code, ExternalLink } from "lucide-react";
import TechBadge from "./TechBadge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies?: string[];
  image: string;
  backgroundColor: string;
  code?: string;
  live?: string;
}

// // Placeholder GIFs for demos
// const getPlaceholderGif = (id: number) => {
//   const placeholders = [
//     "1488590528505-98d2b5aba04b",
//     "1461749280684-dccba630e2f6",
//     "1487058792275-0ad4aaf24ca7",
//     "1498050108023-c5249f4df085"
//   ];

//   // Use modulo to cycle through the placeholders
//   const index = id % placeholders.length;
//   return `https://images.unsplash.com/photo-${placeholders[index]}?auto=format&fit=crop&w=800&h=450`;
// };

export default function ProjectCard({
  title,
  description,
  technologies,
  image,
  backgroundColor,
  code,
  live,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const projectId = title.charCodeAt(0) + title.charCodeAt(title.length - 1);
  // const gifUrl = getPlaceholderGif(projectId);

  return (
    <div
      className="project-card overflow-hidden rounded-lg border border-border bg-card min-h-[550px]  flex flex-col transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="h-64 relative overflow-hidden">
        <div className={`${backgroundColor}  absolute h-64 inset-0`}>
          <img
            // src={isHovered ? gifUrl : image}
            src={image}
            alt={title}
            className="w-full h-full object-contain transition-opacity duration-300"
          />
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm line-clamp-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {technologies?.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
        <div className="mt-auto flex space-x-2">
          {code && (
            <a target="_blank" href={code}>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                Code
              </Button>
            </a>
          )}
          {live && (
            <a target="_blank" href={live}>
              <Button size="sm" className="flex items-center gap-1">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
