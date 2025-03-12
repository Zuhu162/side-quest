
import { motion } from "framer-motion";
import TypingAnimation from "@/components/TypingAnimation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Image } from "lucide-react";

export default function Blogs() {
  const [typingComplete, setTypingComplete] = useState(false);
  const responseText = "Here are some of my thoughts and articles on software development, tech trends, and best practices.";

  const blogs = [
    {
      id: 1,
      title: "Building Performant React Applications",
      excerpt: "Learn how to optimize your React applications for better performance and user experience.",
      date: "May 15, 2023",
      readTime: "6 min read",
      categories: ["React", "Performance"],
      image: "photo-1488590528505-98d2b5aba04b"
    },
    {
      id: 2,
      title: "The Future of AI in Software Development",
      excerpt: "Exploring how AI tools are changing the landscape of software development and what it means for developers.",
      date: "April 3, 2023",
      readTime: "8 min read",
      categories: ["AI", "Technology Trends"],
      image: "photo-1518770660439-4636190af475"
    },
    {
      id: 3,
      title: "TypeScript Best Practices for Large Scale Applications",
      excerpt: "Essential practices to make your TypeScript codebase more maintainable and scalable as your project grows.",
      date: "March 20, 2023",
      readTime: "5 min read",
      categories: ["TypeScript", "Architecture"],
      image: "photo-1461749280684-dccba630e2f6"
    },
  ];

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-card p-4 rounded-xl text-left">
          <div className="text-sm">
            <span className="font-semibold">User: </span>
            <span className="text-muted-foreground">Show me your blog posts</span>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mt-12 space-y-8"
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-border rounded-xl p-6 hover:bg-card/60 transition-colors flex"
            >
              <div className="flex-shrink-0 mr-6 hidden sm:block">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-secondary/50 relative">
                  {blog.image ? (
                    <img 
                      src={`https://images.unsplash.com/${blog.image}?auto=format&fit=crop&w=300&q=80`}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <Image className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-muted-foreground mb-4">{blog.excerpt}</p>
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex space-x-4 text-sm text-muted-foreground mb-2 sm:mb-0">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    {blog.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="mr-2 mb-2">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
