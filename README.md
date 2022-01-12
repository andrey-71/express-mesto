# Место-бэкенд (Mesto-Express)

Проектная работа 13 спринта 6 курса факультета ["Веб-разработчик"](https://practicum.yandex.ru/web/?utm_source=yandex&utm_medium=cpc&utm_campaign=Yan_Sch_RF_Webr_Razrab_Des_Intro_460&utm_content=sty_search:s_none:cid_56600998:gid_4359516496:pid_23387311960:aid_9838725511:crid_0:rid_:p_1:pty_premium:mty_syn:mkw_:dty_desktop:cgcid_0:rn_Москва:rid_213&utm_term=разработка%20web&yclid=4769457341696616776) образовательной платформы [Яндекс.Практикум](https://practicum.yandex.ru/).


## Описание проекта:
Серверная часть проекта Mesto для обмена фотографиями.


## Функционал
### Роутинг и запросы:
* `GET /users` - запрос всех пользователей;
* `GET /users/:userId` - запрос пользователя по идентификатору;
* `POST /users` - создание нового пользователя;
* `PATCH /users/me` - обновление данных профиля;
* `PATCH /users/me/avatar` - обновление аватара пользователя;
* `GET /cards` - запрос всез карточек;
* `POST /cards` - создание новой карточки;
* `DELETE /cards/:cardId` - удаление карточки по идентификатору;
* `PUT /cards/:cardId/likes` - постановка лайка;
* `DELETE /cards/:cardId/likes` - снятие лайка.


* Начальная валидация данных от пользователя;
* Обработка ошибок.



## Технологии:
* Node.js
* Express.js
* MongoDB


## Инструкция по локальному развертыванию:
* Клонировать репозиторий:
  ```
    git clone https://github.com/andrey-71/express-mesto.git
  ```

* На компьютере должны быть установлены:
  * [Node.js](https://nodejs.org/en/download/)
  * [MongoDB](https://www.mongodb.com/try/download/community?jmp=docs)
  * `npm i express`
  * `npm i body-parser`


* Запуск сервера
  ```
  npm run start
  ```
* Запуск сервера с hot-reload
  ```
  npm run build
  ```
  Дополнительно необходимо установить следующие зависимости:
  * `npm i nodemon`
  * `npm i eslint`
  * `npm i eslint-config-airbnb-base`
  * `npm i eslint-plugin-import`

## Планы по доработке проекта:
* Реализовать регистрацию и авторизацию пользователя;
* Добавить валидацию полей с url.


## Требования к проекту:
* [Чеклист](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-13.pdf)
  
  
