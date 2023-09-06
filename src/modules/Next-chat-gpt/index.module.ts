import { Module } from "@nestjs/common";
import { MessageModule } from './messages/messages.module'
import { ClientModule } from './client/client.module'

@Module({
  imports: [ClientModule],
  providers: [],
  controllers: [],
  exports: []
})

export class NextChatGpt { }