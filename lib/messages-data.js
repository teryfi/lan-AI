export const initialConversations = [
  {
    id: "ekaterina-office",
    name: "Екатерина",
    preview: "Нужна спокойная капсула для офиса и весны.",
    timeLabel: "14:42",
    unreadCount: 1,
    online: true,
    messages: [
      { role: "client", text: "Нужна спокойная капсула для офиса и весны, без ярких цветов.", time: "14:21" },
      { role: "designer", text: "Соберу подборку в мягкой нейтральной палитре и уложусь в заданный бюджет.", time: "14:28" },
      { role: "client", text: "Хорошо, важно чтобы вещи подходили и для встреч.", time: "14:42" }
    ]
  },
  {
    id: "marina-layer",
    name: "Марина",
    preview: "Ищу мягкий тренч или жакет для города и рабочих дней.",
    timeLabel: "11:20",
    unreadCount: 0,
    online: false,
    messages: [
      { role: "client", text: "Ищу мягкий тренч или жакет для города, встреч и рабочих дней.", time: "10:56" },
      { role: "designer", text: "Подберу два варианта: более структурный для офиса и расслабленный для повседневного ритма.", time: "11:05" },
      { role: "client", text: "Есть ли доставка в Питер?", time: "11:20" }
    ]
  },
  {
    id: "alina-collab",
    name: "Алина",
    preview: "Хотим коллаборацию на летнюю капсулу SS25.",
    timeLabel: "Вчера",
    unreadCount: 2,
    online: true,
    messages: [
      { role: "client", text: "Хотим обсудить коллаборацию на летнюю капсулу SS25.", time: "Вчера" },
      { role: "designer", text: "Интересно. Можем собрать концепцию из 6-7 вещей и показать mood-направление.", time: "Вчера" },
      { role: "client", text: "Отправьте, пожалуйста, варианты по палитре и ключевым силуэтам.", time: "Вчера" }
    ]
  }
];
