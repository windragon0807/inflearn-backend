import { Module } from '@nestjs/common';

import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';

@Module({
  imports: [],
  providers: [
    BoardResolver, //
    BoardService,
  ],
})
export class BoardModule {}
