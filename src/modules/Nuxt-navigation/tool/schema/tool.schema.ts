import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ToolDocument = HydratedDocument<Tool>;

@Schema({
  versionKey: false,
})
export class Tool {
  @Prop()
  tool_key: string; // 工具id

  @Prop()
  tool_type: string; // 工具类型

  @Prop()
  tool_idx: number; // 工具索引值

  @Prop()
  tool_name: string; // 工具名称

  @Prop()
  tool_link: string; // 工具链接

  @Prop()
  tool_icon: string; // 工具标签
}

export const ToolSchema = SchemaFactory.createForClass(Tool);
