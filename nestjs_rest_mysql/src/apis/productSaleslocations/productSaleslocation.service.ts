import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocationInput } from './dto/create.input';
import { ProductSaleslocation } from './entity/productSaleslocation.entity';

@Injectable()
export class ProductSaleslocationService {
  constructor(
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  create({ ...productSaleslocation }: ProductSaleslocationInput) {
    return this.productSaleslocationRepository.save({
      ...productSaleslocation,

      // 하나하나 직접 나열하는 방식
      // address: productSaleslocation.address,
      // addressDetail: productSaleslocation.addressDetail,
      // lat: ...
    });
  }
}
