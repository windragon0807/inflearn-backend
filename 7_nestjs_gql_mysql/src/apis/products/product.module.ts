import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductSaleslocationService } from '../productsSaleslocations/productSaleslocation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
    ]),
  ],
  providers: [
    ProductResolver, //
    ProductService,
    ProductSaleslocationService,
  ],
})
export class ProductModule {}
