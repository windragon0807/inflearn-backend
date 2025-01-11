import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/products.entity';
import { ProductsService } from './products.service';
import { UpdateProductInput } from './dto/update-product.input';

@ApiTags('products')
@Controller('/products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService, //
  ) {}

  @Get()
  fetchProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @ApiOperation({
    summary: '상품 1개 조회',
    description: '상품 1개를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '상품 조회 성공',
    schema: {
      example: {
        id: '2b83adb1-5eaf-424e-9525-2e0510ed61e0',
        name: '히터',
        description: '히터 설명',
        price: 100000,
        isSoldout: false,
        createdAt: '2025-01-08T14:57:52.686Z',
        updatedAt: '2025-01-08T14:57:52.686Z',
        deletedAt: null,
        productSaleslocation: {
          id: 'dab1d9d2-5cd9-45f8-836c-5e237fcfd52b',
          address: '증가로 191',
          addressDetail: '105동 202호',
          lat: '1.500000',
          lng: '1.500000',
          meetingTime: '2025-01-08T00:00:00.000Z',
        },
        productCategory: {
          id: '15d02803-bf1d-4b13-a157-e7a2bf65371c',
          name: '가전제품',
        },
      },
    },
  })
  @Get('/:productId')
  fetchProduct(@Param('productId') productId: string): Promise<Product> {
    return this.productsService.findOne({ productId });
  }

  @ApiOperation({
    summary: '상품 생성',
    description: '새로운 상품을 생성합니다.',
  })
  @ApiBody({
    schema: {
      example: {
        name: '상품 이름',
        description: '상품 설명',
        price: 100000,
        productSaleslocation: {
          address: '경기도 성남시 분당구',
          addressDetail: '불정로 6',
          lat: 37.359202,
          lng: 127.104858,
          meetingTime: '2025-01-10',
        },
        productCategoryId: '15d02803-bf1d-4b13-a157-e7a2bf65371c',
        productTags: ['#태그1', '#태그2'],
      },
    },
  })
  @Post()
  createProduct(
    @Body() createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.create({ createProductInput });
  }

  @Patch('/:productId')
  updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.update({ productId, updateProductInput });
  }

  @Delete('/:productId')
  deleteProduct(@Param('productId') productId: string): Promise<boolean> {
    return this.productsService.delete({ productId });
  }
}
