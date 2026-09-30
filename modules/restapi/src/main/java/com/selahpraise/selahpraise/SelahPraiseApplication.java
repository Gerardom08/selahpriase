package com.selahpraise.selahpraise;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SelahPraiseApplication {

	public static void main(String[] args) {
		SpringApplication.run(SelahPraiseApplication.class, args);
	}

}
