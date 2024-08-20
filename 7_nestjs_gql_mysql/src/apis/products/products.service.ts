import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: { productId: string }): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({
    createProductInput,
  }: {
    createProductInput: CreateProductInput;
  }): Promise<Product> {
    return this.productsRepository.save(createProductInput);
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

    // this.productsRepository.create() // DB 접속이랑 관련 없음. 등록을 위해서 빈 껍데기 객체 만들기 위함
    // this.productsRepository.insert() // 결과를 객체로 못 돌려받는 등록 방법
    // this.productsRepository.update() // 결과를 객체로 못 돌려받는 수정 방법
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
}
