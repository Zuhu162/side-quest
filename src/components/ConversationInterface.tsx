import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import TypingAnimation from "./TypingAnimation";

interface ConversationProps {
  children: React.ReactNode;
  currentPath: string;
}

// Define question types
interface NavigationQuestion {
  label: string;
  path: string;
}

interface ResponseQuestion {
  label: string;
  response: string;
}

type Question = NavigationQuestion | ResponseQuestion;

// Define page-specific questions
const pageQuestions: Record<string, Question[]> = {
  "/": [
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
      label: "Do you write blogs?",
      path: "/blogs",
    },
  ],
  "/about": [
    {
      label: "What are your hobbies?",
      response:
        "Outside of coding, I enjoyed doing digital art in the past, playing video games (R6S, Valorant), and occasionally picking up a book or two.",
    },
    {
      label: "What TV shows do you like?",
      response:
        "In a constant rewatch loop of The Office, Arrested Development, Modern Family, Friends, and Parks and Recreation. They usually just play in the background on another monior while I do something else. But I also enjoy watching the new shows that are coming out at this time - Severance and Invincible",
    },
    {
      label: "What games do you play?",
      response:
        "I enjoy a mix of games, from indie titles like Stardew Valley to bigger titles like The Witcher 3 and Skyrim. The Nintendo Pokemon games were my entire childhood. I also play competitive games like Valorant and Rainbow Six Siege, though my skill level varies widely depending on the day 😂",
    },
  ],
  "/projects": [
    {
      label: "What is your process for planning out projects?",
      response:
        "I start by drafting ideas for the UI because I believe use-cases are best identified when you have a clear vision of the user flow. But the best part is when I feel like Michael Scott starting a sentence: Sometimes, you just have to start a project without knowing where it's going, hoping you'll figure it out along the way.",
    },
    {
      label: "What are you currently working on?",
      response:
        "Right now, I’m working on my Final Year Project - UTM ExamGuard, a project aimed at securing online exams for students at the University of Technology Malaysia (UTM). It’s an AI-powered platform designed to prevent cheating and ensure exam integrity. My focus is on integrating real-time monitoring tools, like AI-based proctoring, to ensure that exams run smoothly while also maintaining fairness. It's a challenging project but an exciting one.",
    },
  ],
  "/experience": [
    {
      label: "What's the most important skill you've learned?",
      response:
        "Beyond technical skills, I'd say the most important skill I've developed is effective communication. Being able to explain complex technical concepts to non-technical stakeholders, negotiate requirements, and collaborate with team members from different backgrounds has been invaluable. No matter how good your code is, if you can't communicate about it effectively, its impact will be limited.",
    },
    {
      label: "Do you prefer remote or in-office work?",
      response:
        "I value a hybrid approach. Remote work gives me focused time for deep work and coding tasks that require concentration, while in-office days are great for collaboration, brainstorming, and building relationships with teammates. I find that this balance helps me maximize productivity while still maintaining strong connections with my team.",
    },
  ],
  "/blogs": [
    {
      label: "What topics do you write about?",
      response:
        "There's no specific topic honestly. I write whenever I feel like it—usually about whatever’s on my mind at the time. Usually something related to a project that I'd like to share or ideas get's me started. Sometimes I get really inspired, and other times my drafts just sit there, patiently waiting to be finished. It’s all about the mood, really. If I’m in the zone, I’ll write. If not, I’ll just stare at a blank page and pretend to be deep in thought.",
    },
  ],
  "/old-portfolios": [],
};

export default function ConversationInterface({
  children,
  currentPath,
}: ConversationProps) {
  const [searchValue, setSearchValue] = useState("");
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>(
    pageQuestions["/"] || []
  );
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [conversation, setConversation] = useState<
    { question: string; answer: string }[]
  >([]);
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Update questions when path changes
  useEffect(() => {
    const pathQuestions =
      pageQuestions[currentPath as keyof typeof pageQuestions] ||
      pageQuestions["/"];
    setCurrentQuestions(
      pathQuestions.filter((q) => !askedQuestions.includes(q.label))
    );
    // Reset states when changing pages
    setSelectedQuestion(null);
    setSelectedResponse(null);
    setIsTyping(false);
    setAskedQuestions([]);
    setConversation([]);
  }, [currentPath]);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation, isTyping]); // Scroll when conversation changes or typing status changes

  const handleSuggestionClick = (item: Question) => {
    setSearchValue("");

    if ("path" in item) {
      navigate(item.path);
    } else {
      // Add question to asked questions list
      setAskedQuestions((prev) => [...prev, item.label]);

      // Remove this question from available questions
      setCurrentQuestions(
        currentQuestions.filter((q) => q.label !== item.label)
      );

      // Set this as the current question/response
      setSelectedQuestion(item.label);
      setIsTyping(true);
      setSelectedResponse(item.response);

      // Add to conversation
      setConversation((prev) => [
        ...prev,
        {
          question: item.label,
          answer: item.response,
        },
      ]);
    }
  };

  const handleTypingComplete = () => {
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Conversation area */}
      <div className="flex-1 overflow-y-auto py-8 px-4 sm:px-6">
        {children}

        {/* Display conversation history */}
        {conversation.map((item, index) => (
          <div key={index} className="max-w-3xl mx-auto mt-8">
            <div className="bg-card p-4 rounded-xl text-right">
              <div className="text-sm">
                <span className="text-muted-foreground">{item.question}</span>
              </div>
            </div>

            <div className="bg-secondary/30 p-4 rounded-xl text-left mt-4">
              {index === conversation.length - 1 && isTyping ? (
                <TypingAnimation
                  text={item.answer}
                  onComplete={handleTypingComplete}
                />
              ) : (
                <div>{item.answer}</div>
              )}
            </div>
          </div>
        ))}
        {/* Invisible element to scroll to */}
        <div ref={conversationEndRef} />
      </div>

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
                {currentQuestions.length > 0 ? (
                  currentQuestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left px-3 py-2 text-sm"
                      onClick={() => handleSuggestionClick(suggestion)}>
                      {suggestion.label}
                    </Button>
                  ))
                ) : (
                  <div className="text-center py-2 text-sm text-muted-foreground">
                    No more questions available. Try another page!
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
