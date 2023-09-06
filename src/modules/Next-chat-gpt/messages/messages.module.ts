import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./schema/messages.schema";
import { MessageService } from './messages.service'
import { MessageController } from './messages.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService]
})

export class MessageModule { }