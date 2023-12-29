import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { CreateBoardDTO } from './DTO/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService : BoardsService){}
  
  @Get('/')
  getAllBoards():Board[]{
    return this.boardsService.getAllBoards();
  }
  
  @Post()
  createBoard (@Body() createBoardDTO : CreateBoardDTO): Board {
    return this.boardsService.createBoard(createBoardDTO)
  }
}
