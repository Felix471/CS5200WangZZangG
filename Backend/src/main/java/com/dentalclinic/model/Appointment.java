package com.dentalclinic.model;

@Entity
@Table(name="appointment")
public class Appointment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Date date;
  private String status;

}