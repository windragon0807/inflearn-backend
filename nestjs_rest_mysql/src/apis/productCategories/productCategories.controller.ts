import { Controller, Post, Body } from '@nestjs/common';
import { ProductCategory } from './entities/productCategories.entity';
import { ProductCategoriesService } from './productCategories.service';

@Controller('/productCategories')
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService, //
  ) {}

  @Post()
  createProductCategory(
    @Body() { name }: { name: string }, //
  ): Promise<ProductCategory> {
    return this.productCategoriesService.create({ name });
  }
}
