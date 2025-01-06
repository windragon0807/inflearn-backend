import { OmitType } from '@nestjs/swagger';
import { ProductSaleslocation } from '../entities/productSaleslocations.entity';

export class ProductSaleslocationsInput extends OmitType(ProductSaleslocation, [
  'id',
]) {}
