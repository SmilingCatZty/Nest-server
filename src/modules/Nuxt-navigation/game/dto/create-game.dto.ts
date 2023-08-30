import { IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  game_id: string;

  @IsString()
  game_icon: string;

  @IsString()
  game_title: string;

  @IsString()
  game_describe: string;

  @IsString()
  game_link: string;
}
