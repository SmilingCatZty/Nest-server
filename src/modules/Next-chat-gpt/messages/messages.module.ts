import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./schema/messages.schema";
import { MessageService } from './messages.service'
import { MessageController } from './messages.controller'
import { OpenAiModule } from "../open-ai/open-ai.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    OpenAiModule
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService]
})

export class MessageModule { }