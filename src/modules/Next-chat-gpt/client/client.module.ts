import { Module } from "@nestjs/common";
import { MessageModule } from '../messages/messages.module'
import { ClientController } from "./client.controller";

@Module({
  imports: [MessageModule],
  controllers: [ClientController]
})

export class ClientModule { }