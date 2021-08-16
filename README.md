# Simply ToDo app using Express.js and React

## Описание

Традиционное (очень) приложение для изучения Express.js и React.
Для хранения данных используются json файлы на сервере.
Декорирование - Tailwind CSS.

## Структура

### Модель
Каждый таск представлен следующей структурой в файле ${categoryName}.json
{  
  taskId: '2WEKaVNO',  
  title: 'Task',
  _isDeleted: false,
  _createdAt: 14135235, 
  _deletedAt: 14135235,
  status: 'done'  // ['done', 'new', 'in progress', 'blocked']
}

### Сервер
GET /api/v1/tasks/:category - получить список задач, без полей, которые начинаются с нижнего подчеркивания кроме тасков с _isDeleted: true  
GET /api/v1/tasks/:category/:timespan - аналогично предыдущему пункту с дополнительной фильтрацией по времени создания (добавлено за день, неделю, месяц)
POST /api/v1/tasks/:category - Если json не существует, создать новый файл с именем `../tasks/${category}.json`. Затем положить туда таск с полем title, которое пришло в теле запроса.
PATCH /api/v1/tasks/:category/:id - Обновить status таска с айди id в файле `../tasks/${category}.json` - вернуть обновленный таск. Если статус не соответвует заявленным статусам - не обновлять ничего - вернуть  статус 501 и ответ {"status" :"error", "message": "incorrect status"}  
DELETE /api/v1/tasks/:category/:id - Пометить таск с :id в категории :category - isDeleted: true  

### Клиент
Выводит список задач с /api/v1/tasks/:category

если статус задачи new - у неё есть кнопка in progress - переводит в статус in progress

если статус задачи in progress - то будет 2 кнопки
-- называется blocked и переводит в статус blocked
-- называется done и переводит в статус done

если статус задачи blocked - то будет кнопка blocked и переводит в статус in progress

Под списком и над списком задач будет поле ввода и кнопка(компонент) - добавление новой задачи в список задач(надо отправить (POST /api/v1/tasks/:category), после нажатии на кнопку - должен обновиться и файл на сервере и добавиться задача на клиенте

Каждая строка задач - должна иметь кнопку редактировать, которая переключает из текста - текст задачи в поле вводаи кнопка меняет название на сохранить. При нажатии на кнопку обновляется запись в строке и текст задания на сервере(PATCH /api/v1/tasks/:category)

Вверху страницы - должны быть четыре кнопки Все/ День/ Неделя/ Месяц, которые переходят на соотвествующие роутыё /:category /:category/day /:category/week /:category/month. При переходе на эти роуты данные запрашиваются с соответствующих роутов(/api/v1/tasks/:category/:timespan)

