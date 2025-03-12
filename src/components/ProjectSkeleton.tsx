import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectSkeleton() {
  return (
    <div className="border border-border min-h-[550px] rounded-xl overflow-hidden bg-card/80">
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <div className="flex flex-wrap mb-4">
          <Skeleton className="h-5 w-16 mr-2 mb-2 rounded-full" />
          <Skeleton className="h-5 w-16 mr-2 mb-2 rounded-full" />
          <Skeleton className="h-5 w-16 mb-2 rounded-full" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
