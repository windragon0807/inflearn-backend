import { Controller, Post, Body } from '@nestjs/common';
import { ProductCategory } from './entity/productCategory.entity';
import { ProductCategoryService } from './productCategory.service';

@Controller('/productCategory')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService, //
  ) {}

  @Post()
  createProductCategory(
    @Body() { name }: { name: string }, //
  ): Promise<ProductCategory> {
    return this.productCategoryService.create({ name });
  }
}
