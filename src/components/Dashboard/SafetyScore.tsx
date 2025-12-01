import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  ThermometerSun, 
  Users, 
  UtensilsCrossed, 
  Plane,
  Heart,
  AlertTriangle,
  MapPin,
  Phone
} from 'lucide-react';

interface CityData {
  name: string;
  country: string;
  safetyScore: number;
  crimeRate: string;
  weather: {
    summer: string;
    winter: string;
    rainfall: string;
  };
  indianCommunity: {
    size: string;
    temples: number;
    restaurants: number;
  };
  food: {
    vegetarianOptions: string;
    indianRestaurants: number;
    groceryStores: string[];
  };
  transport: {
    publicTransport: string;
    airports: string[];
    connectivity: string;
  };
  culture: {
    language: string;
    customs: string[];
    festivals: string[];
  };
  emergency: {
    police: string;
    ambulance: string;
    hospitals: string[];
  };
}

const cityData: Record<string, CityData> = {
  'Boston': {
    name: 'Boston',
    country: 'USA',
    safetyScore: 78,
    crimeRate: 'Moderate - Safe in most areas',
    weather: {
      summer: '20-30°C (68-86°F)',
      winter: '-5 to 5°C (23-41°F)',
      rainfall: 'Moderate throughout year'
    },
    indianCommunity: {
      size: 'Large - 50,000+ Indians',
      temples: 8,
      restaurants: 45
    },
    food: {
      vegetarianOptions: 'Excellent',
      indianRestaurants: 45,
      groceryStores: ['India Grocers', 'Patel Brothers', 'Whole Foods']
    },
    transport: {
      publicTransport: 'Excellent - MBTA subway, buses',
      airports: ['Logan International Airport'],
      connectivity: 'Very well connected to major cities'
    },
    culture: {
      language: 'English',
      customs: ['Tipping 15-20%', 'Punctuality valued', 'Direct communication'],
      festivals: ['Diwali celebrations', 'Holi events', 'Indian Independence Day']
    },
    emergency: {
      police: '911',
      ambulance: '911',
      hospitals: ['Massachusetts General Hospital', 'Brigham and Women\'s Hospital']
    }
  },
  'London': {
    name: 'London',
    country: 'UK',
    safetyScore: 82,
    crimeRate: 'Low - Generally very safe',
    weather: {
      summer: '15-25°C (59-77°F)',
      winter: '2-8°C (36-46°F)',
      rainfall: 'Frequent light rain'
    },
    indianCommunity: {
      size: 'Very Large - 500,000+ Indians',
      temples: 25,
      restaurants: 200
    },
    food: {
      vegetarianOptions: 'Excellent',
      indianRestaurants: 200,
      groceryStores: ['Southall Market', 'Spice Village', 'Tesco']
    },
    transport: {
      publicTransport: 'Excellent - Underground, buses, trains',
      airports: ['Heathrow', 'Gatwick', 'Stansted'],
      connectivity: 'World-class connectivity'
    },
    culture: {
      language: 'English',
      customs: ['Queue culture', 'Polite conversation', 'Tea culture'],
      festivals: ['Diwali on Trafalgar Square', 'Holi Festival', 'Navratri']
    },
    emergency: {
      police: '999',
      ambulance: '999',
      hospitals: ['St Thomas\' Hospital', 'Royal London Hospital']
    }
  },
  'Toronto': {
    name: 'Toronto',
    country: 'Canada',
    safetyScore: 85,
    crimeRate: 'Low - Very safe city',
    weather: {
      summer: '20-27°C (68-81°F)',
      winter: '-10 to 0°C (14-32°F)',
      rainfall: 'Moderate, heavy snow in winter'
    },
    indianCommunity: {
      size: 'Very Large - 300,000+ Indians',
      temples: 15,
      restaurants: 150
    },
    food: {
      vegetarianOptions: 'Excellent',
      indianRestaurants: 150,
      groceryStores: ['Little India', 'Gerrard India Bazaar', 'Nations Fresh Foods']
    },
    transport: {
      publicTransport: 'Excellent - TTC subway, streetcars, buses',
      airports: ['Toronto Pearson International'],
      connectivity: 'Well connected across North America'
    },
    culture: {
      language: 'English, French',
      customs: ['Multicultural respect', 'Politeness', 'Diversity celebration'],
      festivals: ['Toronto Diwali Festival', 'Holi celebrations', 'India Day Parade']
    },
    emergency: {
      police: '911',
      ambulance: '911',
      hospitals: ['Toronto General Hospital', 'Mount Sinai Hospital']
    }
  },
  'Berlin': {
    name: 'Berlin',
    country: 'Germany',
    safetyScore: 80,
    crimeRate: 'Low - Safe with normal precautions',
    weather: {
      summer: '18-25°C (64-77°F)',
      winter: '-2 to 5°C (28-41°F)',
      rainfall: 'Moderate throughout year'
    },
    indianCommunity: {
      size: 'Growing - 15,000+ Indians',
      temples: 3,
      restaurants: 35
    },
    food: {
      vegetarianOptions: 'Good',
      indianRestaurants: 35,
      groceryStores: ['Indian Supermarket Berlin', 'Asia Markt', 'Edeka']
    },
    transport: {
      publicTransport: 'Excellent - U-Bahn, S-Bahn, buses, trams',
      airports: ['Berlin Brandenburg Airport'],
      connectivity: 'Well connected to Europe'
    },
    culture: {
      language: 'German (English widely spoken)',
      customs: ['Punctuality crucial', 'Direct communication', 'Recycling important'],
      festivals: ['Diwali Festival', 'Holi Festival of Colors']
    },
    emergency: {
      police: '110',
      ambulance: '112',
      hospitals: ['Charité Hospital', 'Vivantes Klinikum']
    }
  },
  'Sydney': {
    name: 'Sydney',
    country: 'Australia',
    safetyScore: 88,
    crimeRate: 'Very Low - Extremely safe',
    weather: {
      summer: '20-27°C (68-81°F)',
      winter: '8-17°C (46-63°F)',
      rainfall: 'Moderate, mostly in summer'
    },
    indianCommunity: {
      size: 'Large - 200,000+ Indians',
      temples: 12,
      restaurants: 120
    },
    food: {
      vegetarianOptions: 'Excellent',
      indianRestaurants: 120,
      groceryStores: ['Harris Park Indian Shops', 'Spice Bazaar', 'Coles']
    },
    transport: {
      publicTransport: 'Excellent - Trains, buses, ferries',
      airports: ['Sydney Kingsford Smith Airport'],
      connectivity: 'Well connected to Asia-Pacific'
    },
    culture: {
      language: 'English',
      customs: ['Laid-back attitude', 'Outdoor lifestyle', 'Beach culture'],
      festivals: ['Parramasala Festival', 'Diwali celebrations', 'Holi Festival']
    },
    emergency: {
      police: '000',
      ambulance: '000',
      hospitals: ['Royal Prince Alfred Hospital', 'St Vincent\'s Hospital']
    }
  }
};

export const SafetyScore = () => {
  const [selectedCity, setSelectedCity] = useState('Boston');
  
  const currentCity = cityData[selectedCity];
  const safetyColor = currentCity.safetyScore >= 80 ? 'text-success' : 
                      currentCity.safetyScore >= 60 ? 'text-warning' : 'text-destructive';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">Country Safety Score & City Insights</h1>
        <p className="text-body text-muted-foreground">
          Comprehensive safety and living information for your study destination
        </p>
      </div>

      {/* City Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select City</CardTitle>
          <CardDescription>Choose a city to view detailed insights</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Boston">Boston, USA</SelectItem>
              <SelectItem value="London">London, UK</SelectItem>
              <SelectItem value="Toronto">Toronto, Canada</SelectItem>
              <SelectItem value="Berlin">Berlin, Germany</SelectItem>
              <SelectItem value="Sydney">Sydney, Australia</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Safety Score Overview */}
      <Card className="border-glow-cyan/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-glow flex items-center justify-center flex-shrink-0">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-heading-2 text-foreground mb-2">{currentCity.name}, {currentCity.country}</h2>
              <div className="flex items-center gap-4 mb-3">
                <div>
                  <p className="text-body-sm text-muted-foreground mb-1">Safety Score</p>
                  <p className={`text-heading-3 ${safetyColor}`}>{currentCity.safetyScore}/100</p>
                </div>
                <div className="flex-1">
                  <Progress value={currentCity.safetyScore} className="h-3" />
                </div>
              </div>
              <p className="text-body text-foreground">{currentCity.crimeRate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="weather" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="food">Food</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
        </TabsList>

        {/* Weather Tab */}
        <TabsContent value="weather">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThermometerSun className="h-5 w-5 text-warning" />
                Weather & Climate
              </CardTitle>
              <CardDescription>Temperature and rainfall information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <h4 className="text-body font-medium text-foreground mb-2">Summer</h4>
                  <p className="text-body-sm text-muted-foreground">{currentCity.weather.summer}</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <h4 className="text-body font-medium text-foreground mb-2">Winter</h4>
                  <p className="text-body-sm text-muted-foreground">{currentCity.weather.winter}</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <h4 className="text-body font-medium text-foreground mb-2">Rainfall</h4>
                  <p className="text-body-sm text-muted-foreground">{currentCity.weather.rainfall}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-glow-blue" />
                Indian Community
              </CardTitle>
              <CardDescription>Size and support network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-glow-blue/10 border border-glow-blue/30 rounded-lg">
                  <h4 className="text-heading-4 text-foreground mb-1">{currentCity.indianCommunity.size}</h4>
                  <p className="text-body-sm text-muted-foreground">Indian population in {currentCity.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <div className="text-heading-3 text-glow-cyan mb-1">{currentCity.indianCommunity.temples}</div>
                    <p className="text-body-sm text-muted-foreground">Hindu Temples</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <div className="text-heading-3 text-glow-cyan mb-1">{currentCity.indianCommunity.restaurants}</div>
                    <p className="text-body-sm text-muted-foreground">Indian Restaurants</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Food Tab */}
        <TabsContent value="food">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5 text-success" />
                Food & Dietary Options
              </CardTitle>
              <CardDescription>Availability of Indian and vegetarian food</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-success/10 border border-success/30 rounded-lg">
                <h4 className="text-body font-medium text-foreground mb-1">Vegetarian Options</h4>
                <p className="text-body-sm text-muted-foreground">{currentCity.food.vegetarianOptions}</p>
              </div>
              <div>
                <h4 className="text-body font-medium text-foreground mb-3">Indian Grocery Stores</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentCity.food.groceryStores.map((store, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                      <MapPin className="h-4 w-4 text-glow-cyan flex-shrink-0" />
                      <span className="text-body-sm text-foreground">{store}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-secondary/30 rounded-lg text-center">
                <div className="text-heading-3 text-foreground mb-1">{currentCity.food.indianRestaurants}+</div>
                <p className="text-body-sm text-muted-foreground">Indian Restaurants Available</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transport Tab */}
        <TabsContent value="transport">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-glow-teal" />
                Travel & Connectivity
              </CardTitle>
              <CardDescription>Public transport and travel options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-glow-teal/10 border border-glow-teal/30 rounded-lg">
                <h4 className="text-body font-medium text-foreground mb-1">Public Transport</h4>
                <p className="text-body-sm text-muted-foreground">{currentCity.transport.publicTransport}</p>
              </div>
              <div>
                <h4 className="text-body font-medium text-foreground mb-3">Major Airports</h4>
                <div className="space-y-2">
                  {currentCity.transport.airports.map((airport, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                      <Plane className="h-4 w-4 text-glow-cyan" />
                      <span className="text-body-sm text-foreground">{airport}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-secondary/30 rounded-lg">
                <h4 className="text-body font-medium text-foreground mb-1">Connectivity</h4>
                <p className="text-body-sm text-muted-foreground">{currentCity.transport.connectivity}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Culture Tab */}
        <TabsContent value="culture">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-500" />
                Cultural Behavior & Customs
              </CardTitle>
              <CardDescription>Local customs and Indian festivals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-secondary/30 rounded-lg">
                <h4 className="text-body font-medium text-foreground mb-1">Primary Language</h4>
                <p className="text-body-sm text-muted-foreground">{currentCity.culture.language}</p>
              </div>
              <div>
                <h4 className="text-body font-medium text-foreground mb-3">Local Customs</h4>
                <div className="space-y-2">
                  {currentCity.culture.customs.map((custom, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-secondary/30 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                      <span className="text-body-sm text-foreground">{custom}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-body font-medium text-foreground mb-3">Indian Festivals Celebrated</h4>
                <div className="flex flex-wrap gap-2">
                  {currentCity.culture.festivals.map((festival, idx) => (
                    <Badge key={idx} className="bg-glow-cyan text-background">
                      {festival}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Emergency Tab */}
        <TabsContent value="emergency">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-destructive" />
                Emergency Services
              </CardTitle>
              <CardDescription>Important contact numbers and healthcare</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <h4 className="text-body font-medium text-foreground mb-1">Police</h4>
                  <p className="text-heading-3 text-destructive">{currentCity.emergency.police}</p>
                </div>
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <h4 className="text-body font-medium text-foreground mb-1">Ambulance</h4>
                  <p className="text-heading-3 text-destructive">{currentCity.emergency.ambulance}</p>
                </div>
              </div>
              <div>
                <h4 className="text-body font-medium text-foreground mb-3">Major Hospitals</h4>
                <div className="space-y-2">
                  {currentCity.emergency.hospitals.map((hospital, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                      <Heart className="h-4 w-4 text-pink-500" />
                      <span className="text-body-sm text-foreground">{hospital}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};