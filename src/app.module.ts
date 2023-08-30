import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { NuxtNavigation } from './modules/Nuxt-navigation/index.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/navigation-assistant'),
    NuxtNavigation
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
