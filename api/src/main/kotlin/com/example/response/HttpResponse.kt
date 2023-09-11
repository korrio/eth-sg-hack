package com.example.response

data class HttpResponse(
  val status: Boolean,
  val message: String,
  val data: Any? = null,
)
