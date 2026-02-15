package com.todo.controller;

import com.todo.model.User;
import com.todo.repository.UserRepository;
import com.todo.security.JwtUtil;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // --- DTOs ---
    public static class SignUpRequest {
        @NotBlank
        public String name;
        @NotBlank
        @Email
        public String email;
        @NotBlank
        @Size(min = 6)
        public String password;
    }

    public static class SignInRequest {
        @NotBlank
        @Email
        public String email;
        @NotBlank
        public String password;
    }

    // --- Endpoints ---

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp(@Valid @RequestBody SignUpRequest request) {
        if (userRepository.existsByEmail(request.email)) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", "Email already registered");
            return new ResponseEntity<>(error, HttpStatus.CONFLICT);
        }

        User user = new User(request.name, request.email, passwordEncoder.encode(request.password));
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getId(), user.getEmail());
        return ResponseEntity.ok(buildAuthResponse(user, token));
    }

    @PostMapping("/signin")
    public ResponseEntity<Map<String, Object>> signIn(@Valid @RequestBody SignInRequest request) {
        User user = userRepository.findByEmail(request.email)
                .orElse(null);

        if (user == null || !passwordEncoder.matches(request.password, user.getPassword())) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", "Invalid email or password");
            return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
        }

        String token = jwtUtil.generateToken(user.getId(), user.getEmail());
        return ResponseEntity.ok(buildAuthResponse(user, token));
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getMe(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        return ResponseEntity.ok(stats);
    }

    private Map<String, Object> buildAuthResponse(User user, String token) {
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        return response;
    }
}
