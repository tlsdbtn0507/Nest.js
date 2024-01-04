import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe ,NotFoundException } from '@nestjs/common';
import { BoardsService } from './boards.service';
import {  BoardStatus } from './board.model';
import { CreateBoardDTO } from './DTO/create-board.dto';
import { UpdateBoardDTO } from './DTO/update-board.dto';
import { BoardStatusValidationPipe } from 'src/pipe/b-StatusValida.pipe';
import { Board } from 'src/configs/board.entity';
import { DeleteResult } from 'typeorm';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService : BoardsService){}
  
  @Get('/')
  getAllBoards():Promise<Board[]>{
    return this.boardsService.getAllBoards();
  }
  
  @Post()
  @UsePipes(ValidationPipe)
    
  createBoard (@Body() createBoardDTO : CreateBoardDTO): Promise<Board> {
    return this.boardsService.createBoard(createBoardDTO)
  }

  @Get('/:id')
  //@Param에 가져올 Param이 여러개 일 경우 @Param() params : string[]로 해결 
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id,'find');
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: number): Promise<DeleteResult> {
    return this.boardsService.deleteBoardById(id)
  }

  @Put('/:id')
  updateBoardById(
    @Param('id') id: number,
    @Body() UpdateBoardDTO: UpdateBoardDTO,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ) {
    return this.boardsService.updateBoardById(id,UpdateBoardDTO,status)
  }
}
