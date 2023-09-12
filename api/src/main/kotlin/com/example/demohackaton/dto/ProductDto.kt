package com.example.demohackaton.dto

import com.fasterxml.jackson.annotation.JsonFormat
import java.io.Serializable
import java.util.*

data class ProductDto(
  val id: Long,
  val name: String,
  val description: String? = null,
  val img: String? = null,
  val price: Double = 0.0,
  val stock: Int = 0,
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
  val createdDate: Date = Date(),
  @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
  val updatedDate: Date = Date(),
) : Serializable