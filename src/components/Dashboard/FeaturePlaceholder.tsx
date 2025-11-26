import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface FeaturePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export const FeaturePlaceholder = ({ title, description, icon: Icon, features }: FeaturePlaceholderProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">{title}</h1>
        <p className="text-body text-muted-foreground">{description}</p>
      </div>

      <Card className="border-glow-cyan/30">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-glow flex items-center justify-center">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-heading-3">Coming Soon</CardTitle>
              <CardDescription>This feature is under development</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-heading-4 text-foreground mb-4">What you'll get:</h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-glow-cyan/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-glow-cyan text-sm">✓</span>
                  </div>
                  <span className="text-body text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary/30 p-6 rounded-lg text-center">
            <p className="text-body text-muted-foreground mb-4">
              We're working hard to bring you this feature. Stay tuned!
            </p>
            <Button className="bg-glow-cyan text-background hover:bg-glow-cyan/90">
              Notify Me When Ready
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};