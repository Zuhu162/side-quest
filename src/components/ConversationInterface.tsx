
import { useState, useEffect } from "react";
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
      response: "Outside of coding, I enjoy digital photography, playing video games (especially indie titles), reading sci-fi novels, and occasionally attempting to cook dishes that look way easier in YouTube tutorials than they actually are."
    },
    {
      label: "What TV shows do you like?",
      response: "I'm a big fan of shows like Black Mirror, Mr. Robot, Breaking Bad, and Succession. I also enjoy anime series like Attack on Titan and Death Note. When I need something lighter, I'll rewatch The Office or Parks and Recreation."
    },
    {
      label: "What games do you play?",
      response: "I enjoy a mix of games, from indie titles like Hollow Knight and Hades to bigger titles like The Witcher 3 and Elden Ring. I also play competitive games like Valorant and League of Legends, though my skill level varies widely depending on the day!"
    },
  ],
  "/projects": [
    {
      label: "Which project was the most challenging?",
      response: "Gradify was definitely the most challenging project I've worked on. Building a platform that needed to handle file uploads, user authentication, real-time updates, and complex grading algorithms pushed me to learn ASP.NET Core and Angular 19 simultaneously. The most difficult part was implementing the real-time notification system when assignments were graded."
    },
    {
      label: "What technologies do you enjoy working with the most?",
      response: "I particularly enjoy working with React and TypeScript as my frontend stack, paired with Node.js and Express on the backend. I find that TypeScript's type safety saves me countless hours of debugging, while React's component-based architecture helps me build maintainable UIs. For databases, I've been gravitating toward PostgreSQL for structured data and MongoDB for more flexible document storage."
    },
    {
      label: "Are you working on any new projects currently?",
      response: "Yes! I'm currently working on a personal finance tracking app using Next.js, Prisma, and PostgreSQL. It features expense categorization with AI, recurring transaction tracking, and goal setting with visual progress indicators. I'm also experimenting with Tailwind CSS animations to make the data visualizations more engaging."
    },
  ],
  "/experience": [
    {
      label: "What was your favorite role so far?",
      response: "My favorite role so far has been working as a Software Engineer at XYZ Company, where I could directly see the impact of my work on users. Being able to implement features that thousands of people used daily was incredibly rewarding, and the mentorship I received helped me grow significantly as a developer."
    },
    {
      label: "What's the most important skill you've learned?",
      response: "Beyond technical skills, I'd say the most important skill I've developed is effective communication. Being able to explain complex technical concepts to non-technical stakeholders, negotiate requirements, and collaborate with team members from different backgrounds has been invaluable. No matter how good your code is, if you can't communicate about it effectively, its impact will be limited."
    },
    {
      label: "Do you prefer remote or in-office work?",
      response: "I value a hybrid approach. Remote work gives me focused time for deep work and coding tasks that require concentration, while in-office days are great for collaboration, brainstorming, and building relationships with teammates. I find that this balance helps me maximize productivity while still maintaining strong connections with my team."
    },
  ],
  "/blogs": [
    {
      label: "What topics do you write about?",
      response: "I mostly write about web development topics like React best practices, TypeScript tips, and performance optimization techniques. I also occasionally share my experiences with new technologies I'm exploring or lessons learned from challenging projects. I try to write the kind of articles I would have wanted to read when I was learning these technologies."
    },
    {
      label: "How often do you publish new content?",
      response: "I aim to publish a new article every 2-3 weeks. Quality is more important to me than quantity, so I prefer to take my time to create comprehensive, well-researched content rather than rushing to meet a strict schedule. Sometimes when I'm especially busy with projects, the publishing cadence might slow down a bit."
    },
    {
      label: "Do you accept guest posts or collaborations?",
      response: "Absolutely! I'm always open to collaborations with other developers and writers. Guest posts that align with the technical focus of my blog are welcome, and I'm also interested in co-authoring pieces that combine different perspectives or expertise. Feel free to reach out if you have an idea for collaboration!"
    },
  ],
  "/old-portfolios": [
    {
      label: "How has your design philosophy changed over time?",
      response: "My design philosophy has evolved from focusing primarily on flashy animations and effects to prioritizing user experience, accessibility, and performance. I've learned that while visual appeal is important, it shouldn't come at the expense of usability. My earlier portfolios were more about showing off technical skills, while my current approach aims to balance aesthetics with practical functionality."
    },
    {
      label: "What technologies did you use in your first portfolio?",
      response: "My very first portfolio was built with vanilla HTML, CSS, and jQuery back in 2019. It featured a single-page design with smooth scrolling sections and some basic animations. Looking back, it was quite simple but served its purpose at the time. Each iteration since then has incorporated more modern technologies and approaches."
    },
    {
      label: "Which version was your favorite?",
      response: "Version 2 (2023-2025) was probably my favorite because it struck a good balance between visual appeal and functionality. It was built with NextJS and utilized more advanced animations with Framer Motion, but still maintained good performance metrics. It was also the first portfolio where I really focused on responsive design principles from the beginning rather than as an afterthought."
    },
  ]
};

export default function ConversationInterface({ children, currentPath }: ConversationProps) {
  const [searchValue, setSearchValue] = useState("");
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>(pageQuestions["/"] || []);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [conversation, setConversation] = useState<{question: string, answer: string}[]>([]);
  const navigate = useNavigate();

  // Update questions when path changes
  useEffect(() => {
    const pathQuestions = pageQuestions[currentPath as keyof typeof pageQuestions] || pageQuestions["/"];
    setCurrentQuestions(pathQuestions.filter(q => !askedQuestions.includes(q.label)));
    // Reset states when changing pages
    setSelectedQuestion(null);
    setSelectedResponse(null);
    setIsTyping(false);
    setAskedQuestions([]);
    setConversation([]);
  }, [currentPath]);

  const handleSuggestionClick = (item: Question) => {
    setSearchValue("");
    
    if ('path' in item) {
      navigate(item.path);
    } else {
      // Add question to asked questions list
      setAskedQuestions(prev => [...prev, item.label]);
      
      // Remove this question from available questions
      setCurrentQuestions(currentQuestions.filter(q => q.label !== item.label));
      
      // Set this as the current question/response
      setSelectedQuestion(item.label);
      setIsTyping(true);
      setSelectedResponse(item.response);
      
      // Add to conversation
      setConversation(prev => [...prev, {
        question: item.label,
        answer: item.response
      }]);
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
