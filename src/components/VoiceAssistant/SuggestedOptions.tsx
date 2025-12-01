import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface SuggestedOptionsProps {
  suggestions: string[];
  onSelect: (option: string) => void;
  selectedValue?: string;
}

export const SuggestedOptions = ({ suggestions, onSelect, selectedValue }: SuggestedOptionsProps) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-body-sm text-muted-foreground mb-3 text-center">Suggested options:</p>
      <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
        {suggestions.map((option, index) => (
          <Button
            key={index}
            variant={selectedValue === option ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(option)}
            className={cn(
              "backdrop-blur-sm transition-all duration-300 hover:scale-105",
              selectedValue === option && "bg-glow-cyan text-background hover:bg-glow-cyan/90 glow-cyan"
            )}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};