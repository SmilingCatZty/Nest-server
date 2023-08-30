import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DocDocument, Doc } from './schema/doc.schema';
import { Model } from 'mongoose';

@Injectable()
export class DocService {
  constructor(
    @InjectModel('Doc')
    private docModel: Model<DocDocument>,
  ) {}

  create(docInfo: Doc): Promise<Doc> {
    const doc = new this.docModel(docInfo);
    return doc.save();
  }

  /**
   * 查询全部文档
   */
  findList(): Promise<Doc[]> {
    const docs = this.docModel.find();
    return docs;
  }

  /**
   * 查询某种类型下的文章列表
   * @param doc_type
   */
  findDocForType(doc_type: string): Promise<Doc[]> {
    const doc = this.docModel
      .find({ doc_type: doc_type })
      .sort({ doc_idx: 1 })
      .exec();
    return doc;
  }

  /**
   * 查询文档类型
   */
  async findDocTypes(): Promise<string[]> {
    const docs = await this.docModel.find({}, { _id: -1, doc_type: 1 });
    const arr = [];
    docs.forEach((doc: any) => {
      arr.push(doc.doc_type);
    });
    const docTypes: string[] = [...new Set(arr)];
    return docTypes;
  }
}
