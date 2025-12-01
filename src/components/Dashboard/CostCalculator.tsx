import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useMatches } from '@/context/MatchContext';
import { Home, Utensils, Bus, Heart, ShoppingBag, Wifi, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

interface CostBreakdown {
  rent: number;
  food: number;
  transport: number;
  utilities: number;
  insurance: number;
  entertainment: number;
  miscellaneous: number;
  total: number;
}

const cityLivingCosts: Record<string, { rent: number; food: number; transport: number; utilities: number }> = {
  'Cambridge': { rent: 1200, food: 400, transport: 100, utilities: 150 },
  'Toronto': { rent: 1400, food: 450, transport: 120, utilities: 140 },
  'Munich': { rent: 900, food: 350, transport: 80, utilities: 200 },
  'Berlin': { rent: 800, food: 300, transport: 80, utilities: 180 },
  'London': { rent: 1500, food: 450, transport: 150, utilities: 160 },
  'Manchester': { rent: 900, food: 350, transport: 100, utilities: 140 },
  'Sydney': { rent: 1600, food: 500, transport: 130, utilities: 180 },
  'Melbourne': { rent: 1400, food: 450, transport: 120, utilities: 170 },
  'Vancouver': { rent: 1500, food: 450, transport: 110, utilities: 150 },
  'Montreal': { rent: 1000, food: 400, transport: 90, utilities: 130 },
  'Paris': { rent: 1300, food: 400, transport: 75, utilities: 170 },
  'Dublin': { rent: 1400, food: 450, transport: 120, utilities: 160 },
};

const accommodationTypes = {
  'student-housing': { multiplier: 1, label: 'Student Housing' },
  'shared-apartment': { multiplier: 0.7, label: 'Shared Apartment' },
  'private-apartment': { multiplier: 1.3, label: 'Private Apartment' },
  'homestay': { multiplier: 0.9, label: 'Homestay' },
};

const foodPreferences = {
  'cook-home': { multiplier: 0.7, label: 'Cook at Home' },
  'mixed': { multiplier: 1, label: 'Mixed (Home + Eating Out)' },
  'eat-out': { multiplier: 1.5, label: 'Mostly Eating Out' },
};

export const CostCalculator = () => {
  const { matches } = useMatches();
  
  const cities = useMemo(() => {
    if (matches.length > 0) {
      return [...new Set(matches.map(m => m.city))].filter(city => cityLivingCosts[city]);
    }
    return Object.keys(cityLivingCosts);
  }, [matches]);

  const [selectedCity, setSelectedCity] = useState(cities[0] || 'Cambridge');
  const [accommodation, setAccommodation] = useState<keyof typeof accommodationTypes>('student-housing');
  const [foodPref, setFoodPref] = useState<keyof typeof foodPreferences>('mixed');
  const [insurance, setInsurance] = useState('100');
  const [entertainment, setEntertainment] = useState('200');

  const calculateCosts = (): CostBreakdown => {
    const baseCosts = cityLivingCosts[selectedCity] || cityLivingCosts['Cambridge'];
    
    const rent = Math.round(baseCosts.rent * accommodationTypes[accommodation].multiplier);
    const food = Math.round(baseCosts.food * foodPreferences[foodPref].multiplier);
    const transport = baseCosts.transport;
    const utilities = baseCosts.utilities;
    const insuranceAmount = parseInt(insurance) || 100;
    const entertainmentAmount = parseInt(entertainment) || 200;
    const miscellaneous = Math.round((rent + food) * 0.1); // 10% of rent + food

    const total = rent + food + transport + utilities + insuranceAmount + entertainmentAmount + miscellaneous;

    return {
      rent,
      food,
      transport,
      utilities,
      insurance: insuranceAmount,
      entertainment: entertainmentAmount,
      miscellaneous,
      total
    };
  };

  const costs = calculateCosts();
  const sixMonthTotal = costs.total * 6;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">Cost Calculator & Budget Planner</h1>
        <p className="text-body text-muted-foreground">
          Calculate your monthly expenses and create a comprehensive financial plan
        </p>
      </div>

      {matches.length === 0 && (
        <Card className="border-glow-cyan/30 bg-glow-cyan/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-glow-cyan mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-body font-semibold text-foreground mb-1">Using Sample Cities</h3>
                <p className="text-body-sm text-muted-foreground">
                  Complete the assessment to calculate costs for your matched universities' cities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Your Preferences</CardTitle>
            <CardDescription>Customize your living situation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>City</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Accommodation Type</Label>
              <Select value={accommodation} onValueChange={(v) => setAccommodation(v as keyof typeof accommodationTypes)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(accommodationTypes).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Food Preference</Label>
              <Select value={foodPref} onValueChange={(v) => setFoodPref(v as keyof typeof foodPreferences)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(foodPreferences).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Monthly Insurance ($)</Label>
              <Input 
                type="number" 
                value={insurance} 
                onChange={(e) => setInsurance(e.target.value)}
                placeholder="100"
              />
            </div>

            <div className="space-y-2">
              <Label>Monthly Entertainment ($)</Label>
              <Input 
                type="number" 
                value={entertainment} 
                onChange={(e) => setEntertainment(e.target.value)}
                placeholder="200"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
            <CardDescription>Monthly expenses in {selectedCity}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monthly">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="six-month">6-Month Plan</TabsTrigger>
              </TabsList>

              <TabsContent value="monthly" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-glow-blue/10 flex items-center justify-center">
                        <Home className="h-5 w-5 text-glow-blue" />
                      </div>
                      <div>
                        <p className="text-body-sm text-muted-foreground">Rent</p>
                        <p className="text-heading-4 text-foreground">${costs.rent}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {accommodationTypes[accommodation].label}
                    </Badge>
                  </div>

                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                        <Utensils className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="text-body-sm text-muted-foreground">Food</p>
                        <p className="text-heading-4 text-foreground">${costs.food}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {foodPreferences[foodPref].label}
                    </Badge>
                  </div>

                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                        <Bus className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-body-sm text-muted-foreground">Transport</p>
                        <p className="text-heading-4 text-foreground">${costs.transport}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-glow-cyan/10 flex items-center justify-center">
                        <Wifi className="h-5 w-5 text-glow-cyan" />
                      </div>
                      <div>
                        <p className="text-body-sm text-muted-foreground">Utilities</p>
                        <p className="text-heading-4 text-foreground">${costs.utilities}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
                        <Heart className="h-5 w-5 text-error" />
                      </div>
                      <div>
                        <p className="text-body-sm text-muted-foreground">Insurance</p>
                        <p className="text-heading-4 text-foreground">${costs.insurance}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-glow-blue/10 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-glow-blue" />
                      </div>
                      <div>
                        <p className="text-body-sm text-muted-foreground">Entertainment</p>
                        <p className="text-heading-4 text-foreground">${costs.entertainment}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-glow-cyan/10 border border-glow-cyan/30 rounded-lg mt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-8 w-8 text-glow-cyan" />
                      <div>
                        <p className="text-body text-muted-foreground">Total Monthly Cost</p>
                        <p className="text-heading-2 text-glow-cyan">${costs.total}</p>
                      </div>
                    </div>
                    <Badge className="bg-glow-cyan text-background">
                      Including ${costs.miscellaneous} misc.
                    </Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="six-month" className="space-y-4 mt-6">
                <div className="p-6 bg-gradient-to-br from-glow-cyan/10 to-glow-blue/10 border border-glow-cyan/30 rounded-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-glow-cyan/20 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-glow-cyan" />
                    </div>
                    <div>
                      <p className="text-body text-muted-foreground">6-Month Budget</p>
                      <p className="text-heading-1 text-glow-cyan">${sixMonthTotal.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <p className="text-body-sm text-muted-foreground">Rent (6 months)</p>
                      <p className="text-heading-4 text-foreground">${(costs.rent * 6).toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <p className="text-body-sm text-muted-foreground">Food (6 months)</p>
                      <p className="text-heading-4 text-foreground">${(costs.food * 6).toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-background/50 rounded-lg">
                      <p className="text-body-sm text-muted-foreground">Other (6 months)</p>
                      <p className="text-heading-4 text-foreground">${((costs.total - costs.rent - costs.food) * 6).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-heading-4">Month-by-Month Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5, 6].map(month => (
                        <div key={month} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <span className="text-body font-medium">Month {month}</span>
                          <span className="text-heading-4 text-glow-cyan">${costs.total.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
                  <p className="text-body-sm text-foreground">
                    <strong>💡 Pro Tip:</strong> Add 10-15% buffer for unexpected expenses. Consider part-time work to offset costs.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};