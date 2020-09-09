import { Item } from "../../components/TableSchedule/TableSchedule.model";

export const originData: Item[] = [
  {
    key: "0",
    time: new Date().toISOString().slice(11, 16),
    timeToComplete: "20 дней",
    date: new Date().toISOString().slice(5, 10),
    place: "онлайн трансляция",
    name: "Работа с Git",
    organizer: "Ольга Миронян",
    url: "youtube.com/c/RollingScopesSchool/",
    task: "Создать первый коммит",
    materials: "Изучение веток github",
    result: "что студент должен уметь",
    comment: "Тут будет комментарий",
    importance: true,
    done: false,
    score: 131,
    tags: "nice",
  },
];
