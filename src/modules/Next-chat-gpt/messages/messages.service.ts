import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "./schema/messages.schema";

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message')
    private messageModel: Model<MessageDocument>
  ) { }

  create(
    user_id: string,
    user_text: string
  ): Promise<Message> {
    const message = new this.messageModel({
      user: user_id,
      user_text
    });
    return message.save();
  }

  /**
   * 根据messageId查找数据
   * @param {string}_id messageId 
   * @returns 
   */
  findOne(_id: string): Promise<Message> {
    return this.messageModel.findOne({ _id })
  }

  /**
   * 更新会话内容
   * @param {string} message_id 
   * @param {string} gpt_response 
   * @returns 
   */
  async update(id: string, gpt_response: string): Promise<Message> {
    const message = await this.messageModel.findByIdAndUpdate(id, { gpt_response })
    return message
  }

}