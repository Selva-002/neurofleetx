package com.neurofleetx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class NeuroFleetXApplication {

    public static void main(String[] args) {
        SpringApplication.run(NeuroFleetXApplication.class, args);
        System.out.println("NeuroFleetX Application is running...");
    }
    

}









