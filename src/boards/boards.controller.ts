import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { CreateBoardDTO } from './DTO/create-board.dto';
import { UpdateBoardDTO } from './DTO/update-board.dto';

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

  @Get('/:id')
  //@Param에 가져올 Param이 여러개 일 경우 @Param() params : string[]로 해결 
  getBoardById(@Param('id') id: string):Board {
    return this.boardsService.getBoardById(id)
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: string):void {
    this.boardsService.deleteBoardById(id)
  }

  @Put('/:id')
  updateBoardById(@Param('id') id: string,@Body() updateBoardDTO : UpdateBoardDTO){
    return this.boardsService.updateBoardById(id,updateBoardDTO)
  }
}
