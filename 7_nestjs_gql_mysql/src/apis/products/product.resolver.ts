import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService, //
  ) {}

  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ): Promise<Product> {
    return this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    /** Nest.js는 Promise 요소들을 async/await을 붙이지 않아도 자동으로 처리해준다. */
    return this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ): Promise<boolean> {
    return this.productService.delete({ productId });
  }
}
