package me.umbrella.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import me.umbrella.dto.WeatherResponse;
import java.util.HashMap;
import java.util.Map;

@Service
public class WeatherService {

    private final RestTemplate restTemplate;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public WeatherResponse getWeatherByLatAndLon(double lat, double lon) {
        String url = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apiKey}&lang=pt";

        Map<String, String> params = new HashMap<>();
        params.put("lat", String.valueOf(lat));
        params.put("lon", String.valueOf(lon));
        params.put("apiKey", "c0fc805ee5918c959b4939a7ba6e645d");

        return restTemplate.getForObject(url, WeatherResponse.class, params);
    }
}
