
package com.markkuvaara.mediasocial.service;

import com.markkuvaara.mediasocial.dto.AuthResponse;
import com.markkuvaara.mediasocial.exception.AuthenticationFailedException;
import com.markkuvaara.mediasocial.model.User;
import com.markkuvaara.mediasocial.repository.UserRepository;
import com.markkuvaara.mediasocial.security.JwtUtil;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse authenticate(String name, String rawPassword) {

        Optional<User> userOpt = userRepository.findByName(name);

        if (userOpt.isEmpty()) {
            throw new AuthenticationFailedException("Invalid credentials");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new AuthenticationFailedException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getName());
        Date exp = jwtUtil.extractExpiration(token);
        LocalDateTime expiresAt = exp.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

        return new AuthResponse(token, expiresAt);

    }

}
