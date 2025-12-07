import { Controller, Get, Param } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  // 구문 분석
  // DI
  // constructor(...) : 클래스 가 생성될 때 실행되는 생성자
  // - private: 매개변수로 받은 값을 클래스 내부의 private 필드로 자동선언
  // - readonly: 이후에 이 속성을 수정할 수 없도록(읽기 전용 필드로 설정)
  // - boardService : 실제 주입받을 객체의 이름(이름은 자유롭게 작성할 수 있지만, 일반적으로 클래스명 기반으로 작성)
  // - BoardService: 주입받을 서비스의 타입(Nest.js가 이 타입을 보고 인스턴스를 찾아 주입)
  constructor(private readonly boardService: BoardService) {}

  @Get()
  findAll() {
    // return 'findAll 호출';
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return `게시물 조회 (ID: ${id})`;
    return this.boardService.findOne(id);
  }
}
