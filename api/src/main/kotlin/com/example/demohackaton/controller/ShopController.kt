package com.example.demohackaton.controller

import com.example.demohackaton.service.ShopService
import com.example.response.HttpResponse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/shop")
class ShopController @Autowired internal constructor(
  shopService: ShopService,
) {
  private final val shopService: ShopService

  init {
    this.shopService = shopService
  }

  @GetMapping
  fun getShopList(@RequestParam("q", required = false) q: String?): ResponseEntity<Any> {
    return try {
      ResponseEntity.ok(
        HttpResponse(
          true,
          "Get Shop List Success",
          shopService.getShop(q),
        )
      )
    } catch (e: Exception) {
      ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(HttpResponse(false, e.message ?: "Get Shop List Failure"))
    }
  }

  @GetMapping("/{id}")
  fun getShopById(
    @PathVariable id: Long,
    @RequestParam("q", required = false) q: String
  ): ResponseEntity<Any> {
    return try {
      ResponseEntity.ok(
        HttpResponse(
          true,
          "Get Shop By Id Success",
          shopService.getShopById(id, q),
        )
      )
    } catch (e: Exception) {
      ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(HttpResponse(false, e.message ?: "Get Shop By Id Failure"))
    }
  }
}