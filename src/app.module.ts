import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
// import { NuxtNavigation } from './modules/Nuxt-navigation/index.module'
import { NextChatGpt } from './modules/Next-chat-gpt/index.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/next-gpt'),
    ConfigModule.forRoot({
      envFilePath: [
        join(__dirname, '..', '.development.env'),
      ]
    }),
    // NuxtNavigation
    NextChatGpt
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*'); // 将中间件应用到所有路由
  }
}
