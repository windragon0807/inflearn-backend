import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductSaleslocationsService } from '../productSaleslocations/productSaleslocations.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    private readonly productSaleslocationsService: ProductSaleslocationsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation'],
    });
  }

  findOne({ productId }: { productId: string }): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation'],
    });
  }

  async create({
    createProductInput,
  }: {
    createProductInput: CreateProductInput;
  }): Promise<Product> {
    const { productSaleslocation, ...product } = createProductInput;

    /**
     * 상품거래 위치 등록
     */
    /* productsSaleslocation 레포지토리에 직접 접근하지 않고 서비스를 타고 가져오는 이유는 검증을 서비스에서 진행하기 떄문입니다. */
    const productSaleslocationResult =
      await this.productSaleslocationsService.create({
        ...productSaleslocation,
      });

    /**
     * Product와 ProductSaleslocation 엔티티 간에 관계가 설정되어 있으면
     * TypeORM은 자동으로 관련 엔티티의 ID만 참조 컬럼으로 저장합니다.
     */
    const productsResult = await this.productsRepository.save({
      ...product,
      productSaleslocation: productSaleslocationResult,
    });

    return productsResult;
  }

  async update({
    productId,
    updateProductInput,
  }: {
    productId: string;
    updateProductInput: UpdateProductInput;
  }): Promise<Product> {
    const product = await this.findOne({ productId });

    /* 검증은 서비스에서 하자! */
    this.checkSoldout({ product });

    /**
     * save()에 `id`를 포함하면 update, 포함하지 않으면 create로 동작한다.
     * save()는 데이터를 수정(생성)하고, 수정(생성)된 데이터를 반환한다.
     * save()의 반환 요소는 `entity`에 할당한 요소에 한정된다. (...product 추가 이유)
     */
    return this.productsRepository.save({
      ...product, // 수정 후 수정되지 않은 다른 결과값까지 모두 받고 싶을 때 사용
      ...updateProductInput,
    });

    // this.productRepository.create() // DB 접속이랑 관련 없음. 등록을 위해서 빈 껍데기 객체 만들기 위함
    // this.productRepository.insert() // 결과를 객체로 못 돌려받는 등록 방법
    // this.productRepository.update() // 결과를 객체로 못 돌려받는 수정 방법
  }

  checkSoldout({ product }: { product: Product }): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다');

      // 다른 방법
      // throw new HttpException(
      //   '이미 판매 완료된 상품입니다.',
      //   HttpStatus.UNPROCESSABLE_ENTITY,
      // );
    }
  }

  async delete({ productId }: { productId: string }): Promise<boolean> {
    /*
     * 1. 실제 삭제
     * const result = await this.productsRepository.delete({ id: productId });
     * return result.affected ? true : false;
     */
    /*
     * 2. 소프트 삭제 (직접 구현) - isDeleted
     * this.productRepository.update({ id: productId }, { isDeleted: true });
     */
    /*
     * 3. 소프트 삭제 (직접 구현) - deletedAt
     * this.productRepository.update({ id: productId }, { deletedAt: new Date() });
     */
    /*
     * 4. 소프트 삭제 (TypeORM 제공) - softRemove()
     * 장점 : 여러 `id`를 한 번에 삭제 가능 ex. softRemove([{ id: 1 }, { id: 2 }, { id: 3 }]);
     * 단점 : `id`로만 삭제 가능
     * this.productRepository.softRemove({ id: productId });
     */
    /*
     * 5. 소프트 삭제 (TypeORM 제공) - softDelete()
     * 장점: 다른 컬럼으로도 삭제 가능
     * 단점: 여러 `id`를 한 번에 삭제 불가능
     */
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
