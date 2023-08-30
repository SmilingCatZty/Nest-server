import { IsArray, IsString } from 'class-validator';

export class DragSortToolDto {
  @IsString()
  type: string;

  @IsArray()
  indexArr: number[];

  @IsArray()
  keyArr: string[];
}
