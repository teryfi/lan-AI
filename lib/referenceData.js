export const referenceDesigners = [
  {
    id: "d1",
    name: "Алина Морозова",
    handle: "@alina_m",
    specialty: "Минимализм · Capsule wardrobe",
    location: "Москва",
    avatar: "https://images.unsplash.com/photo-1611246706753-80b59941efc6?auto=format&fit=crop&w=240&q=80",
    cover: "https://images.unsplash.com/photo-1768825182160-d5481c5ebd19?auto=format&fit=crop&w=1200&q=80",
    followers: 2847,
    works: 47,
    rating: 4.9,
    verified: true,
    priceRange: "5 000–25 000 ₽"
  },
  {
    id: "d2",
    name: "Дмитрий Волков",
    handle: "@dmitry_v",
    specialty: "Streetwear · Avant-garde",
    location: "Санкт-Петербург",
    avatar: "https://images.unsplash.com/photo-1767325835656-2c16a80c64dc?auto=format&fit=crop&w=240&q=80",
    cover: "https://images.unsplash.com/photo-1719518411339-5158cea86caf?auto=format&fit=crop&w=1200&q=80",
    followers: 1234,
    works: 32,
    rating: 4.7,
    verified: false,
    priceRange: "3 000–15 000 ₽"
  },
  {
    id: "d3",
    name: "Кира Лебедева",
    handle: "@kira_fashion",
    specialty: "Boho · Romantic",
    location: "Казань",
    avatar: "https://images.unsplash.com/photo-1760551600460-018b52b28045?auto=format&fit=crop&w=240&q=80",
    cover: "https://images.unsplash.com/photo-1680690599369-8878cf3eeb59?auto=format&fit=crop&w=1200&q=80",
    followers: 5621,
    works: 89,
    rating: 4.8,
    verified: true,
    priceRange: "4 000–20 000 ₽"
  },
  {
    id: "d4",
    name: "Иван Соколов",
    handle: "@ivan_sokolov",
    specialty: "Классика · Tailoring",
    location: "Москва",
    avatar: "https://images.unsplash.com/photo-1770970831074-6e88b6cc260b?auto=format&fit=crop&w=240&q=80",
    cover: "https://images.unsplash.com/photo-1707375700820-ad88eaface92?auto=format&fit=crop&w=1200&q=80",
    followers: 987,
    works: 24,
    rating: 4.6,
    verified: false,
    priceRange: "8 000–45 000 ₽"
  }
];

export const referenceFeedPosts = [
  {
    id: "p1",
    designerId: "d3",
    designerName: "Кира Лебедева",
    designerAvatar: "https://images.unsplash.com/photo-1760551600460-018b52b28045?auto=format&fit=crop&w=160&q=80",
    image: "https://images.unsplash.com/photo-1680690599369-8878cf3eeb59?auto=format&fit=crop&w=1200&q=80",
    caption: "Новая капсула «Весенний сад» для мягкого городского ритма: живой принт, спокойные линии и вещи, которые реально носить каждый день.",
    likes: 1243,
    comments: 87,
    saves: 312,
    timeAgo: "2 ч назад",
    tags: ["весна", "boho", "капсула", "платья"],
    isLiked: false
  },
  {
    id: "p2",
    designerId: "d1",
    designerName: "Алина Морозова",
    designerAvatar: "https://images.unsplash.com/photo-1611246706753-80b59941efc6?auto=format&fit=crop&w=160&q=80",
    image: "https://images.unsplash.com/photo-1768825182160-d5481c5ebd19?auto=format&fit=crop&w=1200&q=80",
    caption: "Пальто «Зима в Токио» уже в продаже. Лимитированный тираж, ручная работа и чистый архитектурный силуэт без перегруза.",
    likes: 2876,
    comments: 134,
    saves: 678,
    timeAgo: "5 ч назад",
    tags: ["пальто", "зима", "limited"],
    isLiked: true
  },
  {
    id: "p3",
    designerId: "d2",
    designerName: "Дмитрий Волков",
    designerAvatar: "https://images.unsplash.com/photo-1767325835656-2c16a80c64dc?auto=format&fit=crop&w=160&q=80",
    image: "https://images.unsplash.com/photo-1719518411339-5158cea86caf?auto=format&fit=crop&w=1200&q=80",
    caption: "Drop SS25: технические ткани, прямой силуэт и выразительный городской характер. Для тех, кому нужен сильный образ без случайных деталей.",
    likes: 3421,
    comments: 201,
    saves: 891,
    timeAgo: "12 ч назад",
    tags: ["streetwear", "drop", "ss25"],
    isLiked: false
  },
  {
    id: "p4",
    designerId: "d4",
    designerName: "Иван Соколов",
    designerAvatar: "https://images.unsplash.com/photo-1770970831074-6e88b6cc260b?auto=format&fit=crop&w=160&q=80",
    image: "https://images.unsplash.com/photo-1770970831074-6e88b6cc260b?auto=format&fit=crop&w=1200&q=80",
    caption: "Классика не умирает, а эволюционирует. В этом жакете акцент на посадке, балансе пропорций и спокойной выразительности.",
    likes: 987,
    comments: 56,
    saves: 234,
    timeAgo: "1 день назад",
    tags: ["tailoring", "classic", "process"],
    isLiked: false
  }
];

export const referenceCapsuleResults = [
  {
    id: "cap1",
    name: "Городской минимализм",
    matchScore: 97,
    description: "Капсула для офиса и встреч: спокойная палитра, чистые формы и вещи, которые легко сочетать между собой.",
    totalPrice: 47700,
    tags: ["офис", "минимализм", "нейтральные тона"],
    itemIds: [1, 8, 13, 25, 32]
  },
  {
    id: "cap2",
    name: "Романтичная весна",
    matchScore: 91,
    description: "Мягкий комплект для прогулок и свиданий: пластичные ткани, лёгкий акцент и женственный силуэт.",
    totalPrice: 40200,
    tags: ["романтика", "весна", "женственный образ"],
    itemIds: [11, 15, 3, 28, 34]
  },
  {
    id: "cap3",
    name: "Urban power",
    matchScore: 85,
    description: "Структурный городской образ на каждый день: сильный верхний слой, комфортная база и чёткий акцент.",
    totalPrice: 48800,
    tags: ["streetwear", "urban", "город"],
    itemIds: [6, 10, 14, 26, 35]
  }
];
