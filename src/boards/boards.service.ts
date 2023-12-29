import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid'
import { CreateBoardDTO } from './DTO/create-board.dto';

@Injectable()
export class BoardsService {
  private boards : Board[] = [];

  getAllBoards() : Board[] {
    return this.boards
  }

  createBoard(createBoardDTO: CreateBoardDTO): Board{
    const {title,description} = createBoardDTO

    const board = {
      id:uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC
    }

    this.boards.push(board)
    return board
  }
}
