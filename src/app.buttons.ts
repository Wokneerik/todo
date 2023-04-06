import { Markup } from 'telegraf'

export function actionButtons (){
    return Markup.keyboard(
        [
            Markup.button.callback('⚡️ Создать задачу', 'create'),
            Markup.button.callback('📃Список дел', 'list'),
            Markup.button.callback('✅Сделано', 'done'),
            Markup.button.callback('🖊Изменить', 'edit'),
            Markup.button.callback('❌Удалить', 'delete')
        ],
        {
            columns: 2,
            
            
            
        }
    ).resize()
}