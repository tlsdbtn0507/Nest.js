import { Injectable, NotFoundException } from '@nestjs/common';
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

  getBoardById(id: string , msg:string):Board {
    const found = this.boards.find(board => board.id === id);
    
    const errMsg = `Can't ${msg} board with the ${id}`

    if(!found) throw new NotFoundException(errMsg)
    
    return found
  }

  deleteBoardById(id: string): void{
    const found = this.getBoardById(id,'delete')
    this.boards = this.boards.filter(board => board.id !== found.id)
  }

  updateBoardById(id: string, updateBoard: UpdateBoardDTO, status:BoardStatus) {
    const { title, description } = updateBoard;

    // const toChangeIndex = this.boards.findIndex(board => board.id === id)
    
    // this.boards[toChangeIndex].title = title;
    // this.boards[toChangeIndex].description = description;

    const toChange = this.getBoardById(id, 'update');
    toChange.title = title
    toChange.description = description
    toChange.status = status

    return this.boards
  }
}
