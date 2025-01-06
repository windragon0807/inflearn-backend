import { Min } from 'class-validator';
import { ProductSaleslocationsInput } from 'src/apis/productSaleslocations/dto/create-productSaleslocations.input';

export class CreateProductInput {
  name: string;

  description: string;

  @Min(0)
  price: number;

  productSaleslocation: ProductSaleslocationsInput;
}
