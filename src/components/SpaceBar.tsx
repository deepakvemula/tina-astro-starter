import { useState, useEffect } from "react";

interface SpaceBarProps {
  className?: string;
  messages: string[];
}

export default function SpaceBar({ className, messages }: SpaceBarProps) {
  const getRandomMessage = () =>
    messages[Math.floor(Math.random() * messages.length)];
  const [message, setMessage] = useState(getRandomMessage());

  useEffect(() => {
    const handleSpacebar = (e: {
      code: string;
      preventDefault: () => void;
    }) => {
      if (e.code === "Space") {
        e.preventDefault();
        setMessage(getRandomMessage());
      }
    };
    window.addEventListener("keydown", handleSpacebar);
    return () => window.removeEventListener("keydown", handleSpacebar);
  }, [messages]);

  return (
    <button
      id="space-pop-culture"
      className={`flex w-full cursor-pointer text-left sm:text-balance ${className}`}
      title="Click Me!"
      onClick={() => setMessage(getRandomMessage())}
    >
      📻 Space Bar: {message}
    </button>
  );
}
