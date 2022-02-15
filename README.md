# Mesto-Express

Проектная работа 14 спринта 6 курса факультета ["Веб-разработчик"](https://practicum.yandex.ru/web/?utm_source=yandex&utm_medium=cpc&utm_campaign=Yan_Sch_RF_Webr_Razrab_Des_Intro_460&utm_content=sty_search:s_none:cid_56600998:gid_4359516496:pid_23387311960:aid_9838725511:crid_0:rid_:p_1:pty_premium:mty_syn:mkw_:dty_desktop:cgcid_0:rn_Москва:rid_213&utm_term=разработка%20web&yclid=4769457341696616776) образовательной платформы [Яндекс.Практикум](https://practicum.yandex.ru/).


## Описание проекта:
API проекта Mesto для обмена фотографиями.


## Функционал

* Хэширование пароля пользователя;
* JWT-аутентификация;
* Запись токена в cookie;
* Авторизационный мидлвэр;
* Централизованная обработка ошибок;
* Валидация приходящих на сервер данных;
* Реализация функциональности согласно таблице запросов.

### Таблица запросов:
* *Незащищенные авторизацией роуты*

Метод  | Роут                  | Описание запроса
---    |---                    |---
POST   |`/signup`              |регистрация пользователя
POST   |`/signin`              |авторизация пользователя

* *Защищенные авторизацией роуты*

Метод  | Роут                  | Описание запроса
  ---    |---                    |---
GET    |`/users`               |запрос всех пользователей
GET    |`/users/me`            |получение текущего пользователя
GET    |`/users/:id`           |запрос пользователя по идентификатору
PATCH  |`/users/me`            |обновление данных профиля
PATCH  |`/users/me/avatar`     |обновление аватара пользователя
GET    |`/cards`               |запрос всех карточек
POST   |`/cards`               |создание новой карточки
DELETE |`/cards/:id`           |удаление карточки
PUT    |`/cards/:id/likes`     |постановка лайка
DELETE |`/cards/:id/likes`     |снятие лайка


## Технологии:
* Node.js
* Express.js
* RegEx
* MongoDB


## Инструкция по локальному развертыванию:
* Клонировать репозиторий:
  ```
    git clone https://github.com/andrey-71/express-mesto.git
  ```

* Установить npm-зависимости:
  ```
  npm install
  ```

* Запуск сервера
  ```
  npm run start
  ```


## Требования к проекту:
* [Чеклист](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist-14.pdf)
  
  

