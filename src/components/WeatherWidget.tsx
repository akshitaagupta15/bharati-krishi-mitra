import { Cloud, CloudRain, Sun, Thermometer, Droplets, Wind, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const WeatherWidget = () => {
  const currentWeather = {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 8,
    icon: Cloud
  };

  const forecast = [
    { day: "Today", high: 32, low: 22, condition: "Sunny", icon: Sun, rain: 10 },
    { day: "Tomorrow", high: 29, low: 21, condition: "Rainy", icon: CloudRain, rain: 80 },
    { day: "Wed", high: 26, low: 19, condition: "Rainy", icon: CloudRain, rain: 90 },
    { day: "Thu", high: 30, low: 23, condition: "Cloudy", icon: Cloud, rain: 20 },
    { day: "Fri", high: 33, low: 24, condition: "Sunny", icon: Sun, rain: 5 }
  ];

  const WeatherIcon = currentWeather.icon;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Weather Monitoring</h2>
      
      {/* Current Weather */}
      <Card className="bg-gradient-sky">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Current Weather</CardTitle>
              <CardDescription className="text-white/80">Visakhapatnam, Andhra Pradesh</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">{currentWeather.temperature}°C</div>
              <div className="text-white/80">{currentWeather.condition}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 text-white/90">
              <Droplets className="h-4 w-4" />
              <div>
                <div className="text-sm font-medium">{currentWeather.humidity}%</div>
                <div className="text-xs text-white/70">Humidity</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Wind className="h-4 w-4" />
              <div>
                <div className="text-sm font-medium">{currentWeather.windSpeed} km/h</div>
                <div className="text-xs text-white/70">Wind</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Eye className="h-4 w-4" />
              <div>
                <div className="text-sm font-medium">{currentWeather.visibility} km</div>
                <div className="text-xs text-white/70">Visibility</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Thermometer className="h-4 w-4" />
              <div>
                <div className="text-sm font-medium">UV Index: 7</div>
                <div className="text-xs text-white/70">High</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
          <CardDescription>Plan your farming activities ahead</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {forecast.map((day, index) => {
              const DayIcon = day.icon;
              return (
                <div key={index} className="text-center p-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors">
                  <div className="text-sm font-medium text-foreground mb-2">{day.day}</div>
                  <DayIcon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="space-y-1">
                    <div className="text-sm font-semibold">{day.high}°/{day.low}°</div>
                    <div className="text-xs text-muted-foreground">{day.condition}</div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        day.rain > 70 
                          ? 'border-info text-info' 
                          : day.rain > 30 
                          ? 'border-warning text-warning' 
                          : 'border-success text-success'
                      }`}
                    >
                      {day.rain}% rain
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      <Card className="border-warning bg-warning/5">
        <CardHeader>
          <CardTitle className="text-warning flex items-center">
            <CloudRain className="mr-2 h-5 w-5" />
            Weather Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground">
            Heavy rainfall expected tomorrow evening. Consider adjusting irrigation schedules and protecting vulnerable crops.
          </p>
          <div className="mt-3 text-xs text-muted-foreground">
            Alert issued: Today 2:30 PM | Valid until: Tomorrow 11:59 PM
          </div>
        </CardContent>
      </Card>
    </div>
  );
};