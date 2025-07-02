import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav";
import { Search, MapPin, Navigation, Clock, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoomFinder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const navigate = useNavigate();

  // Mock room data
  const rooms = [
    {
      id: 1,
      number: "ENG-204",
      name: "Computer Lab A",
      building: "Engineering Building",
      floor: "2nd Floor",
      capacity: 30,
      features: ["Computers", "Projector", "WiFi", "Whiteboard"],
      availability: "Available now",
      distance: "2 min walk",
      type: "Lab"
    },
    {
      id: 2,
      number: "LIB-301",
      name: "Study Room",
      building: "Library",
      floor: "3rd Floor",
      capacity: 8,
      features: ["Quiet Zone", "Power Outlets", "Whiteboard"],
      availability: "Available until 6 PM",
      distance: "5 min walk",
      type: "Study"
    },
    {
      id: 3,
      number: "SC-105",
      name: "Physics Lecture Hall",
      building: "Science Center",
      floor: "1st Floor",
      capacity: 120,
      features: ["Projector", "Microphone", "Lab Equipment"],
      availability: "Occupied until 3 PM",
      distance: "8 min walk",
      type: "Lecture"
    },
    {
      id: 4,
      number: "ART-202",
      name: "Art Studio",
      building: "Arts Building",
      floor: "2nd Floor",
      capacity: 25,
      features: ["Natural Light", "Art Supplies", "Sinks"],
      availability: "Available now",
      distance: "6 min walk",
      type: "Studio"
    }
  ];

  const filteredRooms = rooms.filter(room => 
    room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.building.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Lab": return "bg-primary text-primary-foreground";
      case "Study": return "bg-accent text-accent-foreground";
      case "Lecture": return "bg-success text-success-foreground";
      case "Studio": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getAvailabilityColor = (availability: string) => {
    if (availability.includes("Available")) return "text-success";
    if (availability.includes("Occupied")) return "text-destructive";
    return "text-muted-foreground";
  };

  const handleRoomClick = (room: any) => {
    setSelectedRoom(room);
  };

  const handleNavigate = (room: any) => {
    navigate("/map", { state: { selectedRoom: room } });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Room Finder</h1>
          <p className="text-muted-foreground">Search by room number or name</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="ENG-204, Study Room, Computer Lab..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass"
          />
        </div>
      </div>

      {/* Quick Suggestions */}
      {!searchQuery && (
        <div className="px-6 mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Suggestions</h3>
          <div className="flex gap-2 overflow-x-auto">
            {["Computer Lab", "Study Room", "Library", "Lecture Hall"].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                className="whitespace-nowrap glass"
                onClick={() => setSearchQuery(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="px-6 space-y-3">
        {filteredRooms.length === 0 && searchQuery && (
          <Card className="glass-card p-6 text-center">
            <div className="text-muted-foreground">
              No rooms found for "{searchQuery}"
            </div>
          </Card>
        )}

        {filteredRooms.map((room) => (
          <Card 
            key={room.id} 
            className="glass-card p-4 space-y-3 cursor-pointer hover:scale-[1.02] smooth-transition"
            onClick={() => handleRoomClick(room)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{room.number}</h3>
                  <Badge className={getTypeColor(room.type)}>{room.type}</Badge>
                </div>
                <p className="text-muted-foreground text-sm">{room.name}</p>
                <p className="text-muted-foreground text-sm">{room.building} • {room.floor}</p>
              </div>
              <Button 
                size="icon" 
                variant="outline" 
                className="glass"
                onClick={(e) => {
                  e.stopPropagation();
                  // Toggle bookmark
                }}
              >
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-primary">{room.distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className={getAvailabilityColor(room.availability)}>
                  {room.availability}
                </span>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {room.features.slice(0, 3).map((feature) => (
                <Badge key={feature} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {room.features.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{room.features.length - 3} more
                </Badge>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <Button 
                size="sm" 
                className="flex-1 smooth-transition"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate(room);
                }}
              >
                <Navigation className="w-3 h-3 mr-1" />
                Navigate
              </Button>
              <Button size="sm" variant="outline" className="flex-1 glass">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default RoomFinder;