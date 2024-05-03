package com.example.proiecttpi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ProiectTpiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProiectTpiApplication.class, args);
	}

}
