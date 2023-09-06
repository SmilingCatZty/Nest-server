import { Controller } from "@nestjs/common";
import { MessageService } from "./messages.service";

@Controller('message')

export class MessageController {
  constructor(
    private readonly messageService: MessageService
  ) { }
}