import { Leaf, Cloud, Droplets, Camera, MessageCircle, TrendingUp, Truck, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WeatherWidget } from "@/components/WeatherWidget";
import { ChatInterface } from "@/components/ChatInterface";
import { Header } from "@/components/Header";
import { useState } from "react";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const features = [
    {
      icon: Camera,
      title: "Crop Scanning",
      description: "Identify pests and diseases instantly",
      status: "Active",
      statusType: "success" as const,
      action: "Scan Crop"
    },
    {
      icon: Droplets,
      title: "Smart Irrigation",
      description: "Optimize water usage with AI recommendations",
      status: "Monitoring",
      statusType: "info" as const,
      action: "View Schedule"
    },
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Real-time crop pricing and trends",
      status: "Updated",
      statusType: "success" as const,
      action: "View Prices"
    },
    {
      icon: Truck,
      title: "Equipment Sharing",
      description: "Connect with farmers for tool sharing",
      status: "Available",
      statusType: "success" as const,
      action: "Find Tools"
    }
  ];

  const alerts = [
    {
      type: "warning" as const,
      message: "Heavy rainfall expected tomorrow. Adjust irrigation accordingly.",
      time: "2 hours ago"
    },
    {
      type: "info" as const,
      message: "Soil moisture levels optimal for wheat in North field.",
      time: "4 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-agricultural py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Leaf className="h-12 w-12 text-primary-foreground mr-4" />
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground">
              KisanAI
            </h1>
          </div>
          <p className="text-xl lg:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            AI-powered agricultural advisory system for smarter farming decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Camera className="mr-2 h-5 w-5" />
              Start Crop Scan
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Ask Gemini AI
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-warning" />
              Important Alerts
            </h2>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <Card key={index} className={`border-l-4 ${
                  alert.type === 'warning' ? 'border-l-warning bg-warning/5' : 'border-l-info bg-info/5'
                }`}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-foreground">{alert.message}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{alert.time}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Weather Widget */}
        <div className="mb-8">
          <WeatherWidget />
        </div>

        {/* Features Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Agricultural Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-agricultural transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <IconComponent className="h-8 w-8 text-primary" />
                      <Badge 
                        variant={feature.statusType === 'success' ? 'default' : 'secondary'}
                        className={
                          feature.statusType === 'success' 
                            ? 'bg-success text-success-foreground' 
                            : feature.statusType === 'info' 
                            ? 'bg-info text-info-foreground' 
                            : ''
                        }
                      >
                        {feature.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-sm">
                      {feature.description}
                    </CardDescription>
                    <Button variant="outline" className="w-full" size="sm">
                      {feature.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Soil Health Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-primary" />
                Soil Health Dashboard
              </CardTitle>
              <CardDescription>
                Real-time soil conditions and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-success">7.2</div>
                  <div className="text-sm text-muted-foreground">pH Level</div>
                  <div className="text-xs text-success">Optimal</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-info">45%</div>
                  <div className="text-sm text-muted-foreground">Moisture</div>
                  <div className="text-xs text-info">Good</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Nitrogen</span>
                  <span className="text-success">High</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Phosphorus</span>
                  <span className="text-warning">Medium</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Potassium</span>
                  <span className="text-success">High</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" onClick={() => setIsChatOpen(true)}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat with Gemini AI
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Camera className="mr-2 h-4 w-4" />
                Scan Field Images
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Cloud className="mr-2 h-4 w-4" />
                Weather Forecast
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                Market Updates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chat Interface */}
      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;