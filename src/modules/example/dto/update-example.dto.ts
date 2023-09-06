/**
 * @DTO文件
 * 用于限制路由传参数
 * @IsOptionnal :非必传项
 */
import { IsObject, IsOptional, IsString } from 'class-validator';

// 定义对象类型
type InfoModel = {
  name: string;
  age: string;
};

export class UpdateExampleDto {
  @IsString()
  _id: string;

  @IsObject()
  @IsOptional()
  info: InfoModel;
}
