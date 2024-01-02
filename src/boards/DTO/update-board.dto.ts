import { BoardStatus } from "../board.model"

export class UpdateBoardDTO{
  title: string
  description: string
  status:BoardStatus
}