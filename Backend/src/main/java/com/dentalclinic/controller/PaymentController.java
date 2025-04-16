package com.dentalclinic.controller;

import com.dentalclinic.model.Payment;
import com.dentalclinic.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
  private final PaymentService paymentService;

  @Autowired
  public PaymentController(PaymentService paymentService) {
    this.paymentService = paymentService;
  }

  @PostMapping
  public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(paymentService.createPayment(payment));
  }

  @GetMapping
  public ResponseEntity<List<Payment>> getAllPayments() {
    return ResponseEntity.ok(paymentService.getAllPayments());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Void> updatePayment(@PathVariable int id, @RequestBody Payment payment) {
    payment.setPaymentId(id);
    paymentService.updatePayment(payment);
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletePayment(@PathVariable int id) {
    paymentService.deletePayment(id);
    return ResponseEntity.noContent().build();
  }
}