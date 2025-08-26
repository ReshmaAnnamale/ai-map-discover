import { useEffect, useState } from "react";
import { MapPin, MessageSquare, CheckSquare, User } from "lucide-react";

const SplashScreen = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const steps = [
      { delay: 0, step: 1 },
      { delay: 500, step: 2 },
      { delay: 1000, step: 3 },
      { delay: 1500, step: 4 },
      { delay: 2000, step: 5 }
    ];

    steps.forEach(({ delay, step }) => {
      setTimeout(() => setAnimationStep(step), delay);
    });
  }, []);

  const icons = [
    { Icon: MapPin, delay: "delay-100", position: "top-20 left-20" },
    { Icon: MessageSquare, delay: "delay-200", position: "top-32 right-24" },
    { Icon: CheckSquare, delay: "delay-300", position: "bottom-40 left-16" },
    { Icon: User, delay: "delay-500", position: "bottom-32 right-20" }
  ];

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10 animate-pulse"></div>
      
      {/* Flying Icons */}
      {animationStep >= 2 && icons.map((icon, index) => (
        <div
          key={index}
          className={`absolute ${icon.position} ${icon.delay} transition-all duration-1000 transform`}
          style={{
            animation: `floating 3s ease-in-out infinite ${index * 0.2}s, 
                       bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s`
          }}
        >
          <div className="neumorphic-card p-4 accent-glow">
            <icon.Icon className="w-8 h-8 text-accent" />
          </div>
        </div>
      ))}

      {/* Main Logo */}
      <div className="text-center relative z-10">
        <div className={`transition-all duration-1000 transform ${
          animationStep >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}>
          <h1 className="text-6xl md:text-8xl font-display gradient-text mb-4 pulse-glow">
            LOOkate
          </h1>
          <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Tagline */}
        <div className={`mt-8 transition-all duration-1000 delay-1000 transform ${
          animationStep >= 4 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Snap it. Find it. Do it. 
            <span className="text-accent font-semibold"> Smarter.</span>
          </p>
        </div>

        {/* Loading Animation */}
        <div className={`mt-12 transition-all duration-500 delay-2000 ${
          animationStep >= 5 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s`, animationDuration: '1s' }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30"></div>
    </div>
  );
};

export default SplashScreen;