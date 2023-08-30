import { Module } from "@nestjs/common";
import { DocModule } from './doc/doc.module'
import { GameModule } from './game/game.module'
import { ToolModule } from './tool/tool.module'

@Module({
  imports: [
    DocModule,
    GameModule,
    ToolModule
  ],
  exports: [
    DocModule,
    GameModule,
    ToolModule
  ]
})

export class NuxtNavigation { }