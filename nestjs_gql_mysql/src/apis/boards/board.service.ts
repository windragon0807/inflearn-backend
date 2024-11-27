import { Injectable } from '@nestjs/common';

import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';

/**
 * Injection-Scope : 싱글톤으로 설정할 지 여부
 * Scope.DEFAULT : 싱글톤 (아무것도 안 넣어도, @Injectable을 제외해도 동일)
 * Scope.REQUEST : 요청마다 인스턴스 생성
 * Scope.TRANSIENT : 매번 새로운 인스턴스 생성
 */
@Injectable()
export class BoardService {
  findAll(): Board[] {
    // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
    const result = [
      {
        number: 1,
        writer: '철수',
        title: '제목입니다~~',
        contents: '내용입니다!!!',
      },
      {
        number: 2,
        writer: '철수',
        title: '제목입니다~~',
        contents: '내용입니다!!!',
      },
      {
        number: 3,
        writer: '철수',
        title: '제목입니다~~',
        contents: '내용입니다!!!',
      },
    ];

    // 2. 꺼내온 결과 응답 주기
    return result;
  }

  create({ createBoardInput }: { createBoardInput: CreateBoardInput }): string {
    // 1. 브라우저에서 보내준 데이터 확인하기
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);

    // 2. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기

    // 3. DB에 저장이 잘 됐으면, 결과를 브라우저에 응답(response) 주기
    return '게시물 등록에 성공하였습니다!!';
  }
}
