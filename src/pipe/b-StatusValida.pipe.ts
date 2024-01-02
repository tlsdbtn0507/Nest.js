import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "src/boards/board.model";

export class BoardStatusValidationPipe implements PipeTransform{

  readonly StatusOption = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC
  ]

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase()

    if (!this.isStatusValid(value))
      throw new BadRequestException(`Wrong status option ${value} couldn't be status`)
    return value
  }
  private isStatusValid(value:any) {
    const index = this.StatusOption.indexOf(value)
    return index !== -1
  }
}