// v1.0.1 - Gastro Map Data
export interface Dish {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  ingredients: string[];
  story: string;
  whereToTry: string;
  image: string;
  spiceLevel: number;
  touristTip: string;
}

export type RegionId = "north" | "west" | "south" | "east" | "central";

export interface Drink {
  name: string;
  description: string;
  benefit: string;
  iconType: string;
}

export interface TasteProfile {
  meatiness: number;
  spice: number;
  sweetness: number;
  sourness: number;
  fatness: number;
}

export interface Region {
  id: RegionId;
  title: string;
  subtitle: string;
  color: string;
  stroke: string;
  activeColor: string;
  dishes: string[];
  drinks: Drink[];
  history: string;
  mainHighlight: string;
  featuredDishSlugs: string[];
  tasteProfile: TasteProfile;
  adminUnits: { name: string; type: string }[];
}

export const dishes: Dish[] = [
  {
    slug: "beshbarmak",
    name: "Бешбармак",
    category: "Блюдо",
    shortDescription: "Главное национальное блюдо Казахстана из мяса и теста.",
    ingredients: ["Конина или говядина", "Тонкое тесто", "Лук", "Бульон"],
    story: "Название переводится как 'пять пальцев', так как традиционно блюдо ели руками. Это символ гостеприимства и центральный элемент любого торжества.",
    whereToTry: "В любом казахском ресторане или в гостях.",
    image: "/images/dishes/beshbarmak.png",
    spiceLevel: 1,
    touristTip: "Обязательно попробуйте бульон (сорпу), который подается после основного блюда.",
  },
  {
    slug: "kuyrdak",
    name: "Куырдак",
    category: "Блюдо",
    shortDescription: "Традиционное жаркое из субпродуктов или мяса.",
    ingredients: ["Печень", "Легкие", "Сердце", "Мясо", "Картофель", "Лук"],
    story: "Блюдо, которое готовится сразу после забоя скота. Оно очень сытное и быстрое в приготовлении.",
    whereToTry: "Рестораны национальной кухни, сельские регионы.",
    image: "/images/dishes/kuyrdak.png",
    spiceLevel: 2,
    touristTip: "Настоящий куырдак готовится на курдючном жире.",
  },
  {
    slug: "baursak",
    name: "Баурсаки",
    category: "Блюдо",
    shortDescription: "Жареные в масле кусочки дрожжевого теста.",
    ingredients: ["Мука", "Молоко", "Дрожжи", "Масло"],
    story: "Баурсак символизирует солнце и счастье. Без них не обходится ни один дастархан.",
    whereToTry: "Везде — от уличных лавок до элитных ресторанов.",
    image: "/images/dishes/baursak.png",
    spiceLevel: 1,
    touristTip: "Лучше всего есть их горячими со сметаной или медом.",
  },
  {
    slug: "kazy",
    name: "Казы",
    category: "Блюдо",
    shortDescription: "Домашняя колбаса из конины с ребром.",
    ingredients: ["Конина", "Ребро", "Чеснок", "Черный перец", "Соль"],
    story: "Деликатес, который готовят вручную, заправляя мясо с жиром в натуральную оболочку. Это вершина мясного искусства кочевников.",
    whereToTry: "Рынки (зеленый базар в Алматы) и рестораны.",
    image: "/images/dishes/kazy.png",
    spiceLevel: 1,
    touristTip: "Казы можно купить в подарок, она отлично переносит дорогу.",
  },
  {
    slug: "shuzhuk",
    name: "Шужук",
    category: "Блюдо",
    shortDescription: "Мясная колбаса из конины (аналог казы, но из другого отреза).",
    ingredients: ["Конина", "Жир", "Чеснок", "Специи"],
    story: "Важнейшая закуска наряду с казы. Отличается по способу набивки и текстуре мяса.",
    whereToTry: "Север и Центральный Казахстан.",
    image: "/images/dishes/kazy.png",
    spiceLevel: 1,
    touristTip: "Шужук часто добавляют в наваристые мясные ассорти.",
  },
  {
    slug: "jent",
    name: "Жент",
    category: "Блюдо",
    shortDescription: "Традиционный десерт из измельченного зерна, сахара и масла.",
    ingredients: ["Талкан (зерно)", "Сливочное масло", "Сахар", "Изюм"],
    story: "Блюдо кочевников высокого энергетического содержания. Жент символизирует достаток.",
    whereToTry: "Западный и восточный регионы.",
    image: "/images/dishes/jent.png",
    spiceLevel: 1,
    touristTip: "Особенно вкусен в сочетании со свежим чаем.",
  },
  {
    slug: "shashlyk",
    name: "Шашлык",
    category: "Блюдо",
    shortDescription: "Жареное на углях мясо со специями.",
    ingredients: ["Баранина/Говядина", "Уксус", "Лук", "Специи"],
    story: "Культура шашлыка на юге — это целое искусство со своими мастерами - шашлычниками.",
    whereToTry: "Южные базары и специализированные кафе.",
    image: "/images/dishes/shashlyk.png",
    spiceLevel: 2,
    touristTip: "Попробуйте кавказский и узбекский варианты — маринад везде разный.",
  },
  {
    slug: "irimshik",
    name: "Иримшик",
    category: "Блюдо",
    shortDescription: " Сладкий творожный десерт золотистого цвета.",
    ingredients: ["Молоко", "Закваска", "Мед"],
    story: "Натуральный десерт, который готовится путем долгого кипячения молока. Любимое лакомство на востоке.",
    whereToTry: "Восточный Казахстан, сельские ярмарки.",
    image: "/images/dishes/irimshik.png",
    spiceLevel: 1,
    touristTip: "Идеально сочетается с горячим чаем и баурсаками.",
  },
  {
    slug: "syrne",
    name: "Сырне",
    category: "Блюдо",
    shortDescription: "Молодой ягненок, томленный в казане.",
    ingredients: ["Ягненок", "Лук", "Специи"],
    story: "Блюдо, которое тает во рту. Мясо томится несколько часов в собственном соку.",
    whereToTry: "Южные регионы Казахстана.",
    image: "/images/dishes/syrne.png",
    spiceLevel: 1,
    touristTip: "Сырне считается одним из самых нежных мясных блюд.",
  },
  {
    slug: "koktal",
    name: "Коктал",
    category: "Блюдо",
    shortDescription: "Рыба горячего копчения с овощами в специальном ящике (коктальнице).",
    ingredients: ["Крупный сазан", "Помидоры", "Лук", "Баклажаны", "Специи"],
    story: "Традиция Южного Казахстана и Семиречья. Рыба коптится на веточках яблони.",
    whereToTry: "Побережье Капчагая, Алматинская область.",
    image: "/images/dishes/koktal.png",
    spiceLevel: 1,
    touristTip: "Лучше всего заказывать коктал на компанию из 3-5 человек.",
  },
  {
    slug: "plov-palau",
    name: "Плов (палау)",
    category: "Блюдо",
    shortDescription: "Рис с мясом, морковью и специями.",
    ingredients: ["Рис", "Мясо", "Морковь", "Нут", "Изюм", "Специи"],
    story: "Хотя плов популярен во всей Средней Азии, в Казахстане есть свои особенности приготовления, например, добавление сухофруктов.",
    whereToTry: "Туркестан, Шымкента — южные регионы.",
    image: "/images/dishes/plov-palau.png",
    spiceLevel: 2,
    touristTip: "Южный плов часто более пряный и ароматный.",
  },
  {
    slug: "lagman",
    name: "Лагман",
    category: "Блюдо",
    shortDescription: "Тянутая лапша с мясом и овощной подливой.",
    ingredients: ["Домашняя лапша", "Мясо", "Сладкий перец", "Редька", "Специи"],
    story: "Блюдо, пришедшее из уйгурской и дунганской культуры, стало родным для всех казахстанцев.",
    whereToTry: "Уйгурские кафе в Алматы и окрестностях.",
    image: "/images/dishes/lagman.png",
    spiceLevel: 3,
    touristTip: "Попробуйте 'цомян' — жареный вариант лагмана.",
  },
  {
    slug: "balyk",
    name: "Рыбные блюда (балык)",
    category: "Блюдо",
    shortDescription: "Ассорти из копченой и вяленой рыбы Каспия.",
    ingredients: ["Осетрина", "Белуга", "Лосось", "Специи"],
    story: "Западный Казахстан славится своим умением готовить рыбу. Балык — это изысканная холодная закуска.",
    whereToTry: "Атырау, Актау — главные рыбные столицы.",
    image: "/images/dishes/balyk.png",
    spiceLevel: 1,
    touristTip: "Лучший балык — из осетрины холодного копчения.",
  },
  {
    slug: "fishbarmak",
    name: "Фишбармак",
    category: "Блюдо",
    shortDescription: "Вариация бешбармака, где вместо мяса используется рыба.",
    ingredients: ["Осетрина", "Тесто", "Лук", "Рыбный бульон"],
    story: "Уникальное блюдо Западного Казахстана, возникшее благодаря обилию осетровых рыб в Каспийском море.",
    whereToTry: "Рыбные рестораны на западе страны.",
    image: "/images/dishes/fishbarmak.png",
    spiceLevel: 1,
    touristTip: "Блюдо более легкое, чем мясной бешбармак, но не менее сытное.",
  },
  {
    slug: "sube-oramasy",
    name: "Субе орамасы",
    category: "Блюдо",
    shortDescription: "Мясной рулет из брюшной части (пашины).",
    ingredients: ["Пашина (мясо)", "Жир", "Перец", "Соль"],
    story: "Традиционная холодная закуска, требующая мастерства в сворачивании рулета.",
    whereToTry: "Западные и северные регионы.",
    image: "/images/dishes/sube-oramasy.png",
    spiceLevel: 1,
    touristTip: "Подается тонкими ломтиками, отлично сочетается с луком.",
  },
  {
    slug: "balyk-sorpa",
    name: "Балык сорпа",
    category: "Блюдо",
    shortDescription: "Наваристая и прозрачная уха по-казахски.",
    ingredients: ["Рыба", "Картофель", "Лук", "Зелень"],
    story: "Отличается от классической ухи особой жирностью и минимумом овощей, чтобы подчеркнуть вкус рыбы.",
    whereToTry: "Побережье Каспия и Аральского моря.",
    image: "/images/dishes/balyk-sorpa.png",
    spiceLevel: 1,
    touristTip: "Пьется горячей из больших пиал (кессе).",
  },
  {
    slug: "sorpa",
    name: "Сорпа",
    category: "Блюдо",
    shortDescription: "Классический мясной бульон с кусками мяса.",
    ingredients: ["Баранина/Говядина", "Вода", "Соль", "Лук"],
    story: "Эликсир жизни кочевников. Настоящая сорпа должна быть прозрачной и очень наваристой.",
    whereToTry: "В любом регионе Казахстана.",
    image: "/images/dishes/sorpa.png",
    spiceLevel: 1,
    touristTip: "Считается лучшим средством для восстановления сил после дальней дороги.",
  },
  {
    slug: "kopchenoe-myaso",
    name: "Копчёное мясо",
    category: "Блюдо",
    shortDescription: "Мясо, приготовленное методом холодного или горячего копчения.",
    ingredients: ["Конина", "Говядина", "Специи", "Дым"],
    story: "Традиционный способ хранения мяса в степи, придающий ему неповторимый аромат.",
    whereToTry: "Северные регионы (Петропавловск, Кокшетау).",
    image: "/images/dishes/kopchenoe-myaso.png",
    spiceLevel: 1,
    touristTip: "Копченая конина (жая) считается деликатесом высшего сорта.",
  },
  {
    slug: "myaso-marala",
    name: "Мясо марала/косули",
    category: "Блюдо",
    shortDescription: "Блюда из благородного оленя (марала) — гордость Востока.",
    ingredients: ["Мясо марала", "Дикие травы", "Соль"],
    story: "Мясо марала ценится не только за вкус, но и за целебные свойства. Оно очень нежное и диетическое.",
    whereToTry: "Восточный Казахстан (Катон-Карагай, Риддер).",
    image: "/images/dishes/myaso-marala.png",
    spiceLevel: 1,
    touristTip: "Попробуйте стейки или жаркое из марала в сочетании с местным медом.",
  },
  {
    slug: "beshbarmak-jaima",
    name: "Бешбармак с жайма",
    category: "Блюдо",
    shortDescription: "Классический бешбармак с тонким домашним тестом.",
    ingredients: ["Мясо", "Жайма (сочни)", "Туздык (лук)"],
    story: "Именно в Восточном Казахстане уделяют особое внимание тонкости раскатки теста для сочней.",
    whereToTry: "Усть-Каменогорск, Семей.",
    image: "/images/dishes/beshbarmak-jaima.png",
    spiceLevel: 1,
    touristTip: "Жайма должна быть почти прозрачной, но сохранять упругость.",
  },
  {
    slug: "samsa",
    name: "Самса",
    category: "Блюдо",
    shortDescription: "Слоеные пирожки, запекаемые в тандыре.",
    ingredients: ["Мясо", "Лук", "Слоеное тесто", "Курдюк"],
    story: "Неотъемлемая часть южной кухни. Настоящая самса выпекается на стенках глиняной печи.",
    whereToTry: "Южные базары Алматы, Туркестана, Шымкента.",
    image: "/images/dishes/samsa.png",
    spiceLevel: 2,
    touristTip: "Ешьте осторожно — внутри очень горячий сок!",
  },
  {
    slug: "kazy-karta",
    name: "Казы-карта",
    category: "Блюдо",
    shortDescription: "Дуэт из колбасы и деликатесной части конины.",
    ingredients: ["Казы", "Карта", "Специи"],
    story: "Вершина гостеприимства. Карта (субпродукт конины) ценится гурманами за нежность и вкус.",
    whereToTry: "Центральный и Северный Казахстан.",
    image: "/images/dishes/kazy-karta.png",
    spiceLevel: 1,
    touristTip: "Обычно подается как центральное украшение праздничного блюда.",
  },
  {
    slug: "shelpeki",
    name: "Шелпеки",
    category: "Блюдо",
    shortDescription: "Тонкие лепешки, жаренные в масле.",
    ingredients: ["Мука", "Вода", "Соль", "Масло"],
    story: "Священное блюдо, которое готовят по особенным дням. Шелпек символизирует солнце.",
    whereToTry: "В любой семье по пятницам или праздникам.",
    image: "/images/dishes/shelpeki.png",
    spiceLevel: 1,
    touristTip: "Традиционно принято готовить 7 шелпеков.",
  },
  {
    slug: "pelmeni",
    name: "Пельмени",
    category: "Блюдо",
    shortDescription: "Мясные мешочки из теста, популярные на севере и востоке.",
    ingredients: ["Мясо", "Лук", "Тесто"],
    story: "Отражают влияние северных соседей, став неотъемлемой частью зимнего рациона.",
    whereToTry: "Усть-Каменогорск, Риддер.",
    image: "/images/dishes/pelmeni.png",
    spiceLevel: 1,
    touristTip: "Подаются со сметаной или уксусом с перцем.",
  },
  {
    slug: "vareniki",
    name: "Вареники",
    category: "Блюдо",
    shortDescription: "Изделия из теста с разнообразными начинками.",
    ingredients: ["Творог/Картофель", "Тесто", "Сливочное масло"],
    story: "Популярный десерт или второе блюдо в восточных и северных регионах.",
    whereToTry: "Семей, Усть-Каменогорск.",
    image: "/images/dishes/vareniki.png",
    spiceLevel: 1,
    touristTip: "Попробуйте вареники с местным творогом (иримшиком).",
  },
];

export const regions: Region[] = [
  {
    id: "north",
    title: "Северный Казахстан",
    subtitle: "Акмолинская, Костанайская, СКО, Павлодарская области, г. Астана",
    color: "#d7b374",
    stroke: "#f8e1b4",
    activeColor: "#edc96a",
    dishes: ["Бешбармак", "Куырдак", "Баурсаки", "Казы", "Шужук", "Сорпа", "Копчёное мясо"],
    drinks: [
      { name: "Кумыс", description: "Ферментированное кобылье молоко, эликсир степи.", benefit: "Укрепляет иммунитет", iconType: "milk" },
      { name: "Чай с молоком", description: "Крепкий чай с горячим молоком.", benefit: "Традиция гостеприимства", iconType: "tea" },
      { name: "Айран", description: "Кисломолочный освежающий напиток.", benefit: "Улучшает пищеварение", iconType: "milk" },
      { name: "Сорпа", description: "Наваристый мясной бульон.", benefit: "Восстанавливает силы", iconType: "water" }
    ],
    history: "Сытная кухня с преобладанием конины и говядины, сформированная в условиях сурового климата степи.",
    mainHighlight: "Сытная кухня + традиционные молочные напитки",
    featuredDishSlugs: ["beshbarmak", "kuyrdak", "baursak", "kazy"],
    tasteProfile: { meatiness: 10, spice: 1, sweetness: 2, sourness: 5, fatness: 9 },
    adminUnits: [
      { name: "Акмолинская область", type: "Область" },
      { name: "Костанайская область", type: "Область" },
      { name: "Северо-Казахстанская область", type: "Область" },
      { name: "Павлодарская область", type: "Область" },
      { name: "г. Астана", type: "Город респ. значения" },
    ],
  },
  {
    id: "west",
    title: "Западный Казахстан",
    subtitle: "Атырауская, Мангистауская, Актюбинская, ЗКО",
    color: "#6ea9c4",
    stroke: "#b7e1f4",
    activeColor: "#5ec8f0",
    dishes: ["Рыбные блюда (балык)", "Жент", "Казы", "Коктал", "Фишбармак", "Субе орамасы", "Балык сорпа"],
    drinks: [
      { name: "Шубат", description: "Верблюжье молоко, богаче кумыса по жирности.", benefit: "Полезен для ЖКТ", iconType: "milk" },
      { name: "Кумыс", description: "Традиционный напиток кочевников.", benefit: "Придает бодрость", iconType: "milk" },
      { name: "Чай с молоком", description: "Популярный напиток на западе.", benefit: "Традиция", iconType: "tea" },
      { name: "Сорпа", description: "Бульон для сытости.", benefit: "Энергия", iconType: "water" }
    ],
    history: "Кухня Каспийского региона, уникальная своими рыбными блюдами и особыми способами приготовления конины.",
    mainHighlight: "Морские деликатесы + конина",
    featuredDishSlugs: ["balyk", "fishbarmak", "jent", "shuzhuk"],
    tasteProfile: { meatiness: 8, spice: 2, sweetness: 4, sourness: 3, fatness: 7 },
    adminUnits: [
      { name: "Атырауская область", type: "Область" },
      { name: "Мангистауская область", type: "Область" },
      { name: "Актюбинская область", type: "Область" },
      { name: "Западно-Казахстанская область", type: "Область" },
    ],
  },
  {
    id: "south",
    title: "Южный Казахстан",
    subtitle: "Алматинская, Туркестанская, Жамбылская, Кызылординская, г. Алматы, г. Шымкент",
    color: "#8bc34a",
    stroke: "#c5e1a5",
    activeColor: "#a0d65b",
    dishes: ["Плов (палау)", "Лагман", "Манты", "Коктал", "Сырне", "Самса", "Шашлык"],
    drinks: [
      { name: "Чай с молоком", description: "Классический южный чай.", benefit: "Освежает", iconType: "tea" },
      { name: "Кумыс", description: "Кобылье молоко.", benefit: "Здоровье", iconType: "milk" },
      { name: "Айран", description: "Легкий кисломолочный напиток.", benefit: "Пищеварение", iconType: "milk" },
      { name: "Компот", description: "Из южных фруктов.", benefit: "Витамины", iconType: "water" }
    ],
    history: "Перекресток шелкового пути, где казахские традиции встретились с аграрной культурой юга и разнообразием специй.",
    mainHighlight: "Обилие овощей, фруктов и специй",
    featuredDishSlugs: ["plov-palau", "lagman", "koktal", "syrne"],
    tasteProfile: { meatiness: 7, spice: 8, sweetness: 6, sourness: 4, fatness: 6 },
    adminUnits: [
      { name: "Алматинская область", type: "Область" },
      { name: "Туркестанская область", type: "Область" },
      { name: "Жамбылская область", type: "Область" },
      { name: "Кызылординская область", type: "Область" },
      { name: "г. Алматы", type: "Город респ. значения" },
      { name: "г. Шымкент", type: "Город респ. значения" },
      { name: "область Жетісу", type: "Область" },
    ],
  },
  {
    id: "east",
    title: "Восточный Казахстан",
    subtitle: "ВКО, область Абай",
    color: "#4db6ac",
    stroke: "#b2dfdb",
    activeColor: "#64c9bf",
    dishes: ["Иримшик", "Баурсаки", "Мясо марала/косули", "Бешбармак с жайма", "Пельмени", "Вареники"],
    drinks: [
      { name: "Медовуха (б/а)", description: "Напиток на основе знаменитого восточного меда.", benefit: "Лечебные свойства", iconType: "water" },
      { name: "Кумыс", description: "Горный кумыс.", benefit: "Долголетие", iconType: "milk" },
      { name: "Травяной чай", description: "Из алтайских трав.", benefit: "Спокойствие", iconType: "tea" },
      { name: "Айран", description: "Густой кефир.", benefit: "Сила", iconType: "milk" }
    ],
    history: "Кухня Рудного Алтая, богатая дарами леса, медом и дичью, с уникальными десертами на основе молока.",
    mainHighlight: "Мёд, дичь и молочные лакомства",
    featuredDishSlugs: ["irimshik", "baursak", "myaso-marala", "beshbarmak-jaima"],
    tasteProfile: { meatiness: 7, spice: 1, sweetness: 9, sourness: 3, fatness: 5 },
    adminUnits: [
      { name: "Восточно-Казахстанская область", type: "Область" },
      { name: "область Абай", type: "Область" },
    ],
  },
  {
    id: "central",
    title: "Центральный Казахстан",
    subtitle: "Карагандинская область, область Улытау",
    color: "#e57373",
    stroke: "#ef9a9a",
    activeColor: "#f08585",
    dishes: ["Бешбармак", "Куырдак", "Шужук", "Казы-карта", "Шелпеки", "Сорпа"],
    drinks: [
      { name: "Кумыс", description: "Крепкий степной кумыс.", benefit: "Бодрость", iconType: "milk" },
      { name: "Чай с талканом", description: "Сытный чай с добавлением молотого зерна.", benefit: "Долгое насыщение", iconType: "tea" },
      { name: "Айран", description: "Традиционный напиток.", benefit: "Свежесть", iconType: "milk" },
      { name: "Сорпа", description: "Наваристый бульон.", benefit: "Сила", iconType: "water" }
    ],
    history: "Сердце Сарыарки, где сохранились самые строгие традиции приготовления мяса в больших казанах.",
    mainHighlight: "Мясная классика + степные традиции",
    featuredDishSlugs: ["beshbarmak", "kuyrdak", "shuzhuk", "kazy-karta"],
    tasteProfile: { meatiness: 10, spice: 1, sweetness: 2, sourness: 4, fatness: 9 },
    adminUnits: [
      { name: "Карагандинская область", type: "Область" },
      { name: "область Улытау", type: "Область" },
    ],
  },
];

export const dishesBySlug = Object.fromEntries(dishes.map((dish) => [dish.slug, dish]));
