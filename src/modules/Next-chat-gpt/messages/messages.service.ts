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

}