
import { Code, ExternalLink } from "lucide-react";
import TechBadge from "./TechBadge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  image,
}: ProjectCardProps) {
  return (
    <div className="project-card overflow-hidden">
      <div className="h-48 relative">
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/30">
          <Code className="h-16 w-16 text-secondary-foreground/50" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm">{description}</p>
        <div className="flex flex-wrap mb-4">
          {technologies.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Code className="h-4 w-4" />
            Code
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
