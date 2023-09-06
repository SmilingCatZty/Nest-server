/**
 * @schema文件
 * 用于定义数据表结构
 */

import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';

// 创建一个Example对象
@Schema({
  timestamps: true, // 自动加上createdAt 和 updatedAt
  versionKey: false,
  _id: false,
  // toObject: {
  //   getters: true,
  //   virtuals: false,
  // },
  toJSON: {
    getters: true,
    virtuals: false,
  },
})
export class Example {
  constructor(partial: Partial<Example>) {
    Object.assign(this, partial);
  }
  @Prop()
  id: string;

  @Prop()
  auth: boolean;

  @Exclude()
  password: string;

  @Exclude()
  _id: string;
}

/**
 * @HydratedDocument
 * 1、在 Mongoose 中，我们使用模型来定义一个数据模板，并使用模型实例来访问和操作实际的文档数据。
 * 2、当我们使用模型实例来查询文档时，Mongoose 会将查询结果转换为“Hydrated Document”（即“已填充的文档”）对象。
 * 3、'Hydrated Document' 对象包含了所有查询结果的字段及其值，以及许多其他有用的方法和属性。
 * 4、'Hydrated Document' 对象是使用 Mongoose 的标准文档对象 API 构建的，可以访问和修改文档的属性，并提供了许多便捷的方法和属性，
 * 5、如：get（‘fieldName’）以获取文档的字段值，set（‘fieldName’， value）以设置文档的字段值，以及 isModified（‘fieldName’）以检查文档的某个字段是否被修改。
 */
export type ExampleDocument = HydratedDocument<Example>;

// 'SchemaFactory.createForClass()' 的作用是通过传入一个类来创建对应的 Mongoose schema。
export const ExampleSchema = SchemaFactory.createForClass(Example);
