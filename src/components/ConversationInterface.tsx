import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

interface ConversationProps {
  children: React.ReactNode;
}

const searchSuggestions = [
  {
    label: "Show me your projects",
    path: "/projects",
  },
  {
    label: "Tell me about yourself",
    path: "/about",
  },
  {
    label: "Show me your experience",
    path: "/experience",
  },
  {
    label: "What technologies do you use?",
    path: "/about",
  },
];

export default function ConversationInterface({ children }: ConversationProps) {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSuggestionClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Conversation area */}
      <div className="flex-1 overflow-y-auto py-8 px-4 sm:px-6">{children}</div>

      {/* Fixed chat input at bottom */}
      <div className="sticky bottom-0 left-0 right-0 p-4 flex justify-center bg-gradient-to-t from-background via-background/95 to-transparent pb-6">
        <div className="w-full max-w-3xl">
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative w-full bg-background border border-border rounded-lg shadow-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="w-full h-12 rounded-md border-0 bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-0"
              align="center">
              <div className="py-2">
                {searchSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left px-3 py-2 text-sm"
                    onClick={() => handleSuggestionClick(suggestion.path)}>
                    {suggestion.label}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
