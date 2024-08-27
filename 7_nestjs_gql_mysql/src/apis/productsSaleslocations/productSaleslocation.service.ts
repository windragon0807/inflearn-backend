import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductSaleslocationInput } from './dto/create-productSaleslocation.input';
import { ProductSaleslocation } from './entities/productSaleslocation.entity';

@Injectable()
export class ProductSaleslocationService {
  constructor(
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationsRepository: Repository<ProductSaleslocation>,
  ) {}

  create({ ...productSaleslocation }: ProductSaleslocationInput) {
    return this.productSaleslocationsRepository.save({
      ...productSaleslocation,

      // 하나하나 직접 나열하는 방식
      // address: productSaleslocation.address,
      // addressDetail: productSaleslocation.addressDetail,
      // lat: ...
    });
  }
}
