import { Min } from 'class-validator';
import { ProductSaleslocationsInput } from '@productSaleslocations/dto/create-productSaleslocations.input';

export class CreateProductInput {
  name: string;

  description: string;

  @Min(0)
  price: number;

  productSaleslocation: ProductSaleslocationsInput;

  productCategoryId: string;

  productTags: string[];
}
