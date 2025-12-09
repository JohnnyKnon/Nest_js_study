import { Injectable, NotFoundException } from '@nestjs/common';

interface Board {
  id: string;
  title: string;
  content: string;
}

@Injectable()
export class BoardService {
  private boards: Board[] = [
    { id: '1', title: '첫 번째 게시물', content: '내용입니다.' },
    { id: '2', title: '두 번째 게시물', content: '내용입니다.' },
    { id: '3', title: '세 번째 게시물', content: '내용입니다.' },
  ];

  findAll() {
    return this.boards;
  }

  findOne(id: string): Board {
    const board = this.boards.find((board) => board.id === id);

    if (!board) {
      throw new NotFoundException(`게시물을 찾을 수 없습니다. ID: ${id}`);
    }
    return board;
  }
}
