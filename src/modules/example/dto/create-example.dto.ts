/**
 * @DTO文件
 * 用于限制路由传参数
 */
import { IsBoolean, IsString } from 'class-validator';

export class CreateExampleDto {
  @IsString()
  id: string;

  @IsBoolean()
  auth: boolean;
}
