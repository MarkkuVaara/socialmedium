
package com.markkuvaara.mediasocial.controller;

import com.markkuvaara.mediasocial.dto.AuthResponse;
import com.markkuvaara.mediasocial.dto.LoginRequest;
import com.markkuvaara.mediasocial.model.User;
import com.markkuvaara.mediasocial.repository.UserRepository;
import com.markkuvaara.mediasocial.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final JwtUtil jwtUtil;

    @Autowired
    public LoginController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {

        Optional<User> userOptional = userRepository.findByName(loginRequest.getName());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(401).build();
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).build();
        }

        String jwtToken = jwtUtil.generateToken(loginRequest.getName());

        Date expirationDate = jwtUtil.extractExpiration(jwtToken);
        LocalDateTime expiresAt = expirationDate.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();

        AuthResponse response = new AuthResponse(jwtToken, expiresAt);
        return ResponseEntity.ok(response);

    }

}
