import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { DocService } from './doc.service';
import { CreateDocDto } from './dto/create-doc.dto';
import { Doc } from './schema/doc.schema';

interface DocListModel {
  type: string;
  title: string;
  collection: Doc[];
}

const typeList = new Map([
  ['front-web-frame', '前端基础框架'],
  ['front-node-frame', 'Node框架'],
  ['applet', '小程序'],
  ['front-ui-frame', 'UI组件库'],
  ['computer-network', '计算机网络'],
  ['database', '数据库'],
  ['server-render', '服务端渲染框架'],
  ['bag-manager', '包管理工具'],
  ['mini-front-frame', '微前端'],
]);

@Controller('doc')
export class DocController {
  constructor(private readonly docService: DocService) {}

  @Post('create')
  async create(@Body() createDocDto: CreateDocDto) {
    try {
      let docTypeIdx = 0;
      const docs = await this.docService.findDocForType(createDocDto.doc_type);
      if (docs.length > 0) {
        const finallyDoc = docs[docs.length - 1];
        docTypeIdx = finallyDoc.doc_idx + 1;
      }
      const createDocParams = {
        ...createDocDto,
        doc_idx: docTypeIdx,
      };
      const doc = await this.docService.create(createDocParams);
      return doc;
    } catch (error) {
      throw new InternalServerErrorException(error.msg);
    }
  }

  @Get('list')
  async list() {
    try {
      const docs = await this.docService.findList();
      return docs;
    } catch (error) {
      throw new InternalServerErrorException(error.msg);
    }
  }

  @Get('docList')
  async docList() {
    try {
      const docTypes = await this.docService.findDocTypes();
      const docList = await Promise.all(
        docTypes.map(async (type: string) => {
          let docArr: DocListModel = {} as DocListModel;
          const docs = await this.docService.findDocForType(type);
          docArr = {
            type: type,
            title: typeList.get(type),
            collection: docs,
          };
          return docArr;
        }),
      );
      return docList;
    } catch (error) {
      throw new InternalServerErrorException(error.msg);
    }
  }
}
