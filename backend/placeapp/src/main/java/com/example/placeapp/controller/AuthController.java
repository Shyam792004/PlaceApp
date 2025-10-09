// package com.example.placeapp.controller;

// import com.example.placeapp.model.User;
// import com.example.placeapp.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.Optional;

// @RestController
// @RequestMapping("/api/users")
// @CrossOrigin(origins = "http://localhost:5173")
// public class AuthController {

//     @Autowired
//     private UserRepository userRepository;

//     @PostMapping("/login")
//     public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
//         Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());

//         if (optionalUser.isEmpty()) {
//             return ResponseEntity.badRequest().body("User not found");
//         }

//         User user = optionalUser.get();

//         if (!user.getPassword().equals(loginRequest.getPassword())) {
//             return ResponseEntity.badRequest().body("Invalid credentials");
//         }

//         return ResponseEntity.ok("Login successful");
//     }
// }
package com.example.placeapp.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    // Reserved for future auth logic (e.g., JWT login)
}
