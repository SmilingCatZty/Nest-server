import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { OpenAiService } from './open-ai.service';


@Module({
  imports: [HttpModule],
  providers: [OpenAiService, ConfigService],
  exports: [OpenAiService]
})

export class OpenAiModule { }