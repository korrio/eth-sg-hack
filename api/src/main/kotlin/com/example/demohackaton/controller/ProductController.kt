package com.example.demohackaton.controller

import com.example.demohackaton.service.ProductService
import com.example.response.HttpResponse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/product")
class ProductController @Autowired internal constructor(
  productService: ProductService,
) {
  private final val productService: ProductService

  init {
    this.productService = productService
  }

  @GetMapping
  fun getProductList(@RequestParam("q", required = false) q: String?): ResponseEntity<Any> {
    return try {
      ResponseEntity.ok(
        HttpResponse(
          true,
          "Get Shop List Success",
          productService.getProducts(q),
        )
      )
    } catch (e: Exception) {
      ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(HttpResponse(false, e.message ?: "Get Shop List Failure"))
    }
  }
}