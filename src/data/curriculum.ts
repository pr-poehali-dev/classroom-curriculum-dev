export interface Topic {
  id: string;
  title: string;
  page?: number;
  gameType?: 'quiz' | 'match' | 'sort' | 'puzzle' | 'memory';
  videoUrl?: string;
  gifUrl?: string;
}

export interface Module {
  id: string;
  title: string;
  grade: number;
  part: number;
  topics: Topic[];
  projectTasks?: string[];
  curiosities?: string[];
}

export const curriculum: Module[] = [
  {
    id: 'grade1-part1-module1',
    title: 'Что и кто?',
    grade: 1,
    part: 1,
    topics: [
      { id: 'topic-1-1', title: 'Что такое Родина?', page: 10, gameType: 'quiz' },
      { id: 'topic-1-2', title: 'Что мы знаем о народах России?', page: 12, gameType: 'match' },
      { id: 'topic-1-3', title: 'Что мы знаем о Москве?', page: 14, gameType: 'quiz' },
      { id: 'topic-1-4', title: 'Что относится к природе?', page: 16, gameType: 'sort' },
      { id: 'topic-1-5', title: 'Что у нас над головой?', page: 18, gameType: 'quiz' },
      { id: 'topic-1-6', title: 'Что у нас под ногами?', page: 20, gameType: 'memory' },
      { id: 'topic-1-7', title: 'Что общего у разных растений?', page: 22, gameType: 'puzzle' },
      { id: 'topic-1-8', title: 'Что растёт на подоконнике?', page: 24, gameType: 'match' },
      { id: 'topic-1-9', title: 'Что растёт на клумбе?', page: 26, gameType: 'match' },
      { id: 'topic-1-10', title: 'Что это за листья?', page: 28, gameType: 'memory' },
      { id: 'topic-1-11', title: 'Что такое хвоинки?', page: 30, gameType: 'quiz' },
      { id: 'topic-1-12', title: 'Кто такие насекомые?', page: 32, gameType: 'sort' },
      { id: 'topic-1-13', title: 'Кто такие рыбы?', page: 34, gameType: 'quiz' },
      { id: 'topic-1-14', title: 'Кто такие птицы?', page: 36, gameType: 'match' },
      { id: 'topic-1-15', title: 'Кто такие звери?', page: 38, gameType: 'quiz' },
      { id: 'topic-1-16', title: 'Что умеет компьютер?', page: 40, gameType: 'sort' },
      { id: 'topic-1-17', title: 'Что вокруг нас может быть опасным?', page: 42, gameType: 'quiz' },
      { id: 'topic-1-18', title: 'На что похожа наша планета?', page: 44, gameType: 'quiz' }
    ],
    projectTasks: ['Моя малая родина'],
    curiosities: ['Что такое зоопарк?']
  },
  {
    id: 'grade1-part1-module2',
    title: 'Как, откуда и куда?',
    grade: 1,
    part: 1,
    topics: [
      { id: 'topic-2-1', title: 'Как живёт семья?', page: 56, gameType: 'quiz' },
      { id: 'topic-2-2', title: 'Откуда в наш дом приходит вода и куда она уходит?', page: 58, gameType: 'sort' },
      { id: 'topic-2-3', title: 'Откуда в наш дом приходит электричество?', page: 60, gameType: 'quiz' },
      { id: 'topic-2-4', title: 'Куда текут реки?', page: 62, gameType: 'puzzle' },
      { id: 'topic-2-5', title: 'Как измеряют температуру?', page: 64, gameType: 'quiz' },
      { id: 'topic-2-6', title: 'Откуда берутся снег и лёд?', page: 66, gameType: 'match' },
      { id: 'topic-2-7', title: 'Откуда в снежках грязь?', page: 68, gameType: 'sort' },
      { id: 'topic-2-8', title: 'Как живут растения?', page: 70, gameType: 'quiz' },
      { id: 'topic-2-9', title: 'Как живут животные?', page: 72, gameType: 'match' },
      { id: 'topic-2-10', title: 'Как зимой помочь птицам?', page: 74, gameType: 'quiz' },
      { id: 'topic-2-11', title: 'Откуда берётся и куда девается мусор?', page: 76, gameType: 'sort' },
      { id: 'topic-2-12', title: 'Откуда берутся шоколад, изюм и мёд?', page: 84, gameType: 'match' }
    ],
    projectTasks: ['Моя семья']
  },
  {
    id: 'grade1-part2-module3',
    title: 'Где и когда?',
    grade: 1,
    part: 2,
    topics: [
      { id: 'topic-3-1', title: 'Когда учиться интересно?', page: 4, gameType: 'quiz' },
      { id: 'topic-3-2', title: 'Когда придёт суббота?', page: 6, gameType: 'sort' },
      { id: 'topic-3-3', title: 'Когда наступит лето?', page: 8, gameType: 'match' },
      { id: 'topic-3-4', title: 'Где живут белые медведи?', page: 10, gameType: 'quiz' },
      { id: 'topic-3-5', title: 'Где живут слоны?', page: 12, gameType: 'quiz' },
      { id: 'topic-3-6', title: 'Где зимуют птицы?', page: 14, gameType: 'sort' },
      { id: 'topic-3-7', title: 'Когда появилась одежда?', page: 16, gameType: 'memory' },
      { id: 'topic-3-8', title: 'Когда изобрели велосипед?', page: 18, gameType: 'quiz' },
      { id: 'topic-3-9', title: 'Когда мы станем взрослыми?', page: 20, gameType: 'quiz' }
    ],
    projectTasks: ['Мой класс и моя школа']
  },
  {
    id: 'grade1-part2-module4',
    title: 'Почему и зачем?',
    grade: 1,
    part: 2,
    topics: [
      { id: 'topic-4-1', title: 'Почему Солнце светит днём, а звёзды — ночью?', page: 32, gameType: 'quiz' },
      { id: 'topic-4-2', title: 'Почему Луна бывает разной?', page: 34, gameType: 'match' },
      { id: 'topic-4-3', title: 'Почему идёт дождь и дует ветер?', page: 36, gameType: 'quiz' },
      { id: 'topic-4-4', title: 'Почему звенит звонок?', page: 38, gameType: 'quiz' },
      { id: 'topic-4-5', title: 'Почему радуга разноцветная?', page: 40, gameType: 'sort' },
      { id: 'topic-4-6', title: 'Почему мы любим кошек и собак?', page: 42, gameType: 'quiz' },
      { id: 'topic-4-7', title: 'Почему мы не будем рвать цветы и ловить бабочек?', page: 44, gameType: 'quiz' },
      { id: 'topic-4-8', title: 'Зачем нужно соблюдать правила безопасного поведения в природе?', page: 46, gameType: 'sort' },
      { id: 'topic-4-9', title: 'Зачем нужна вежливость?', page: 48, gameType: 'quiz' },
      { id: 'topic-4-10', title: 'Зачем нужен режим дня?', page: 50, gameType: 'match' },
      { id: 'topic-4-11', title: 'Почему полезно есть овощи и фрукты?', page: 52, gameType: 'sort' },
      { id: 'topic-4-12', title: 'Почему нужно чистить зубы и мыть руки?', page: 54, gameType: 'quiz' },
      { id: 'topic-4-13', title: 'Зачем нужны автомобили?', page: 56, gameType: 'match' },
      { id: 'topic-4-14', title: 'Зачем нужны поезда?', page: 58, gameType: 'quiz' },
      { id: 'topic-4-15', title: 'Зачем строят корабли?', page: 60, gameType: 'quiz' },
      { id: 'topic-4-16', title: 'Зачем строят самолёты?', page: 62, gameType: 'quiz' },
      { id: 'topic-4-17', title: 'Почему в автомобиле и поезде нужно соблюдать правила безопасности?', page: 64, gameType: 'sort' },
      { id: 'topic-4-18', title: 'Почему на корабле и в самолёте нужно соблюдать правила безопасности?', page: 66, gameType: 'sort' },
      { id: 'topic-4-19', title: 'Зачем люди осваивают космос?', page: 68, gameType: 'quiz' },
      { id: 'topic-4-20', title: 'Почему мы часто слышим слово «экология»?', page: 70, gameType: 'quiz' }
    ],
    projectTasks: ['Мои домашние питомцы']
  },
  {
    id: 'grade2-module1',
    title: 'Где мы живём',
    grade: 2,
    part: 1,
    topics: [
      { id: 'topic-5-1', title: 'Родная страна', page: 7, gameType: 'quiz' },
      { id: 'topic-5-2', title: 'Город и село', page: 11, gameType: 'match' },
      { id: 'topic-5-3', title: 'Природа и предметы, созданные человеком', page: 15, gameType: 'sort' },
      { id: 'topic-5-4', title: 'Природа в опасности!', page: 19, gameType: 'quiz' }
    ],
    projectTasks: ['Родной край, город (село)'],
    curiosities: ['Чтобы не исчезли леопарды']
  },
  {
    id: 'grade2-module2',
    title: 'Природа',
    grade: 2,
    part: 1,
    topics: [
      { id: 'topic-6-1', title: 'Неживая и живая природа', page: 33, gameType: 'sort' },
      { id: 'topic-6-2', title: 'Явления природы', page: 37, gameType: 'match' },
      { id: 'topic-6-3', title: 'Что такое погода', page: 41, gameType: 'quiz' },
      { id: 'topic-6-4', title: 'В гости к осени', page: 45, gameType: 'quiz' },
      { id: 'topic-6-5', title: 'Звёздное небо. Планеты', page: 49, gameType: 'memory' },
      { id: 'topic-6-6', title: 'Заглянем в кладовые Земли', page: 53, gameType: 'match' },
      { id: 'topic-6-7', title: 'Про воздух...', page: 57, gameType: 'quiz' },
      { id: 'topic-6-8', title: '...И про воду', page: 61, gameType: 'quiz' },
      { id: 'topic-6-9', title: 'Какие бывают растения', page: 65, gameType: 'sort' },
      { id: 'topic-6-10', title: 'Какие бывают животные', page: 69, gameType: 'sort' },
      { id: 'topic-6-11', title: 'Невидимые нити', page: 73, gameType: 'puzzle' },
      { id: 'topic-6-12', title: 'Дикорастущие и культурные растения', page: 75, gameType: 'sort' },
      { id: 'topic-6-13', title: 'Дикие и домашние животные', page: 79, gameType: 'sort' },
      { id: 'topic-6-14', title: 'Комнатные растения', page: 83, gameType: 'match' },
      { id: 'topic-6-15', title: 'Про кошек и собак', page: 87, gameType: 'quiz' },
      { id: 'topic-6-16', title: 'Красная книга', page: 91, gameType: 'memory' },
      { id: 'topic-6-17', title: 'Будь природе другом!', page: 95, gameType: 'quiz' }
    ],
    projectTasks: ['Красная книга, или Возьмём под защиту'],
    curiosities: ['Легенды о растениях и животных']
  },
  {
    id: 'grade2-module3',
    title: 'Жизнь города и села',
    grade: 2,
    part: 1,
    topics: [
      { id: 'topic-7-1', title: 'Что такое экономика', page: 109, gameType: 'quiz' },
      { id: 'topic-7-2', title: 'Из чего что сделано', page: 113, gameType: 'match' },
      { id: 'topic-7-3', title: 'Как построить дом', page: 117, gameType: 'sort' },
      { id: 'topic-7-4', title: 'Какой бывает транспорт', page: 121, gameType: 'sort' },
      { id: 'topic-7-5', title: 'Все профессии важны', page: 123, gameType: 'match' },
      { id: 'topic-7-6', title: 'В гости к зиме', page: 127, gameType: 'quiz' }
    ],
    projectTasks: ['Профессии'],
    curiosities: ['Какие бывают музеи']
  },
  {
    id: 'grade2-module4',
    title: 'Здоровье и безопасность',
    grade: 2,
    part: 2,
    topics: [
      { id: 'topic-8-1', title: 'Строение тела человека', page: 4, gameType: 'puzzle' },
      { id: 'topic-8-2', title: 'Если хочешь быть здоров', page: 8, gameType: 'quiz' },
      { id: 'topic-8-3', title: 'Берегись автомобиля!', page: 12, gameType: 'quiz' },
      { id: 'topic-8-4', title: 'Домашние опасности', page: 16, gameType: 'sort' },
      { id: 'topic-8-5', title: 'Правила безопасного поведения в школе', page: 20, gameType: 'quiz' },
      { id: 'topic-8-6', title: 'Пожар!', page: 24, gameType: 'quiz' },
      { id: 'topic-8-7', title: 'На воде и в лесу', page: 28, gameType: 'sort' },
      { id: 'topic-8-8', title: 'Опасные незнакомцы', page: 32, gameType: 'quiz' }
    ],
    projectTasks: ['Подробнее о лесных опасностях'],
    curiosities: ['Олимпийские игры в Сочи']
  },
  {
    id: 'grade2-module5',
    title: 'Общение',
    grade: 2,
    part: 2,
    topics: [
      { id: 'topic-9-1', title: 'Наша дружная семья', page: 46, gameType: 'quiz' },
      { id: 'topic-9-2', title: 'В школе', page: 50, gameType: 'quiz' },
      { id: 'topic-9-3', title: 'Ты и твои друзья', page: 52, gameType: 'quiz' },
      { id: 'topic-9-4', title: 'Мы — пассажиры', page: 56, gameType: 'sort' }
    ],
    projectTasks: ['Родословная'],
    curiosities: ['Что такое этикет']
  },
  {
    id: 'grade2-module6',
    title: 'Путешествия',
    grade: 2,
    part: 2,
    topics: [
      { id: 'topic-10-1', title: 'Посмотри вокруг', page: 70, gameType: 'quiz' },
      { id: 'topic-10-2', title: 'Ориентирование на местности', page: 74, gameType: 'puzzle' },
      { id: 'topic-10-3', title: 'Формы земной поверхности', page: 78, gameType: 'match' },
      { id: 'topic-10-4', title: 'Водные богатства', page: 82, gameType: 'sort' },
      { id: 'topic-10-5', title: 'В гости к весне', page: 86, gameType: 'quiz' },
      { id: 'topic-10-6', title: 'Россия на карте', page: 90, gameType: 'quiz' },
      { id: 'topic-10-7', title: 'Путешествие по Москве', page: 96, gameType: 'memory' },
      { id: 'topic-10-8', title: 'Московский Кремль и Красная площадь', page: 100, gameType: 'quiz' },
      { id: 'topic-10-9', title: 'Город на Неве', page: 106, gameType: 'quiz' },
      { id: 'topic-10-10', title: 'Земля на карте', page: 110, gameType: 'quiz' },
      { id: 'topic-10-11', title: 'Путешествие по материкам и частям света', page: 114, gameType: 'memory' },
      { id: 'topic-10-12', title: 'Страны мира', page: 120, gameType: 'match' },
      { id: 'topic-10-13', title: 'Впереди лето', page: 124, gameType: 'quiz' }
    ],
    projectTasks: ['Города России', 'Страны мира'],
    curiosities: ['История знаменитого памятника']
  }
];
