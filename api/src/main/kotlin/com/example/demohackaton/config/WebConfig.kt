package com.example.demohackaton.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.*


@Configuration
@EnableWebMvc
class WebConfig : WebMvcConfigurer {
  override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
    registry
      .addResourceHandler("swagger-ui.html")
      .addResourceLocations("classpath:/META-INF/resources/")
    registry
      .addResourceHandler("/webjars/**")
      .addResourceLocations("classpath:/META-INF/resources/webjars/")
  }

  override fun addCorsMappings(registry: CorsRegistry) {
    registry.addMapping("/**").allowedOrigins("*").allowedMethods("*").allowedHeaders("*")
  }

  override fun configureAsyncSupport(configurer: AsyncSupportConfigurer) {
    configurer.setDefaultTimeout(-1)
  }
}