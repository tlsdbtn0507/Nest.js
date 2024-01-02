import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe ,NotFoundException } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDTO } from './DTO/create-board.dto';
import { UpdateBoardDTO } from './DTO/update-board.dto';
import { BoardStatusValidationPipe } from 'src/pipe/b-StatusValida.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService : BoardsService){}
  
  @Get('/')
  getAllBoards():Board[]{
    return this.boardsService.getAllBoards();
  }
  
  @Post()
  @UsePipes(ValidationPipe)
    
  createBoard (@Body() createBoardDTO : CreateBoardDTO): Board {
    return this.boardsService.createBoard(createBoardDTO)
  }

  @Get('/:id')
  //@Param에 가져올 Param이 여러개 일 경우 @Param() params : string[]로 해결 
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id,'find');
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): void {
    this.boardsService.deleteBoardById(id)
  }

  @Put('/:id')
  updateBoardById(
    @Param('id') id: string,
    @Body() UpdateBoardDTO: UpdateBoardDTO,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ) {
    return this.boardsService.updateBoardById(id,UpdateBoardDTO,status)
  }
}
