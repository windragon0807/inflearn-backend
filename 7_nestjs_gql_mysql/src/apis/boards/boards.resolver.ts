import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';

import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Query(() => [Board], { nullable: true })
  fetchBoards(): Board[] {
    return this.boardsService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args('contents') contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): string {
    return this.boardsService.create({ createBoardInput });
  }
}
