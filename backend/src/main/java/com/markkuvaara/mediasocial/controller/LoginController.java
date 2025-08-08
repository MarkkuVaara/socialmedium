
package com.markkuvaara.mediasocial.controller;

import com.markkuvaara.mediasocial.dto.AuthResponse;
import com.markkuvaara.mediasocial.dto.LoginRequest;
import com.markkuvaara.mediasocial.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private final AuthService authService;

    public LoginController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {

        AuthResponse resp = authService.authenticate(request.getName(), request.getPassword());
        return ResponseEntity.ok(resp);

    }

}
