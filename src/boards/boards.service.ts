import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid'
import { CreateBoardDTO } from './DTO/create-board.dto';
import { UpdateBoardDTO } from './DTO/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from 'src/configs/board.repository';
import { Board } from 'src/configs/board.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class BoardsService {

  constructor(@InjectRepository(Board) private boardRepository: BoardRepository){}


  async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board>{
    const {title,description} = createBoardDTO

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC
    })

    await this.boardRepository.save(board);
    return board
  }

  async getAllBoards(): Promise<Board[]>{
    return await this.boardRepository.find()
  }

  async getBoardById(id: number , msg:string):Promise<Board> {
    const found = await this.boardRepository.findOneBy({id});
    
    const errMsg = `Can't ${msg} board with the ${id}`

    if (!found) throw new NotFoundException(errMsg);

    return found
  }

  async deleteBoardById(id: number): Promise<DeleteResult>{
    const toDelete = await this.boardRepository.delete(id);

    if (toDelete.affected === 0)
      throw new NotFoundException(`Can't Delete ${id}Board`)

    return toDelete
  }

  async updateBoardById(id: number, updateBoard: UpdateBoardDTO, status:BoardStatus) {
    const { title, description } = updateBoard;

  //   // const toChangeIndex = this.boards.findIndex(board => board.id === id)
    
  //   // this.boards[toChangeIndex].title = title;
  //   // this.boards[toChangeIndex].description = description;

    const toChange = await this.getBoardById(id, 'update');
    toChange.title = title
    toChange.description = description
    toChange.status = status

    return this.boardRepository.save(toChange)
    
  }
}
