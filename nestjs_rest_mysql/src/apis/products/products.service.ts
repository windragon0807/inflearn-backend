import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { CreateProductInput } from './dto/create-product.input';

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
    return this.productsRepository.save({
      ...createProductInput,
    });
  }
}
