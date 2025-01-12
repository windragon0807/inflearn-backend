import { PartialType } from '@nestjs/swagger';
import { CreateProductInput } from './create.input';

export class UpdateProductInput extends PartialType(CreateProductInput) {}
