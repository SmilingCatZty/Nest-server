/**
 * @controller文件
 * 用于处理结果响应
 */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Put,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ExampleService } from './example.service';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Example } from './schema/example.schema';
import { ClearUselessPropertie } from 'src/decretors/global.dec';

export class UserEntity {
  auth: boolean;
  id: string;

  @Exclude()
  @IsOptional()
  _id?: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('list')
  @ClearUselessPropertie // 自定义装饰器，用于返回一个没有 "_id","__v"的数组或对象
  async getExample() {
    const page = 1;
    const size = 10;
    try {
      const example = await this.exampleService.findAll(page, size);
      return example;
    } catch (error) {
      throw new InternalServerErrorException(error.msg);
    }
  }

  /**
   * @description 序列化
   * @returns object:Example
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('find')
  async findOne(): Promise<Example> {
    const example = await this.exampleService.findOne();
    console.log('example', { ...example });

    const a = JSON.parse(JSON.stringify(example));
    const b = new Example(a);
    console.log('a', { ...a });
    return b;
  }

  @Put('update')
  async update(@Body() updateExampleDto: UpdateExampleDto) {
    try {
      const example = this.exampleService.update(updateExampleDto);
      return example;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('add')
  async create(
    @Body() createExampleDto: CreateExampleDto,
    /**
     * @Res
     * @description 装饰器可以将响应对象注入到控制器方法中，从而可以使用它来设置响应信息）
     */
    @Res() res,
  ) {
    try {
      const example = await this.exampleService.create(
        createExampleDto.id,
        createExampleDto.auth,
      );
      res.status(200).send('Hello World!');
      return example;
    } catch (err) {
      /**
       * @InternalServerErrorException 内置HTTP异常
       */
      throw new InternalServerErrorException(err.message);
    }
  }
}
