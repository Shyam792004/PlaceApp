// src/main/java/com/example/placeapp/config/SecurityConfig.java
package com.example.placeapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // ❌ disable CSRF for development
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/users/**",
                    "/api/notices/**",
                    "/api/apply/**"
                ).permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }
}
