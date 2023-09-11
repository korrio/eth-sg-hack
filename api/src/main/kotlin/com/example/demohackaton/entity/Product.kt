package com.example.demohackaton.entity

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonFormat
import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.util.*

@Entity
@Table(name = "product")
data class Product(
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  val id: Long,
  val name: String,
  val description: String? = null,
  val img: String? = null,
  val price: Double = 0.0,
  val stock: Int = 0,
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
  @CreationTimestamp
  val createdDate: Date = Date(),
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
  @UpdateTimestamp
  val updatedDate: Date = Date(),
  @JsonBackReference
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "shop_id")
  val shop: Shop,
)