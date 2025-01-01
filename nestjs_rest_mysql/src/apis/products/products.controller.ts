import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/products.entity';
import { ProductsService } from './products.service';

@Controller('/products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService, //
  ) {}

  @Get()
  fetchProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('/:productId')
  fetchProduct(@Param('productId') productId: string): Promise<Product> {
    return this.productsService.findOne({ productId });
  }

  @Post()
  createProduct(
    @Body() createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.create({ createProductInput });
  }
}
