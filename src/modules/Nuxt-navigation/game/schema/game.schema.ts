import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GameDocument = HydratedDocument<Game>;

@Schema({
  versionKey: false,
})
export class Game {
  @Prop()
  game_id: string; // 游戏id

  @Prop()
  game_icon: string; // 游戏图标

  @Prop()
  game_title: string; // 游戏标题

  @Prop()
  game_describe: string; // 游戏描述

  @Prop()
  game_link: string; // 游戏链接
}

export const GameSchema = SchemaFactory.createForClass(Game);
