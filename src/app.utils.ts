export const showList = (todos) => 
     `Мой список дел: \n\n${todos
         .map(todo => (todo.isCompleted ? '✅' : '📍') + ' ' + todo.name + '\n\n'
         )
         .join('')}`
