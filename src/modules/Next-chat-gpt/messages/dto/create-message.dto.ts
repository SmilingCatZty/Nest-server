import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMessageDto {
  @ApiProperty({ description: '用户文字', example: 'psw', })
  @IsString()
  user_text: string

  @IsString()
  user_id: string
}