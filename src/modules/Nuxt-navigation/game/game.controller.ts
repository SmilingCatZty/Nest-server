import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('create')
  async create(@Body() createGameDto: CreateGameDto) {
    const game = this.gameService.create({
      ...createGameDto,
    });
    return game;
  }

  @Get('list')
  async list() {
    try {
      const games = await this.gameService.list();
      return games;
    } catch (error) {
      throw new InternalServerErrorException(error.msg);
    }
  }
}
