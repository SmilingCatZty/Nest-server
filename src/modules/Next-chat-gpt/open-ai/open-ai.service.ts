import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { OpenAI } from 'openai';
import { lastValueFrom } from 'rxjs';

type ChatCompletionMessage = OpenAI.Chat.ChatCompletionMessageParam[] // chat消息类

@Injectable()
export class OpenAiService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) { }

  /**
   * 创建回话 - 国内通过代理访问
   * @param {Array} messages 
   * @example [{ role: 'user', content: 'Say hello!' }]
   */
  async createChatCompletion(
    messages: ChatCompletionMessage // [{ role: 'user', content: 'Say hello!' }]
  ): Promise<string> {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    const baseURL = `https://api.openai.com/v1`;
    const endpoint = 'chat/completions';
    const params = {
      model: 'gpt-3.5-turbo',
      messages,
    };
    const proxy = {
      host: '127.0.0.1',
      port: 7890,
      protocol: 'http',
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    let gptResponse: string

    console.log('params', params);
    try {
      const response: any = await lastValueFrom(
        this.httpService.post(`${baseURL}/${endpoint}`,
          params, { headers, proxy })
      )
      console.log('gpt-response', response);

      gptResponse = response.data.choices[0].message.content.trim();
    } catch (error) {
      const { status, statusText, data } = error.response
      const errParam = { status, statusText, data }
      console.log('gpt-error', errParam);
    }
    // const userToken = response.data.usage.prompt_tokens;
    // const gptToken = response.data.usage.completion_tokens;
    return gptResponse;
    // return '我是GPT,你好啊'
  }

  // 创建回话 - 外网SDK访问
  async createChatCompletionSDK(
    messages: ChatCompletionMessage
  ) {
    const apiKey: string = this.configService.get<string>('OPENAI_API_KEY');
    const baseURL: string = `https://api.openai.com/v1`;
    const endpoint: string = 'chat/completions';
    const params = {
      model: 'gpt-3.5-turbo',
      messages,
    };

    const openai = new OpenAI({
      apiKey,
      baseURL: `${baseURL}/${endpoint}`,
      defaultHeaders: { 'api-key': apiKey },
    });
    const result = await openai.chat.completions.create({ ...params })
    const gptResponse = result.choices[0].message.content.trim();
    const userToken = result.usage.prompt_tokens;
    const gptToken = result.usage.completion_tokens;

    return { gptResponse, userToken, gptToken }
  }
}