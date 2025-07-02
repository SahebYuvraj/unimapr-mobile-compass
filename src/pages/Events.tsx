import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/BottomNav";
import { BottomSheet } from "@/components/BottomSheet";
import { Search, Filter, Calendar, MapPin, Users, Heart } from "lucide-react";

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = ["Music", "Tech", "Sports", "Academic", "Social", "Art"];

  const events = [
    {
      id: 1,
      name: "Tech Club Hackathon",
      description: "24-hour coding challenge with prizes and networking",
      time: "Saturday 9:00 AM",
      location: "Computer Science Building",
      attendees: 45,
      maxAttendees: 60,
      tags: ["Tech", "Academic"],
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400",
      organizer: "Tech Society"
    },
    {
      id: 2,
      name: "Spring Music Festival",
      description: "Live performances by student bands and local artists",
      time: "Friday 6:00 PM",
      location: "Main Quad",
      attendees: 120,
      maxAttendees: 200,
      tags: ["Music", "Social"],
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      organizer: "Music Club"
    },
    {
      id: 3,
      name: "Career Fair 2024",
      description: "Meet recruiters from top companies and startups",
      time: "Wednesday 10:00 AM",
      location: "Student Center",
      attendees: 200,
      maxAttendees: 300,
      tags: ["Academic"],
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      organizer: "Career Services"
    },
    {
      id: 4,
      name: "Basketball Tournament",
      description: "Inter-college basketball championship finals",
      time: "Sunday 2:00 PM",
      location: "Sports Complex",
      attendees: 80,
      maxAttendees: 150,
      tags: ["Sports"],
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400",
      organizer: "Athletics Department"
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => event.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Events</h1>
            <p className="text-muted-foreground">Discover what's happening on campus</p>
          </div>
          <Button size="icon" variant="outline" className="glass">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass"
          />
        </div>

        {/* Tags Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer whitespace-nowrap smooth-transition ${
                selectedTags.includes(tag) ? "" : "glass"
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="px-6 space-y-4">
        {filteredEvents.map((event) => (
          <Card 
            key={event.id} 
            className="glass-card overflow-hidden cursor-pointer hover:scale-[1.02] smooth-transition"
            onClick={() => handleEventClick(event)}
          >
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex gap-2 mb-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-white/20 text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-white">{event.name}</h3>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <p className="text-muted-foreground text-sm">{event.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-foreground">
                    {event.attendees}/{event.maxAttendees} attending
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">by {event.organizer}</span>
                <Button size="sm" variant="outline" className="glass">
                  <Heart className="w-3 h-3 mr-1" />
                  Interested
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Event Details Bottom Sheet */}
      <BottomSheet isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
        {selectedEvent && (
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{selectedEvent.name}</h3>
              <p className="text-muted-foreground">{selectedEvent.description}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{selectedEvent.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">
                  {selectedEvent.attendees}/{selectedEvent.maxAttendees} attending
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              {selectedEvent.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 smooth-transition">
                RSVP to Event
              </Button>
              <Button variant="outline" className="flex-1 glass">
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </div>
        )}
      </BottomSheet>

      <BottomNav />
    </div>
  );
};

export default Events;