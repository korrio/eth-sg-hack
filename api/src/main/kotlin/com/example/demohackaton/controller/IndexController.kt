package com.example.demohackaton.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class IndexController {
  @GetMapping
  fun index(): String {
    return "Hello World"
  }
}