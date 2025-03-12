import { motion } from "framer-motion";
import TypingAnimation from "@/components/TypingAnimation";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Image, ExternalLink } from "lucide-react";

export default function Blogs() {
  const [typingComplete, setTypingComplete] = useState(false);
  const [articles, setArticles] = useState([]);
  const responseText =
    "Oh yes! Occasionally, I unleash my thoughts onto the internet in structured paragraphs instead of just Stack Overflow searches. Here are my latest posts!";

  useEffect(() => {
    // Fetch articles from Medium RSS feed
    fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@zuhayersiddique162"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setArticles(data.items);
        }
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
      });
  }, []);

  // Helper function to extract thumbnail from content
  const extractThumbnail = (content) => {
    const imgTagRegex = /<img.*?src="(.*?)"/;
    const match = content.match(imgTagRegex);
    return match ? match[1] : "";
  };

  // Helper function to extract excerpt from content
  const extractExcerpt = (content) => {
    // Remove HTML tags and get first 150 characters
    const textContent = content.replace(/<[^>]+>/g, "");
    return textContent.substring(0, 150) + "...";
  };

  // Calculate read time (approximate)
  const calculateReadTime = (content) => {
    const textContent = content.replace(/<[^>]+>/g, "");
    const wordCount = textContent.split(/\s+/).length;
    const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200)); // Assuming 200 words per minute
    return `${readingTimeMinutes} min read`;
  };

  // Format date in a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US");
  };

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-card p-4 rounded-xl text-right">
          <div className="text-sm">
            <span className="text-muted-foreground">Got any blogs?</span>
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
          className="max-w-3xl mx-auto mt-12 space-y-8">
          {articles.map((article, index) => {
            const thumbnail = extractThumbnail(article.content);
            const excerpt = extractExcerpt(article.content);
            const readTime = calculateReadTime(article.content);
            const formattedDate = formatDate(article.pubDate);

            // Extract categories
            const categories = article.categories || ["Medium", "Blog"];

            return (
              <motion.a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-border rounded-xl p-6 hover:bg-card/60 transition-colors flex block">
                <div className="flex-shrink-0 mr-6 hidden sm:block">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-secondary/50 relative">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={article.title}
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
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <ExternalLink className="w-4 h-4 ml-2 text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-muted-foreground mb-4">{excerpt}</p>
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex space-x-4 text-sm text-muted-foreground mb-2 sm:mb-0">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{readTime}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap">
                      {categories.map((category) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="mr-2 mb-2 mt-5">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}

          {articles.length === 0 && typingComplete && (
            <div className="text-center p-8 border border-border rounded-xl">
              <p className="text-muted-foreground">
                Error fetching articles 😢
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
