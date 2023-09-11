package com.example.demohackaton.repository

import com.example.demohackaton.entity.Shop
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ShopRepository : JpaRepository<Shop, Long> {
  fun findByNameContainingIgnoreCase(name: String): List<Shop>
}