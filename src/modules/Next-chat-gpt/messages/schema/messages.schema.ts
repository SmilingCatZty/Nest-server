import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

@Schema({
  versionKey: false
})
export class Message {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  user: string; // 用户

  @Prop({ required: true })
  user_text: string; // 用户输入的信息

  @Prop()
  gpt_response: string; // gpt响应结果
}

export type MessageDocument = HydratedDocument<Message>
export const MessageSchema = SchemaFactory.createForClass(Message)