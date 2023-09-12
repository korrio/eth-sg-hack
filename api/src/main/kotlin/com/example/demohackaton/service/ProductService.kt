package com.example.demohackaton.service

import com.example.demohackaton.dto.ProductDto

interface ProductService {
  fun getProducts(q: String?): List<ProductDto>
}