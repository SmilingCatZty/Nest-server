import { IsString } from 'class-validator';

export class CreateDocDto {
  @IsString()
  doc_key: string; // 文档key

  @IsString()
  doc_name: string; // 文档名称

  @IsString()
  doc_link: string; // 文档关联链接

  @IsString()
  doc_type: string; //文档类型
}
