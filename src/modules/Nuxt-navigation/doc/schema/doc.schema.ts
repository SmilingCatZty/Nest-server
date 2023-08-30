import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DocDocument = HydratedDocument<Doc>;

@Schema({
  versionKey: false,
})
export class Doc {
  @Prop()
  doc_idx: number; // 文档索引

  @Prop()
  doc_key: string; // 文档key

  @Prop()
  doc_name: string; // 文档名称

  @Prop()
  doc_link: string; // 文档关联链接

  @Prop()
  doc_type: string; //文档类型
}

export const DocSchema = SchemaFactory.createForClass(Doc);
