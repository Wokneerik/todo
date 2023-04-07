import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TelegrafModule } from 'nestjs-telegraf'
import { AppService } from './app.service'
import { AppUpdate } from './app.update'
import { TaskEntity } from './task.entity'

// const sessions = new LocalSession({database: 'session_db.json'})

@Module({
  imports: [
    TelegrafModule.forRoot({
      // middlewares: [sessions.middleware()],
      token: String(process.env.BOT_TOKEN) 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: 'ec2-34-241-82-91.eu-west-1.compute.amazonaws.com',
      // port: 5432,
      // database: 'dru7mog8r16oh',
      // username: 'hgoqyvrofzuuxm',
      // password: '698a14e410139528f2f9c284e7e3e1c122224df2502abe8c08ea61069e3fb18b',
      url: "postgres://hgoqyvrofzuuxm:698a14e410139528f2f9c284e7e3e1c122224df2502abe8c08ea61069e3fb18b@ec2-34-241-82-91.eu-west-1.compute.amazonaws.com:5432/dru7mog8r16oh",
      logging: true,
      entities: ["src/entity/*.*"],
      synchronize: true,
      dropSchema: true
    }),
    

		TypeOrmModule.forFeature([TaskEntity])
	],
	providers: [AppService, AppUpdate]
})


export class AppModule {}
