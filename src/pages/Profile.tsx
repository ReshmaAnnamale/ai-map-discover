import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  MapPin, 
  Heart, 
  Clock, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle,
  LogOut,
  Sparkles,
  Trophy,
  Target
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    joinDate: "March 2024",
    avatar: "AJ",
    level: "Explorer",
    points: 1250,
    placesVisited: 42,
    tasksCompleted: 89,
    savedPlaces: 15
  };

  const recentActivity = [
    { id: 1, action: "Visited Artisan Coffee House", time: "2 hours ago", icon: MapPin },
    { id: 2, action: "Completed 'Buy groceries' task", time: "1 day ago", icon: Target },
    { id: 3, action: "Saved Central Park to wishlist", time: "2 days ago", icon: Heart },
    { id: 4, action: "Discovered 3 new restaurants", time: "3 days ago", icon: Sparkles }
  ];

  const achievements = [
    { id: 1, title: "First Steps", description: "Complete your first task", earned: true },
    { id: 2, title: "Explorer", description: "Visit 10 different places", earned: true },
    { id: 3, title: "Social Butterfly", description: "Share 5 discoveries", earned: false },
    { id: 4, title: "Task Master", description: "Complete 100 tasks", earned: false }
  ];

  const menuItems = [
    { icon: Bell, label: "Notifications", badge: "3" },
    { icon: Settings, label: "Settings" },
    { icon: Shield, label: "Privacy & Security" },
    { icon: HelpCircle, label: "Help & Support" },
    { icon: LogOut, label: "Sign Out", danger: true }
  ];

  return (
    <div className="min-h-screen bg-background mobile-padding pt-16 pb-20">
      {/* Profile Header */}
      <Card className="neumorphic-card border-border/20 mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="w-20 h-20 bg-gradient-primary text-2xl">
              <AvatarFallback className="bg-transparent text-white font-bold">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-display font-bold gradient-text">
                {user.name}
              </h1>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className="bg-accent text-accent-foreground">
                  {user.level}
                </Badge>
                <Badge variant="outline" className="border-primary/50">
                  {user.points} points
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 neumorphic-card">
              <div className="text-2xl font-bold text-primary">{user.placesVisited}</div>
              <div className="text-xs text-muted-foreground">Places Visited</div>
            </div>
            <div className="text-center p-3 neumorphic-card">
              <div className="text-2xl font-bold text-accent">{user.tasksCompleted}</div>
              <div className="text-xs text-muted-foreground">Tasks Done</div>
            </div>
            <div className="text-center p-3 neumorphic-card">
              <div className="text-2xl font-bold text-pink-500">{user.savedPlaces}</div>
              <div className="text-xs text-muted-foreground">Saved Places</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="neumorphic-card border-border/20 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span>Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                  achievement.earned
                    ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
                    : 'bg-muted/20 border-border/20'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Trophy className={`w-4 h-4 ${
                    achievement.earned ? 'text-yellow-500' : 'text-muted-foreground'
                  }`} />
                  <span className={`text-sm font-medium ${
                    achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {achievement.title}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="neumorphic-card border-border/20 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-card rounded-lg">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <Card className="neumorphic-card border-border/20">
        <CardContent className="p-0">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className={`
                  w-full flex items-center justify-between p-4 hover:bg-secondary/30 
                  transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl
                  ${item.danger ? 'text-destructive' : ''}
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <Badge className="bg-accent text-accent-foreground text-xs">
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        Member since {user.joinDate}
      </div>
    </div>
  );
};

export default Profile;