import { useState, useEffect, useRef } from 'react';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = (text: string) => {
    if (!isSupported || !text) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.rate = 0.9;
    utteranceRef.current.pitch = 1;
    utteranceRef.current.volume = 1;

    utteranceRef.current.onstart = () => {
      setIsSpeaking(true);
    };

    utteranceRef.current.onend = () => {
      setIsSpeaking(false);
    };

    utteranceRef.current.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utteranceRef.current);
  };

  const cancel = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return {
    speak,
    isSpeaking,
    isSupported,
    cancel
  };
};