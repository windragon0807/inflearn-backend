import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardsService } from './boards.service';

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
  getHello(): string {
    return this.boardsService.getHello();
  }
}
