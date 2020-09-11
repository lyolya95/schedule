import { Item } from "../TableSchedule.model";

export const originData: Item[] = [];
for (let i = 0; i < 3; i++) {
  originData.push({
    key: i.toString(),
    time: new Date().toISOString().slice(11, 16),
    timeToComplete: "20 дней",
    date: new Date().toISOString().slice(5, 10),
    week: i + 3,
    course: `React курс ${i}`,
    place: "онлайн трансляция",
    name: "Работа с Git",
    organizer: "Ольга Миронян",
    url: "youtube.com/c/RollingScopesSchool/" + i,
    task: "Создать первый коммит",
    materials: "Изучение веток git hubr",
    result: "что студент должен уметь",
    comment: "Тут будет комментарий",
    importance: true,
    done: false,
    score: 131,
    tags: ["nice", "developer"],
  });
}
