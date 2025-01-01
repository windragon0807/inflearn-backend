import { Min } from 'class-validator';

export class CreateProductInput {
  name: string;

  description: string;

  @Min(0)
  price: number;
}
