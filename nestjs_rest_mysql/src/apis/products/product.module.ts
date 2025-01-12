import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSaleslocation } from '@productSaleslocations/entity/productSaleslocation.entity';
import { ProductSaleslocationService } from '@productSaleslocations/productSaleslocation.service';
import { ProductTag } from '@productTags/entity/productTag.entity';
import { ProductTagService } from '@productTags/productTag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
      ProductTag,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService, //
    ProductSaleslocationService,
    ProductTagService,
  ],
})
export class ProductModule {}
