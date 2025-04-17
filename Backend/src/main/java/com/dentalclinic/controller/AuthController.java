package com.dentalclinic.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Value("${admin.username:admin}")
  private String adminUsername;

  @Value("${admin.password:admin}")
  private String adminPassword;

  /**
   * Authentication controller with hard-coded fake token.
   * For frontend "log in" illustration only.
   */
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
    System.out.println("==== adminUsername=" + adminUsername + ", adminPassword=" + adminPassword);
    String username = credentials.get("username");
    String password = credentials.get("password");

    if (adminUsername.equals(username) && adminPassword.equals(password)) {
      Map<String, String> response = new HashMap<>();
      response.put("token", "fake-jwt-token");
      response.put("username", username);
      return ResponseEntity.ok(response);
    } else {
      Map<String, String> error = new HashMap<>();
      error.put("message", "Invalid credentials");
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }
  }
}