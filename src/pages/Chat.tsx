import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Send, Upload, Camera, Sparkles, Bot } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI assistant. I can help you discover places, plan activities, and organize your tasks. What can I help you with today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userMessage: string): string => {
    const responses = [
      "I'd love to help you with that! Let me search for the best options in your area.",
      "That sounds interesting! I can find some great recommendations for you.",
      "Based on your preferences, I have some excellent suggestions to share.",
      "Perfect! I can help you plan that and add it to your to-do list if you'd like.",
      "Great question! Let me find the most relevant information for you."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="neumorphic-card m-4 mb-0 p-4 flex items-center space-x-3 border-border/20">
        <div className="relative">
          <Avatar className="w-10 h-10 bg-gradient-primary">
            <AvatarFallback className="bg-transparent">
              <Bot className="w-5 h-5 text-white" />
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
        </div>
        <div>
          <h2 className="text-lg font-display font-semibold">AI Assistant</h2>
          <p className="text-sm text-muted-foreground">Always here to help</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-[80%] ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <Avatar className={`w-8 h-8 ${
                message.type === 'ai' 
                  ? 'bg-gradient-primary' 
                  : 'bg-gradient-secondary'
              }`}>
                <AvatarFallback className="bg-transparent text-white text-xs">
                  {message.type === 'ai' ? <Bot className="w-4 h-4" /> : 'U'}
                </AvatarFallback>
              </Avatar>
              
              <Card className={`p-3 ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'neumorphic-card border-border/20'
              } transition-all duration-300 hover:scale-105`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.type === 'user' 
                    ? 'text-primary-foreground/70' 
                    : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </Card>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-2">
              <Avatar className="w-8 h-8 bg-gradient-primary">
                <AvatarFallback className="bg-transparent">
                  <Bot className="w-4 h-4 text-white" />
                </AvatarFallback>
              </Avatar>
              <Card className="neumorphic-card border-border/20 p-3">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 pt-0">
        <div className="neumorphic-card p-3 flex items-center space-x-3">
          <Button size="icon" variant="ghost" className="hover:bg-secondary/50">
            <Upload className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" className="hover:bg-secondary/50">
            <Camera className="w-4 h-4" />
          </Button>
          <Input
            placeholder="Ask me anything..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border-none bg-transparent focus:ring-0"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim()}
            className="btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {["Find restaurants", "Plan a trip", "Shopping ideas", "Local events"].map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInputMessage(suggestion)}
              className="neumorphic-card border-border/20 hover:border-primary/50 text-xs"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;