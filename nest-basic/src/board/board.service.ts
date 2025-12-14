import { Injectable, NotFoundException } from '@nestjs/common';

interface Board {
  id: number;
  title: string;
  content: string;
}

@Injectable()
export class BoardService {
  private boards: Board[] = [
    { id: 1, title: '첫 번째 게시물', content: '내용입니다.' },
    { id: 2, title: '두 번째 게시물', content: '내용입니다.' },
    { id: 3, title: '세 번째 게시물', content: '내용입니다.' },
  ];

  findAll() {
    return this.boards;
  }

  findOne(id: number): Board {
    const board = this.boards.find((board) => board.id === id);

    if (!board) {
      throw new NotFoundException(`게시물을 찾을 수 없습니다. ID: ${id}`);
    }
    return board;
  }

  create(payload: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newBoard: Board = {
      id: this.generateId(),
      ...payload,
    };
    this.boards.push(newBoard);

    return newBoard;
  }

  update(id: number, payload: any): Board {
    const boardIndex: number = this.boards.findIndex(
      (board) => board.id === id,
    );

    if (boardIndex === -1) {
      throw new NotFoundException(`게시물을 찾을 수 없습니다. ID: ${id}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.boards[boardIndex] = {
      ...this.boards[boardIndex],
      ...payload,
    };

    return this.boards[boardIndex];
  }

  delete(id: number): Board[] {
    const boardIndex: number = this.boards.findIndex(
      (board) => board.id === id,
    );

    if (boardIndex === -1) {
      throw new NotFoundException(`게시물을 찾을 수 없습니다. ID: ${id}`);
    }

    this.boards.splice(boardIndex, 1);

    return this.boards;
  }

  generateId(): number {
    return this.boards.length === 0
      ? 1
      : Math.max(...this.boards.map((board) => board.id)) + 1;
    // Max 함는 전달된 값들 중에서 가장 큰 값을 반환
    // Math.max는 배열을 직접 인자로 받지 않으므로, 전개 연산자(...)를 사용하여 배열을 개별 요소로 분리
    // 배열을 펼쳐서 넣기 위해서 ... 스프레드 연산자 사용
  }
}
