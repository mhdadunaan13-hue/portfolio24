package com.adunaan.portfolio;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContactController {
    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> contact(@RequestBody ContactMessage message) {
        if (blank(message.name()) || blank(message.email()) ||
            blank(message.subject()) || blank(message.message()) ||
            !message.email().matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            return ResponseEntity.badRequest().body(Map.of(
                "status", "error",
                "message", "Please provide a valid name, email, subject, and message."
            ));
        }
        // No email provider is configured. Do not claim the message was delivered.
        return ResponseEntity.ok(Map.of(
            "status", "not_configured",
            "message", "The form was validated, but email delivery is not configured yet. Please use the email link instead."
        ));
    }
    private boolean blank(String value) { return value == null || value.trim().isEmpty(); }

    public record ContactMessage(String name, String email, String subject, String message) {}
}
