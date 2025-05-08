package me.umbrella.controller;

import java.io.UnsupportedEncodingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import me.umbrella.dto.LocationRequest;
import me.umbrella.dto.WeatherResponse;
import me.umbrella.services.CookieService;
import me.umbrella.services.WeatherService;

@RestController
@RequestMapping("/api")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @PostMapping("/local")
    public ResponseEntity<WeatherResponse> getLocal(@RequestBody LocationRequest request, HttpServletResponse response) 
    throws UnsupportedEncodingException {
        WeatherResponse weather = weatherService.getWeatherByLatAndLon(request.getLatitude(), request.getLongitude());

        CookieService.setCookie(response, "UserLat", String.valueOf(request.getLatitude()) , 86400);
        CookieService.setCookie(response, "UserLon", String.valueOf(request.getLongitude()), 86400);

        return ResponseEntity.ok(weather);
    }
}
