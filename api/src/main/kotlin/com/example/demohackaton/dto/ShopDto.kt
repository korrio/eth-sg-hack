package com.example.demohackaton.dto

import java.io.Serializable

data class ShopDto(
  val id: Long,
  val name: String,
  val description: String? = null,
  val img: String? = null,
  val products: List<ProductDto> = ArrayList(),
) : Serializable