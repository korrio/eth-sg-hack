package com.example.demohackaton.entity

import com.fasterxml.jackson.annotation.JsonManagedReference
import jakarta.persistence.*

@Entity
@Table(name = "shop")
data class Shop(
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  val id: Long,
  val name: String,
  val description: String? = null,
  val img: String? = null,
  @JsonManagedReference
  @OneToMany(mappedBy = "shop", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
  val products: List<Product> = ArrayList(),
)