import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, InsertResult, Repository } from 'typeorm';
import { ProductTag } from './entity/productTag.entity';

@Injectable()
export class ProductTagService {
  constructor(
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}

  findByNames({ tagNames }: { tagNames: string[] }): Promise<ProductTag[]> {
    return this.productTagRepository.find({
      where: { name: In([...tagNames]) },
    });
  }

  bulkInsert({
    names,
  }: {
    names: Array<{ name: string }>;
  }): Promise<InsertResult> {
    return this.productTagRepository.insert([...names]); // bulk-insert는 save()로 불가능
  }
}
