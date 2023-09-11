package com.example.demohackaton.service.impl

import com.example.demohackaton.dto.ProductDto
import com.example.demohackaton.dto.ShopDto
import com.example.demohackaton.repository.ShopRepository
import com.example.demohackaton.request.ShopRequest
import com.example.demohackaton.service.ShopService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ShopServiceImpl @Autowired internal constructor(
  shopRepository: ShopRepository,
) : ShopService {

  private final val shopRepository: ShopRepository

  init {
    this.shopRepository = shopRepository
  }

  override fun getShop(q: String?): List<ShopDto> {
    val shops = shopRepository.findByNameContainingIgnoreCase(q ?: "")
    return shops.map {
      ShopDto(
        it.id,
        it.name,
        it.description,
        it.img,
        it.products.map { product ->
          ProductDto(
            product.id,
            product.name,
            product.description,
            product.img,
            product.price,
            product.stock,
            product.createdDate,
            product.updatedDate,
          )
        }
      )
    }
  }

  override fun getShopById(id: Long, q: String): ShopDto {
    val shop = shopRepository.findById(id).orElseThrow {
      Exception("shop id $id not found!!!")
    }
    return ShopDto(
      shop.id,
      shop.name,
      shop.description,
      shop.img,
      shop.products.map { product ->
        ProductDto(
          product.id,
          product.name,
          product.description,
          product.img,
          product.price,
          product.stock,
          product.createdDate,
          product.updatedDate,
        )
      }
    )
  }

  override fun createShop(shopRequest: ShopRequest) {
    TODO("Not yet implemented")
  }

  override fun updateShop(shopRequest: ShopRequest) {
    TODO("Not yet implemented")
  }

  override fun deleteShop(id: Long) {
    val shop = shopRepository.findById(id).orElseThrow {
      Exception("shop id $id not found!!!")
    }
    shopRepository.delete(shop)
  }
}