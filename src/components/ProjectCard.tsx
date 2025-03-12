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
    <div className="project-card overflow-hidden rounded-lg border border-border bg-card">
      <div className="h-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1">
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
