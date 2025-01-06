import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductSaleslocationsInput } from './dto/create-productSaleslocations.input';
import { ProductSaleslocation } from './entities/productSaleslocations.entity';

@Injectable()
export class ProductSaleslocationsService {
  constructor(
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationsRepository: Repository<ProductSaleslocation>,
  ) {}

  create({ ...productSaleslocation }: ProductSaleslocationsInput) {
    return this.productSaleslocationsRepository.save({
      ...productSaleslocation,

      // 하나하나 직접 나열하는 방식
      // address: productSaleslocation.address,
      // addressDetail: productSaleslocation.addressDetail,
      // lat: ...
    });
  }
}
