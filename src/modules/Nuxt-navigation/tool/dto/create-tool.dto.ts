import { IsString } from 'class-validator';

export class CreateToolDto {
  @IsString()
  tool_key: string; // 工具id

  @IsString()
  tool_type: string; // 工具类型

  @IsString()
  tool_name: string; // 工具名称

  @IsString()
  tool_link: string; // 工具链接

  @IsString()
  tool_icon: string; // 工具标签
}
