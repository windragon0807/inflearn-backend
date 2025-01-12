import { Min } from 'class-validator';
import { ProductSaleslocationInput } from '@productSaleslocations/dto/create.input';

export class CreateProductInput {
  name: string;

  description: string;

  @Min(0)
  price: number;

  productSaleslocation: ProductSaleslocationInput;

  productCategoryId: string;

  productTags: string[];
}
