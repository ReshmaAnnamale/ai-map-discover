import { Home, MessageSquare, CheckSquare, MapPin, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const tabs = [
    { id: "/", icon: Home, label: "Home", path: "/" },
    { id: "/chat", icon: MessageSquare, label: "Chat", path: "/chat" },
    { id: "/todo", icon: CheckSquare, label: "To-Do", path: "/todo" },
    { id: "/location", icon: MapPin, label: "Location", path: "/location" },
    { id: "/profile", icon: User, label: "Profile", path: "/profile" }
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.path);
    navigate(tab.path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/20 z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`
                flex flex-col items-center justify-center p-3 rounded-2xl
                transition-all duration-300 transform hover:scale-105
                ${isActive 
                  ? 'bg-primary text-primary-foreground shadow-glow scale-105' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }
              `}
            >
              <div className={`
                relative transition-all duration-300
                ${isActive ? 'animate-bounce' : ''}
              `}>
                <Icon className={`w-5 h-5 transition-all duration-300 ${
                  isActive ? 'scale-110' : ''
                }`} />
                
                {/* Glow effect for active tab */}
                {isActive && (
                  <div className="absolute inset-0 bg-primary rounded-full blur-sm opacity-30 animate-pulse"></div>
                )}
              </div>
              
              <span className={`
                text-xs font-medium mt-1 transition-all duration-300
                ${isActive ? 'opacity-100 scale-100' : 'opacity-70 scale-95'}
              `}>
                {tab.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-accent rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;