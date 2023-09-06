/**
 * @module文件
 * 用于创建数据表
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Example, ExampleSchema } from './schema/example.schema';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

/**
 * @imports { 导入模块的列表，这些模块导出了此模块中所需提供者 }
 * @controllers { 必须创建的一组控制器 }
 * @provider { 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享 }
 * @exports	{ 由本模块提供并应在其他模块中可用的提供者的子集 }
 */
@Module({
  imports: [
    /**
     * MongooseModule提供了forFeature()方法来配置模块，包括定义哪些模型应该注册在当前范围中。
     * 如果你还想在另外的模块中使用这个模型，将MongooseModule添加到CatsModule的exports部分并在其他模块中导入CatsModule。
     * 注册Schema后，可以使用 @InjectModel() 装饰器将 Cat 模型注入到 CatsService
     */
    MongooseModule.forFeature([{ name: Example.name, schema: ExampleSchema }]),
  ],
  controllers: [ExampleController],
  providers: [ExampleService],
  exports: [ExampleService],
})
export class ExampleModule {}
