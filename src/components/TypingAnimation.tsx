
import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  typingSpeed?: number;
  onComplete?: () => void;
  className?: string;
}

export default function TypingAnimation({
  text,
  typingSpeed = 30,
  onComplete,
  className = "",
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete && onComplete();
    }
  }, [currentIndex, text, typingSpeed, onComplete, isComplete]);

  return (
    <div className={`flex items-center ${className}`}>
      <span className="typing-text">{displayedText}</span>
      {currentIndex < text.length && <span className="typing-cursor"></span>}
    </div>
  );
}
