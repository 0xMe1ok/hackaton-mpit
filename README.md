# СкиллСтек - ShowLytics
<img alt="Static Badge" src="https://img.shields.io/badge/dev_status-in_process-green">

Система сбора и визуализации данных для принятия управленческих решений в сфере туризма. Данный проект позволит в простой форме анализировать процессы, происходящие и влияющие на ТК Шерегеш. Главной целью является вывести ТК Шерегеш в топ 5 туристических центров мирового уровня.
Данный проект будет решать следующие задачи:
- Аккумуляция и аналитика данных в простом формате
- Управление данными с помощью голосовых команд
- Отображение онлайн трансляции объекта по необходимому адресу

## Содержание
- [Технологии](#технологии)
- [Начало работы](#начало-работы)
- [Тестирование](#тестирование)
- [To do](#to-do)

## Технологии 
- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)
- [MySQL](https://www.mysql.com/) (в рамках хакатона используется json файл)

## Начало работы

### Требования
Для установки и запуска проекта, необходим [NodeJS](https://nodejs.org/). В разработке был использована версия v20.11.0, но можно и новее.

Также в папке config необходимо в файле gigachad.json изменить параметр clientKey на ваш ключ от [GigaChat](https://developers.sber.ru/studio/workspaces/)

### Установка зависимостей
Для установки зависимостей, в папке проекта откройте терминал и выполните команду:
```sh
$ npm i
```

### Запуск dev сервера
Чтобы запустить dev сервер, выполните команду:
```sh
npm start
```

## Тестирование


## Deploy и CI/CD


### Зачем вы разработали этот проект?
Данный проект нужен для анализа данных по ТК Шерегеш. Это позволит улучшить качество обслуживания и увеличить прибыльность туристического центра.

## To do
- [x] Создать README проекта
- [ ] Создать связь с ИИ для составления отчетов по отдельным графикам (создается общий отчет)
- [ ] Создать базу данных для хранения данных (на время хакатона используется json файл)
- [x] Реализовать визуализацию данных в виде различного рода графиков
- [x] Реализовать общую отчетность с помощью ИИ, вывод в файл
