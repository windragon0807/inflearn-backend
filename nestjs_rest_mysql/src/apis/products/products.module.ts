import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSaleslocation } from '../productSaleslocations/entities/productSaleslocations.entity';
import { ProductSaleslocationsService } from '../productSaleslocations/productSaleslocations.service';
import { ProductTag } from '../productTags/entities/productTags.entity';
import { ProductTagsService } from '../productTags/productTags.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
      ProductTag,
    ]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService, //
    ProductSaleslocationsService,
    ProductTagsService,
  ],
})
export class ProductsModule {}
