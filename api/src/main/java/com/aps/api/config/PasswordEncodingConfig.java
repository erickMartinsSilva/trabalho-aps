package com.aps.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration 
public class PasswordEncodingConfig {
    @Bean
    public PasswordEncoder passwordEncoder(
        @Value("${app.security.encoding-strength}") int strength
    ) {
        return new BCryptPasswordEncoder(strength);
    }
}
