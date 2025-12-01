import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useMatches } from '@/context/MatchContext';
import { Home, MapPin, Users, Star, Heart, Search, AlertCircle } from 'lucide-react';

interface Accommodation {
  id: string;
  name: string;
  type: 'student-housing' | 'shared-apartment' | 'private-apartment' | 'homestay';
  city: string;
  address: string;
  price: number;
  distance: string;
  rating: number;
  reviews: number;
  amenities: string[];
  roomType: string;
  available: boolean;
  images: string[];
  description: string;
}

const mockAccommodations: Accommodation[] = [
  {
    id: '1',
    name: 'Campus View Student Residence',
    type: 'student-housing',
    city: 'Cambridge',
    address: '123 University Ave, Cambridge',
    price: 1200,
    distance: '0.5 km from campus',
    rating: 4.8,
    reviews: 245,
    amenities: ['WiFi', 'Laundry', 'Study Room', 'Gym', 'Common Kitchen'],
    roomType: 'Single Room',
    available: true,
    images: ['https://picsum.photos/400/300?random=1'],
    description: 'Modern student housing with all amenities, perfect for international students.'
  },
  {
    id: '2',
    name: 'Downtown Shared Apartment',
    type: 'shared-apartment',
    city: 'Cambridge',
    address: '456 Main St, Cambridge',
    price: 850,
    distance: '1.2 km from campus',
    rating: 4.5,
    reviews: 128,
    amenities: ['WiFi', 'Furnished', 'Kitchen', 'Parking'],
    roomType: 'Shared Room (2 people)',
    available: true,
    images: ['https://picsum.photos/400/300?random=2'],
    description: 'Affordable shared accommodation in the heart of the city.'
  },
  {
    id: '3',
    name: 'University Heights Studio',
    type: 'private-apartment',
    city: 'Cambridge',
    address: '789 College Rd, Cambridge',
    price: 1600,
    distance: '0.8 km from campus',
    rating: 4.9,
    reviews: 89,
    amenities: ['WiFi', 'Fully Furnished', 'Kitchen', 'Balcony', 'Parking', 'Security'],
    roomType: 'Studio Apartment',
    available: true,
    images: ['https://picsum.photos/400/300?random=3'],
    description: 'Luxury studio apartment with modern amenities and great views.'
  },
  {
    id: '4',
    name: 'Welcoming Homestay',
    type: 'homestay',
    city: 'Cambridge',
    address: '321 Residential St, Cambridge',
    price: 950,
    distance: '2.0 km from campus',
    rating: 4.7,
    reviews: 156,
    amenities: ['WiFi', 'Meals Included', 'Laundry', 'Family Environment'],
    roomType: 'Private Room',
    available: true,
    images: ['https://picsum.photos/400/300?random=4'],
    description: 'Stay with a local family and experience the culture firsthand.'
  },
  {
    id: '5',
    name: 'Modern Student Loft',
    type: 'student-housing',
    city: 'Cambridge',
    address: '555 Campus Dr, Cambridge',
    price: 1100,
    distance: '0.3 km from campus',
    rating: 4.6,
    reviews: 203,
    amenities: ['WiFi', 'Study Areas', 'Gym', 'Game Room', 'Bike Storage'],
    roomType: 'Single Room',
    available: false,
    images: ['https://picsum.photos/400/300?random=5'],
    description: 'Popular student residence with excellent facilities.'
  },
  {
    id: '6',
    name: 'Cozy Shared House',
    type: 'shared-apartment',
    city: 'Cambridge',
    address: '888 Park Lane, Cambridge',
    price: 750,
    distance: '1.5 km from campus',
    rating: 4.3,
    reviews: 92,
    amenities: ['WiFi', 'Garden', 'Kitchen', 'Living Room'],
    roomType: 'Shared Room (3 people)',
    available: true,
    images: ['https://picsum.photos/400/300?random=6'],
    description: 'Budget-friendly option with a friendly community atmosphere.'
  }
];

export const AccommodationFinder = () => {
  const { matches } = useMatches();
  
  const cities = useMemo(() => {
    if (matches.length > 0) {
      return ['All Cities', ...new Set(matches.map(m => m.city))];
    }
    return ['All Cities', 'Cambridge', 'Toronto', 'Munich', 'London', 'Sydney'];
  }, [matches]);

  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);

  const filteredAccommodations = useMemo(() => {
    return mockAccommodations.filter(acc => {
      const matchesCity = selectedCity === 'All Cities' || acc.city === selectedCity;
      const matchesType = selectedType === 'all' || acc.type === selectedType;
      const matchesSearch = acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          acc.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAvailable = !showAvailableOnly || acc.available;
      
      let matchesPrice = true;
      if (priceRange === 'budget') matchesPrice = acc.price < 900;
      else if (priceRange === 'mid') matchesPrice = acc.price >= 900 && acc.price < 1300;
      else if (priceRange === 'premium') matchesPrice = acc.price >= 1300;
      
      return matchesCity && matchesType && matchesSearch && matchesAvailable && matchesPrice;
    });
  }, [selectedCity, selectedType, priceRange, searchTerm, showAvailableOnly]);

  const getTypeLabel = (type: string) => {
    const labels = {
      'student-housing': 'Student Housing',
      'shared-apartment': 'Shared Apartment',
      'private-apartment': 'Private Apartment',
      'homestay': 'Homestay'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'student-housing': 'bg-glow-cyan text-background',
      'shared-apartment': 'bg-glow-blue text-white',
      'private-apartment': 'bg-success text-white',
      'homestay': 'bg-warning text-background'
    };
    return colors[type as keyof typeof colors] || 'bg-secondary';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">Accommodation Finder</h1>
        <p className="text-body text-muted-foreground">
          Find your perfect place to stay near campus
        </p>
      </div>

      {matches.length === 0 && (
        <Card className="border-glow-cyan/30 bg-glow-cyan/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-glow-cyan mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-body font-semibold text-foreground mb-1">Viewing Sample Accommodations</h3>
                <p className="text-body-sm text-muted-foreground">
                  Complete the assessment to see accommodations near your matched universities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Find the perfect accommodation for you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

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

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="student-housing">Student Housing</SelectItem>
                <SelectItem value="shared-apartment">Shared Apartment</SelectItem>
                <SelectItem value="private-apartment">Private Apartment</SelectItem>
                <SelectItem value="homestay">Homestay</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="All Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget (&lt; $900)</SelectItem>
                <SelectItem value="mid">Mid Range ($900-$1300)</SelectItem>
                <SelectItem value="premium">Premium (&gt; $1300)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="available"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="available" className="text-body-sm text-foreground cursor-pointer">
              Show available only
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAccommodations.map((acc) => (
          <Card key={acc.id} className={!acc.available ? 'opacity-60' : ''}>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="w-32 h-32 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                  <img 
                    src={acc.images[0]} 
                    alt={acc.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-heading-4 text-foreground mb-1 truncate">{acc.name}</h3>
                      <p className="text-body-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {acc.address}
                      </p>
                    </div>
                    <Badge className={getTypeColor(acc.type)}>
                      {getTypeLabel(acc.type)}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="text-body-sm font-medium">{acc.rating}</span>
                      <span className="text-body-sm text-muted-foreground">({acc.reviews})</span>
                    </div>
                    <span className="text-body-sm text-muted-foreground">{acc.distance}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="gap-1">
                      <Users className="h-3 w-3" />
                      {acc.roomType}
                    </Badge>
                    {!acc.available && (
                      <Badge className="bg-error text-white">
                        Not Available
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {acc.amenities.slice(0, 4).map((amenity, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {acc.amenities.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{acc.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-heading-3 text-glow-cyan">${acc.price}</span>
                      <span className="text-body-sm text-muted-foreground">/month</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={!acc.available}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-glow-cyan text-background hover:bg-glow-cyan/90"
                        disabled={!acc.available}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAccommodations.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-heading-3 text-foreground mb-2">No Accommodations Found</h3>
            <p className="text-body text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};