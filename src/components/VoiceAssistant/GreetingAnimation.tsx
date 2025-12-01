import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface GreetingAnimationProps {
  userName: string;
  onComplete?: () => void;
}

export const GreetingAnimation = ({ userName, onComplete }: GreetingAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !greetingRef.current || !nameRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          onComplete?.();
        }, 2000);
      }
    });

    // Initial state
    gsap.set([greetingRef.current, nameRef.current], {
      opacity: 0,
      y: 30,
      scale: 0.9
    });

    // Animation sequence
    tl.to(greetingRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out'
    })
    .to(nameRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=0.6')
    .to([greetingRef.current, nameRef.current], {
      textShadow: '0 0 30px rgba(0, 217, 255, 1), 0 0 60px rgba(0, 217, 255, 0.6)',
      duration: 0.8,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1
    }, '+=0.3');

    return () => {
      tl.kill();
    };
  }, [userName, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center z-50 bg-background overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-glow-cyan/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow-blue/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Floating particles background */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-glow-cyan rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Greeting Text */}
      <div className="relative z-10 text-center px-6">
        <div ref={greetingRef} className="text-heading-1 text-glow-cyan mb-6 glow-text-cyan">
          Welcome to UniCounsel
        </div>
        <div className="text-heading-2 text-foreground">
          <span ref={nameRef} className="text-glow-cyan font-bold glow-text-cyan">
            {userName}
          </span>
        </div>
        <div className="mt-12 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-glow-cyan to-transparent animate-pulse-glow" />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
};