import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardService } from './board.service';

// 1. 전체 문맥 이해하기
// 다음 코드는 Controller => Service 구조를 가진 전형적인 패턴
// 즉,
// - BoardController: 클라이언트 요청을 처리 (HTTP Request)을 받는 역할
// - BoardService: 실제 비즈니스 로직을 처리하는 역할

// 컨트롤러는 서비스를 직접 생성하지 않고, 의존성 주입(Dependency Injection, DI)을 통해 서비스를 주입받아 사용
// 그 "자동 주입"을 가능하게 하는 것이 Nest.js의 핵심 기능 중 하나인 "DI 컨테이너"임
// 그걸 설정하는게 constructor 부분

// 2. constructor의 역할
// Nest.js에서 클래스의 생성자(constructor)는 객체가 생성될 때 실행
// 매개변수로 지정된 의존성(다른 클래스 즉, 서비스 등)을 자동으로 주입

// BoardService가 @injectable() 데코레이터로 표시되어 있다면,
// Nest.js는 BoardController가 생성될 때 BoardService의 인스턴스를 자동으로 생성하여 주입

interface Board {
  id: number;
  title: string;
  content: string;
}

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
  findAll(): Board[] {
    // return 'findAll 호출';
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Board {
    // return `게시물 조회 (ID: ${id})`;
    return this.boardService.findOne(id);
  }

  @Post()
  create(@Body() data: any): Board {
    return this.boardService.create(data);
  }
}
