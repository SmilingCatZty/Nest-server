import { Body, Controller, InternalServerErrorException, Post, Req } from "@nestjs/common";
import { MessageService } from '../messages/messages.service'
import { CreateMessageDto } from "../messages/dto/create-message.dto";

@Controller('next-client')

export class ClientController {
  constructor(
    private readonly messagesService: MessageService
  ) { }
  @Post('message')
  async create(@Body() createMessageDto: CreateMessageDto, @Req() req) {
    try {
      const { user_id, user_text } = createMessageDto;
      const message = await this.messagesService.create(user_id, user_text);
      return message;
    } catch (err) {
      console.error('client-message', err);
      throw new InternalServerErrorException(err.message);
    }
  }
}