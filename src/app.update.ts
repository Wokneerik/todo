import {
	Ctx,
	Hears,
	InjectBot,
	Message,
	On,
	Start,
	Update
} from 'nestjs-telegraf'
import { Telegraf } from 'telegraf'
import { actionButtons } from './app.buttons'
import { AppService } from './app.service'
import { showList } from './app.utils'
import { Context } from './context.interface'



@Update()
export class AppUpdate {
	constructor(
		@InjectBot() private readonly bot: Telegraf<Context>,
		private readonly appService: AppService
	) {}

	@Start()
	async startCommand(ctx: Context) {
		await ctx.reply('Hi! Friend 👋')
		await ctx.reply('Что ты хочешь сделать?', actionButtons())
	}

	@Hears('⚡️ Создать задачу')
	async createTask(ctx: Context) {
		ctx.session.type = 'create'
		await ctx.reply('Опиши задачу: ')
	}

  @Hears('📃Список дел')
  async listTask(ctx: Context){
    const todos = await this.appService.getAll()
    await ctx.reply(showList(todos))
  }

    @Hears('✅Сделано')
  async doneTask(ctx: Context){
   await ctx.deleteMessage()
   await ctx.reply('Напишите номер Задачи: ')
   ctx.session.type = 'done'
}

       @Hears('🖊Изменить')
  async editTask(ctx: Context){
   await ctx.deleteMessage()
   await ctx.replyWithHTML(
    'Напишите номер Задачи и новое название задачи: \n\n ' +
   '<i>В формате -1 | Новое название</i>')
   ctx.session.type = 'edit'
}

   @Hears('❌ Удаление')
	async deleteTask(ctx: Context) {
		ctx.session.type = 'remove'
		await ctx.deleteMessage()
		await ctx.reply('Напиши ID задачи: ')
	}
 
  @On('text')
	async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
		if (!ctx.session.type) return

		if (ctx.session.type === 'create') {
			const todos = await this.appService.createTask(message)
			await ctx.reply(showList(todos))
		}

		if (ctx.session.type === 'done') {
			const todos = await this.appService.doneTask(Number(message))

			if (!todos) {
				await ctx.deleteMessage()
				await ctx.reply('Задачи с таким номером нет!')
				return
			}
			await ctx.reply(showList(todos))
		}

		if (ctx.session.type === 'edit') {
			const [taskId, taskName] = message.split(' | ')
			const todos = await this.appService.editTask(Number(taskId), taskName)

			if (!todos) {
				await ctx.deleteMessage()
				await ctx.reply('Задачи с таким номером нет!')
				return
			}

			await ctx.reply(showList(todos))
		}

		if (ctx.session.type === 'remove') {
			const [taskId, taskName] = message.split(' | ')
			const todos =  await this.appService.deleteTask(Number(taskId))

			if (!todos) {
				await ctx.deleteMessage()
				await ctx.reply('Задачи с таким номером нет!')
				return
			}
			   await ctx.reply(showList(todos))
			
		}
	}
}
