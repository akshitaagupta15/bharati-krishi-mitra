import { useState } from "react";
import { X, Send, Mic, Camera, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  language?: string;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatInterface = ({ isOpen, onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "నమస్కారం! నేను KisanAI సహాయకుడిని. మీ వ్యవసాయ సమస్యలకు నేను ఎలా సహాయం చేయగలను? (Hello! I'm KisanAI assistant. How can I help with your farming needs?)",
      timestamp: new Date(),
      language: "Telugu"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("Telugu");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: getSimulatedResponse(inputValue),
        timestamp: new Date(),
        language: currentLanguage
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);

    setInputValue("");
  };

  const getSimulatedResponse = (query: string): string => {
    const responses = {
      "Telugu": {
        weather: "వాతావరణం: రేపు భారీ వర్షాలు వస్తాయి. నీటిపారుదల తగ్గించండి మరియు పంటలను కాపాడండి.",
        crop: "మీ పంట చాలా బాగుంది! కానీ కొన్ని ఆకులపై చిన్న వ్యాధి లక్షణాలు కనిపిస్తున్నాయి. సేంద్రీయ కీటనాశకం వాడండి.",
        soil: "మీ మట్టిలో నత్రజని శాతం తక్కువగా ఉంది. యూరియా ఎరువును వేసి నీరు పోయండి.",
        default: "దయచేసి మరింత వివరాలు చెప్పండి. మీ సమస్య గురించి నేను మరింత సహాయం చేయగలను."
      },
      "English": {
        weather: "Weather Update: Heavy rainfall expected tomorrow. Reduce irrigation and protect crops with proper drainage.",
        crop: "Your crop looks healthy! However, I notice some early disease symptoms on leaves. Apply organic pesticide immediately.",
        soil: "Soil analysis shows low nitrogen levels. Apply urea fertilizer with adequate watering.",
        default: "Please provide more details about your specific farming concern. I'm here to help with personalized advice."
      }
    };

    const lang = currentLanguage as keyof typeof responses;
    const langResponses = responses[lang];

    if (query.toLowerCase().includes("weather") || query.includes("వాతావరణం")) {
      return langResponses.weather;
    } else if (query.toLowerCase().includes("crop") || query.includes("పంట")) {
      return langResponses.crop;
    } else if (query.toLowerCase().includes("soil") || query.includes("మట్టి")) {
      return langResponses.soil;
    } else {
      return langResponses.default;
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here you would integrate with speech recognition API
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[80vh] sm:h-[600px] flex flex-col">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 border-b bg-gradient-agricultural text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">AI</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
            </div>
            <div>
              <CardTitle className="text-white">Gemini AI Assistant</CardTitle>
              <p className="text-sm text-white/80">Multilingual farming expert</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              <Languages className="w-3 h-3 mr-1" />
              {currentLanguage}
            </Badge>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/10">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                      {message.language && ` • ${message.language}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleListening}
                className={isListening ? "bg-destructive text-destructive-foreground" : ""}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Camera className="h-4 w-4" />
              </Button>
              <Input
                placeholder={currentLanguage === "Telugu" ? "మీ ప్రశ్న టైప్ చేయండి..." : "Type your question..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex space-x-2">
                {["Telugu", "English", "Hindi"].map((lang) => (
                  <Button
                    key={lang}
                    variant={currentLanguage === lang ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentLanguage(lang)}
                    className="text-xs px-2 py-1 h-auto"
                  >
                    {lang}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Powered by Gemini AI • 32 languages supported
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};