import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

import { ProductSaleslocationInput } from 'src/apis/productsSaleslocations/dto/create-productSaleslocation.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => ProductSaleslocationInput)
  productSaleslocation: ProductSaleslocationInput;

  @Field(() => String)
  productCategoryId: string;

  @Field(() => [String])
  productTags: string[];
}
