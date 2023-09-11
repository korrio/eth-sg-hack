package com.example.demohackaton.service

import com.example.demohackaton.dto.ShopDto
import com.example.demohackaton.request.ShopRequest

interface ShopService {
  fun getShop(q: String?): List<ShopDto>
  fun getShopById(id: Long, q: String): ShopDto
  fun createShop(shopRequest: ShopRequest)
  fun updateShop(shopRequest: ShopRequest)
  fun deleteShop(id: Long)
}