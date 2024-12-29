import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { Board } from './entities/boards.entity';
import { CreateBoardInput } from './dto/create-board.input';

@ApiTags('boards')
@Controller('/boards')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  @ApiOperation({
    summary: '게시판 조회',
    description: '게시판을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '게시판 조회 성공',
    schema: {
      example: 'Hello World!', // 원하는 예시 문자열을 입력하세요
    },
  })
  @Get()
  fetchBoards(): Board[] {
    return this.boardsService.findAll();
  }

  @Post()
  createBoard(@Body() createBoardInput: CreateBoardInput): string {
    console.log(createBoardInput);
    return this.boardsService.create({ createBoardInput });
  }
}

/**
 * Get 메서드
 * - @Param(): 라우팅 파라미터
 *   @Post('/boards/:boardId')
 *   createBoard(@Param('boardId') boardId: string)
 *
 * - @Query(): 쿼리 파라미터
 *   @Get('/boards')
 *   fetchBoards(@Query('page') page: number)
 */

/**
 * Mutation 메서드
 * - @Param(): 라우팅 파라미터
 *   @Post('/boards/:boardId')
 *   createBoard(@Param('boardId') boardId: string)
 *
 * - @Body(): 전달되는 바디 데이터
 *   @Post('/boards')
 *   createBoard(@Body() createBoardInput: CreateBoardInput)
 */
