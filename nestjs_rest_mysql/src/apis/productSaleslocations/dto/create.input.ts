import { OmitType } from '@nestjs/swagger';
import { ProductSaleslocation } from '../entity/productSaleslocation.entity';

export class ProductSaleslocationInput extends OmitType(ProductSaleslocation, [
  'id',
]) {}
