/**
 * @service文件
 * 用于对数据库的操作：如'增','删','改','查'等
 */
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Example, ExampleDocument } from './schema/example.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  constructor(
    // 使用@InjectModel()装饰器来把Example注入到UsersService中。
    @InjectModel('Example')
    private exampleModel: Model<ExampleDocument>,
  ) {}

  async create(id: string, auth: boolean): Promise<Example> {
    const createNotice = new this.exampleModel({
      id,
      auth,
    });
    return createNotice.save();
  }

  async findOne(): Promise<Example> {
    const example = await this.exampleModel.findOne();
    return example;
  }

  async findAll(page: number, size: number): Promise<Example[]> {
    return this.exampleModel
      .find()
      .sort({ createdAt: -1 }) // 根据createdAt排序
      .skip(size * (page - 1)) // 分页
      .limit(size) // 数量限制
      .select('-_id') // 删除数据库返回的_id字段
      .exec();
  }

  async update(params): Promise<Example[]> {
    return this.exampleModel.findByIdAndUpdate(params._id, params.info);
  }
}
