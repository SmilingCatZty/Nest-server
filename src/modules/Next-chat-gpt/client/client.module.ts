import { Module } from "@nestjs/common";
import { MessageModule } from '../messages/messages.module'
import { ClientController } from "./client.controller";
import { OpenAiModule } from '../open-ai/open-ai.module'

@Module({
  imports: [MessageModule, OpenAiModule],
  controllers: [ClientController]
})

export class ClientModule { }