package com.dentalclinic.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseConfig {

  @Bean
  public DataSource dataSource() {
    HikariConfig config = new HikariConfig();
    config.setJdbcUrl("jdbc:mysql://localhost:3306/dentist_clinic");
    config.setUsername("root");
    config.setPassword("gary20020206");
    config.setDriverClassName("com.mysql.cj.jdbc.Driver");
    return new HikariDataSource(config);
  }
}
