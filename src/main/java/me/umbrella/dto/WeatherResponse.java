package me.umbrella.dto;

import java.util.List;

public class WeatherResponse {
    private String name;
    private Main main;
    private List<Weather> weather;
    private double temp_min;
    private double temp_max;

    public double getTemp_min() {return temp_min;}
    public void setTemp_min(double temp_min) {this.temp_min = temp_min;}

    public double getTemp_max() {return temp_max;}
    public void setTemp_max(double temp_max) {this.temp_max = temp_max;}

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public Main getMain() {return main;}
    public void setMain(Main main) {this.main = main;}

    public List<Weather> getWeather() {return weather;}
    public void setWeather(List<Weather> weather) {this.weather = weather;}

    public static class Main {
        private double temp;
        private double feels_like;
    
        public double getTemp() { return temp; }
        public void setTemp(double temp) { this.temp = temp; }

        public double getFeels_like() {return feels_like;}
        public void setFeels_like(double feels_like) {this.feels_like = feels_like;}
    }

    public static class Weather {
        private String main;
        private String description;
        private String icon;


        public String getMain() { return main; }
        public void setMain(String main) { this.main = main; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public String getIcon() {return icon;}
        public void setIcon(String icon) {this.icon = icon;}
    }
}
