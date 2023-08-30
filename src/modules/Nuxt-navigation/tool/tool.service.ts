import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tool, ToolDocument } from './schema/tool.schema';

@Injectable()
export class ToolService {
  constructor(@InjectModel('Tool') private toolModule: Model<ToolDocument>) {}

  create(toolInfo: Tool): Promise<Tool> {
    const tools = new this.toolModule({
      ...toolInfo,
    });
    return tools.save();
  }

  /**
   * 查询工具列表
   */
  list(): Promise<Tool[]> {
    return this.toolModule.find();
  }

  /**
   * 查询某种类型下的工具列表
   * @param {string} tool_type
   */
  findToolForType(tool_type: string): Promise<Tool[]> {
    const tools = this.toolModule
      .find({ tool_type: tool_type })
      .sort({ tool_idx: 1 })
      .exec();
    return tools;
  }

  /**
   * 查询工具类型
   */
  async findToolTypes(): Promise<string[]> {
    const tools = await this.toolModule.find({}, { _id: -1, tool_type: 1 });
    const arr = [];
    tools.forEach((tool: any) => {
      arr.push(tool.tool_type);
    });
    const toolTypes: string[] = [...new Set(arr)];
    return toolTypes;
  }

  /**
   * 拖拽排序
   * @param {string} tool_type
   * @param {string} tool_key
   * @param {number} tool_idx
   */
  async sortToolsByTypeAndIdx(
    tool_type: string,
    tool_key: string,
    tool_idx: number,
  ): Promise<Tool> {
    const tool = await this.toolModule.findOneAndUpdate(
      { tool_type, tool_key },
      { $set: { tool_idx: tool_idx } },
    );
    return tool;
  }
}
