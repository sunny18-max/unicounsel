import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, GraduationCap, DollarSign, Trash2, ExternalLink, AlertCircle } from 'lucide-react';
import type { UniversityMatch } from '@/types';
import { formatCurrency } from '@/lib/formatters';
import { cn, getUniversityImage } from '@/lib/utils';

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<UniversityMatch[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const saved = JSON.parse(localStorage.getItem('savedMatches') || '[]');
    setFavorites(saved);
  };

  const handleRemove = (matchId: string) => {
    const updated = favorites.filter(f => f.id !== matchId);
    setFavorites(updated);
    localStorage.setItem('savedMatches', JSON.stringify(updated));
  };

  const handleApply = (match: UniversityMatch) => {
    // Try to open university website
    const universityWebsite = `https://www.google.com/search?q=${encodeURIComponent(match.universityName + ' official website')}`;
    window.open(universityWebsite, '_blank');
  };

  const getVisaFitColor = (fit: string) => {
    switch (fit) {
      case 'High':
        return 'bg-success/20 text-success border-success/50';
      case 'Medium':
        return 'bg-warning/20 text-warning border-warning/50';
      case 'Low':
        return 'bg-error/20 text-error border-error/50';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/50';
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-heading-2 text-foreground mb-2">My Favorites</h1>
            <p className="text-body text-muted-foreground">
              Your saved universities will appear here
            </p>
          </div>

          <Card className="border-glow-cyan/30">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <AlertCircle className="h-16 w-16 text-glow-cyan mx-auto mb-4" />
                <h3 className="text-heading-3 text-foreground mb-2">No Favorites Yet</h3>
                <p className="text-body text-muted-foreground mb-6">
                  Start saving universities from your matches to keep track of your top choices.
                </p>
                <Button 
                  className="bg-glow-cyan text-background hover:bg-glow-cyan/90"
                  onClick={() => window.location.href = '/onboarding'}
                >
                  View Matches
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-heading-2 text-foreground mb-2">My Favorites</h1>
          <p className="text-body text-muted-foreground">
            {favorites.length} saved {favorites.length === 1 ? 'university' : 'universities'}
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-4">
            {favorites.map((match) => (
              <Card 
                key={match.id} 
                className="border-2 transition-all duration-300 hover:shadow-lg hover:shadow-glow-cyan/20 hover:border-glow-cyan/50 overflow-hidden"
              >
                {/* University Image */}
                <div className="relative h-48 overflow-hidden bg-secondary">
                  <img 
                    src={getUniversityImage(match.universityName)}
                    alt={match.universityName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to a generic university building image
                      e.currentTarget.src = `https://source.unsplash.com/400x300/?university,campus,building`;
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-glow-cyan text-background">
                      {match.matchScore}% Match
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-heading-4 line-clamp-2">
                    {match.universityName}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {match.city}, {match.country}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Program Info */}
                  <div className="flex items-center gap-2 text-body-sm">
                    <GraduationCap className="h-4 w-4 text-glow-blue flex-shrink-0" />
                    <span className="font-medium line-clamp-1">{match.programName}</span>
                  </div>

                  <Separator />

                  {/* Cost */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>Annual Cost</span>
                    </div>
                    <span className="text-body font-semibold text-glow-cyan">
                      {formatCurrency(match.estimatedCost?.total || 0)}
                    </span>
                  </div>

                  {/* Visa Fit */}
                  <div>
                    <Badge className={cn("text-xs", getVisaFitColor(match.visaFit))}>
                      {match.visaFit} Visa Success
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1 bg-glow-cyan text-background hover:bg-glow-cyan/90"
                      size="sm"
                      onClick={() => handleApply(match)}
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Apply
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemove(match.id)}
                      className="border-error text-error hover:bg-error/10"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};