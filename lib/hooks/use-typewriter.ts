"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
}

export function useTypewriter({
  words,
  typeSpeed = 80,
  deleteSpeed = 50,
  pauseDuration = 2000,
  loop = true,
}: UseTypewriterOptions): {
  text: string;
  isTyping: boolean;
  isDeleting: boolean;
  wordIndex: number;
} {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      setText(currentWord.substring(0, charIndex - 1));
      setCharIndex((prev) => prev - 1);
    } else {
      setText(currentWord.substring(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);
    }
  }, [wordIndex, charIndex, isDeleting, words]);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting && charIndex === currentWord.length) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      const nextIndex = (wordIndex + 1) % words.length;
      if (nextIndex === 0 && !loop) return;
      setWordIndex(nextIndex);
      return;
    }

    const timeout = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseDuration, loop, tick]);

  return { text, isTyping: !isDeleting, isDeleting, wordIndex };
}
