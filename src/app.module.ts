import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocModule } from './modules/Nuxt-navigation/doc/doc.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from './modules/Nuxt-navigation/game/game.module';
import { ToolModule } from './modules/Nuxt-navigation/tool/tool.module';
import { CorsMiddleware } from './middlewares/cors.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/navigation-assistant'),
    DocModule,
    GameModule,
    ToolModule,
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
