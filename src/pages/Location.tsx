import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Filter, Star, Clock, Navigation } from "lucide-react";

interface Place {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: string;
  isOpen: boolean;
  image: string;
  description: string;
}

const Location = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const places: Place[] = [
    {
      id: '1',
      name: 'Artisan Coffee House',
      category: 'Cafe',
      rating: 4.8,
      distance: '0.2 miles',
      isOpen: true,
      image: '☕',
      description: 'Cozy coffee shop with locally roasted beans'
    },
    {
      id: '2',
      name: 'Central Park',
      category: 'Park',
      rating: 4.7,
      distance: '0.5 miles',
      isOpen: true,
      image: '🌳',
      description: 'Beautiful park perfect for walking and relaxation'
    },
    {
      id: '3',
      name: 'Tech Hub Coworking',
      category: 'Workspace',
      rating: 4.6,
      distance: '0.8 miles',
      isOpen: false,
      image: '💻',
      description: 'Modern coworking space with high-speed internet'
    },
    {
      id: '4',
      name: 'Sunrise Fitness',
      category: 'Gym',
      rating: 4.5,
      distance: '1.2 miles',
      isOpen: true,
      image: '🏋️',
      description: '24/7 fitness center with modern equipment'
    }
  ];

  const filters = [
    { id: 'all', label: 'All', count: places.length },
    { id: 'open', label: 'Open Now', count: places.filter(p => p.isOpen).length },
    { id: 'nearby', label: 'Nearby', count: places.filter(p => parseFloat(p.distance) < 1).length },
    { id: 'rated', label: 'Top Rated', count: places.filter(p => p.rating >= 4.5).length }
  ];

  const filteredPlaces = places.filter(place => {
    if (selectedFilter === 'open') return place.isOpen;
    if (selectedFilter === 'nearby') return parseFloat(place.distance) < 1;
    if (selectedFilter === 'rated') return place.rating >= 4.5;
    return true;
  }).filter(place => 
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="mobile-padding pt-16 pb-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-display gradient-text mb-4">Explore</h1>
          <p className="text-muted-foreground">
            Discover amazing places around you
          </p>
        </div>

        {/* Search */}
        <div className="neumorphic-card p-3 flex items-center space-x-3 mb-6">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-none bg-transparent focus:ring-0"
          />
          <Button size="icon" variant="ghost" className="hover:bg-secondary/50">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Filters */}
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter.id)}
              className={`
                whitespace-nowrap neumorphic-card border-border/20 
                ${selectedFilter === filter.id 
                  ? 'btn-glow text-primary-foreground' 
                  : 'hover:border-primary/50'
                }
              `}
            >
              {filter.label}
              <Badge 
                variant="secondary" 
                className="ml-2 text-xs bg-background/20"
              >
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Map Preview */}
      <div className="mx-4 mb-6">
        <Card className="neumorphic-card border-border/20 h-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-2 animate-bounce" />
              <p className="text-sm text-muted-foreground">Interactive Map</p>
              <p className="text-xs text-muted-foreground mt-1">Tap to explore</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Places List */}
      <div className="mobile-padding pb-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-semibold">
            Places Near You
          </h2>
          <Button variant="ghost" size="sm" className="text-accent">
            <Navigation className="w-4 h-4 mr-1" />
            Get Directions
          </Button>
        </div>

        <div className="space-y-4">
          {filteredPlaces.map((place) => (
            <Card
              key={place.id}
              className="neumorphic-card border-border/20 transition-all duration-300 hover:scale-105 hover:border-primary/30 group"
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className="text-3xl bg-gradient-card rounded-2xl p-3 group-hover:scale-110 transition-transform duration-300">
                    {place.image}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">
                          {place.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {place.category}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{place.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {place.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{place.distance}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Clock className={`w-4 h-4 ${place.isOpen ? 'text-green-500' : 'text-red-500'}`} />
                          <span className={`text-sm ${place.isOpen ? 'text-green-500' : 'text-red-500'}`}>
                            {place.isOpen ? 'Open' : 'Closed'}
                          </span>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-accent hover:bg-accent/10 accent-glow"
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        Go
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <div className="neumorphic-card p-8 max-w-md mx-auto">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-display font-semibold mb-2">
                No places found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Location;