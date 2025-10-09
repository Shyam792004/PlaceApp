package com.example.placeapp.controller;

import com.example.placeapp.model.User;
import com.example.placeapp.repository.UserRepository;
import com.example.placeapp.request.LoginRequest;
import com.example.placeapp.request.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Registration endpoint
    // @PostMapping("/register")
    // public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
    //     Optional<User> existingUser = userRepository.findByEmail(registerRequest.getEmail());

    //     if (existingUser.isPresent()) {
    //         return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");
    //     }

    //     User newUser = new User(
    //             registerRequest.getFullName(),
    //             registerRequest.getEmail(),
    //             registerRequest.getPassword()
    //     );

    //     userRepository.save(newUser);
    //     return ResponseEntity.ok("User registered successfully");
    // }
    // In UserController.java
@PostMapping("/register")
public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
    Optional<User> existingUser = userRepository.findByEmail(registerRequest.getEmail());

    if (existingUser.isPresent()) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Email already registered"));
    }

    User newUser = new User(
            registerRequest.getFullName(),
            registerRequest.getEmail(),
            registerRequest.getPassword()
    );

    userRepository.save(newUser);
    return ResponseEntity.ok(Map.of("message", "User registered successfully"));
}

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        User user = userOptional.get();

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        // Return user details (excluding password)
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("fullName", user.getFullName());
        response.put("email", user.getEmail());

        return ResponseEntity.ok(response);
    }
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
    return userRepository.findById(id)
        .map(user -> {
            user.setFullName(updatedUser.getFullName());
            user.setEmail(updatedUser.getEmail());
            // password is not updated here for safety
            return ResponseEntity.ok(userRepository.save(user));
        })
        .orElse(ResponseEntity.notFound().build());
    }

}
