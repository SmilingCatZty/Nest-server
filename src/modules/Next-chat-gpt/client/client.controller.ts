import { Body, Controller, InternalServerErrorException, Post, Req } from "@nestjs/common";
import { MessageService } from '../messages/messages.service'
import { OpenAiService } from '../open-ai/open-ai.service'
import { CreateMessageDto } from "../messages/dto/create-message.dto";
import { CompleteMessageDto } from '../messages/dto/complete-message.dto'

@Controller('next-client')

export class ClientController {
  constructor(
    private readonly messagesService: MessageService,
    private readonly openAiService: OpenAiService
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

  @Post('message/complete')
  async complete(@Body() completeMessageDto: CompleteMessageDto) {
    const { messageId } = completeMessageDto
    const message = await this.messagesService.findOne(messageId)
    const { user, user_text } = message    
    const gptResponse = await this.openAiService.createChatCompletion([{ role: 'user', content: user_text }])    
    const curMsg = await this.messagesService.update(messageId, gptResponse)

    return curMsg
  }
}