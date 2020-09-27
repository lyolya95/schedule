
| Deadline         | Folder name | Branch name | Team Id | Developers | Project evaluation |
| ---------------- | ----------- | ----------- | ------ | ---- | ------------ |
| 27.09.2020 23:59 | schedule    | schedule    | 44     |[<img src="https://avatars0.githubusercontent.com/u/55137598?s=460&u=8740b71f7d0ee8986706a17d65abb72d1f361bd6&v=4" alt="lyolya95" width="30"/>](https://github.com/lyolya95) [<img src="https://avatars0.githubusercontent.com/u/13054496?s=460&u=c34dcf141af5af5a2fcd3ac528f06f58d8ca301d&v=4" alt="newqwes" width="30"/>](https://github.com/newqwes) [<img src="https://avatars3.githubusercontent.com/u/55688514?s=460&v=4" alt="HalinaPP" width="30"/>](https://github.com/HalinaPP) [<img src="https://avatars2.githubusercontent.com/u/55784228?s=460&u=095228f2b8d78705bff5e0b49144d859a6c2db54&v=4" alt="rikkirikkardo44" width="30"/>](https://github.com/rikkirikkardo44) | 600 / 400 |

# schedule

Schedule - расписание курса RS School.

Как установить приложение
----------------------------

First, [Клонировать репозиторий](https://github.com/lyolya95/schedule.git).

Далее, перейдите в папку со скаченным репозиторием и установите зависимости:
```bash
cd schedule && npm install
```
Или, если Вы пользуетесь Yarn, тогда:
```bash
cd schedule && yarn
```

Затем, как все зависимости будут проинсталированны, запустите проект:
```bash
npm start
```
Или, если Вы пользуетесь Yarn, тогда:
```bash
yarn start
```

## Демо

Расписание Schedule [link](https://docs.google.com/spreadsheets/d/1oM2O8DtjC0HodB3j7hcIResaWBw8P18tXkOl1ymelvE/)

## Описание приложения

**Расписание содержит:**
- [x] минимум 10 рядов, но может быть расширено до 100-150 рядов
- [x] минимум 5 колонок, но может быть расширено до 10-12 колонок
- [x] значения в ячейках относятся к типам datetime, instant, string, object, integer и соответствуют существующему расписанию курса 

Интерактивные функции расписания отличаются для ментора и студента.

**Возможности студента:**
- [x] просмотр расписания в виде таблицы (основная форма расписания), календаря либо списка
- [x] просмотр детальной информации об отдельных заданиях расписания. Структуру страницы задания для разных типов заданий вам необходимо продумать самостоятельно 
- [x] сохранение расписания в виде таблицы, списка или календаря. Оптимальные форматы файлов (.txt, .pdf, .csv etc) для сохранения расписания определите исходя из потребностей пользователей

**Дополнительные возможности ментора:**
- [x] редактирование расписания - добавление, удаление и изменение данных
- [x] редактирование страницы задания - добавление, удаление и изменение данных

## Технические требования  

- [x] приложение должно корректно отображаться и работать в браузерах Google Chrome, Firefox, Opera, Edge, на мобильных устройствах
- [x] работу приложения необходимо протестировать не только в dev tools браузера Google Chrome, но и на реальных устройствах
- [x] необходимо использовать React
- [x] рекомендуется использовать TypeScript для более простой интеграции созданного приложения в rs app
- [x] рекомендуется использовать [Ant Design of React](https://ant.design/docs/react/introduce) 
- [x] можно использовать любые js-библиотеки, кроме jQuery (последняя может использоваться в качестве подключаемой зависимости, если она нужна для работы других библиотек) 
- [x] так как с кодом проекта будут работать другие разработчики, необходимо особое внимание обратить на его понятность, читаемость, структурированность

## Критерии оценки:

**Максимальный балл за задание: 600 баллов** 

- **Создание концепта приложения +30**
  - [x] выполнены и оформлены в виде markdown файла или документа Google Docs требования пункта "Определение потребностей пользователей" +10
  - [ ] идеи по улучшению расписания представлены в виде списка конкретных изменений и усовершенствований, которые необходимо внести в приложение +10
  - [ ] создан макет приложения в figma либо другом редакторе (нарисованные от руки и отсканированные наброски и схемы тоже подойдут) +10

- **Оформление приложения +30**
  - [x] приложение корректно отображается как на компьютере, так и на мобильных устройствах, оптимально занимает площадь страницы. Минимальная ширина страницы, при которой приложение отображается корректно, 320рх. Наличие в таблице полосы прокрутки не является ошибкой  +10
  - [x] дизайн приложения должен гармонично сочетаться с оформлением rs app. Допускаются небольшие отличия, улучшающие визуальное восприятие созданного вами приложения либо упрощающие работу с ним. Единое стилевое оформление всех страниц приложения +10
  - [x] у приложения есть версия для слабовидящих - больший размер шрифта, доступные элементы пользовательского интерфейса, высокая контрастность и т.д. +10

- **Просмотр расписания (пользователь - студент) +180**
    ![GitHub Logo](/images/schedule.png)
  - [x] возможность просмотра расписания в виде календаря +10
  - [x] возможность просмотра расписания в виде списка +10
  - [x] значения в ячейках таблицы с расписанием отображаются и форматируются согласно типу находящихся в них данных +10  
  - [x] при просмотре расписания есть возможность выбора часового пояса +10  
  - [x] строки таблицы, строки списка, даты календаря, которым соответствуют разные типы заданий (лекция, тест, выдача таска, дедлайн таска и т.д.) выделены разным фоновым цветом +10
  - [ ] при просмотре расписания есть возможность указать пользовательские настройки цвета фона и цвета шрифта для выделения заданий разных типов +10
  - [x] можно настраивать видимость колонок расписания +10
  - [x] возможность фильтрации расписания по типам заданий +10
  - [x] ряд таблицы или списка можно выделить кликом. Выделенный ряд должен отличаться визуально +10 
  - [x] выделенный ряд можно скрыть. Скрытый ряд можно отобразить +10
  - [x] с зажатым shift можно выделить несколько рядов таблицы. Выделенные ряды можно скрыть. Скрытые ряды можно отобразить +10
  - [x] возможность сохранения расписания в виде таблицы, в виде списка и в виде календаря в одном или нескольких форматах файлов. При сохранении расписания пользовательские настройки расписания (цветовая схема, скрытые ряды и колонки, применённые фильтры и т.д.) сохраняются  +10 баллов за каждый формат файлов, но не более 20 баллов  
  - [x] по клику по пункту расписания открывается страница задания с подробной информацией о нём +10
  - [x] продуманная структура и внешний вид страницы задания - разная структура страницы задания для разных типов заданий, содержится вся необходимая информация о задании, наиболее важная информация выделена и т.д. +10
  - [x] страница задания может содержать текст, ссылки, фото и видео +10 
  - [x] для событий, которые проходят офлайн, на странице задания отображается карта с местом их проведения +10
  - [x] на странице задания можно оставить feedback о задании +10

- **Редактирование расписания (пользователь - ментор) +180**  
  - [x] у ментора есть возможность редактирования расписания Редактируется только основная форма расписания - таблица. Расписание в виде календаря или списка автоматически генерируются на основе введённых в таблицу данных +20
  - [x] редактирование расписания организовано понятно и удобно - интуитивно понятный интерфейс, наличие необходимых подсказок, доступные элементы управления +10
  - [x] в процессе редактирования ментор сразу видит, как будет выглядеть таблица с расписанием +10
  - [ ] в процессе редактирования есть возможность предпросмотра расписания в виде календаря +10
  - [ ] в процессе редактирования есть возможность предпросмотра расписания в виде списка +10
  - [x] при редактировании расписания дату можно выбрать на календаре +10
  - [x] при редактировании расписания есть возможность выбора часового пояса +10
  - [ ] при редактировании расписания есть возможность изменять цвет фона и цвет шрифта для выделения заданий разных типов +10
  - [x] в ходе редактирования расписания есть возможность добавлять новые типы заданий и выбирать для них цвет фона и цвет шрифта +20
  - [x] у ментора есть возможность редактирования страницы задания +10
  - [x] редактирование страницы задания организовано понятно и удобно - интуитивно понятный интерфейс, наличие необходимых подсказок, доступные элементы управления +10 
  - [x] в процессе редактирования на страницу задания можно добавлять текст, ссылки, фото и видео +20  
  - [x] для событий, которые проходят офлайн, есть возможность указать на карте место их проведения +10
  - [x] в процессе редактирования ментор сразу видит, как будет выглядеть страница с заданием +10
  - [ ] в процессе редактирования страницы с заданием есть возможность разрешить или запретить оставлять feedback о задании +10

- **Оптимизация расписания +110**
  - [x] выбранные пользователем способ отображения расписания, часовой пояс, видимость колонок, применённые фильтры, выбранный цвет фона и цвет шрифта, скрытые ряды, другие применённые настройки, если они есть, сохраняются в localStorage так, что при обновлении страницы состояние расписания сохраняется +10
  - [ ] определите эффективность использования [виртуализации рядов](https://web.dev/virtualize-long-lists-react-window/), других способы оптимизации производительности приложения. Примените наиболее эффективные способы для оптимизации производительности приложения +20
  - [ ] в расписание внесены дополнительные не указанные в задании полезные усовершенствования, которые облегчают работу с ним, делают его более удобным и функциональным, улучшают внешний вид и т.д. +10 баллов за каждое полезное качественно выполненное усовершенствование*, но не более 80 баллов

- **Использованные технологии +40**
  - [x] TypeScript +30
  - [x] Ant Design of React +10

- **Документирование кода +20**
  - [ ] создана и оформлена документация, позволяющая другим разработчикам понять особенности работы приложения + 20
  
- **Целесообразность интеграции в rs app +40**
  - [ ] созданное приложение целесообразно интегрировать в rs app + 40

- **Штрафные баллы** 
  - [ ] внесённые изменения делают использование приложения менее удобным, снижают его качество -10 баллов за каждое изменение, которое привело к ухудшению юзабилити приложения

\* под усовершенствованием понимаем добавление нового функционала либо комплексное изменение дизайна. Это не касается мелких правок вроде добавления логотипа или изменения размера шрифта.

**Примеры усовершенствований:** 
- у студента есть возможность объединить расписание разных курсов, которые он проходит одновременно
- у ментора есть возможность указать время появления задания в расписании, когда заранее добавленное задание отображается в расписании в указанное время   
