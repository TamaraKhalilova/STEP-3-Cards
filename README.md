# Список использованных технологий
"browser-sync": "^2.26.7",
    + "del": "^5.1.0",
    + "gulp": "^4.0.2",
    + "gulp-clean": "^0.4.0",
    + "gulp-clean-css": "^4.3.0",
    + "gulp-concat": "^2.6.1",
    + "gulp-debug": "^4.0.0",
    + "gulp-if": "^3.0.0",
    + "gulp-imagemin": "^7.1.0",
    + "gulp-load-plugins": "^2.0.3",
    + "gulp-sass": "^4.1.0",
    + "gulp-sourcemaps": "^2.6.5",
    + "gulp-terser": "^1.2.0",
    + "gulp-watch": "^5.0.1",
    + "multipipe": "^4.0.0",
    + "node-sass": "^4.14.1",
    + "yargs": "^15.3.1"


# Состав участников проекта

**Студент №1** -  Тамара Онуфриева. 
__Задачи:__
Создание проекта (репозиторий, подключение сборки, вёрстка);

Создание модальных окон по событиям кнопки в хедере: 

1) вход -> модальное окно авторизации -> сама авторизация (запрос на сервер);
2) смена кнопки "вход" на "создать визит" -> модальное окно выбора врача -> модальное окно создания визита с опциями;

+соответствующие классы (Form, Modal, Input, Textarea, Select);

Событие кнопки "редактировать" на карточке -> модальное окно редактирования карточки -> кнопка "сохранить";

Событие: нажатие на область вокруг модальных окон -> их закрытие без сохранений;
Событие: нажатие на кнопку "х" в модальных окнах -> их закрытие без сохранений;


**Студент №2** -  Андрей Миронец. 
__Задачи:__
1) доска карточек -> загрузка визитов (запрос на сервер) и создание визитов
2) сообщение о наличии карточек на доске
3) удаление и редактирование карточки - запросы на сервер и последующие действия на клиенте (модальное окно - Тамара) 

+соответствующие классы (Visit, VisitCardiologist, VisitDentist, VisitTherapists);


**Студент №3** -  Татьяна Краснонос. 
__Задачи:__
Создание фильтров карточек по доктору, срочности и поле для ввода текста поиска по ФИО, заголовку и описанию визита.





