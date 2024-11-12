import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from 'src/apis/products/entities/product.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  /**
   * - @ManyToMany(): N : M의 관계를 가질 때는 두 테이블 모두 컬럼을 추가하여 연결해주어야 합니다.
   * - (products) => products.productTags: products 입장에서의 productTags 와의 관계를 명시해 준 것으로, N : M 관계에서는 두 테이블 모두 관계를 나타내주어야 합니다.
   * - Product[]: 하나의 태그에 상품이 여러 개 할당될 수 있기에 배열로 나타내는 것 입니다.
   */
  @ManyToMany(() => Product, (products) => products.productTags)
  @Field(() => [Product])
  products: Product[];
}
