import { IsMongoId } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompleteMessageDto {
  @ApiProperty({ description: '消息ID', example: '64093ecff7511cf80ed28da7' })
  @IsMongoId()
  messageId: string;
}
