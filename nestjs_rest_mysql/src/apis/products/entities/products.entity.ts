import { ProductCategory } from 'src/apis/productCategories/entities/productCategories.entity';
import { ProductSaleslocation } from 'src/apis/productSaleslocations/entities/productSaleslocations.entity';
import { ProductTag } from 'src/apis/productTags/entities/productTags.entity';
import { User } from 'src/apis/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: false })
  isSoldout: boolean;

  /**
   * - @JoinColumn() : 두 테이블을 하나로 합쳐서 데이터를 가져와야 하기에 사용하였으며, 한 쪽 테이블에만 적어줘야 합니다.
   * - @OneToOne() : 두 테이블의 관계를 나타내는 것으로 @OneToOne()은 한 쪽에만 쓰거나, 양쪽에 모두 써줄 수 있습니다.
   */
  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  /**
   * - @ManyToOne() : N : 1 관계를 나타내는 데코레이터입니다. (Many: Product, One: ProductCategory)
   * - @JoinColumn() : Many 부분에 해당하는 테이블(product)에서는 JoinColumn()이 생략 가능합니다.
   *   - @ManyToOne() : @JoinColumn() 생략 가능
   *   - @OneToOne() : @JoinColumn() 반드시 필요
   */
  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  /**
   * - @JoinTable() : N : M 관계에서 생성되는 중간 테이블을 자동으로 만들어 주는 것으로 기준이 되는 테이블 한 쪽에만 작성해주면 됩니다.
   * - (productTags) => productTags.products : productTags 입장에서의 products 와의 관계를 명시해 준 것으로, N : M 관계에서는 두 테이블 모두 관계를 나타내주어야 합니다
   * - ProductTag[] : 하나의 상품이 여러 개의 태그에 해당될 수 있기에 배열로 나타내는 것입니다.
   */
  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  productTags: ProductTag[];

  /** 데이터 등록 시간 자동으로 기록 */
  @CreateDateColumn()
  createdAt: Date;

  /** 데이터 수정 시간 자동으로 기록 */
  @UpdateDateColumn()
  updatedAt: Date;

  /** 소프트 삭제 시간 자동으로 기록 */
  @DeleteDateColumn()
  deletedAt: Date;
}
