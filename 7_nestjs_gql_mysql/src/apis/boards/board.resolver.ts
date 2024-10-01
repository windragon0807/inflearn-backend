import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { BoardService } from './board.service';
import { CreateBoardInput } from './dto/create-board.input';
import { Board } from './entities/board.entity';
import { Inject } from '@nestjs/common';

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Board], { nullable: true })
  fetchBoards(): Board[] {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args('contents') contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): string {
    return this.boardService.create({ createBoardInput });
  }

  @Query(() => String)
  async fetchCache(): Promise<string> {
    const mycache = await this.cacheManager.get('aaa');
    console.log(mycache);

    return '캐시에서 조회 완료!!';
  }

  @Mutation(() => String)
  async createCache(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<string> {
    await this.cacheManager.set('aaa', createBoardInput, {
      ttl: 1000,
    });

    return '캐시에 등록 완료!!';
  }
}
