import { cn } from '@/lib/utils';

interface VoiceOrbProps {
  isActive: boolean;
  isListening: boolean;
  className?: string;
}

export const VoiceOrb = ({ isActive, isListening, className }: VoiceOrbProps) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Outer glow rings */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-1000",
          isActive && "glow-cyan animate-pulse-glow"
        )}
        style={{
          background: 'radial-gradient(circle, rgba(0,217,255,0.2) 0%, transparent 70%)',
        }}
      />
      
      {/* Middle ring */}
      <div 
        className={cn(
          "absolute rounded-full transition-all duration-700",
          isListening ? "w-[280px] h-[280px]" : "w-[240px] h-[240px]"
        )}
        style={{
          background: 'radial-gradient(circle, rgba(0,217,255,0.15) 0%, transparent 60%)',
        }}
      />

      {/* Animated rotating ring */}
      <div 
        className={cn(
          "absolute rounded-full border-2 transition-all duration-500",
          isListening ? "w-[220px] h-[220px] border-glow-cyan" : "w-[200px] h-[200px] border-glow-blue/50",
          isActive && "animate-spin-slow"
        )}
        style={{
          borderStyle: 'dashed',
          borderSpacing: '10px',
        }}
      />

      {/* Inner orb */}
      <div 
        className={cn(
          "relative rounded-full transition-all duration-300",
          isListening ? "w-[180px] h-[180px]" : "w-[160px] h-[160px]",
          isActive ? "bg-gradient-to-br from-glow-cyan via-glow-blue to-glow-teal" : "bg-gradient-to-br from-glow-blue/50 to-glow-teal/50"
        )}
        style={{
          boxShadow: isActive 
            ? '0 0 40px rgba(0,217,255,0.6), 0 0 80px rgba(0,217,255,0.4), inset 0 0 40px rgba(0,217,255,0.3)'
            : '0 0 20px rgba(14,165,233,0.4), inset 0 0 20px rgba(14,165,233,0.2)'
        }}
      >
        {/* Animated wave lines */}
        {isListening && (
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 rounded-full border border-white/20"
                style={{
                  animation: `wave ${2 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Center pulse */}
        <div 
          className={cn(
            "absolute inset-[20%] rounded-full bg-white/30 backdrop-blur-sm transition-all duration-300",
            isListening && "animate-pulse-glow"
          )}
        />
      </div>

      <style>{`
        @keyframes wave {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};