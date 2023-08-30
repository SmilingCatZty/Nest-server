import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameDocument } from './schema/game.schema';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './schema/game.schema';

@Injectable()
export class GameService {
  constructor(@InjectModel('Game') private gameModel: Model<GameDocument>) {}

  create(gameInfo: CreateGameDto): Promise<Game> {
    const game = new this.gameModel({
      ...gameInfo,
    });
    return game.save();
  }

  list(): Promise<Game[]> {
    return this.gameModel.find();
  }
}
