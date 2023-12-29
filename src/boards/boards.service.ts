import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid'
import { CreateBoardDTO } from './DTO/create-board.dto';
import { UpdateBoardDTO } from './DTO/update-board.dto';

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

  getBoardById(id: string):Board {
    return this.boards.find(board=>board.id === id)
  }

  deleteBoardById(id: string): void{
    this.boards = this.boards.filter(board => board.id !== id)
  }

  updateBoardById(id: string, updateBoard: UpdateBoardDTO) {
    const { title, description } = updateBoard;

    // const toChangeIndex = this.boards.findIndex(board => board.id === id)
    
    // this.boards[toChangeIndex].title = title;
    // this.boards[toChangeIndex].description = description;

    const toChange = this.getBoardById(id);
    toChange.title = title
    toChange.description = description
    
    return this.boards
  }
}
