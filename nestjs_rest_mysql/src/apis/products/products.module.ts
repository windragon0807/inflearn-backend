import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductSaleslocation } from '../productSaleslocations/entities/productSaleslocations.entity';
import { ProductSaleslocationsService } from '../productSaleslocations/productSaleslocations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductSaleslocationsService],
})
export class ProductsModule {}
