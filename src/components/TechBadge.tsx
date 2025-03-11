
import { Badge } from "@/components/ui/badge";

interface TechBadgeProps {
  label: string;
}

export default function TechBadge({ label }: TechBadgeProps) {
  return (
    <Badge variant="secondary" className="text-xs font-medium mr-2 mb-2">
      {label}
    </Badge>
  );
}
