package me.umbrella.controller;

import java.io.UnsupportedEncodingException;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import me.umbrella.model.User;
import me.umbrella.repository.UserRepository;
import me.umbrella.services.CookieService;
import me.umbrella.services.EmailService;

@Controller
public class UmbrellaController {

    private final UserRepository ur;
    public UmbrellaController(UserRepository ur) {
        this.ur = ur;
    }

    @Autowired
    private EmailService emailService;

    @GetMapping("/weather")
    public String weather(User user, Model model, HttpServletRequest request) throws UnsupportedEncodingException {
        String hasCookie = CookieService.getCookie(request, "UserId");

        int HourNow = LocalTime.now().getHour();

        if (hasCookie != null) {
            model.addAttribute("name", CookieService.getCookie(request, "UserName"));
            if (HourNow >= 5 && HourNow <= 12) {
                model.addAttribute("hour", "Bom-dia");
            } else if (HourNow >= 13 && HourNow <= 18) {
                model.addAttribute("hour", "Boa-tarde");
            } else {
                model.addAttribute("hour", "Boa-noite");
            }
            
            return "index";
        }
        return "index";
    }

    @GetMapping("/radar")
    public String radar(User user, Model model, HttpServletRequest request) throws UnsupportedEncodingException {
        String hasCookie = CookieService.getCookie(request, "UserId");
        int HourNow = LocalTime.now().getHour();

        if (hasCookie != null) {
            model.addAttribute("name", CookieService.getCookie(request, "UserName"));
            if (HourNow >= 5) {
                model.addAttribute("hour", "Bom-dia");
            } else if (HourNow >= 13) {
                model.addAttribute("hour", "Boa-tarde");
            } else {
                model.addAttribute("hour", "Boa-noite");
            }
            
            return "radar";
        }
        return "radar";
    }

    @GetMapping("/history")
    public String history(User user, Model model, HttpServletRequest request) throws UnsupportedEncodingException {
        String hasCookie = CookieService.getCookie(request, "UserId");
        int HourNow = LocalTime.now().getHour();

        if (hasCookie != null) {
            model.addAttribute("name", CookieService.getCookie(request, "UserName"));
            if (HourNow >= 5) {
                model.addAttribute("hour", "Bom-dia");
            } else if (HourNow >= 13) {
                model.addAttribute("hour", "Boa-tarde");
            } else {
                model.addAttribute("hour", "Boa-noite");
            }
            
            return "history";
        }
        return "history";
    }

    @GetMapping("/health")
    public String health(User user, Model model, HttpServletRequest request) throws UnsupportedEncodingException {
        String hasCookie = CookieService.getCookie(request, "UserId");
        int HourNow = LocalTime.now().getHour();

        if (hasCookie != null) {
            model.addAttribute("name", CookieService.getCookie(request, "UserName"));
            if (HourNow >= 5) {
                model.addAttribute("hour", "Bom-dia");
            } else if (HourNow >= 13) {
                model.addAttribute("hour", "Boa-tarde");
            } else {
                model.addAttribute("hour", "Boa-noite");
            }
            
            return "health";
        }
        return "health";
    }

    @GetMapping("/nature")
    public String nature(User user, Model model, HttpServletRequest request) throws UnsupportedEncodingException {
        String hasCookie = CookieService.getCookie(request, "UserId");
        int HourNow = LocalTime.now().getHour();

        if (hasCookie != null) {
            model.addAttribute("name", CookieService.getCookie(request, "UserName"));
            if (HourNow >= 5) {
                model.addAttribute("hour", "Bom-dia");
            } else if (HourNow >= 13) {
                model.addAttribute("hour", "Boa-tarde");
            } else {
                model.addAttribute("hour", "Boa-noite");
            }
            
            return "nature";
        }
        return "nature";
    }

    @GetMapping("/policy")
    public String policy() {
        return "policy";
    }

    @GetMapping("/credits")
    public String credits() {
        return "credits";
    }

    @GetMapping("/sign-up")
    public String signUp() {
        return "sign-up";
    }

    @RequestMapping(value = "/sign-up", method = RequestMethod.POST)
    public String signUpUser(@Valid User user, BindingResult result) {
        if (result.hasErrors()) {
            return "redirect:/sign-up";
        } else {
            ur.save(user);
            return "redirect:/login";
        }
    }

    @GetMapping("/password")
    public String password() {
        return "password";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/logged-in")
    public String loggedIn(User user, Model model, HttpServletResponse response) throws UnsupportedEncodingException, MessagingException {
        User userLoggedIn = this.ur.login(user.getEmail(), user.getPassword());

        if (userLoggedIn != null) {
            CookieService.setCookie(response, "UserId", String.valueOf(userLoggedIn.getId()), 31536000);
            CookieService.setCookie(response, "UserName", String.valueOf(userLoggedIn.getName()), 31536000);

            String nomeDoUsuario = user.getName();
        
            String htmlContent = ""
            + "<!DOCTYPE html>\n"
            + "<html lang=\"pt-BR\">\n"
            + "<head>\n"
            + "    <meta charset=\"UTF-8\">\n"
            + "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n"
            + "    <title>Bem-vindo ao nosso site!</title>\n"
            + "    <style>\n"
            + "        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }\n"
            + "        .email-container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }\n"
            + "        .header { text-align: center; padding-bottom: 20px; }\n"
            + "        .header h1 { color: #333; }\n"
            + "        .content { font-size: 16px; color: #555; line-height: 1.6; }\n"
            + "        .footer { font-size: 14px; text-align: center; color: #888; padding-top: 20px; border-top: 1px solid #e1e1e1; }\n"
            + "        .button { display: inline-block; background-color: #4CAF50; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; }\n"
            + "    </style>\n"
            + "</head>\n"
            + "<body>\n"
            + "    <div class=\"email-container\">\n"
            + "        <div class=\"header\">\n"
            + "            <h1>Olá, " + nomeDoUsuario + "!</h1>\n"
            + "        </div>\n"
            + "        <div class=\"content\">\n"
            + "            <p>Obrigado por fazer login no nosso site. Estamos felizes por tê-lo conosco!</p>\n"
            + "            <p>Este e-mail foi enviado para confirmar que sua conta foi acessada com sucesso. Se você não foi quem fez login ou se não reconhece esta ação, por favor, entre em contato conosco imediatamente.</p>\n"
            + "        </div>\n"
            + "        <div class=\"footer\">\n"
            + "            <p>Se você não fez login ou não reconhece essa atividade, por favor, ignore este e-mail ou entre em contato com nosso suporte.</p>\n"
            + "            <p>Atenciosamente,</p>\n"
            + "            <p><strong>Equipe do Seu Site</strong></p>\n"
            + "        </div>\n"
            + "    </div>\n"
            + "</body>\n"
            + "</html>";
    
            emailService.sendEmail(user.getEmail(), "Obrigado por usar o Umbrella!", htmlContent);

            return "redirect:/weather";
        } else {
            model.addAttribute("erro", "Usuário invalido!");
            return "login";
        }   
    }
}