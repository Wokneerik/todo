import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TelegrafModule } from 'nestjs-telegraf'
import { join } from 'path'
import * as LocalSession from 'telegraf-session-local'
import { AppService } from './app.service'
import { AppUpdate } from './app.update'
import { TaskEntity } from './task.entity'

const sessions = new LocalSession({database: 'session_db.json'})

@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: String(process.env.BOT_TOKEN) 
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'ec2-54-155-46-64.eu-west-1.compute.amazonaws.com',
      port: 5432,
      database: 'd20d78k8i63obc',
      username: 'qluhcvgduzbwjh',
      password: 'e0894c646e4370b2ce74bb0d79f6091fd520e327478b633130d24739a3268eee',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      dropSchema: true
    }),
    

		TypeOrmModule.forFeature([TaskEntity])
	],
	providers: [AppService, AppUpdate]
})


export class AppModule {}
