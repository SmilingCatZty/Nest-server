import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { OpenAI } from 'openai';

type ChatCompletionMessage = OpenAI.Chat.ChatCompletionMessageParam[]


@Injectable()

export class OpenAiService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) { }

  /**
   * 创建一条回话
   * @param {Array} messages 
   * @example [{ role: 'user', content: 'Say hello!' }]
   */
  async createChatCompletion(
    messages: ChatCompletionMessage // [{ role: 'user', content: 'Say hello!' }]
  ) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    const baseURL = 'https://api.openai.com/v1/';
    const endpoint = 'chat/completions';
    const params = {
      model: 'gpt-3.5-turbo',
      messages,
    };
    const proxy = {
      host: '127.0.0.1',
      port: 7890,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    const openai = new OpenAI({
      apiKey,
      baseURL: `${baseURL}${endpoint}`,
      defaultHeaders: { 'api-key': apiKey },
    });

    const result = await openai.chat.completions.create(params)
    result.choices[0]!.message?.content

    const gptResponse = result.choices[0].message.content.trim();
    const userToken = result.usage.prompt_tokens;
    const gptToken = result.usage.completion_tokens;

    // const response = await this.httpService.post(`${baseURL}${endpoint}`, params, {
    //   headers,
    //   proxy,
    // })
    // const gptResponse = response.data.choices[0].message.content.trim();
    // const userToken = response.data.usage.prompt_tokens;
    // const gptToken = response.data.usage.completion_tokens;
    return { gptResponse, userToken, gptToken };
  }
}