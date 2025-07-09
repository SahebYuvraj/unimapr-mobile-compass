import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NotificationPreferencesDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPreferencesDialog = ({ isOpen, onClose }: NotificationPreferencesDialogProps) => {
  const [preferences, setPreferences] = useState({
    classReminders: true,
    eventNotifications: true,
    emergencyAlerts: true,
    weeklySchedule: false,
    reminderTiming: "15", // minutes before
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00"
  });

  const handleSave = () => {
    // Save notification preferences
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Notification Preferences</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Class & Schedule</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="class-reminders">Class Reminders</Label>
              <Switch
                id="class-reminders"
                checked={preferences.classReminders}
                onCheckedChange={(checked) => 
                  setPreferences({...preferences, classReminders: checked})
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-schedule">Weekly Schedule Summary</Label>
              <Switch
                id="weekly-schedule"
                checked={preferences.weeklySchedule}
                onCheckedChange={(checked) => 
                  setPreferences({...preferences, weeklySchedule: checked})
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Reminder Timing</Label>
              <Select 
                value={preferences.reminderTiming} 
                onValueChange={(value) => setPreferences({...preferences, reminderTiming: value})}
              >
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes before</SelectItem>
                  <SelectItem value="10">10 minutes before</SelectItem>
                  <SelectItem value="15">15 minutes before</SelectItem>
                  <SelectItem value="30">30 minutes before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Events & Social</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="event-notifications">Event Notifications</Label>
              <Switch
                id="event-notifications"
                checked={preferences.eventNotifications}
                onCheckedChange={(checked) => 
                  setPreferences({...preferences, eventNotifications: checked})
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Emergency & Important</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
              <Switch
                id="emergency-alerts"
                checked={preferences.emergencyAlerts}
                onCheckedChange={(checked) => 
                  setPreferences({...preferences, emergencyAlerts: checked})
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Quiet Hours</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
              <Switch
                id="quiet-hours"
                checked={preferences.quietHours}
                onCheckedChange={(checked) => 
                  setPreferences({...preferences, quietHours: checked})
                }
              />
            </div>
            {preferences.quietHours && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From</Label>
                  <Select 
                    value={preferences.quietStart} 
                    onValueChange={(value) => setPreferences({...preferences, quietStart: value})}
                  >
                    <SelectTrigger className="glass">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20:00">8:00 PM</SelectItem>
                      <SelectItem value="21:00">9:00 PM</SelectItem>
                      <SelectItem value="22:00">10:00 PM</SelectItem>
                      <SelectItem value="23:00">11:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>To</Label>
                  <Select 
                    value={preferences.quietEnd} 
                    onValueChange={(value) => setPreferences({...preferences, quietEnd: value})}
                  >
                    <SelectTrigger className="glass">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="06:00">6:00 AM</SelectItem>
                      <SelectItem value="07:00">7:00 AM</SelectItem>
                      <SelectItem value="08:00">8:00 AM</SelectItem>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Preferences
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};