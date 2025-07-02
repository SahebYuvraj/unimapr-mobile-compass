import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav";
import { BottomSheet } from "@/components/BottomSheet";
import { Search, MapPin, Navigation, Bookmark, Coffee, GraduationCap, Utensils } from "lucide-react";

const Map = () => {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock map data
  const buildings = [
    { id: 1, name: "Engineering Building", type: "academic", x: 40, y: 30, rooms: 120 },
    { id: 2, name: "Library", type: "study", x: 60, y: 50, rooms: 45 },
    { id: 3, name: "Student Center", type: "dining", x: 80, y: 40, rooms: 25 },
    { id: 4, name: "Science Center", type: "academic", x: 30, y: 70, rooms: 85 },
    { id: 5, name: "Café Central", type: "dining", x: 70, y: 60, rooms: 8 }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "academic": return GraduationCap;
      case "study": return MapPin;
      case "dining": return Utensils;
      default: return MapPin;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "academic": return "bg-primary";
      case "study": return "bg-accent";
      case "dining": return "bg-success";
      default: return "bg-muted";
    }
  };

  const handleBuildingClick = (building: any) => {
    setSelectedRoom({
      name: building.name,
      type: building.type,
      distance: "3 min walk",
      description: `${building.rooms} rooms available`,
      features: ["WiFi", "Air Conditioning", "Accessible"]
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Search Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms, buildings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass"
          />
        </div>
      </div>

      {/* Map Area */}
      <div className="relative w-full h-screen bg-gradient-to-br from-primary/5 to-accent/5 mt-16">
        {/* User Location */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg animate-pulse" />
        </div>

        {/* Building Pins */}
        {buildings.map((building) => {
          const Icon = getIcon(building.type);
          return (
            <button
              key={building.id}
              onClick={() => handleBuildingClick(building)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 ${getColor(building.type)} rounded-full border-2 border-background shadow-lg flex items-center justify-center hover:scale-110 transition-transform`}
              style={{ left: `${building.x}%`, top: `${building.y}%` }}
            >
              <Icon className="w-4 h-4 text-white" />
            </button>
          );
        })}

        {/* Map Legend */}
        <Card className="absolute bottom-24 left-4 glass-card p-3 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-xs text-foreground">Academic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <span className="text-xs text-foreground">Study</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-xs text-foreground">Dining</span>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="absolute top-20 right-4 space-y-2">
        <Button size="icon" variant="outline" className="glass">
          <Navigation className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline" className="glass">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>

      {/* Bottom Sheet for Room Details */}
      <BottomSheet isOpen={!!selectedRoom} onClose={() => setSelectedRoom(null)}>
        {selectedRoom && (
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{selectedRoom.name}</h3>
                <p className="text-muted-foreground">{selectedRoom.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary">{selectedRoom.distance}</span>
                </div>
              </div>
              <Badge variant="secondary">{selectedRoom.type}</Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Features</h4>
              <div className="flex flex-wrap gap-2">
                {selectedRoom.features?.map((feature: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 smooth-transition">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
              <Button variant="outline" size="icon" className="glass">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </BottomSheet>

      <BottomNav />
    </div>
  );
};

export default Map;