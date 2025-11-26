import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMatches } from '@/context/MatchContext';
import { MapPin, Utensils, Briefcase, Home as HomeIcon, Navigation, AlertCircle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// City coordinates mapping (approximate)
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  'Cambridge': { lat: 42.3601, lng: -71.0942 },
  'Toronto': { lat: 43.6629, lng: -79.3957 },
  'Munich': { lat: 48.1351, lng: 11.5820 },
  'Berlin': { lat: 52.5200, lng: 13.4050 },
  'London': { lat: 51.5074, lng: -0.1278 },
  'Manchester': { lat: 53.4808, lng: -2.2426 },
  'Sydney': { lat: -33.8688, lng: 151.2093 },
  'Melbourne': { lat: -37.8136, lng: 144.9631 },
  'Vancouver': { lat: 49.2827, lng: -123.1207 },
  'Montreal': { lat: 45.5017, lng: -73.5673 },
  'Paris': { lat: 48.8566, lng: 2.3522 },
  'Dublin': { lat: 53.3498, lng: -6.2603 },
};

// Generate mock locations based on city
const generateMockLocations = (cityName: string) => {
  const cityHash = cityName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seed = cityHash % 100;
  
  return {
    restaurants: [
      { id: 1, name: `${cityName} Indian Kitchen`, type: 'Indian', distance: '0.5 km', rating: 4.5, price: '$$', lat: 0.002, lng: 0.002 },
      { id: 2, name: 'Campus Cafe', type: 'Cafe', distance: '0.2 km', rating: 4.2, price: '$', lat: -0.001, lng: 0.001 },
      { id: 3, name: 'Pizza Palace', type: 'Italian', distance: '0.8 km', rating: 4.7, price: '$$', lat: 0.003, lng: -0.002 },
      { id: 4, name: `${cityName} Sushi Bar`, type: 'Japanese', distance: '1.2 km', rating: 4.6, price: '$$$', lat: -0.003, lng: 0.003 },
      { id: 5, name: 'Student Diner', type: 'American', distance: '0.4 km', rating: 4.3, price: '$', lat: 0.001, lng: -0.001 }
    ],
    partTimeJobs: [
      { id: 1, company: 'University Library', position: 'Library Assistant', hours: '15-20/week', pay: `$${15 + seed % 5}/hr`, lat: 0.0015, lng: 0.0015 },
      { id: 2, company: 'Local Cafe', position: 'Barista', hours: '10-15/week', pay: `$${14 + seed % 4}/hr`, lat: -0.0012, lng: 0.0018 },
      { id: 3, company: 'Retail Store', position: 'Sales Associate', hours: '20/week', pay: `$${16 + seed % 6}/hr`, lat: 0.0025, lng: -0.0015 },
      { id: 4, company: 'Tutoring Center', position: 'Math Tutor', hours: '10/week', pay: `$${20 + seed % 8}/hr`, lat: -0.002, lng: 0.002 },
      { id: 5, company: `${cityName} Restaurant`, position: 'Server', hours: '15/week', pay: `$${12 + seed % 3}/hr`, lat: 0.0018, lng: 0.0022 }
    ],
    places: [
      { id: 1, name: 'Public Library', type: 'Library', distance: '0.3 km', lat: 0.001, lng: 0.0015 },
      { id: 2, name: 'City Park', type: 'Park', distance: '0.6 km', lat: -0.002, lng: 0.001 },
      { id: 3, name: 'Shopping Mall', type: 'Shopping', distance: '1.5 km', lat: 0.004, lng: -0.003 },
      { id: 4, name: 'Medical Center', type: 'Healthcare', distance: '2.0 km', lat: -0.003, lng: 0.004 },
      { id: 5, name: 'Sports Complex', type: 'Recreation', distance: '1.0 km', lat: 0.0025, lng: 0.0025 }
    ]
  };
};

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export const MapExplorer = () => {
  const { matches } = useMatches();
  
  const universities = useMemo(() => {
    return matches.map((match) => {
      const coords = cityCoordinates[match.city] || { lat: 0, lng: 0 };
      return {
        id: match.id,
        name: match.universityName,
        lat: coords.lat,
        lng: coords.lng,
        city: `${match.city}, ${match.country}`,
        cityName: match.city
      };
    }).filter(u => u.lat !== 0 && u.lng !== 0);
  }, [matches]);

  const [selectedUniversity, setSelectedUniversity] = useState(universities[0]);
  const [activeTab, setActiveTab] = useState('restaurants');
  const [mockLocations, setMockLocations] = useState(generateMockLocations(universities[0]?.cityName || 'City'));

  useEffect(() => {
    if (universities.length > 0 && !selectedUniversity) {
      setSelectedUniversity(universities[0]);
      setMockLocations(generateMockLocations(universities[0].cityName));
    }
  }, [universities, selectedUniversity]);

  useEffect(() => {
    if (selectedUniversity) {
      setMockLocations(generateMockLocations(selectedUniversity.cityName));
    }
  }, [selectedUniversity]);

  if (universities.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-heading-2 text-foreground mb-2">Location Explorer</h1>
          <p className="text-body text-muted-foreground">
            Explore nearby restaurants, places, and part-time job locations
          </p>
        </div>
        <Card className="border-glow-cyan/30">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-glow-cyan mx-auto mb-4" />
              <h3 className="text-heading-3 text-foreground mb-2">No Locations Available</h3>
              <p className="text-body text-muted-foreground mb-6">
                Complete the assessment to explore locations around your matched universities.
              </p>
              <Button 
                className="bg-glow-cyan text-background hover:bg-glow-cyan/90"
                onClick={() => window.location.href = '/onboarding'}
              >
                Start Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedUniversity) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-2 text-foreground mb-2">Location Explorer</h1>
        <p className="text-body text-muted-foreground">
          Explore nearby restaurants, places, and part-time job locations
        </p>
      </div>

      {/* University Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select University</CardTitle>
          <CardDescription>Choose a university to explore its surroundings</CardDescription>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedUniversity?.id} 
            onValueChange={(value) => {
              const uni = universities.find(u => u.id === value);
              if (uni) {
                setSelectedUniversity(uni);
                setMockLocations(generateMockLocations(uni.cityName));
              }
            }}
          >
            <SelectTrigger className="w-full md:w-[400px]">
              <SelectValue placeholder="Select a university" />
            </SelectTrigger>
            <SelectContent>
              {universities.map((uni) => (
                <SelectItem key={uni.id} value={uni.id}>
                  {uni.name} - {uni.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Map and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-glow-cyan" />
              Interactive Map - {selectedUniversity.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] rounded-lg overflow-hidden border border-border">
              <MapContainer
                center={[selectedUniversity.lat, selectedUniversity.lng]}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
              >
                <ChangeView center={[selectedUniversity.lat, selectedUniversity.lng]} zoom={14} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* University Marker */}
                <Marker position={[selectedUniversity.lat, selectedUniversity.lng]}>
                  <Popup>
                    <div className="text-center">
                      <strong>{selectedUniversity.name}</strong>
                      <br />
                      {selectedUniversity.city}
                    </div>
                  </Popup>
                </Marker>

                {/* Restaurant Markers */}
                {activeTab === 'restaurants' && mockLocations.restaurants.map((restaurant) => (
                  <Marker 
                    key={restaurant.id} 
                    position={[
                      selectedUniversity.lat + restaurant.lat, 
                      selectedUniversity.lng + restaurant.lng
                    ]}
                  >
                    <Popup>
                      <div>
                        <strong>{restaurant.name}</strong>
                        <br />
                        {restaurant.type} • {restaurant.price}
                        <br />
                        ⭐ {restaurant.rating} • {restaurant.distance}
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Job Markers */}
                {activeTab === 'jobs' && mockLocations.partTimeJobs.map((job) => (
                  <Marker 
                    key={job.id} 
                    position={[
                      selectedUniversity.lat + job.lat, 
                      selectedUniversity.lng + job.lng
                    ]}
                  >
                    <Popup>
                      <div>
                        <strong>{job.company}</strong>
                        <br />
                        {job.position}
                        <br />
                        {job.hours} • {job.pay}
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Place Markers */}
                {activeTab === 'places' && mockLocations.places.map((place) => (
                  <Marker 
                    key={place.id} 
                    position={[
                      selectedUniversity.lat + place.lat, 
                      selectedUniversity.lng + place.lng
                    ]}
                  >
                    <Popup>
                      <div>
                        <strong>{place.name}</strong>
                        <br />
                        {place.type} • {place.distance}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card>
          <CardHeader>
            <CardTitle>Nearby Locations</CardTitle>
            <CardDescription>Explore what's around campus</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="restaurants">
                  <Utensils className="h-4 w-4 mr-1" />
                  Food
                </TabsTrigger>
                <TabsTrigger value="jobs">
                  <Briefcase className="h-4 w-4 mr-1" />
                  Jobs
                </TabsTrigger>
                <TabsTrigger value="places">
                  <HomeIcon className="h-4 w-4 mr-1" />
                  Places
                </TabsTrigger>
              </TabsList>

              <TabsContent value="restaurants" className="space-y-3 mt-4">
                {mockLocations.restaurants.map((restaurant) => (
                  <div key={restaurant.id} className="p-3 bg-secondary/30 rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-body font-medium text-foreground">{restaurant.name}</h4>
                        <p className="text-body-sm text-muted-foreground">{restaurant.type}</p>
                      </div>
                      <Badge variant="secondary">{restaurant.price}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-body-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Navigation className="h-3 w-3" />
                        {restaurant.distance}
                      </span>
                      <span>⭐ {restaurant.rating}</span>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="jobs" className="space-y-3 mt-4">
                {mockLocations.partTimeJobs.map((job) => (
                  <div key={job.id} className="p-3 bg-secondary/30 rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-body font-medium text-foreground">{job.position}</h4>
                        <p className="text-body-sm text-muted-foreground">{job.company}</p>
                      </div>
                      <Badge className="bg-success text-white">{job.pay}</Badge>
                    </div>
                    <div className="text-body-sm text-muted-foreground">
                      {job.hours}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="places" className="space-y-3 mt-4">
                {mockLocations.places.map((place) => (
                  <div key={place.id} className="p-3 bg-secondary/30 rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-body font-medium text-foreground">{place.name}</h4>
                        <p className="text-body-sm text-muted-foreground">{place.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-body-sm text-muted-foreground">
                      <Navigation className="h-3 w-3" />
                      {place.distance}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-glow-cyan/10 flex items-center justify-center">
                <Utensils className="h-5 w-5 text-glow-cyan" />
              </div>
              <div>
                <div className="text-heading-4 text-foreground">24</div>
                <p className="text-body-sm text-muted-foreground">Restaurants</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-heading-4 text-foreground">18</div>
                <p className="text-body-sm text-muted-foreground">Part-time Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-glow-blue/10 flex items-center justify-center">
                <HomeIcon className="h-5 w-5 text-glow-blue" />
              </div>
              <div>
                <div className="text-heading-4 text-foreground">32</div>
                <p className="text-body-sm text-muted-foreground">Key Places</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-heading-4 text-foreground">2.5 km</div>
                <p className="text-body-sm text-muted-foreground">Avg. Distance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};