package com.devsuperior.dsvendas.config;

import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private Environment env;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		if (Arrays.asList(env.getActiveProfiles()).contains("test")) {
			http
			.authorizeHttpRequests((requests) -> requests
					.requestMatchers(toH2Console()).permitAll() // <-
			)
			.csrf((protection) -> protection
                    .ignoringRequestMatchers(toH2Console()) // <- 
            )
			.cors((cors) -> cors
					.configurationSource(profileTesConfigurationSource())
			);
		}
        http
            .authorizeHttpRequests((requests) -> requests
                // another matchers
            	.requestMatchers("/**").permitAll()	
                .anyRequest().authenticated()
            )
//            .formLogin((login) -> login
//                .loginPage("/login")
//                .permitAll()
//            )
//            .logout((logout) -> logout
//                .permitAll()
//            )
            .headers((header) -> header
                .frameOptions().sameOrigin()
            );
        return http.build();
    }

	CorsConfigurationSource profileTesConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList(env.getProperty("cors.allow.frontend")));
		configuration.setAllowedMethods(Arrays.asList("GET","POST"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}