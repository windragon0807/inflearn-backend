import { InputType, PartialType } from '@nestjs/graphql';

import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  // @Field(() => String, { nullable: true })
  // name: string;
  //
  // @Field(() => String, { nullable: true })
  // description: string;
  //
  // @Min(0)
  // @Field(() => Int, { nullable: true })
  // price: number;
}

/**
 * PartialType : 모든 컬럼을 선택사항으로 바꿔주는 역할을 하므로, { nullable : true } 와 같은 역할을 합니다.
 * PickType : 원하는 컬럼만을 뽑아서 사용하고 싶을 때 사용합니다.
 *   - PickType(CreateProductInput, ["name", "price"]) : CreateProductInput의 name, price 컬럼만 사용하겠다는 의미 입니다.
 * OmitType : 원하는 컬럼만 제거하여 사용하고 싶을 때 사용합니다.
 *   - OmitType(CreateProductInput, ["description"]) : CreateProductInput의 description 컬럼을 제외한 나머지 컬럼들은 모두 사용하겠다는 의미입니다.
 */
