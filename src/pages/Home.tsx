import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Upload, Camera, Sparkles, MapPin, MessageSquare, CheckSquare } from "lucide-react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const features = [
    {
      icon: Camera,
      title: "Discover from Images",
      description: "Upload any photo and discover places, products, and experiences",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: MessageSquare,
      title: "Smart AI Assistant",
      description: "Get personalized recommendations through natural conversation",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: CheckSquare,
      title: "Smart To-Do Integration",
      description: "Convert discoveries into actionable tasks with location context",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Location-Aware Suggestions",
      description: "Find relevant places and activities based on your location",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative mobile-padding pt-16 pb-12">
        {/* Background Effects */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display gradient-text mb-4 leading-tight">
            What's on your mind?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover, explore, and organize your world with AI-powered search
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="neumorphic-card p-2 flex items-center space-x-2">
            <div className="flex-1 flex items-center space-x-3 px-4">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search anything, anywhere..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-none bg-transparent focus:ring-0 text-base"
              />
            </div>
            <div className="flex space-x-2">
              <Button size="icon" variant="ghost" className="hover:bg-secondary/50">
                <Upload className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-secondary/50">
                <Camera className="w-4 h-4" />
              </Button>
              <Button className="btn-glow px-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["Find restaurants nearby", "Plan weekend trip", "Discover new places", "Shopping recommendations"].map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="neumorphic-card border-border/20 hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              {action}
            </Button>
          ))}
        </div>
      </div>

      {/* Features Showcase */}
      <div className="mobile-padding pb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display gradient-text mb-4">
            Discover Smarter
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From images to errands, mapped beautifully for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="neumorphic-card border-border/20 hover:border-primary/30 transition-all duration-500 hover:scale-105 group overflow-hidden relative"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 bg-gradient-to-br ${feature.gradient} rounded-2xl`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-display">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mobile-padding pb-20">
        <div className="text-center neumorphic-card p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-display gradient-text mb-4">
            Ready to explore?
          </h3>
          <p className="text-muted-foreground mb-6">
            Start your journey with Lookate today
          </p>
          <Button className="btn-glow px-8 py-6 text-base">
            <Sparkles className="w-5 h-5 mr-2" />
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;