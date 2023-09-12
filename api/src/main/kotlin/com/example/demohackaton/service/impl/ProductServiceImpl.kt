package com.example.demohackaton.service.impl

import com.example.demohackaton.dto.ProductDto
import com.example.demohackaton.repository.ProductRepository
import com.example.demohackaton.service.ProductService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ProductServiceImpl @Autowired internal constructor(
  productRepository: ProductRepository,
) : ProductService {

  private final val productRepository: ProductRepository

  init {
    this.productRepository = productRepository
  }

  override fun getProducts(q: String?): List<ProductDto> {
    val products = productRepository.findByNameContainingIgnoreCase(q ?: "")
    return products.map {
      ProductDto(
        it.id,
        it.name,
        it.description,
        it.img,
        it.price,
        it.stock,
        it.createdDate,
        it.updatedDate,
      )
    }
  }
}