"use client";
import { useEffect, useState } from "react";
import { classes, privateSlots } from "@/lib/catalog";
import InspireLocalGuide, { InspireFooter } from "@/components/InspireLocalGuide";
import "./inspire.css";
import "./inspire-mobile.css";
import "./inspire-philosophy.css";
import "./inspire-seo.css";
import "./inspire-updates.css";
import "./inspire-rent.css";
import "./inspire-schedule.css";
import "./inspire-proportions.css";
import "./inspire-weekly-cards.css";
import "./inspire-booking-calendar.css";
import "./inspire-page-split.css";
import "./inspire-panel-clarity.css";
import "./inspire-masthead-fix.css";
import "./inspire-accents.css";
import "./inspire-host.css";
import "./inspire-regression-fix.css";
import "./inspire-proof.css";
import "./inspire-schedule-refine.css";
import "./inspire-directions-refine.css";
import "./inspire-event-faq-inline.css";
import "./inspire-events-hero.css";
import "./inspire-local-guide.css";
import "./inspire-top-refine.css";
import "./inspire-about-continuity.css";
import "./inspire-art-direction.css";
import "./inspire-navigation.css";
import "./inspire-structure.css";

const statementSlides = [
  ["/art/inspire-studio.webp", "Krāsaina gleznošanas vieta Art Studio Inspire"],
  ["/art/studio-slide-room.webp", "Gleznošanas telpa Art Studio Inspire"],
  ["/art/studio-slide-garden.webp", "Darbs uz molberta Art Studio Inspire"],
  ["/art/inspire-slide-02.webp", "Student work at Art Studio Inspire"],
  ["/art/inspire-slide-03.webp", "Student work at Art Studio Inspire"],
  ["/art/inspire-slide-06.webp", "Student work at Art Studio Inspire"],
  ["/art/inspire-slide-07.webp", "Student work at Art Studio Inspire"],
  ["/art/inspire-slide-08.webp", "Student work at Art Studio Inspire"],
  ["/art/studio-neutral-01.webp", "Art Studio Inspire gleznošanas telpa"],
  ["/art/studio-neutral-02.webp", "Art Studio Inspire gleznošanas telpa"],
];
const youthGallerySlides = [
  ["/art/inspire-student-work.webp", "Skolēna darbs Art Studio Inspire"],
  ["/art/studio-slide-easel.webp", "Darbs uz molberta Art Studio Inspire"],
  [
    "/art/studio-slide-garden.webp",
    "Gleznojums uz molberta Art Studio Inspire",
  ],
  ["/art/studio-slide-eyes.webp", "Skolēna darbs Art Studio Inspire"],
];
const studioSlides = [
  ["/art/inspire-studio.webp", "Inside Art Studio Inspire"],
  ["/art/studio-slide-room.webp", "A room in Art Studio Inspire"],
  ["/art/studio-slide-easel.webp", "Painting space at Art Studio Inspire"],
  ["/art/studio-slide-garden.webp", "A quiet corner of Art Studio Inspire"],
];
const studioPreviewImages = [
  ["/art/studio-preview-room.webp", "Art Studio Inspire galvenā telpa"],
  ["/art/studio-preview-easel.webp", "Molberti un darbi Art Studio Inspire"],
  ["/art/studio-preview-wall.webp", "Mākslas darbi studijas sienā"],
];
const tattooPreviewImages = [
  ["/art/tattoo-room-main.webp", "Tattoo telpa ar izlietni un darba vietu"],
  ["/art/tattoo-room-detail.webp", "Tattoo telpas darba aprīkojums"],
];
const eventSlides = [
  ["/art/studio-slide-room.webp", "The studio prepared for a creative event"],
  [
    "/art/studio-slide-garden.webp",
    "A bright studio corner ready for a creative event",
  ],
  [
    "/art/event-slide-student-work.webp",
    "Student work and a welcoming studio atmosphere at Art Studio Inspire",
  ],
  [
    "/art/event-slide-student-work-02.webp",
    "A colourful creative moment at Art Studio Inspire",
  ],
  [
    "/art/event-slide-lecture.webp",
    "A social lecture evening at Art Studio Inspire",
  ],
];

const moodQuotes = {
  lv: [
    "Nav jāzin viss ceļš. Pietiek ieraudzīt nākamo soli.",
    "Tava gaume var būt sākumpunkts — arī tad, ja vēl nezini, kā to nosaukt.",
    "Var sākt ar vienu krāsu, vienu tēlu vai vienkārši ar ziņkārību.",
    "Laba ideja drīkst augt lēni.",
    "Rokas bieži saprot ātrāk nekā vārdi.",
  ],
  en: [
    "You do not need to know the whole way. It is enough to see the next step.",
    "Your taste can be a starting point — even before you know how to name it.",
    "You can begin with one colour, one image, or simply curiosity.",
    "A good idea is allowed to grow slowly.",
    "Hands often understand sooner than words.",
  ],
  ru: [
    "Не нужно знать весь путь. Достаточно увидеть следующий шаг.",
    "Ваш вкус может стать отправной точкой — даже если вы пока не знаете, как его назвать.",
    "Можно начать с одного цвета, одного образа или просто с любопытства.",
    "Хорошей идее можно расти медленно.",
    "Руки часто понимают раньше слов.",
  ],
};

const studioCopy = {
  lv: {
    heading: "Mākslinieka studija arī Tev.",
    quote: "Mēs sākam ar to, ko vēlies radīt, nevis ar to, ko jau proti.",
    more: "Kā mēs strādājam",
    moreLead: "Vari sākt no nulles vai iet savā mākslā arvien dziļāk.",
    items: [
      [
        "Tava ideja ir sākumpunkts",
        "Vari atnākt ar pirmo ideju, pusgatavu skici vai vienkārši ziņkārību. Ja idejas vēl nav, meklējam kopā. Nav jau iepriekš jāzina, kā to izdarīt — ar to mēs palīdzēsim.",
      ],
      [
        "Mākslu apgūstam, radot",
        "No pirmās nodarbības strādājam ar audeklu, krāsām un īstiem radošiem lēmumiem. Kompozīciju, krāsu, zīmējumu un tehniku pievienojam tur, kur konkrētajam darbam tas tiešām ir vajadzīgs.",
      ],
      [
        "Katram savs veids",
        "Bērniem un pieaugušajiem — individualitāte šeit vienmēr ir galvenā vērtība. Mēs necenšamies visus ielikt vienā stilā vai likt gleznot vienādi.",
      ],
      [
        "Tumšām idejām ir vieta — un arī jokiem",
        "Te var gleznot par simboliem, sarežģītām sajūtām, briesmoņiem, ziediem vai ko ļoti ikdienišķu. Tumšāks darbs nenozīmē drūmu telpu. Studijā ir vieta arī tējai, neveiklam sākumam un tam, ka reizēm par savu ideju vienkārši gribas pasmieties.",
      ],
      [
        "Par psiholoģiju, bet bez izlikšanās par terapeitiem",
        "Gleznošana mēdz palīdzēt pamanīt to, kas jau sen piesaistījis uzmanību. Mēs to neinterpretējam Tavā vietā un neuzliekam diagnozes. Ja saruna palīdz izvēlēties tēlu, krāsu vai nākamo soli, tad runājam; ja gribas klusāk strādāt, arī tas ir normāli.",
      ],
      [
        "Ja gribi iet dziļāk",
        "Varam strādāt arī ilgtermiņā — ar zīmējumu, darbu no dabas, kompozīciju, krāsu vai portfolio. Skatāmies mākslas grāmatas, analizējam darbus un domājam ne tikai par to, kā gleznot, bet arī kāpēc.",
      ],
    ],
  },
  en: {
    heading: "An artist’s studio for you, too.",
    quote:
      "Your idea does not have to be simple just because you do not yet know how to make it real.",
    more: "How we work",
    moreLead: "You can begin from zero, or go further into your own work.",
    items: [
      [
        "Your idea is the starting point",
        "Come with a first idea, a half-finished sketch, or simply curiosity. If the idea is not there yet, we look for it together. You do not have to know how to do it beforehand — that is what we help with.",
      ],
      [
        "We learn art by making art",
        "From the first class, we work with canvas, paint and real creative decisions. We bring in composition, colour, drawing and technique when the particular work actually needs them.",
      ],
      [
        "A different way for each person",
        "For children and adults alike, individuality is always central here. We do not try to put everyone into one style or make everyone paint alike.",
      ],
      [
        "Dark ideas have room here — and so do jokes",
        "You can paint symbols, complicated feelings, monsters, flowers, or something very ordinary. A darker work does not mean a gloomy room. There is space for tea, awkward beginnings, and sometimes simply laughing at your own idea.",
      ],
      [
        "Psychology, without pretending to be therapists",
        "Painting can help us notice what has been drawing our attention all along. We do not interpret you from the outside or diagnose anyone. If talking helps choose an image, colour or next step, we talk; if you would rather work quietly, that is completely normal too.",
      ],
      [
        "If you want to go deeper",
        "We can also work over time — with drawing, observation, composition, colour or a portfolio. We look at art books, discuss works and think not only about how to paint, but why.",
      ],
      [
        "Who is Sandra?",
        "Sandra is the artist and teacher behind Inspire. She works herself — in oils, drawing, symbolic images, atmosphere and darker visual worlds — and teaches from that living practice. Alongside painting and teaching, she has worked with Adobe and has shared art online for years. The studio is not a performance of expertise: it is a place to make real work, ask good questions and keep going.",
      ],
    ],
  },
  ru: {
    heading: "Художественная студия — и для тебя тоже.",
    quote:
      "Твоя идея не обязана быть простой только потому, что ты ещё не знаешь, как её осуществить.",
    more: "Как мы работаем",
    moreLead:
      "Можно начать с нуля или идти дальше в своей собственной практике.",
    items: [
      [
        "Идея — это начало",
        "Можно прийти с первой мыслью, незаконченной зарисовкой или просто с любопытством. Если идеи пока нет, будем искать вместе. Не нужно заранее знать, как всё сделать — в этом мы и помогаем.",
      ],
      [
        "Учимся искусству, создавая",
        "С первого занятия работаем с холстом, красками и настоящими творческими решениями. Композицию, цвет, рисунок и технику подключаем тогда, когда это действительно нужно конкретной работе.",
      ],
      [
        "У каждого свой путь",
        "Для детей и взрослых индивидуальность здесь — главная ценность. Мы не пытаемся поместить всех в один стиль или заставить рисовать одинаково.",
      ],
      [
        "Здесь есть место тёмным идеям — и шуткам",
        "Можно рисовать символы, сложные чувства, монстров, цветы или что-то совсем бытовое. Тёмная работа не означает мрачную атмосферу. Здесь есть место чаю, неловкому началу и смеху над собственной идеей.",
      ],
      [
        "Психология — без игры в терапевтов",
        "Рисование иногда помогает заметить то, что давно притягивало внимание. Мы не интерпретируем тебя со стороны и не ставим диагнозы. Если разговор помогает выбрать образ, цвет или следующий шаг — говорим; если хочется работать молча, это тоже нормально.",
      ],
      [
        "Если хочется глубже",
        "Можно заниматься системно: рисунком, наблюдением, композицией, цветом или портфолио. Мы смотрим книги по искусству, обсуждаем работы и думаем не только о том, как рисовать, но и зачем.",
      ],
      [
        "Кто такая Сандра?",
        "Сандра — художница и преподавательница, создавшая Inspire. Она сама работает с маслом, рисунком, символическими образами, атмосферой и более тёмными визуальными мирами — и преподаёт из этой живой практики. Параллельно с живописью и преподаванием она работала с Adobe и много лет делится искусством онлайн. Эта студия — не спектакль про экспертность, а место, где можно делать настоящую работу, задавать хорошие вопросы и не останавливаться.",
      ],
    ],
  },
};

const proofCopy = {
  lv: {
    heading: "Vieta, kur atkal atcerēties, kā brīnīties.",
    more: "Kā mēs domājam",
    moreLead:
      "Pieaugušā vecumā radošumu bieži apklusina perfekcionisms: gribas visu prast vēl pirms pirmā otas vilciena. Šeit pamazām atceramies spēlēties, brīnīties un skatīties apkārt ar svaigām acīm. Gleznošana ir veids, kā satikt sevi, atgriezties pie reiz nolikta hobija un atkal pamanīt skaisto. Prasme un brīvība var augt reizē.",
    items: [
      [
        "Sākam ar ziņkārību",
        "Vari atnākt ar pirmo ideju, pusgatavu skici vai tikai sajūtu, ka gribas kaut ko radīt. Ja idejas vēl nav, nemēģinām to izspiest piecās minūtēs — pameklējam kopā, caur tēliem, materiāliem un sarunu.",
      ],
      [
        "Atļaujamies atkal spēlēties",
        "Te nav jāuztaisa perfekts darbs pirmajā reizē. Eksperimentējam, kļūdāmies, pārtaisām un pamanām, kas notiek, kad roka drīkst sekot ziņkārībai, nevis bailēm kļūdīties.",
      ],
      [
        "Katram savs veids",
        "Bērniem, pusaudžiem un pieaugušajiem nav jāiekļaujas vienā stilā. Var būt ļoti precīzs akadēmisks zīmējums, intuitīva glezna, komikss, klusā daba vai sirreāla aina. Mēs palīdzam pamanīt, kas jau ir Tavs.",
      ],
      [
        "Roku darbs nav novecojis",
        "Prasme skatīties, zīmēt, jaukt krāsas un uzbūvēt attēlu ir lēna, fiziska lieta. Tas nav pretrunā ar digitālo pasauli; tieši otrādi — tā dod idejām vairāk svara arī ārpus audekla.",
      ],
      [
        "Tumšām idejām ir vieta — un arī jokiem",
        "Simboli, sarežģītas sajūtas, briesmoņi, ziedi, popkultūra vai pilnīgs absurds ir visi normāli materiāli darbam. Tumšāks darbs nenozīmē drūmu telpu. Studijā ir tēja, neveikli pirmie mēģinājumi un vieta pasmieties.",
      ],
      [
        "Par psiholoģiju, bet bez izlikšanās par terapeitiem",
        "Gleznošana var palīdzēt pamanīt tēmas, kas atgriežas, bet mēs neinterpretējam cilvēkus no malas un neliekam diagnozes. Ja saruna palīdz izvēlēties tēlu, krāsu vai nākamo soli, runājam. Ja gribas klusumu, tas arī ir pilnīgi normāli.",
      ],
      [
        "Tehnika ir instruments, nevis personība",
        "Eļļa, akrils, akvarelis, zīmējums vai kolāža nav jāizvēlas kā identitāte uz mūžu. Mēģinām to, kas dod darbam vajadzīgo faktūru, tempu un gaismu. Materiāli ir uz vietas, lai izvēle nebūtu teorētiska.",
      ],
      [
        "Var taisīt lielus darbus",
        "Nav jādomā mazāk tikai tāpēc, ka sākumā ir daudz jautājumu. Var strādāt pie liela interjera audekla, darbu sērijas, portfolio vai viena darba, kuram vajag laiku. Mēs palīdzam to sadalīt skaidros, paveicamos posmos.",
      ],
      [
        "Iesācējs nav zemāks līmenis",
        "Iesācējs ir cilvēks, kurš vēl nav pieradis uzticēties savām acīm un rokām. Tas ir labs sākums. Nevajag ienākt ar gatavu vīziju vai taisnoties par to, ko vēl neproti.",
      ],
      [
        "Ja gribi iet dziļāk",
        "Varam strādāt ilgtermiņā ar zīmējumu, darbu no dabas, kompozīciju, krāsu, portfolio vai individuālu projektu. Skatāmies mākslas grāmatas, analizējam darbus un domājam ne tikai par to, kā gleznot, bet kāpēc izvēlēties tieši šo attēlu.",
      ],
      [
        "Studija ir nopietna, bet nav stīva",
        "Te ir vieta koncentrētam darbam, bet nav jāspēlē “īstais mākslinieks”. Drīkst jautāt ļoti praktiskas lietas, mainīt domas pusceļā un kādu reizi vienkārši nākt atgūt radošu ritmu.",
      ],
      [
        "Mēs pamanām cilvēku, ne tikai rezultātu",
        "Darbs tiek uztverts nopietni, arī tad, ja tas vēl ir tikai sākumā. Vietā, kur rezultātu bieži spiež pabeigt ātri, ir vērtīgi, ja kāds palīdz noturēt uzmanību uz pašu procesu un nākamo soli.",
      ],
    ],
  },
  en: {
    heading: "A place to take an idea all the way into a work.",
    quote: "You do not have to look like an artist to begin working like one.",
    more: "How we think",
    moreLead:
      "In adult life, creativity often returns not as a hobby but as a need to hear your own way of looking again. This is a place to learn, recover your hand, change direction, or finally give time to an idea that has been waiting. You do not have to choose between freedom and skill — both can grow together.",
    items: [
      [
        "Your idea is the starting point",
        "Come with a first thought, a half-finished sketch, or simply the feeling that you want to make something. If the idea is not there yet, we do not force it in five minutes; we look for it together through images, materials and conversation.",
      ],
      [
        "We learn art by making art",
        "From the first class we work with real materials and real decisions. Composition, colour, drawing and technique come in when a particular work needs them—not to tick off a programme.",
      ],
      [
        "A different way for each person",
        "Children, teenagers and adults do not have to fit into one style. A careful academic drawing, an intuitive painting, a comic, a still life or a surreal scene can all belong here. We help you notice what is already yours.",
      ],
      [
        "Dark ideas have room here — and so do jokes",
        "Symbols, difficult feelings, monsters, flowers, pop culture or complete absurdity are all valid material. A darker work does not mean a gloomy room. There is tea, awkward first attempts, and room to laugh.",
      ],
      [
        "Psychology, without pretending to be therapists",
        "Painting can make recurring themes easier to notice, but we do not diagnose or interpret people from the outside. If talking helps choose an image, colour or next step, we talk. If quiet work is what you need, that is completely normal too.",
      ],
      [
        "Technique is a tool, not a personality",
        "Oil, acrylic, watercolour, drawing and collage are not identities to choose for life. We try what gives a work the texture, pace and light it needs. Materials are here, so the choice can be practical rather than theoretical.",
      ],
      [
        "You can make larger work",
        "You do not have to think smaller because there are many questions at the beginning. Work can grow into a large interior canvas, a series, a portfolio, or a single piece that needs time.",
      ],
      [
        "A beginner is not a lower level",
        "A beginner is someone who has not yet learned to trust their eyes and hands. That is a good beginning. You do not need a polished vision or an apology for what you cannot do yet.",
      ],
      [
        "If you want to go deeper",
        "We can work over time with drawing, observation, composition, colour, a portfolio or an individual project. We look at art books and discuss not only how to paint, but why this particular image matters.",
      ],
      [
        "Serious, without being stiff",
        "There is room for concentrated work here, without having to perform being a ‘real artist’. You can ask very practical questions, change your mind halfway through, or simply come to recover a creative rhythm.",
      ],
    ],
  },
  ru: {
    heading: "Место, где идею можно довести до работы.",
    quote: "Не нужно выглядеть художником, чтобы начать работать как художник.",
    more: "Как мы думаем",
    moreLead:
      "Во взрослом возрасте творчество часто возвращается не как хобби, а как потребность снова услышать собственный взгляд. Здесь можно учиться, вернуть себе руку, сменить направление или наконец дать время идее, которая давно ждала. Не нужно выбирать между свободой и мастерством — они могут расти вместе.",
    items: [
      [
        "Идея — это начало",
        "Можно прийти с первой мыслью, незаконченной зарисовкой или просто желанием что-то сделать. Если идеи пока нет, мы не выдавливаем её за пять минут — ищем вместе через образы, материалы и разговор.",
      ],
      [
        "Учимся искусству, создавая",
        "С первого занятия мы работаем с настоящими материалами и решениями. Композицию, цвет, рисунок и технику подключаем, когда они нужны конкретной работе, а не для выполнения программы.",
      ],
      [
        "У каждого свой путь",
        "Детям, подросткам и взрослым не нужно попадать в один стиль. Здесь может быть и академический рисунок, и интуитивная живопись, и комикс, и натюрморт, и сюрреалистичная сцена.",
      ],
      [
        "Тёмным идеям здесь есть место — и шуткам тоже",
        "Символы, сложные чувства, монстры, цветы, поп-культура или полный абсурд — всё это нормальный материал. Тёмная работа не делает пространство мрачным: здесь есть чай, неловкие первые попытки и смех.",
      ],
      [
        "Психология — без игры в терапевтов",
        "Живопись может сделать повторяющиеся темы заметнее, но мы не ставим диагнозы и не интерпретируем человека со стороны. Если разговор помогает выбрать образ, цвет или следующий шаг — говорим. Если хочется тишины — это тоже нормально.",
      ],
      [
        "Техника — инструмент, а не личность",
        "Масло, акрил, акварель, рисунок и коллаж не надо выбирать как идентичность на всю жизнь. Мы пробуем то, что даёт работе нужную фактуру, темп и свет.",
      ],
      [
        "Можно делать большие работы",
        "Не нужно думать мельче только потому, что в начале много вопросов. Работа может вырасти в большое интерьерное полотно, серию, портфолио или одну вещь, которой нужно время.",
      ],
      [
        "Новичок — не низший уровень",
        "Новичок — это человек, который ещё не привык доверять своим глазам и рукам. Это хорошая точка начала. Не нужна готовая концепция и не нужно извиняться за то, чего вы пока не умеете.",
      ],
      [
        "Если хочется глубже",
        "Можно работать последовательно с рисунком, наблюдением, композицией, цветом, портфолио или личным проектом. Мы смотрим книги по искусству и думаем не только о том, как рисовать, но и зачем нужен именно этот образ.",
      ],
      [
        "Серьёзно, но без скованности",
        "Здесь есть место сосредоточенной работе, но не нужно играть роль «настоящего художника». Можно задавать очень практические вопросы, поменять мнение на середине пути или просто вернуть себе творческий ритм.",
      ],
    ],
  },
};

const seoFaq = {
  lv: {
    title: "",
    lead: "Biežāk uzdotie jautājumi",
    items: [
      [
        "Kāpēc tieši šī studija?",
        "Tā ir mākslinieka vadīta studija, nevis vieta ar vienu sagatavotu bildi katram. Te drīkst sākt vienkārši, bet var arī mācīties nopietni: no akvareļa un pirmā audekla līdz zīmējumam, eļļai, kompozīcijai, portfolio vai lielākam darbam.",
      ],
      [
        "Vai man kaut kas jāņem līdzi?",
        "Nē. Krāsas, otas, papīrs, audekļi un darba vieta jau ir studijā. Velc drēbes, kuras nav žēl mazliet nosmērēt, un paņem savu ideju, ja tāda ir. Ja nav — tas arī ir pilnīgi normāli.",
      ],
      [
        "Ko darīt, ja nezinu, ko gleznot?",
        "Tas ir viens no biežākajiem sākumiem. Apskatām bildes, materiālus, krāsas vai motīvus, kas Tevi jau velk; Sandra palīdz atrast pirmo saprotamo soli. Nav jāierodas ar gatavu koncepciju.",
      ],
      [
        "Ko darīt, ja man ir bail, ka nesanāks?",
        "Tad nāc ar šo sajūtu. Studijā nav jāiztur eksāmens un nav jāizskatās pārliecinātam. Sākam tik mazi, cik vajag; kļūda ir materiāls darbam, nevis iemesls apstāties.",
      ],
      [
        "Vai šīs ir gleznošanas nodarbības iesācējiem Rīgā?",
        "Jā. Vari nākt arī tad, ja līdz šim neesi zīmējis vai gleznojis. Mēs palīdzam atrast pirmo ideju, materiālus un nākamos soļus.",
      ],
      [
        "Vai var pieteikt radošu pasākumu draugiem vai komandai?",
        "Jā. Studijā notiek dzimšanas dienas, draugu vakari, komandu radošie pasākumi un gleznošanas meistarklases Rīgā. Uzraksti ar grupas lielumu un vēlamo datumu.",
      ],
      [
        "Vai studijā der tumšākas, sirreālas vai neparastas idejas?",
        "Noteikti. Sandra pati strādā ar tumšu, simbolisku un atmosfērisku mākslu, tāpēc te nav jāizvēlas tikai dekoratīva vai droša tēma. Var strādāt ar simboliem, dramatisku gaismu, tēliem un savu vizuālo pasauli.",
      ],
      [
        "Vai iespējama individuāla gleznošanas nodarbība?",
        "Jā. Individuālā sesijā var koncentrēties uz vienu darbu, konkrētu tehniku, zīmēšanu, portfolio vai sarežģītāku ideju.",
      ],
      [
        "Vai materiāli ir iekļauti?",
        "Jā. Krāsas, otas, papīrs, audekli un pamata materiāli ir studijā. Ja plāno ļoti specifisku vai lielu darbu, vienkārši uzraksti iepriekš.",
      ],
      [
        "Kā darbojas atcelšana un apmaksa?",
        "Pieteikumiem apmaksa netiek prasīta uzreiz. Apmaksātu individuālu rezervāciju vari atcelt līdz 24 stundām pirms sākuma; tad atmaksa tiek veikta automātiski.",
      ],
      [
        "Vai varu īrēt studiju savam projektam vai nodarbībai?",
        "Jā. Pieejams patstāvīgs darbs studijā, iespēja vadīt savu nodarbību un individuāli sarunājama studijas biedrība. Uzraksti ar savu ideju un vajadzīgo laiku.",
      ],
      [
        "No kāda vecuma var nākt?",
        "Regulārajās jauniešu grupās paredzam vecumu 8–16 gadi. Par jaunākiem bērniem, ģimenes formātu vai dzimšanas dienu uzraksti mums — atradīsim piemērotu risinājumu.",
      ],
      [
        "Vai šeit māca tehniku, vai drīkst vienkārši meklēt savu stilu?",
        "Abi ir iespējami — un parasti tieši viens palīdz otram. Tehnika nav vingrinājums, ko izpilda skaistā žurnālā; tā kļūst noderīga brīdī, kad Tavs darbs prasa noteiktāku zīmējumu, drosmīgāku krāsu, gaismu, kompozīciju vai materiālu. Savukārt savs stils nerodas no pavēles “esi oriģināls”. Tas parādās, atkārtoti pamanot tēlus, krāsas un jautājumus, pie kuriem gribas atgriezties.",
      ],
      [
        "Vai bērnus un jauniešus šeit uztver nopietni?",
        "Jā. Bērna gaume, ritms un dīvainā ideja nav kaut kas, ko ātri pārvērst “pareizā” bildē. Studijā dodam izvēli, īstus materiālus un pietiekami konkrētu palīdzību, lai jaunais cilvēks varētu darboties patstāvīgi, bet nepalikt viens ar apjukumu. Šī uzmanības, brīvības un praktiskas atbildības kombinācija ir radniecīga Montessori pieejai, nepārvēršot nodarbību par stingru metodi.",
      ],
      [
        "Vai gleznošanai jābūt mierīgai un skaistai?",
        "Nē. Tā var būt klusa, asa, tumša, smieklīga, neveikla vai ļoti precīza. Darbs nav vērtīgs tikai tad, ja tas iederas interjerā vai izskatās “glīti” pirmajās desmit minūtēs. Mums svarīgāk ir, lai tas kļūst Tavs: lai attēlā ir lēmumi, ko vari pamatot ar skatienu, sajūtu vai vienkārši ar godīgu vēlmi pamēģināt.",
      ],
    ],
  },
  en: {
    title: "PRACTICAL",
    lead: "Frequently asked questions",
    items: [
      [
        "Why this studio?",
        "It is an artist-led studio, not a place where everyone completes one pre-planned picture. You can begin simply, but also learn seriously: from watercolour and a first canvas to drawing, oil paint, composition, a portfolio or larger work.",
      ],
      [
        "Do I need to bring anything?",
        "No. Paint, brushes, paper, canvases and a place to work are here. Wear something you do not mind getting a little paint on, and bring an idea if you have one. If you do not, that is completely fine.",
      ],
      [
        "What if I do not know what to paint?",
        "That is one of the most common beginnings. We look at images, materials, colours or motifs that already draw you in; Sandra helps find a first manageable step. You do not need a finished concept.",
      ],
      [
        "What if I am afraid I will be bad at it?",
        "Come with that feeling. There is no exam to pass and no need to perform confidence. We begin as small as needed; a mistake is material for the work, not a reason to stop.",
      ],
      [
        "Are these painting classes for beginners in Riga?",
        "Yes. You can come even if you have never drawn or painted. We help with the first idea, materials and next steps.",
      ],
      [
        "Can I book a creative event for friends or a team?",
        "Yes. The studio hosts birthdays, evenings with friends, team creative events and painting workshops in Riga. Write with your group size and preferred date.",
      ],
      [
        "Can I explore dark surrealism art or creative painting?",
        "Absolutely. Sandra’s own work is dark, symbolic and atmospheric, so you do not have to choose only a decorative or safe subject. Symbols, dramatic light, characters and your own visual world are welcome.",
      ],
      [
        "Are private painting sessions available?",
        "Yes. A private session can focus on one work, a particular technique, drawing, a portfolio or a more demanding idea.",
      ],
      [
        "Are materials included?",
        "Yes. Paint, brushes, paper, canvases and basic materials are in the studio. If you are planning a very specific or large work, write ahead.",
      ],
      [
        "How do payment and cancellation work?",
        "Applications do not require payment upfront. A paid individual booking can be cancelled up to 24 hours before it starts, with an automatic refund.",
      ],
      [
        "Can I hire the studio for my own work or class?",
        "Yes. There is a studio work session, the option to host your own class, and membership arranged individually. Write with your idea and timing.",
      ],
      [
        "What ages can attend?",
        "The regular youth groups are for ages 8–16. For younger children, a family format or a birthday, write to us and we will find the right approach.",
      ],
    ],
  },
  ru: {
    title: "ПРАКТИЧНО",
    lead: "Частые вопросы",
    items: [
      [
        "Чем эта студия отличается?",
        "Это студия художницы, а не место, где все выполняют одну заготовленную картину. Здесь можно начать спокойно, но и учиться серьёзно: от акварели и первого холста до рисунка, масла, композиции, портфолио или большой работы.",
      ],
      [
        "Нужно ли что-то приносить?",
        "Нет. Краски, кисти, бумага, холсты и рабочее место уже есть. Наденьте то, что не жалко немного испачкать, и принесите идею, если она есть. Если идеи нет — это нормально.",
      ],
      [
        "Что, если я не знаю, что рисовать?",
        "Это один из самых частых стартов. Мы посмотрим на изображения, материалы, цвета или мотивы, которые уже вас притягивают; Сандра поможет найти первый понятный шаг. Не нужно приходить с готовой концепцией.",
      ],
      [
        "Что, если я боюсь, что у меня не получится?",
        "Приходите с этим чувством. Здесь нет экзамена и не нужно изображать уверенность. Начинаем настолько маленькими шагами, насколько нужно; ошибка — материал для работы, а не причина остановиться.",
      ],
      [
        "Подойдут ли занятия по рисованию в Риге для начинающих?",
        "Да. Можно прийти, даже если вы никогда не рисовали. Мы поможем с первой идеей, материалами и следующими шагами.",
      ],
      [
        "Можно ли заказать творческое событие для друзей или команды?",
        "Да. В студии проходят дни рождения, вечера с друзьями, творческие мероприятия для команд и мастер-классы по живописи в Риге. Напишите размер группы и желаемую дату.",
      ],
      [
        "Можно ли заниматься тёмным сюрреализмом или необычной живописью?",
        "Конечно. Собственное искусство Сандры — символическое и атмосферное, поэтому не нужно выбирать только безопасную декоративную тему. Символы, драматический свет, персонажи и ваш визуальный мир здесь уместны.",
      ],
      [
        "Есть ли индивидуальные занятия?",
        "Да. Индивидуальная сессия может быть посвящена одной работе, определённой технике, рисунку, портфолио или более сложной идее.",
      ],
      [
        "Материалы включены?",
        "Да. Краски, кисти, бумага, холсты и базовые материалы есть в студии. Если планируется очень специфичная или большая работа, напишите заранее.",
      ],
      [
        "Как работают оплата и отмена?",
        "Для заявок предоплата не нужна. Оплаченную индивидуальную бронь можно отменить не позднее чем за 24 часа до начала — возврат производится автоматически.",
      ],
      [
        "Можно арендовать студию для своего проекта или занятия?",
        "Да. Доступна рабочая сессия в студии, возможность провести своё занятие и членство по индивидуальной договорённости. Напишите со своей идеей и нужным временем.",
      ],
      [
        "С какого возраста можно приходить?",
        "Регулярные подростковые группы рассчитаны на 8–16 лет. Для младших детей, семейного формата или дня рождения напишите нам — найдём подходящий вариант.",
      ],
    ],
  },
};

const groups = [
  ["Ceturtdiena", "16:00–18:00", "JAUNIEŠI"],
  ["Ceturtdiena", "18:30–20:30", "PIEAUGUŠIE"],
  ["Sestdiena", "11:00–13:00", "JAUNIEŠI"],
  ["Sestdiena", "14:00–16:00", "PIEAUGUŠIE"],
  ["Svētdiena", "11:00–13:00", "JAUKTA GRUPA"],
  ["Svētdiena", "14:00–16:00", "JAUKTA GRUPA"],
];
const products = [
  [
    "PIRMAIS APMEKLĒJUMS",
    "1 nodarbība",
    "€15",
    "Pirmais solis, lai iepazītu studiju, pasniedzēju un savu gleznošanas ritmu.",
  ],
  [
    "GRUPAS NODARBĪBA",
    "1 nodarbība",
    "€25",
    "Mazā grupā, lai katrs saņemtu padziļinātu uzmanību.",
  ],
  [
    "4 NODARBĪBU ABONEMENTS",
    "4 nodarbības",
    "€80",
    "Izvēlies 4, 6 vai 8 nodarbības par €20 par katru. Abonements ir derīgs 4 nedēļas no pirmās nodarbības.",
  ],
  [
    "INDIVIDUĀLA NODARBĪBA",
    "2 stundas",
    "€45",
    "Personisks laiks vienai idejai, konkrētai tehnikai vai dziļākam darbam.",
  ],
  [
    "PATSTĀVĪGS DARBS STUDIJĀ",
    "1 sesija",
    "€10",
    "Rezervē savu laiku, lai mierīgi strādātu pie personīga gleznošanas projekta.",
  ],
  [
    "STUDIJAS BIEDRĪBA",
    "1 mēnesis",
    "€50/mēn.",
    "Atslēga un piekļuve studijai saviem gleznošanas projektiem brīvajos laikos. Te vari strādāt ar lieliem audekliem, eksperimentēt bez steigas un neuztraukties par krāsas traipu uz grīdas.",
  ],
  [
    "TATTOO TELPA",
    "1 diena",
    "€20",
    "Studijā ir aprīkota privāta telpa tattoo, pīrsinga un citiem meistariem — ar savu izlietni, kušeti, tattoo roku paliktņiem un pamata aprīkojumu, kas nepieciešams procedūru veikšanai.",
  ],
  [
    "DĀVANU KARTE",
    "Sākot no 2 nodarbībām",
    "",
    "Dāvini radošu laiku — 2, 4, 6 vai 8 nodarbības vai izvēlies savu skaitu. Saņēmējs pēc tam izvēlēsies sev piemērotu grupu un pirmo apmeklējumu.",
  ],
];

const productSummaries = {
  lv: [
    "Iepazīsti studiju un savu gleznošanas ritmu.",
    "Mazā grupā ar individuālu uzmanību.",
    "Regulāram ritmam un stabilākai cenai.",
    "Viens pret vienu — idejai vai tehnikai.",
    "Rezervē laiku savam darbam studijā.",
    "Piekļuve studijai saviem projektiem.",
    "Aprīkota privāta telpa meistariem.",
    "Dāvini radošus mirkļus.",
  ],
  en: [
    "Meet the studio and find your painting rhythm.",
    "A small group with focused attention.",
    "A regular rhythm at a steadier price.",
    "One-to-one time for an idea or technique.",
    "Reserve studio time for your own work.",
    "Studio access for your own projects.",
    "An equipped private room for practitioners.",
    "Give classes, or choose your own amount.",
  ],
  ru: [
    "Познакомьтесь со студией и своим ритмом.",
    "Небольшая группа и внимательный подход.",
    "Регулярный ритм по более выгодной цене.",
    "Личное время для идеи или техники.",
    "Забронируйте время для своей работы.",
    "Доступ к студии для личных проектов.",
    "Оборудованная приватная комната для мастеров.",
    "Подарите занятия или выберите своё количество.",
  ],
};

const englishGroups = [
  ["Thursday", "16:00–18:00", "YOUTH"],
  ["Thursday", "18:30–20:30", "ADULTS"],
  ["Saturday", "11:00–13:00", "YOUTH"],
  ["Saturday", "14:00–16:00", "ADULTS"],
  ["Sunday", "11:00–13:00", "MIXED GROUP"],
  ["Sunday", "14:00–16:00", "MIXED GROUP"],
];
const englishProducts = [
  [
    "FIRST VISIT",
    "1 class",
    "€15",
    "A first step to get to know the studio, the teacher and your own painting rhythm.",
  ],
  [
    "GROUP CLASS",
    "1 class",
    "€25",
    "A small group, so everyone receives focused attention.",
  ],
  [
    "4-CLASS PASS",
    "4 classes",
    "€80",
    "Choose 4, 6 or 8 classes at €20 each. Your pass is valid for four weeks from the first class.",
  ],
  [
    "PRIVATE SESSION",
    "2 hours",
    "€45",
    "Personal time for one idea, a particular technique or deeper work.",
  ],
  [
    "INDEPENDENT STUDIO WORK",
    "1 session",
    "€10",
    "Reserve a quiet stretch of time to work on your own painting project.",
  ],
  [
    "STUDIO MEMBERSHIP",
    "1 month",
    "€50/month",
    "A key and studio access for your own painting projects outside class times. Work on large canvases, experiment without rushing, and do not worry about a little paint on the floor.",
  ],
  [
    "PRIVATE TATTOO ROOM",
    "1 day",
    "€20",
    "An equipped private room for tattoo, piercing and other independent artists, with its own sink, treatment bed, tattoo arm rests and core equipment.",
  ],
  [
    "GIFT CARD",
    "Starting from 2 classes",
    "",
    "Give creative time — 2, 4, 6 or 8 classes, or choose your own number. The recipient can then choose a suitable group and their first visit.",
  ],
];
const russianGroups = [
  ["Четверг", "16:00–18:00", "МОЛОДЁЖЬ"],
  ["Четверг", "18:30–20:30", "ВЗРОСЛЫЕ"],
  ["Суббота", "11:00–13:00", "МОЛОДЁЖЬ"],
  ["Суббота", "14:00–16:00", "ВЗРОСЛЫЕ"],
  ["Воскресенье", "11:00–13:00", "СМЕШАННАЯ ГРУППА"],
  ["Воскресенье", "14:00–16:00", "СМЕШАННАЯ ГРУППА"],
];
const russianProducts = [
  [
    "ПЕРВОЕ ПОСЕЩЕНИЕ",
    "1 занятие",
    "€15",
    "Первый шаг, чтобы познакомиться со студией, преподавателем и своим ритмом в живописи.",
  ],
  [
    "ГРУППОВОЕ ЗАНЯТИЕ",
    "1 занятие",
    "€25",
    "Небольшая группа, чтобы каждый получил внимательное сопровождение.",
  ],
  [
    "АБОНЕМЕНТ НА 4 ЗАНЯТИЯ",
    "4 занятия",
    "€80",
    "Выберите 4, 6 или 8 занятий по €20. Абонемент действует 4 недели с первого занятия.",
  ],
  [
    "ИНДИВИДУАЛЬНОЕ ЗАНЯТИЕ",
    "2 часа",
    "€45",
    "Личное время для одной идеи, техники или более глубокого процесса.",
  ],
  [
    "САМОСТОЯТЕЛЬНАЯ РАБОТА В СТУДИИ",
    "1 сессия",
    "€10",
    "Забронируйте спокойное время для работы над личным живописным проектом.",
  ],
  [
    "ЧЛЕНСТВО В СТУДИИ",
    "1 месяц",
    "€50/мес.",
    "Ключ и доступ к студии для собственных живописных проектов вне занятий. Здесь можно работать с большими холстами, экспериментировать без спешки и не бояться краски на полу.",
  ],
  [
    "ЧАСТНАЯ ТАТУ-КОМНАТА",
    "1 день",
    "€20",
    "Оборудованная приватная комната для тату, пирсинга и других независимых мастеров с собственной раковиной, кушеткой, подлокотниками для тату и базовым оборудованием.",
  ],
  [
    "ПОДАРОЧНАЯ КАРТА",
    "От 2 занятий",
    "",
    "Подарите время для творчества — 2, 4, 6 или 8 занятий либо выберите своё количество. Получатель затем выберет подходящую группу и первое посещение.",
  ],
];
const studioCapabilities = {
  lv: {
    kicker: "PRAKTISKĀ PUSE",
    title: "Visa studija ir Tavā rīcībā.",
    lead: "Te nav jāierodas ar pilnu maisu materiālu vai gatavu plānu. Materiāli un profesionālas mākslinieces atbalsts ir uz vietas — ideju, tehniku un tempu atrodam kopā.",
    items: [
      [
        "MATERIĀLI",
        "Eļļa, akrils, guaša, akvarelis, zīmuļi un citi mākslas materiāli ir pieejami uz vietas. Standarta 30 × 40 cm audekls vai akvareļu/zīmēšanas papīrs ir iekļauts nodarbības cenā; lielāku audeklu var iegādāties studijā par aptuveni €10–15 vai atnest līdzi savu.",
      ],
      [
        "PAMATI",
        "Kad darbam tas vajadzīgs, pieslēdzam plašu mākslas teorijas un prakses arsenālu: zīmējuma, kompozīcijas un krāsu teoriju; pievēršamies sejas un ķermeņa uzbūvei, telpai, ainai un citam, ko prasa konkrētais darbs. Sandras akadēmiskās mākslas zināšanas ļauj noteikumus sadalīt saprotamos soļos — nevis uzspiest tos tur, kur tie traucē radīt.",
      ],
      [
        "BRĪVĀK",
        "Te ir nepiespiesta mākslinieciska atmosfēra, kur Tava gaume ir mēraukla, nevis kaut kas, kas jālabo. Pasniedzējs palīdz pamanīt, izmēģināt un atrast risinājumus, bet neuzspiež vienu stilu. Eksperimentējam ar simboliem, materiāliem, krāsām, formām un meklējam Tavu personisko vizuālo valodu.",
      ],
      [
        "LIELĀKI DARBI",
        "Ambīcija šeit nav jāsamazina. Var sākt ar vienu darbu un izaugt līdz lielam audeklam, darbu sērijai, interjera gleznai vai portfolio. Palīdzam lielu ieceri sadalīt reālos posmos, izvēlēties formātu un turpināt arī tad, kad darbam vajag vairāk laika, vietas vai drosmes.",
      ],
    ],
  },
  en: {
    kicker: "PRACTICAL THINGS",
    title: "The whole studio is there to use.",
    lead: "You do not need to arrive with a bag of supplies or a finished plan. Materials and an artist’s practical support are here; we find the idea, technique and pace together.",
    items: [
      [
        "MATERIALS",
        "Oils, acrylics, gouache, watercolour, pencils and other drawing materials are on site, together with watercolour and drawing paper. A standard 30 × 40 cm canvas is included; larger canvases can be bought at the studio for around €10–15 or brought from home.",
      ],
      [
        "FOUNDATIONS",
        "When a work needs it, we draw on drawing, composition, colour theory, scene and space, observation, art books and academic knowledge. Sandra’s academic art studies make it possible to break rules into useful, understandable steps—without forcing them where they do not serve the work.",
      ],
      [
        "FREER WORK",
        "This is an unforced artistic atmosphere where your taste is the compass, not something to correct. Sandra helps you notice, test and solve problems without putting everyone into one style. We experiment with symbols, atmosphere and materials while looking for your own visual language.",
      ],
      [
        "LARGER WORKS",
        "Ambition does not need to be reduced here. A first work can grow into a larger canvas, a series, an interior painting or a portfolio. We help split a big intention into real stages, choose the right format and continue when a work needs more time, space or courage.",
      ],
    ],
  },
};
const eventFormats = {
  lv: {
    kicker: "PASĀKUMI STUDIJĀ",
    title: "Radošs vakars,\nkas izskatās pēc Tevis.",
    lead: "Dzimšanas dienām, draugu vakariem un komandām — līdz 30 viesiem un 20 gleznošanas vietām. Izvēlies gleznošanu vai savu formātu ar papildu aktivitātēm.",
    rates: [
      ["AKVARELIS", "€20 / pers.", ""],
      ["GLEZNOŠANA", "€35 / pers.", ""],
      ["LIELAIS KOPĪGAIS AUDĒKLS", "no €200", ""],
    ],
    hangout:
      "Aptuvenais nepieciešamais laiks gleznas pabeigšanai — 3 stundas.\n\nKatram pasākuma formātam studijā pievienojam vēl 2–3 stundas brīvai būšanai kopā — lai var mierīgi ierasties, pakavēties un nesteigties prom pēc pēdējā otas vilciena. Drīkst ņemt līdzi savu ēdienu un dzērienus.\n\nVisus pasākuma formātus varam noorganizēt izbraukuma formātā — pie Jums!",
    formatsLabel: "GATAVIE PASĀKUMU FORMĀTI, KO VAR PASŪTĪT",
    formats: [
      [
        "NEONA GLEZNOŠANA",
        "Neona gleznošanas pasākums bērniem vai pieaugušajiem — ar krāsām, mūziku un darbu, ko katrs paņem līdzi.",
      ],
      [
        "DRAUGU VAKARS",
        "Gleznošana, sarunas un savs ritms — bez sajūtas, ka visiem jāpabeidz viena un tā pati bilde. Lieliski der arī vecmeitu ballītei.",
      ],
      [
        "INTUITĪVĀ GLEZNOŠANA",
        "Mākslas pieredze ar dzīvo mūziku fonā un meditācijas meistari, kamēr Tu ļaujies gleznošanai bez noteikumiem — pilnīgā brīvībā un kontaktā ar sevi.",
      ],
      [
        "METAFORISKĀ GLEZNA",
        "Tematiska radoša sesija kopā ar mākslas terapeiti–kouči @marsalovaaa. Kopā izvēlamies pasākuma tēmu — piemēram, ēnas pusi, arhetipus, iekšējo spēku vai dzīves virzienu. Ar iztēli un kognitīvi biheiviorālās pieejas iedvesmotiem refleksijas paņēmieniem pētām savu tēmu un radām unikālu simbolisku gleznu.",
      ],
      [
        "DZIMŠANAS DIENA",
        "Svinēšanu varam sākt ar gleznošanas sesiju un pēc tam turpināt īstu ballīti. Ņem līdzi ēdienu, kūku un dzērienus, paliec brīvajā laikā un pievieno savas aktivitātes — vietas pietiek svētkiem, kas izskatās tieši pēc Tevis.",
      ],
    ],
    custom: [
      "TELPA TAVAI IDEJAI",
      "Dekorācijas, karaoke, galda spēles, tattoo, pīrsings, kopīgs audekls un citas trakas idejas — saliksim tieši Tavu kombināciju.",
    ],
    cta: "PIESAKI SAVU PASĀKUMU — ĪSTENOSIM TO KOPĀ →",
    emailSubject: "Pasākums Art Studio Inspire",
    faqTitle: "PASĀKUMU ORGANIZĀCIJAS KĀRTĪBA",
    faq: [
      [
        "Kā pieteikt pasākumu?",
        "Uzraksti mums vēlamo datumu, cilvēku skaitu un savu ideju. Atbildēsim ar piemērotu formātu, cenu un nākamajiem soļiem.",
      ],
      [
        "Kas ir iekļauts?",
        "Iekļauti nepieciešamie mākslas materiāli, darba vietas un pasniedzējas vadība. Katram studijas pasākumam pievienojam arī 2 stundas brīvai būšanai kopā.",
      ],
      [
        "Vai drīkst ņemt līdzi ēdienu un dzērienus?",
        "Jā — droši ņem līdzi kūku, uzkodas un dzērienus. Iepriekš tikai pasaki, ko plāno, lai sagatavojam telpu.",
      ],
      [
        "Vai var pievienot papildu aktivitātes?",
        "Jā. Varam saskaņot dekorācijas, karaoke, spēles, tattoo vai pīrsinga sesijas, kopīgu audeklu un citas Tavas idejas. Papildu aktivitātes tiek aprēķinātas atsevišķi.",
      ],
      [
        "Vai pasākums var notikt pie mums?",
        "Jā. Visus formātus varam pielāgot izbraukumam — atsūti vietu, datumu un grupas lielumu, un sagatavosim piedāvājumu.",
      ],
      [
        "Kas notiek, ja plāni mainās?",
        "Par datuma maiņu vai atcelšanu dod ziņu pēc iespējas agrāk. Precīzu rezervācijas un apmaksas kārtību saskaņosim pirms apstiprināšanas.",
      ],
    ],
  },
  en: {
    kicker: "EVENTS AT THE STUDIO",
    title: "Not just a class. A whole evening to remember.",
    lead: "Bachelorette parties, children and adult birthdays, friends evenings and team events all work beautifully here. We can shape a quiet painting evening or something very specific; the format follows the people, ages, mood and idea.",
    rates: [
      ["WATERCOLOUR", "from €20 / person", ""],
      ["PAINTING", "from €35 / person", ""],
      ["ONE LARGE SHARED CANVAS", "from €200", ""],
    ],
    hangout:
      "For private studio events, we add time before and after the creative part itself — enough to arrive, linger, make tea or simply be together, instead of rushing out as soon as the last brushstroke is done. Allow around three hours if you would like to finish a painting in one sitting.",
    formats: [
      [
        "NEON PAINTING",
        "A neon-painting event for children or adults, with colour, music and a work each guest takes home.",
      ],
      [
        "FRIENDS EVENING",
        "Painting, conversation and your own pace — without everyone having to finish the same picture. It also works beautifully for a bachelorette party.",
      ],
      [
        "COMBINED EXPERIENCE",
        "We can combine live music, meditation, neon painting and an art-coaching experience for a group. The idea does not have to fit a ready-made box.",
      ],
      [
        "METAPHORICAL PAINTING",
        "A thematic creative session with art therapist–coach @marsalovaaa: a visual way to explore a subject, rather than rush to solve it.",
      ],
      [
        "A SPACE FOR YOUR IDEA",
        "We have celebrated parties of up to 30 people — with karaoke, small tattoo sessions during the event and one large shared canvas for guests. Room decoration can be arranged for an additional fee. If you have another format in mind, write to us and we will work out how to make it happen.",
      ],
    ],
    cta: "ASK ABOUT YOUR EVENT →",
    emailSubject: "Art Studio Inspire event",
    faqTitle: "How do private events work?",
    faq: [
      [
        "Are materials included?",
        "Yes. We prepare the necessary materials and workstations. If you have a particular medium or an ambitious idea, mention it when you enquire.",
      ],
      [
        "Can we bring drinks or snacks?",
        "For private adult events, we can arrange this. The point is not to rush through a painting, but to create an evening people enjoy being in.",
      ],
      [
        "Does everyone have to paint the same work?",
        "No. There can be a shared theme or many different works. We adapt the guidance to the group rather than turn people into a single production line.",
      ],
      [
        "Is intuitive art therapy?",
        "No. It is a guided creative experience. When a particular specialist, such as an art therapist–coach, leads an event, their role and format are stated clearly in the event information.",
      ],
    ],
  },
  ru: {
    kicker: "СОБЫТИЯ В СТУДИИ",
    title: "Не просто занятие. Целый вечер, который запомнится.",
    lead: "Здесь отлично получаются девичники, детские и взрослые дни рождения, вечера с друзьями и события для команд. Можно устроить спокойный вечер живописи или очень конкретное творческое событие — формат строится вокруг людей, возраста, настроения и идеи.",
    rates: [
      ["АКВАРЕЛЬ", "от €20 / человек", ""],
      ["ЖИВОПИСЬ", "от €35 / человек", ""],
      ["ОДНО БОЛЬШОЕ ОБЩЕЕ ПОЛОТНО", "от €200", ""],
    ],
    hangout:
      "Для частного события в студии добавляется время до и после творческой части — чтобы спокойно встретиться, посидеть, выпить чаю или просто побыть вместе, а не выбегать сразу после последнего мазка. Чтобы закончить картину за одну встречу, лучше заложить на живопись около трёх часов.",
    formats: [
      [
        "НЕОНОВАЯ ЖИВОПИСЬ",
        "Событие с неоновой живописью для детей или взрослых: цвет, музыка и работа, которую каждый гость заберёт с собой.",
      ],
      [
        "ВЕЧЕР С ДРУЗЬЯМИ",
        "Живопись, разговоры и свой ритм — без требования, чтобы все закончили одну и ту же картину. Отличный формат и для девичника.",
      ],
      [
        "КОМБИНИРОВАННЫЙ ОПЫТ",
        "Можно соединить живую музыку, медитацию, неоновую живопись и опыт арт-коучинга для группы. Идея не обязана помещаться в готовую коробку.",
      ],
      [
        "МЕТАФОРИЧЕСКАЯ КАРТИНА",
        "Тематическая творческая сессия с арт-терапевтом-коучем @marsalovaaa: визуальный способ исследовать тему, не пытаясь срочно её решить.",
      ],
      [
        "ПРОСТРАНСТВО ДЛЯ ВАШЕЙ ИДЕИ",
        "В студии уже проходили события до 30 человек — с караоке, небольшими тату-сессиями во время мероприятия и одним большим общим полотном для гостей. За отдельную цену можно организовать декор пространства. Если у вас другой формат, напишите — вместе придумаем, как его осуществить.",
      ],
    ],
    cta: "НАПИСАТЬ О СВОЁМ СОБЫТИИ →",
    emailSubject: "Событие Art Studio Inspire",
    faqTitle: "Как проходят частные события?",
    faq: [
      [
        "Материалы включены?",
        "Да. Мы готовим нужные материалы и рабочие места. Если есть особая техника или большая идея, просто расскажите о ней в сообщении.",
      ],
      [
        "Можно принести напитки или закуски?",
        "Для частных взрослых событий это можно согласовать. Цель — не быстро «отметить» картину, а создать вечер, в котором людям приятно быть.",
      ],
      [
        "Все должны рисовать одну работу?",
        "Нет. Можно выбрать общую тему или делать разные работы. Мы подстраиваем сопровождение под группу, а не превращаем людей в один конвейерный результат.",
      ],
      [
        "Интуитивное искусство — это терапия?",
        "Нет. Это сопровождаемый творческий опыт. Если событие ведёт конкретный специалист, например арт-терапевт-коуч, его роль и формат будут ясно указаны в описании.",
      ],
    ],
  },
};
const words = {
  lv: {
    lang: "EN",
    classes: "NODARBĪBAS",
    studio: "PAR STUDIJU",
    contact: "KONTAKTI",
    city: "ART STUDIO INSPIRE · RĪGA",
    hero: "GLEZNO.",
    hero2: "EKSPERIMENTĒ.",
    hero3: "IEDVESMOJIES.",
    sub: "GLEZNOŠANAS NODARBĪBAS BĒRNIEM UN PIEAUGUŠAJIEM · MIERA IELA 17, RĪGA",
    lead: "MĀKSLAS STUDIJA CILVĒKIEM AR IDEJĀM.\nARĪ TIEM, KURI VĒL NEZINA, KA VIŅIEM TĀDAS IR.",
    apply: "PIETEIKTIES NODARBĪBAI",
    statement: "MĀKSLAS STUDIJA CILVĒKIEM AR IDEJĀM.\nARĪ TIEM, KURI VĒL NEZINA, KA VIŅIEM TĀDAS IR.",
    statementQuote: "Mēs sākam ar to, ko vēlies radīt, nevis ar to, ko jau proti.",
    statementBody: [
      "Tava ideja ir sākumpunkts. Mums ir svarīgi nevis iemācīt visiem gleznot vienādi, bet palīdzēt Tev arvien labāk saprast savu gaumi, redzējumu.",
      "Bērniem un pieaugušajiem — individualitāte šeit vienmēr ir galvenā vērtība.",
      "Mākslu apgūstam pašā radīšanas procesā — teoriju pieslēdzam tur, kur tā kļūst vajadzīga.",
    ],
    regular: "KATRU NEDĒĻU",
    group: "GRUPU NODARBĪBAS",
    reserve: "PIETEIKTIES",
    booking: "PIETEIKŠANĀS",
    format: "IZVĒLIES SAVU FORMĀTU",
    book: "REZERVĒT VIETU",
    price: "€15 PIRMAIS APMEKLĒJUMS · €25 VIENA NODARBĪBA · ABONEMENTS 4× €80",
    scheduleNote:
      "JAUNIEŠU GRUPA — BĒRNI NO 8 GADU VECUMA · CETURTDIEN UN SESTDIEN\nPIEAUGUŠIE · CETURTDIEN, SESTDIEN UN SVĒTDIEN",
    approach: "STUDIJAS PIEEJA",
    beginner: "Nekad neesi gleznojis?",
    enough: "Tas ir pilnīgi pietiekams sākumpunkts.",
    beginnerBody: [
      "Tev nav jāprot zīmēt, jāpārzina krāsu teorija vai jāzina, ko vēlies uzgleznot. Vari vienkārši atnākt un izmēģināt.",
      "Mēs palīdzēsim izvēlēties ideju, materiālus un pirmos soļus. Sarežģīto sadalīsim saprotamos posmos un zināšanas pievienosim pakāpeniski.",
    ],
    curiosity: "Ziņkāre — viss, kas tev ir nepieciešams.",
    youth: "KĀ MĒS DOMĀJAM",
    youthTitle: "Bērniem un jauniešiem\nir sava gaume.",
    youthEm: "Mēs to uztveram nopietni.",
    youthBody:
      "Mūsu pieeju iedvesmo Montessori domāšana: sagatavota vide, īsti materiāli, iespēja izvēlēties un pieaugušais, kurš vēro, nevis steidzas pārņemt darbu savās rokās. Bērnam nav jāiekļaujas vienā paraugā. Viņa gaume, ritms un neparastā ideja ir vērta laika; mūsu darbs ir dot prasmes un telpu, lai tā var augt.",
    events: "PRIVĀTIE PASĀKUMI",
    eventTitle: "Dzimšanas dienas · draugu vakari · komandu pasākumi",
    eventCta: "UZRAKSTĪT PAR PASĀKUMU →",
    find: "KĀ MŪS ATRAST?",
    address: "📍 Ienāc citā pasaulē tepat Rīgas centrā, Miera ielā 17",
    directions:
      "Ieejas durvis atradīsi pie veikala M50, un lejā pa trepītēm uzreiz redzēsi studijas durvis.",
    thanks: "Paldies!",
    demo: "Tava vieta tiks apstiprināta pēc drošas apmaksas.",
    close: "AIZVĒRT",
    bookingTitle: "Rezervē vietu",
    choose: "Izvēlies nodarbību",
    name: "Vārds",
    email: "E-pasts",
    submit: "PIETEIKTIES",
  },
  en: {
    lang: "LV",
    classes: "CLASSES",
    studio: "THE STUDIO",
    contact: "CONTACT",
    city: "ART STUDIO INSPIRE · RIGA",
    hero: "PAINT.",
    hero2: "EXPERIMENT.",
    hero3: "GET INSPIRED.",
    sub: "PAINTING CLASSES FOR CHILDREN & ADULTS · MIERA IELA 17, RIGA",
    lead: "AN ART STUDIO FOR PEOPLE WITH IDEAS.\nALSO FOR THOSE WHO DO NOT YET KNOW THEY HAVE THEM.",
    apply: "BOOK A CLASS",
    statement: "AN ART STUDIO FOR PEOPLE WITH IDEAS.\nALSO FOR THOSE WHO DO NOT YET KNOW THEY HAVE THEM.",
    statementQuote: "We begin with what you want to create, not with what you already know how to do.",
    statementBody: [
      "Your idea is the starting point. We do not want to teach everyone to paint alike; we want to help you understand your own taste and vision more deeply.",
      "For children and adults alike, individuality is always the central value here.",
      "We learn art while making it — bringing in theory only when it becomes useful.",
    ],
    regular: "EVERY WEEK",
    group: "GROUP CLASSES",
    reserve: "BOOK A PLACE",
    booking: "BOOKING",
    format: "CHOOSE YOUR FORMAT",
    book: "RESERVE A PLACE",
    price: "€15 TRIAL · €25 SINGLE CLASS · €80 FOUR-CLASS PASS",
    scheduleNote:
      "YOUTH GROUP — CHILDREN AGED 8+ · THURSDAY & SATURDAY\nADULTS · THURSDAY, SATURDAY & SUNDAY",
    approach: "OUR APPROACH",
    beginner: "Never painted before?",
    enough: "That is a perfectly good place to start.",
    beginnerBody: [
      "You do not need to know how to draw, understand colour theory or arrive with a painting idea. You can simply come and try.",
      "We will help you choose an idea, materials and first steps. We make the difficult parts understandable and add knowledge gradually.",
    ],
    curiosity: "Curiosity is all you need.",
    youth: "HOW WE THINK",
    youthTitle: "Children and young people\nalready have taste.",
    youthEm: "We take it seriously.",
    youthBody:
      "We work through attention, choice and materials that are within reach — an approach related in many ways to Montessori principles. A child does not need to fit one model. Their taste, pace and strange idea are worth time; our job is to offer skills and room for them to grow.",
    events: "BIRTHDAYS & PRIVATE EVENTS",
    eventTitle: "Birthdays · evenings with friends · team events",
    eventCta: "ASK ABOUT AN EVENT →",
    find: "HOW TO FIND US",
    address: "📍 Step into another world in central Riga, at Miera iela 17",
    directions:
      "Find the entrance by the M50 shop. Head down the stairs and the studio door is right there.",
    thanks: "Thank you!",
    demo: "Your place will be confirmed after secure payment.",
    close: "CLOSE",
    bookingTitle: "Reserve your place",
    choose: "Choose a class",
    name: "Name",
    email: "Email",
    submit: "SEND REQUEST",
  },
  ru: {
    lang: "LV",
    classes: "ЗАНЯТИЯ",
    studio: "О СТУДИИ",
    contact: "КОНТАКТЫ",
    city: "ART STUDIO INSPIRE · РИГА",
    hero: "РИСУЙ.",
    hero2: "ЭКСПЕРИМЕНТИРУЙ.",
    hero3: "ВДОХНОВЛЯЙСЯ.",
    sub: "ЗАНЯТИЯ ЖИВОПИСЬЮ ДЛЯ ДЕТЕЙ И ВЗРОСЛЫХ · MIERA IELA 17, РИГА",
    lead: "ХУДОЖЕСТВЕННАЯ СТУДИЯ ДЛЯ ЛЮДЕЙ С ИДЕЯМИ.\nИ ДЛЯ ТЕХ, КТО ЕЩЁ НЕ ЗНАЕТ, ЧТО ОНИ У НИХ ЕСТЬ.",
    apply: "ЗАПИСАТЬСЯ НА ЗАНЯТИЕ",
    statement: "СТУДИЯ ДЛЯ ЛЮДЕЙ С ИДЕЯМИ.\nИ ДЛЯ ТЕХ, КТО ЕЩЁ НЕ ЗНАЕТ, ЧТО ОНИ У НИХ ЕСТЬ.",
    statementQuote: "Мы начинаем с того, что ты хочешь создать, а не с того, что уже умеешь.",
    statementBody: [
      "Твоя идея — это начало. Нам важно не научить всех рисовать одинаково, а помочь лучше почувствовать собственный вкус и видение.",
      "Для детей и взрослых индивидуальность здесь всегда остаётся главной ценностью.",
      "Искусству учимся в самом процессе создания — теорию подключаем тогда, когда она действительно нужна.",
    ],
    regular: "КАЖДУЮ НЕДЕЛЮ",
    group: "ГРУППОВЫЕ ЗАНЯТИЯ",
    reserve: "ЗАПИСАТЬСЯ",
    booking: "БРОНИРОВАНИЕ",
    format: "ВЫБЕРИ СВОЙ ФОРМАТ",
    book: "ЗАБРОНИРОВАТЬ",
    price: "€15 ПРОБНОЕ · €25 ОДНО ЗАНЯТИЕ · €80 АБОНЕМЕНТ НА 4 ЗАНЯТИЯ",
    scheduleNote:
      "МОЛОДЁЖНАЯ ГРУППА — ДЕТИ ОТ 8 ЛЕТ · ЧЕТВЕРГ И СУББОТА\nВЗРОСЛЫЕ · ЧЕТВЕРГ, СУББОТА И ВОСКРЕСЕНЬЕ",
    approach: "ПОДХОД СТУДИИ",
    beginner: "Никогда не рисовал?",
    enough: "Это вполне хорошая точка для начала.",
    beginnerBody: [
      "Не нужно уметь рисовать, знать теорию цвета или приходить с готовой идеей картины. Можно просто прийти и попробовать.",
      "Мы поможем выбрать идею, материалы и первые шаги. Сложное разделим на понятные части и будем добавлять знания постепенно.",
    ],
    curiosity: "Любопытство — всё, что нужно.",
    youth: "КАК МЫ ДУМАЕМ",
    youthTitle: "У детей и подростков\nуже есть свой вкус.",
    youthEm: "Мы относимся к нему серьёзно.",
    youthBody:
      "Мы работаем через внимание, выбор и материалы, которые всегда под рукой — подход, во многом близкий принципам Монтессори. Ребёнку не нужно помещаться в один шаблон. Его вкус, темп и странная идея достойны времени; наша задача — дать навыки и пространство, чтобы это росло.",
    events: "ПРАЗДНИКИ",
    eventTitle: "Дни рождения · вечера с друзьями · события для команд",
    eventCta: "НАПИСАТЬ О СОБЫТИИ →",
    find: "КАК НАС НАЙТИ?",
    address: "📍 Другой мир в самом центре Риги, Miera iela 17",
    directions:
      "Вход находится рядом с магазином M50: спуститесь по ступенькам — и сразу увидите дверь студии.",
    thanks: "Спасибо!",
    demo: "Ваше место будет подтверждено после безопасной оплаты.",
    close: "ЗАКРЫТЬ",
    bookingTitle: "Забронировать место",
    choose: "Выберите занятие",
    name: "Имя",
    email: "Эл. почта",
    submit: "ПРОДОЛЖИТЬ",
  },
};

export default function InspirePage({ page = "home" }) {
  const [form, setForm] = useState(false);
  const [sent, setSent] = useState(false);
  const [confirmationEmailSent, setConfirmationEmailSent] = useState(false);
  const [selection, setSelection] = useState("");
  const [booking, setBooking] = useState(null);
  const [status, setStatus] = useState("");
  const [calendarKind, setCalendarKind] = useState("all");
  const [checkoutOption, setCheckoutOption] = useState("");
  const [giftClasses, setGiftClasses] = useState(2);
  const [scheduleWeek, setScheduleWeek] = useState(0);
  const [bookingDay, setBookingDay] = useState("");
  const [lang, setLang] = useState("lv");
  const t = words[lang],
    activeProducts =
      lang === "lv"
        ? products
        : lang === "ru"
          ? russianProducts
          : englishProducts,
    capabilities = studioCapabilities[lang] || studioCapabilities.en,
    events = eventFormats[lang];
  const host = {
    lv: {
      kicker: "KAS VADA STUDIJU",
      title: "Sandra Rudzīte",
      role: "Glezniecībā jau 18 gadus — un mīlestība pret mākslu joprojām neļauj apstāties.",
      body: "Sandra vada Art Studio Inspire nevis no malas, bet no darbnīcas — ar eļļu, akvareli, zīmējumu, akrilu un lielām idejām uz audekla. Viņa ir strādājusi ar Adobe, rādījusi savu darbu un mācīšanu tiešsaistē, bet studijā svarīgākais paliek dzīvs, praktisks process: paskatīties, izmēģināt, kļūdīties, pamanīt un turpināt.",
      event:
        "Lielākos pasākumos tiek piesaistīti papildu pedagogi un mākslinieki, lai katrs dalībnieks saņemtu kvalitatīvu uzmanību.",
      details: "TELPA UN IESPĒJAS",
      studio:
        "72 m² studija ar apmēram 50 m² galveno gleznošanas telpu. Ir 9 pilna izmēra molberti, saliekami galdi 80–180 cm, līdz 20 krēsliem, tēja un kafija uz vietas. Ērti strādājam ar 16–20 cilvēku grupu.",
      hire: "Stundu nomnieki šeit var vadīt savu mākslas nodarbību vienreiz vai regulāri. Var izmantot studijas molbertus, galdus un otas; krāsu izmantošanu var pievienot atsevišķi.",
      tattooTitle: "TATTOO TELPA",
      tattoo:
        "Apmēram 12 m² privāta tattoo telpa ar savu izlietni, kušeti, tattoo roku paliktņiem un pamata aprīkojumu. Der tattoo un pīrsinga meistariem, kā arī skropstām, masāžai vai citam savam pakalpojumam. Dienas noma sākas no €20 — par piemērotu laiku un vajadzībām uzraksti mums.",
    },
    en: {
      kicker: "WHO RUNS THE STUDIO",
      title: "Sandra Rudzīte",
      role: "Painting has been part of her life for 18 years — and her love of art still refuses to let go.",
      body: "Sandra runs Art Studio Inspire from inside the work itself: oils, watercolour, drawing, acrylics and ambitious canvases. She has worked with Adobe and shared painting and teaching online, but the studio stays rooted in a real hands-on process: looking, trying, getting something wrong, noticing, and continuing.",
      event:
        "For bigger events Sandra brings in 1–3 fellow artists when needed, so a group gets actual attention rather than instructions shouted from a stage.",
      details: "THE SPACE & WHAT IS HERE",
      studio:
        "The studio is 72 m², with roughly 50 m² for the main painting room. There are 9 full-size easels, foldable 80–180 cm tables, up to 20 chairs, and tea and coffee on site. A class of 16–20 people fits comfortably.",
      hire: "Hourly renters can run their own art class here once or regularly. Studio easels, tables and brushes can be used; paint use can be added separately.",
      tattooTitle: "ABOUT THE PRIVATE TATTOO ROOM",
      tattoo:
        "A private room of around 12 m² with its own sink, treatment bed, tattoo arm rests and core equipment ready to use. It suits tattoo and piercing artists, and can also work for lashes, massage or another independent service. Day rent starts from €20 — write to discuss the right time and setup.",
    },
    ru: {
      kicker: "КТО ВЕДЁТ СТУДИЮ",
      title: "Сандра Рудзите",
      role: "В живописи уже 18 лет — и любовь к искусству по-прежнему не даёт ей останавливаться.",
      body: "Сандра ведёт Art Studio Inspire изнутри самой работы: масло, акварель, рисунок, акрил и большие идеи на холсте. Она работала с Adobe и показывала живопись и обучение онлайн, но основа студии остаётся живой и практичной: смотреть, пробовать, ошибаться, замечать и продолжать.",
      event:
        "Для больших событий Сандра при необходимости приглашает 1–3 художников-помощников, чтобы группа получила настоящее внимание, а не инструкции со сцены.",
      details: "ПРОСТРАНСТВО И ВОЗМОЖНОСТИ",
      studio:
        "Площадь студии — 72 м², из них около 50 м² занимает главный зал для рисования. Есть 9 полноразмерных мольбертов, складные столы 80–180 см, до 20 стульев, чай и кофе. Комфортно работаем с группами до 16–20 человек.",
      hire: "Арендаторы по часам могут провести здесь своё занятие разово или регулярно. Можно использовать мольберты, столы и кисти студии; краски добавляются отдельно.",
      tattooTitle: "О ПРИВАТНОЙ ТАТУ-КОМНАТЕ",
      tattoo:
        "Отдельная тату-комната около 12 м² с собственной раковиной, кушеткой, подлокотниками для тату и базовым оборудованием. Подходит для тату- и пирсинг-мастеров, а также для ресниц, массажа или другой частной услуги. Аренда на день от €20 — напишите, чтобы обсудить время и формат.",
    },
  }[lang];
  const artistBio = {
    lv: "Sandras Rudzītes glezniecībā figurālais un simboliskais bieži kļūst par iekšēju ainavu: tēls, dzīvnieks, klusā daba vai tumšāka gaisma nav tikai dekorācija, bet veids, kā noturēt skatienu pie sajūtas. Viņa strādā starp rūpīgu novērojumu un iztēli — ar eļļu, zīmējumu, akrilu un akvareli — un nebaidās no darba, kuram vajag laiku.\n\nLai gan viņas darbos nereti ienāk smagāki, tumšāki vai simboliski motīvi, Sandra pati ir viegla, priecīga un ziņkārīga klātbūtne: studijā ir vieta smiekliem, tējai un arī gleznai par mīļu kaķi. Viņa brīvi strādā dažādos žanros, un viens no viņas mazajiem vainīgajiem priekiem ir gleznot īpaši mīļus kaķus.\n\nAr Adobe, tiešsaistes mākslas projektiem un dzīvo studijas darbu viņai ir plaša pieredze, taču mācīšanā svarīgākais ir vienkāršs: palīdzēt cilvēkam ieraudzīt, ko viņš pats mēģina pateikt attēlā.",
    en: "Sandra Rudzīte’s paintings often let the figurative and symbolic become an inner landscape: a figure, animal, still life or darker light is not decoration, but a way of holding attention on a feeling. She works between close observation and invention — in oils, drawing, acrylics and watercolour — without rushing a work that needs time. Although her work often carries darker, heavier or symbolic subjects, Sandra herself is light-hearted, happy and curious: the studio has room for laughter, tea, and a painting of a sweet cat. She works freely across genres, and one of her small guilty pleasures is painting cute cats. Her experience spans Adobe, online art projects and the daily life of a working studio; in teaching, the essential thing is simpler: helping someone see what they are already trying to say in an image.",
    ru: "В живописи Сандры Рудзите фигуративное и символическое часто становятся внутренним пейзажем: персонаж, животное, натюрморт или более тёмный свет — не просто декор, а способ удержать внимание на ощущении. Она работает между внимательным наблюдением и воображением — маслом, рисунком, акрилом и акварелью — не торопя работу, которой нужно время. Хотя в её работах нередко появляются более тяжёлые, тёмные или символические мотивы, сама Сандра — лёгкий, радостный и любопытный человек: в студии есть место смеху, чаю и картине с милым котом. Она свободно работает в разных жанрах, а одно из её маленьких удовольствий — рисовать милых котиков. Её опыт включает Adobe, онлайн-проекты об искусстве и повседневную жизнь работающей студии; в преподавании главное проще: помочь человеку увидеть, что именно он уже пытается сказать своим изображением.",
  }[lang];
  const [slide, setSlide] = useState(0);
  const [studioSlide, setStudioSlide] = useState(0);
  const [eventSlide, setEventSlide] = useState(0);
  const [moodQuote, setMoodQuote] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [editableContent, setEditableContent] = useState({});
  const [availability, setAvailability] = useState({});
  const [savedEmail, setSavedEmail] = useState("");
  const approach = proofCopy[lang],
    faq = seoFaq[lang];
  const youthPrinciples =
    lang === "lv"
      ? [
          [
            "Bērna gaume nav kļūda, ko labot",
            "Pat ļoti savdabīga krāsu izvēle, tēls vai interese ir vērtīgs sākumpunkts. Mēs necenšamies bērnu ielikt vienā paraugā — palīdzam pamanīt, kas viņu pašu aizrauj.",
          ],
          [
            "Brīvība izvēlēties un darīt pašam",
            "Montessori pieejā vide ir sagatavota tā, lai bērns varētu patstāvīgi izvēlēties materiālu, sākt, mēģināt vēlreiz un pabeigt savā tempā. Mēs esam līdzās ar uzmanību un palīdzību, nevis gatavu risinājumu bērna vietā.",
          ],
          [
            "Spēle, brīnums un prasmes",
            "Radošums aug no drošības izmēģināt, kļūdīties un atklāt. Zīmējumu, kompozīciju, krāsu un materiālu prasmes dodam tad, kad tās palīdz idejai kļūt skaidrākai. Noteikumi ir instruments, nevis robeža.",
          ],
          [
            "Jauniešu balsi uztveram nopietni",
            "Pusaudžiem šeit ir vieta gan lielākiem darbiem, gan portfolio idejām, gan drosmīgām tēmām. Viņu redzējums ir pelnījis laiku, uzmanību un kvalitatīvu sarunu.",
          ],
          [
            "No skices līdz lielam darbam",
            "Ideja drīkst sākties ar mazu zīmējumu un izaugt līdz gleznai, sērijai vai portfolio darbam. Mēs palīdzam pamanīt, kad ir vērts darbu turpināt, nevis uzreiz sākt nākamo.",
          ],
          [
            "Īsti materiāli, īstas izvēles",
            "Bērni iepazīst krāsu, zīmuli, ogli, akvareli, akrilu un kolāžu, nevis tikai vienu pareizo tehniku. Materiāls var iedot idejai virzienu.",
          ],
          [
            "Skatāmies uz mākslu, ne tikai taisām",
            "Reizēm pētām mākslas grāmatas, māksliniekus un attēlus, kas aizķeras. Tas māca skatīties uzmanīgāk un dod vārdus savām idejām.",
          ],
          [
            "Draudzīga vieta kļūdām",
            "Neveiksmīgs vilciens, nejauša krāsa vai pārdomāts plāns nav iemesls visu mest prom. Mācāmies pamanīt, ko darbs pats piedāvā darīt tālāk.",
          ],
          [
            "Portfolio un mākslas skola",
            "Ja jaunietim vajag nopietnāku virzienu, varam strādāt pie portfolio, uzdevumiem, novērošanas zīmējuma un pārliecības par savu darbu — bez liekas sacensības.",
          ],
          [
            "Vecāki redz procesu",
            "Svarīgs ir ne tikai gatavais darbs. Pastāstām, pie kā bērns strādā un ko viņš vai viņa jau ir iemācījies pamanīt, izvēlēties un pabeigt.",
          ],
        ]
      : lang === "ru"
        ? [
            [
              "Вкус ребёнка — не ошибка",
              "Даже необычный выбор цвета, образ или интерес может стать важной отправной точкой. Мы помогаем увидеть, что действительно увлекает самого ребёнка.",
            ],
            [
              "Играть и удивляться",
              "Творчество растёт из безопасного пространства, где можно пробовать, ошибаться и открывать. Здесь не нужно делать «правильно» с первого раза.",
            ],
            [
              "Техника растёт вместе с идеей",
              "Рисунок, композиция, цвет и материалы появляются тогда, когда помогают идее стать сильнее. Правила — инструмент, а не граница.",
            ],
            [
              "Голос подростка важен",
              "Здесь есть место для больших работ, идей портфолио и смелых тем. Их взгляд заслуживает времени, внимания и серьёзного разговора.",
            ],
          ]
        : [
            [
              "A child’s taste is not a mistake to correct",
              "An unusual colour choice, image or interest can be an important starting point. We help each person notice what genuinely holds their attention.",
            ],
            [
              "Remembering how to play and wonder",
              "Creativity grows in the safety to try, make mistakes and discover. There is no need to get it “right” on the first attempt.",
            ],
            [
              "Technique grows alongside the idea",
              "Drawing, composition, colour and materials come in when they help an idea become stronger. Rules are tools, not limits.",
            ],
            [
              "Young people’s voices are taken seriously",
              "There is room here for bigger works, portfolio ideas and bold themes. Their point of view deserves time, attention and a thoughtful conversation.",
            ],
          ];
  const youthMeta =
    lang === "lv"
      ? ["8–16 gadi", "mazas grupas", "materiāli uz vietas"]
      : lang === "ru"
        ? ["8–16 лет", "небольшие группы", "материалы в студии"]
        : ["ages 8–16", "small groups", "materials in the studio"];
  const eventHighlights =
    lang === "lv"
      ? [
          ["AKVARELIS", "2 stundas ar materiāliem"],
          ["AKRILA GLEZNOŠANA", "3 stundas ar materiāliem"],
          ["IEKĻAUTS", "2 stundas brīvam laikam studijā"],
          ["PAPILDU AKTIVITĀTES", "dekorācijas, karaoke, galda spēles, tattoo, pīrsings un citas trakas idejas"],
          ["ARĪ PIE JUMS", "izbraukuma formāts pēc vienošanās"],
        ]
      : lang === "ru"
        ? [
            ["АКВАРЕЛЬ", "2 часа со всеми материалами"],
            ["АКРИЛОВАЯ ЖИВОПИСЬ", "3 часа со всеми материалами"],
            ["ВКЛЮЧЕНО", "2 часа свободного времени в студии"],
            ["ДОПОЛНИТЕЛЬНО", "декор, караоке, игры, тату и пирсинг"],
            ["И У ВАС", "выездной формат по договорённости"],
          ]
        : [
            ["WATERCOLOUR", "2 hours with materials"],
            ["ACRYLIC PAINTING", "3 hours with materials"],
            ["INCLUDED", "2 hours of free time at the studio"],
            ["EXTRA ACTIVITIES", "decor, karaoke, games, tattoo and piercing"],
            ["AT YOUR PLACE", "a travelling format by arrangement"],
          ];
  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % statementSlides.length),
      6200,
    );
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    try {
      setSavedEmail(window.localStorage.getItem("inspire-booking-email") || "");
    } catch {}
  }, []);
  useEffect(() => {
    if (!form) return undefined;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [form]);
  useEffect(() => {
    const timer = window.setInterval(
      () => setStudioSlide((current) => (current + 1) % studioSlides.length),
      6800,
    );
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const timer = window.setInterval(
      () => setEventSlide((current) => (current + 1) % eventSlides.length),
      5200,
    );
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    setMoodQuote(0);
    const timer = window.setInterval(
      () => setMoodQuote((current) => (current + 1) % moodQuotes[lang].length),
      8200,
    );
    return () => window.clearInterval(timer);
  }, [lang]);
  useEffect(() => {
    let active = true;
    fetch(`/api/content?page=inspire&locale=${lang}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => {
        if (active && result?.content) setEditableContent(result.content);
      })
      .catch(() => {
        if (active) setEditableContent({});
      });
    return () => {
      active = false;
    };
  }, [lang]);
  useEffect(() => {
    let active = true;
    const refresh = () =>
      fetch("/api/catalog")
        .then((response) => (response.ok ? response.json() : null))
        .then((result) => {
          if (active && result) setAvailability(result);
        })
        .catch(() => {});
    refresh();
    const timer = window.setInterval(refresh, 20000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);
  const content = (id, fallback) =>
    typeof editableContent[id] === "string" ? editableContent[id] : fallback;
  const image = (id, fallback) => content(id, fallback);
  const checkoutDetail = (() => {
    const productIndex = [
      "trial",
      "group",
      "pass",
      "private",
      "rental",
      "membership",
      "treatment-room",
      "gift-card",
    ].indexOf(checkoutOption);
    return productIndex >= 0 && !["pass", "gift-card"].includes(checkoutOption)
      ? activeProducts[productIndex]?.[3]
      : "";
  })();
  const remaining = (id, fallback) => {
    const live = availability.classAvailability?.find((item) => item.id === id);
    return live ? (live.available ? 1 : 0) : fallback;
  };
  const privateIsAvailable = (id) =>
    !availability.privateAvailableIds ||
    availability.privateAvailableIds.includes(id);
  const livePrivateSlots = availability.privateSlots?.length
    ? availability.privateSlots
    : privateSlots;
  const liveClasses = availability.classSessions?.length
    ? availability.classSessions.map((item) => ({
        id: item.id,
        startsAt: item.starts_at,
        date: new Intl.DateTimeFormat(
          lang === "lv" ? "lv-LV" : lang === "ru" ? "ru-RU" : "en-GB",
          {
            timeZone: "Europe/Riga",
            weekday: "short",
            day: "numeric",
            month: "short",
          },
        ).format(new Date(item.starts_at)),
        title: item.title_en,
        titleLv: item.title_lv,
        time: new Intl.DateTimeFormat(
          lang === "ru" ? "ru-RU" : lang === "lv" ? "lv-LV" : "en-GB",
          {
            timeZone: "Europe/Riga",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          },
        ).format(new Date(item.starts_at)),
        price: item.price_cents / 100,
        seats: item.available ? 1 : 0,
        level: "",
      }))
    : classes;
  const labelSlot = (slot) =>
    slot.label ||
    new Intl.DateTimeFormat(
      lang === "lv" ? "lv-LV" : lang === "ru" ? "ru-RU" : "en-GB",
      {
        timeZone: "Europe/Riga",
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
    ).format(new Date(slot.starts_at));
  const availablePrivateSlots = livePrivateSlots.filter(
    (slot) => privateIsAvailable(slot.id) && slot.price_cents === 4500,
  );
  const availableRentalSlots = livePrivateSlots.filter(
    (slot) => privateIsAvailable(slot.id) && slot.price_cents === 1000,
  );
  const sessionName = (session) => {
    const title = lang === "lv"
      ? session.titleLv
      : lang === "ru"
        ? session.title?.includes("Youth")
          ? "Группа живописи для детей и подростков"
          : session.title?.includes("Adult")
            ? "Группа живописи для взрослых"
            : "Смешанная группа живописи"
        : session.title;
    return title?.replace(/\s*\((?:ages?\s*)?8[–-]16(?:\s*(?:gadi|years))?\)/gi, "") || "";
  };
  const dateKeyInRiga = (dateValue) => {
    if (!dateValue) return "";
    const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Riga", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(dateValue));
    const value = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
    return `${value.year}-${value.month}-${value.day}`;
  };
  const dayInRiga = (dateValue) => new Date(`${dateKeyInRiga(dateValue)}T12:00:00Z`).getUTCDay();
  const weekKey = (dateValue) => {
    const key = dateKeyInRiga(dateValue);
    if (!key) return "";
    const date = new Date(`${key}T12:00:00Z`);
    date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
    return date.toISOString().slice(0, 10);
  };
  const scheduleWeeks = [...new Set(liveClasses.map((item) => weekKey(item.startsAt)).filter(Boolean))];
  const visibleWeek = scheduleWeeks[Math.min(scheduleWeek, Math.max(0, scheduleWeeks.length - 1))];
  const locale = lang === "lv" ? "lv-LV" : lang === "ru" ? "ru-RU" : "en-GB";
  const weekDays = visibleWeek
    ? Array.from({ length: 7 }, (_, index) => {
        const date = new Date(`${visibleWeek}T12:00:00Z`);
        date.setUTCDate(date.getUTCDate() + index);
        const hasClass = liveClasses.some(
          (item) => weekKey(item.startsAt) === visibleWeek && dayInRiga(item.startsAt) === date.getUTCDay(),
        );
        return {
          key: date.toISOString().slice(0, 10),
          label: new Intl.DateTimeFormat(locale, { weekday: "narrow", timeZone: "UTC" }).format(date),
          fullLabel: new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: "UTC" }).format(date),
          date: new Intl.DateTimeFormat(locale, { day: "numeric", timeZone: "UTC" }).format(date),
          hasClass,
        };
      })
    : [];
  const sameCalendarDay = (dateValue, dateKey) =>
    Boolean(dateValue && dateKey) && dateKeyInRiga(dateValue) === dateKey;
  const bookingClasses = bookingDay
    ? liveClasses.filter((item) => sameCalendarDay(item.startsAt, bookingDay))
    : liveClasses;
  const weeklyColumns = visibleWeek ? [4, 6, 0].map((day) => {
    const date = new Date(`${visibleWeek}T12:00:00Z`);
    date.setUTCDate(date.getUTCDate() + ((day + 6) % 7));
    return {
      key: date.toISOString().slice(0, 10),
      date,
      sessions: liveClasses.filter(
        (item) =>
          weekKey(item.startsAt) === visibleWeek && dayInRiga(item.startsAt) === day,
      ),
    };
  }) : [];
  const weeklyDayLabel = (session) =>
    new Intl.DateTimeFormat(locale, {
      timeZone: "Europe/Riga",
      weekday: "long",
      day: "numeric",
      month: "short",
    }).format(new Date(session.startsAt));
  const changeScheduleWeek = (direction) => {
    const nextWeek = Math.max(0, Math.min(scheduleWeeks.length - 1, scheduleWeek + direction));
    if (nextWeek === scheduleWeek) return;
    setScheduleWeek(nextWeek);
    if (form && calendarKind === "class") {
      const nextSession = liveClasses.find((item) => weekKey(item.startsAt) === scheduleWeeks[nextWeek]);
      setBookingDay(nextSession ? dateKeyInRiga(nextSession.startsAt) : "");
      setBooking(null);
      setSelection("");
    }
  };
  const openBooking = (kind, itemId, label) => {
    const selectedSession = kind === "class" ? liveClasses.find((item) => item.id === itemId) : null;
    if (selectedSession) {
      const week = scheduleWeeks.indexOf(weekKey(selectedSession.startsAt));
      if (week >= 0) setScheduleWeek(week);
      setBookingDay(dateKeyInRiga(selectedSession.startsAt));
    } else setBookingDay("");
    setBooking({ kind, itemId, label });
    setSelection(`${kind}:${itemId}`);
    setCalendarKind(kind);
    setCheckoutOption("");
    setStatus("");
    setSent(false);
    setConfirmationEmailSent(false);
    setForm(true);
  };
  const openCalendar = (kind, option) => {
    setBooking(null);
    setSelection("");
    setCalendarKind(kind);
    setCheckoutOption(option);
    setBookingDay(kind === "class" ? weekDays.find((day) => day.hasClass)?.key || "" : "");
    setStatus("");
    setSent(false);
    setConfirmationEmailSent(false);
    setForm(true);
  };
  const openGiftCard = (initialClasses = 2) => {
    setBooking({ kind: "gift" });
    setSelection("");
    setCalendarKind("gift");
    setCheckoutOption("gift");
    setGiftClasses(initialClasses);
    setBookingDay("");
    setStatus("");
    setSent(false);
    setConfirmationEmailSent(false);
    setForm(true);
  };
  const openClassPass = () => {
    setBooking({ kind: "pass" });
    setSelection("");
    setCalendarKind("pass");
    setCheckoutOption("pass");
    setGiftClasses(4);
    setBookingDay("");
    setStatus("");
    setSent(false);
    setConfirmationEmailSent(false);
    setForm(true);
  };
  const submit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter?.value || "reserve";
    const data = new FormData(e.currentTarget);
    const customerName = [data.get("firstName"), data.get("surname")]
      .map((value) => String(value || "").trim())
      .filter(Boolean)
      .join(" ");
    const customerEmail = String(data.get("email") || "").trim().toLowerCase();
    try {
      window.localStorage.setItem("inspire-booking-email", customerEmail);
      setSavedEmail(customerEmail);
    } catch {}
    if (!booking) return;
    if (action === "reserve") {
      setStatus(
        lang === "lv" ? "Rezervējam vietu…" : lang === "ru" ? "Бронируем место…" : "Reserving your place…",
      );
      try {
        const response = await fetch("/api/reservations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind: booking.kind, itemId: booking.itemId, name: customerName, email: customerEmail, label: booking.label }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Could not reserve this place.");
        setConfirmationEmailSent(Boolean(result.confirmationSent));
        setSent(true);
      } catch (error) {
        setStatus(error.message);
      }
      return;
    }
    setStatus(
      lang === "lv"
        ? "Atver drošo apmaksu…"
        : lang === "ru"
          ? "Открываем безопасную оплату…"
          : "Opening secure checkout…",
    );
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: booking.kind,
          itemId: booking.kind === "class" ? booking.itemId : undefined,
          privateSlot: booking.kind === "private" ? booking.itemId : undefined,
          purchase: checkoutOption,
          giftClasses:
            booking.kind === "gift" || booking.kind === "pass"
              ? giftClasses
              : undefined,
          name: customerName,
          email: customerEmail,
        }),
      });
      const result = await response.json();
      if (result.url) window.location.href = result.url;
      else setStatus(result.error || "Checkout is not available yet.");
    } catch {
      setStatus("Checkout could not be reached. Please try again.");
    }
  };
  return (
    <main className={`inspire inspire-page-${page}`} lang={lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Art Studio Inspire",
            description:
              "Artist-led painting classes, workshops and creative events in Riga.",
            url: "https://artinspire.lv",
            sameAs: ["https://www.instagram.com/artstudio.inspire"],
            priceRange: "€15–€200+",
            availableLanguage: ["lv", "en", "ru"],
            address: {
              "@type": "PostalAddress",
              streetAddress: "Miera iela 17",
              addressLocality: "Riga",
              addressCountry: "LV",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 56.9623004,
              longitude: 24.1281928,
            },
            areaServed: "Riga",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Art Studio Inspire classes",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Painting classes in Riga",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Private painting sessions",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Creative workshops and private events",
                  },
                },
              ],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.items.map(([name, text]) => ({
              "@type": "Question",
              name,
              acceptedAnswer: { "@type": "Answer", text },
            })),
          }),
        }}
      />
      <section className="inspire-masthead">
        <img
          className="inspire-masthead-art"
          src="/art/inspire-masthead-artwork.webp"
          alt=""
          aria-hidden="true"
        />
        <a className="inspire-masthead-brand" href="/" aria-label="Art Studio Inspire sākumlapa">
          <img
            src="/art/inspire-logo-white-clean.webp"
            alt="Art Studio Inspire"
          />
        </a>
        <div className="inspire-masthead-copy">
          <p>{t.sub}</p>
          <span>
            {t.hero} {t.hero2} {t.hero3}
          </span>
          <div className="inspire-language inspire-masthead-language" aria-label="Language">
            <button className={lang === "lv" ? "active" : ""} onClick={() => setLang("lv")}>LV</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "ru" ? "active" : ""} onClick={() => setLang("ru")}>RU</button>
          </div>
        </div>
      </section>
      <nav className="inspire-icon-nav" aria-label="Inspire sections">
        <a href="/classes">
          <img src="/art/inspire-icon-calendar.png" alt="" />
          <span>{t.apply}</span>
        </a>
        <a href="/about">
          <img src="/art/inspire-icon-easel.png" alt="" />
          <span>{lang === "lv" ? "PAR STUDIJU" : lang === "ru" ? "О СТУДИИ" : "ABOUT THE STUDIO"}</span>
        </a>
        <a href="/contact">
          <img src="/art/inspire-icon-pin.png" alt="" />
          <span>{lang === "lv" ? "KONTAKTI" : lang === "ru" ? "КОНТАКТЫ" : "CONTACT"}</span>
        </a>
        <a href="/about#studentu-darbi">
          <img src="/art/inspire-icon-palette.png" alt="" />
          <span>
            {lang === "lv"
              ? "STUDENTU DARBI"
              : lang === "ru"
                ? "РАБОТЫ УЧЕНИКОВ"
                : "STUDENT WORK"}
          </span>
        </a>
        <a href="/events">
          <img
            className="inspire-gift-icon"
            src="/art/inspire-icon-gift.png"
            alt=""
          />
          <span>
            {lang === "lv"
              ? "PRIVĀTIE PASĀKUMI"
              : lang === "ru"
                ? "ПРАЗДНИКИ"
                : "PRIVATE EVENTS"}
          </span>
        </a>
        <a href="/contact#biezakie-jautajumi">
          <span>{lang === "lv" ? "JAUTĀJUMI" : lang === "ru" ? "ВОПРОСЫ" : "FAQ"}</span>
        </a>
      </nav>
      <section className="inspire-statement">
        <div className="inspire-statement-copy">
          <h2>
            {content("inspire.statement.title.v2", t.statement)
              .split("\n")
              .map((line, index) => (
                <span key={`${line}-${index}`}>{line}</span>
              ))}
          </h2>
          <div>
            {t.statementBody.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          <blockquote>
            {content("inspire.statement.quote.v2", t.statementQuote)}
          </blockquote>
        </div>
        <div
          className="inspire-statement-slideshow"
          aria-label="Art Studio Inspire gallery"
        >
          {statementSlides.map(([src, alt], index) => (
            <img
              className={index === slide ? "active" : ""}
              key={src}
              src={image(`inspire.image.statement.${index}`, src)}
              alt={alt}
            />
          ))}
        </div>
      </section>
      <section className="inspire-mood-strip" aria-live="polite">
        <p key={`${lang}-${moodQuote}`}>{moodQuotes[lang][moodQuote]}</p>
      </section>
      <section id="nodarbibas" className="inspire-section">
        <p className="inspire-kicker">{t.regular}</p>
        <div className="inspire-schedule-heading">
          <h2>{t.group}</h2>
          {scheduleWeeks.length > 0 && <div className="inspire-week-switcher" aria-label={lang === "lv" ? "Nedēļas grafiks" : lang === "ru" ? "Расписание недели" : "Weekly schedule"}>
            <button type="button" aria-label={lang === "lv" ? "Iepriekšējā nedēļa" : lang === "ru" ? "Предыдущая неделя" : "Previous week"} onClick={() => changeScheduleWeek(-1)} disabled={scheduleWeek === 0}>‹</button>
            <div className="inspire-week-strip" aria-label={new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(new Date(`${visibleWeek}T12:00:00`))}>
              {weekDays.map((day) => <span key={day.key} aria-label={`${day.fullLabel} ${day.date}`} className={day.hasClass ? "available" : ""}><small>{day.label}</small><b>{day.date}</b></span>)}
            </div>
            <button type="button" aria-label={lang === "lv" ? "Nākamā nedēļa" : lang === "ru" ? "Следующая неделя" : "Next week"} onClick={() => changeScheduleWeek(1)} disabled={scheduleWeek >= scheduleWeeks.length - 1}>›</button>
          </div>}
        </div>
        <div className="inspire-weekly-columns">
          {weeklyColumns.map((column) => (
            <div key={column.key}>
              <h3>{weeklyDayLabel({ startsAt: column.date.toISOString() })}</h3>
              {column.sessions.length ? column.sessions.map((session) => {
                const seats = remaining(session.id, session.seats);
                return (
                <button
                  key={session.id}
                  disabled={seats < 1}
                  onClick={() => openBooking("class", session.id, `${session.date} · ${session.time} · ${sessionName(session)}`)}
                >
                  <b>{session.time}</b>
                  <small>{sessionName(session)}</small>
                  <i>{seats < 1 ? (lang === "lv" ? "PILNS" : lang === "ru" ? "НЕТ МЕСТ" : "FULL") : `${t.reserve} →`}</i>
                </button>
                );
              }) : <span className="inspire-empty-session" aria-label={lang === "lv" ? "Šajā dienā nodarbība nenotiek" : lang === "ru" ? "В этот день занятия нет" : "No class on this day"}>—</span>}
            </div>
          ))}
        </div>
        <p className="inspire-prices">{t.price}</p>
      </section>
      <section className="inspire-section inspire-booking">
        <h2>{t.format}</h2>
        <div className="inspire-products">
          {activeProducts.map(([name, meta, price, description], index) => {
            const option = [
              "trial",
              "group",
              "pass",
              "private",
              "rental",
              "membership",
              "treatment-room",
              "gift-card",
            ][index];
            const calendarKind =
              option === "rental"
                ? "rental"
                : option === "private"
                  ? "private"
                  : "class";
            const hasNoSlots =
              option === "rental"
                ? !availableRentalSlots.length
                : option === "private" && !availablePrivateSlots.length;
            const personal =
              option === "membership" || option === "treatment-room";
            const directPurchase = option === "pass" || option === "gift-card";
            const contactLabel =
              option === "membership"
                ? lang === "lv"
                  ? "APRUNĀSIM DALĪBU →"
                  : lang === "ru"
                    ? "ОБСУДИТЬ ЧЛЕНСТВО →"
                    : "DISCUSS MEMBERSHIP →"
                : lang === "lv"
                  ? "UZRAKSTĪT PAR TELPU →"
                  : lang === "ru"
                    ? "НАПИСАТЬ О КОМНАТЕ →"
                    : "ASK ABOUT THE ROOM →";
            const subject = option === "membership"
              ? lang === "lv" ? "Studijas dalība" : lang === "ru" ? "Членство в студии" : "Studio membership"
              : lang === "lv" ? "Privātas tattoo telpas noma" : lang === "ru" ? "Аренда частной тату-комнаты" : "Private tattoo room rental";
            return (
              <article key={name}>
                <p>{meta}</p>
                <h3>{name}</h3>
                {price ? <b>{price}</b> : null}
                <span>{productSummaries[lang]?.[index] || description}</span>
                {personal ? (
                  <a
                    className="inspire-rent-contact"
                    href={`mailto:misscoookiez@gmail.com?subject=${encodeURIComponent(subject)}`}
                  >
                    {contactLabel}
                  </a>
                ) : directPurchase ? (
                  <button
                    onClick={option === "pass" ? openClassPass : openGiftCard}
                  >
                    {option === "pass"
                      ? lang === "lv"
                        ? "NOPIRKT ABONEMENTU"
                        : lang === "ru"
                          ? "КУПИТЬ АБОНЕМЕНТ"
                          : "BUY THE PASS"
                      : lang === "lv"
                        ? "PIRKT DĀVANU KARTI"
                        : lang === "ru"
                          ? "КУПИТЬ ПОДАРОЧНУЮ КАРТУ"
                          : "BUY A GIFT CARD"}
                  </button>
                ) : (
                  <button
                    disabled={hasNoSlots}
                    onClick={() => openCalendar(calendarKind, option)}
                  >
                    {hasNoSlots
                      ? lang === "lv"
                        ? "NAV PIEEJAMU LAIKU"
                        : lang === "ru"
                          ? "НЕТ СВОБОДНОГО ВРЕМЕНИ"
                          : "NO TIMES AVAILABLE"
                      : t.book}
                  </button>
                )}
              </article>
            );
          })}
        </div>
        <div className="inspire-space-details">
          <details>
            <summary>
              {host.details}
              <b>+</b>
            </summary>
            <div>
              <p>{content("inspire.host.space", host.studio)}</p>
              <p>{host.hire}</p>
              <div className="inspire-space-preview" aria-label={host.details}>
                {studioPreviewImages.map(([src, alt]) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`${alt}. Skatīt lielākā izmērā`}
                    onClick={() => setImagePreview({ src, alt })}
                  >
                    <img src={src} alt={alt} />
                  </button>
                ))}
              </div>
            </div>
          </details>
          <details>
            <summary>
              {host.tattooTitle}
              <b>+</b>
            </summary>
            <div>
              <p>{content("inspire.host.tattoo", host.tattoo)}</p>
              <div
                className="inspire-space-preview inspire-tattoo-preview"
                aria-label={host.tattooTitle}
              >
                {tattooPreviewImages.map(([src, alt]) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`${alt}. Skatīt lielākā izmērā`}
                    onClick={() => setImagePreview({ src, alt })}
                  >
                    <img src={src} alt={alt} />
                  </button>
                ))}
              </div>
              <a href="mailto:misscoookiez@gmail.com?subject=Private%20tattoo%20room%20rental">
                {lang === "lv"
                  ? "UZRAKSTĪT PAR TELPU →"
                  : lang === "ru"
                    ? "НАПИСАТЬ О КОМНАТЕ →"
                    : "ASK ABOUT THE ROOM →"}
              </a>
            </div>
          </details>
        </div>
        <p className="inspire-cancellation">
          {lang === "lv"
            ? "PIETEIKUMIEM APMAKSA NETIEK PRASĪTA UZREIZ. Apmaksāta rezervācija jāatceļ vai jāpārceļ vismaz 24 stundas pirms nodarbības; līdz tam — bezmaksas atcelšana un automātiska atmaksa."
            : lang === "ru"
              ? "ДЛЯ ЗАЯВОК ПРЕДОПЛАТА НЕ НУЖНА. Оплаченную бронь нужно отменить или перенести не позднее чем за 24 часа до занятия; до этого возможны бесплатная отмена и автоматический возврат."
              : "APPLICATIONS DO NOT REQUIRE PAYMENT UPFRONT. A paid booking must be cancelled or rescheduled at least 24 hours before the class; until then, cancellation is free and the refund is automatic."}
        </p>
      </section>
      <section className="inspire-capabilities">
        <div>
          <p className="inspire-kicker">
            {lang === "lv" ? "PAR STUDIJU" : lang === "ru" ? "О СТУДИИ" : "ABOUT THE STUDIO"}
          </p>
          <h2>{capabilities.title}</h2>
          <p>{capabilities.lead}</p>
        </div>
        <div className="inspire-capability-grid">
          {capabilities.items.map(([title, body], index) => (
            <article key={title}>
              <b>{title}</b>
              <p>
                {content(
                  [
                    "inspire.practical.materials",
                    "inspire.practical.foundation",
                    "inspire.practical.freedom",
                    "inspire.practical.ambition",
                  ][index],
                  body,
                )}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="inspire-depth">
        <details className="inspire-depth-panel" open>
          <summary>
            <span>01</span>
            <strong>
              {lang === "lv"
                ? "KAS VADA STUDIJU"
                : lang === "ru"
                  ? "КТО ВЕДЁТ СТУДИЮ"
                  : "WHO RUNS THE STUDIO"}
            </strong>
            <b>+</b>
          </summary>
          <section id="par-sandru" className="inspire-host">
            <div className="inspire-host-copy">
              <p className="inspire-kicker">{host.kicker}</p>
              <h2>
                {host.title}
                <br />
                <em>{content("inspire.host.role", host.role)}</em>
              </h2>
              <div className="inspire-host-bio">
                {content("inspire.host.bio", artistBio)
                  .split(/\n\s*\n/)
                  .map((paragraph, index) => (
                    <p key={`${index}-${paragraph.slice(0, 16)}`}>{paragraph}</p>
                  ))}
              </div>
            </div>
            <div className="inspire-host-visuals">
              <div className="inspire-host-gallery">
                <img
                  className="inspire-host-portrait"
                  src={image(
                    "inspire.image.host.0",
                    "/art/sandra-profile-lead.webp",
                  )}
                  alt="Sandra Rudzīte in her painting studio"
                />
                <img
                  src={image(
                    "inspire.image.host.1",
                    "/art/sandra-studio-tea-upright.webp",
                  )}
                  alt="Sandra Rudzīte enjoying tea in her sunlit studio"
                />
                <img
                  src={image(
                    "inspire.image.host.2",
                    "/art/sandra-studio-07.webp",
                  )}
                  alt="Sandra Rudzīte painting a dramatic studio work"
                />
              </div>
            </div>
          </section>
          <div className="inspire-wide-artworks">
            <details className="inspire-host-artworks">
              <summary>
                {lang === "lv"
                  ? "SKATĪT SANDRAS DARBUS"
                  : lang === "ru"
                    ? "СМОТРЕТЬ РАБОТЫ САНДРЫ"
                    : "VIEW SANDRA’S ARTWORK"}
                <b>+</b>
              </summary>
              <div>
                <img
                  src="/art/sandra-art-red-eyes.webp"
                  alt="Red Eyes, original painting by Sandra Rudzīte"
                />
                <img
                  src="/art/sandra-art-eye.webp"
                  alt="Eye, original painting by Sandra Rudzīte"
                />
                <img
                  src="/art/sandra-art-raven.webp"
                  alt="Raven, original painting by Sandra Rudzīte"
                />
                <img
                  src="/art/sandra-art-drips.webp"
                  alt="Abstract painting with layered drips by Sandra Rudzīte"
                />
                <img
                  src="/art/sandra-art-sea.webp"
                  alt="Dreamy seascape painting by Sandra Rudzīte"
                />
                <img
                  src="/art/sandra-art-lakeside.webp"
                  alt="Lakeside landscape painting by Sandra Rudzīte"
                />
                <img
                  src="/art/sandra-art-canal.webp"
                  alt="Canal landscape painting by Sandra Rudzīte"
                />
                <img
                  src="/art/sandra-art-raven-drawing.webp"
                  alt="Raven drawing by Sandra Rudzīte"
                />
              </div>
            </details>
          </div>
        </details>
        <details className="inspire-depth-panel">
          <summary>
            <span>02</span>
            <strong>
              {lang === "lv"
                ? "PIEEJA PIEAUGUŠAJIEM"
                : lang === "ru"
                  ? "ПОДХОД ДЛЯ ВЗРОСЛЫХ"
                  : "OUR APPROACH FOR ADULTS"}
            </strong>
            <b>+</b>
          </summary>
          <section id="studija" className="inspire-proof">
            <div>
              <p className="inspire-kicker">{approach.more}</p>
              <h2>{content("inspire.adults.heading", approach.heading)}</h2>
              <p>{content("inspire.adults.lead", approach.moreLead)}</p>
              {approach.quote ? (
                <blockquote>
                  {content("inspire.adults.quote", approach.quote)}
                </blockquote>
              ) : null}
              <img
                className="inspire-adult-palette"
                src="/art/inspire-palette-atmosphere.webp"
                alt=""
                aria-hidden="true"
              />
            </div>
            <div className="inspire-proof-list">
              {approach.items.map(([title, body], index) => (
                <details key={title} open={index === 0}>
                  <summary>
                    <strong>{title}</strong>
                    <b>+</b>
                  </summary>
                  <p>{body}</p>
                </details>
              ))}
            </div>
          </section>
        </details>
        <details className="inspire-depth-panel">
          <summary>
            <span>03</span>
            <strong>
              {lang === "lv"
                ? "PIEEJA BĒRNIEM UN JAUNIEŠIEM"
                : lang === "ru"
                  ? "ПОДХОД К ДЕТЯМ И ПОДРОСТКАМ"
                  : "OUR APPROACH FOR CHILDREN & YOUTH"}
            </strong>
            <b>+</b>
          </summary>
          <section id="studentu-darbi" className="inspire-proof inspire-youth-proof">
            <div>
              <p className="inspire-kicker">
                {lang === "lv"
                  ? "KĀ MĒS STRĀDĀJAM"
                  : lang === "ru"
                    ? "КАК МЫ РАБОТАЕМ"
                    : "HOW WE WORK"}
              </p>
              <h2>
                {t.youthTitle.split("\n").map((line, index) => (
                  <span key={line}>
                    {index === 0 ? content("inspire.youth.title", line) : line}
                    {index === 0 && <br />}
                  </span>
                ))}
                <br />
                <em>{content("inspire.youth.emphasis", t.youthEm)}</em>
              </h2>
              <div className="inspire-youth-visual" aria-hidden="true">
                <img src="/art/inspire-visual-elements.webp" alt="" />
              </div>
              <p>{content("inspire.youth.body", t.youthBody)}</p>
            </div>
            <div className="inspire-proof-list">
              {youthPrinciples.map(([title, body], index) => (
                <details key={title} open={index === 0}>
                  <summary>
                    <strong>{title}</strong>
                    <b>+</b>
                  </summary>
                  <p>{body}</p>
                </details>
              ))}
            </div>
          </section>
        </details>
      </section>
      <section className="inspire-student-galleries">
        <div className="inspire-student-galleries-intro">
          <p className="inspire-kicker">
            {lang === "lv"
              ? "STUDENTU DARBI UN PROCESS"
              : lang === "ru"
                ? "РАБОТЫ УЧЕНИКОВ И ПРОЦЕСС"
                : "STUDENT WORK & PROCESS"}
          </p>
          <h2>
            {lang === "lv"
              ? "Idejas, kas kļuvušas par darbiem."
              : lang === "ru"
                ? "Идеи, ставшие работами."
                : "Ideas made into work."}
          </h2>
        </div>
        <details>
          <summary>
            {lang === "lv"
              ? "SKATĪT PIEAUGUŠO UN JAUNIEŠU DARBUS"
              : lang === "ru"
                ? "ПОСМОТРЕТЬ РАБОТЫ ВЗРОСЛЫХ И ПОДРОСТКОВ"
                : "VIEW ADULT & YOUTH WORK"}
            <b>+</b>
          </summary>
          <div>
            {[
              ...statementSlides.slice(0, 4),
              [
                "/art/student-process-adult.webp",
                "Pieaugušā studenta gleznošanas process Art Studio Inspire",
              ],
            ].map(([src, alt]) => (
              <div
                key={src}
                className="inspire-student-gallery-item"
              >
                <img src={src} alt={alt} />
              </div>
            ))}
          </div>
        </details>
        <details>
          <summary>
            {lang === "lv"
              ? "SKATĪT BĒRNU DARBUS"
              : lang === "ru"
                ? "ПОСМОТРЕТЬ ДЕТСКИЕ РАБОТЫ"
                : "VIEW CHILDREN’S WORK"}
            <b>+</b>
          </summary>
          <div>
            {youthGallerySlides.map(([src, alt]) => (
              <div
                key={src}
                className="inspire-student-gallery-item"
              >
                <img src={src} alt={alt} />
              </div>
            ))}
          </div>
        </details>
        {page === "about" && (
          <a className="inspire-about-classes-cta" href="/classes">
            {lang === "lv" ? "SKATĪT NODARBĪBAS →" : lang === "ru" ? "ПОСМОТРЕТЬ ЗАНЯТИЯ →" : "VIEW CLASSES →"}
          </a>
        )}
      </section>
      <section id="pasakumi" className="inspire-events">
        <div className="inspire-events-top">
          <div className="inspire-events-intro">
            <p className="inspire-kicker">{t.events}</p>
            <h2>{content("inspire.events.title", t.eventTitle)}</h2>
            <p>{content("inspire.events.lead", events.lead)}</p>
          </div>
          <div
            className="inspire-event-gallery inspire-event-slideshow"
            aria-label="Private events at Art Studio Inspire"
          >
            {eventSlides.map(([src, alt], index) => (
              <button
                key={src}
                type="button"
                className={index === eventSlide ? "active" : ""}
                aria-label={`${alt}. Skatīt lielākā izmērā`}
                onClick={() =>
                  setImagePreview({
                    src: image(`inspire.image.event.${index}`, src),
                    alt,
                  })
                }
              >
                <img
                  src={image(`inspire.image.event.${index}`, src)}
                  alt={alt}
                />
              </button>
            ))}
            <div className="inspire-event-slide-controls" aria-label="Pasākumu foto">
              {eventSlides.map(([, alt], index) => (
                <button
                  key={alt}
                  type="button"
                  className={index === eventSlide ? "active" : ""}
                  aria-label={`Rādīt foto ${index + 1}`}
                  onClick={() => setEventSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="inspire-event-rates">
          {events.rates.map(([title, price, meta]) => (
            <article key={title}>
              <p>{title}</p>
              <b>{price}</b>
              {meta ? <span>{meta}</span> : null}
            </article>
          ))}
        </div>
        <ul className="inspire-event-highlights">
          {eventHighlights.map(([label, value]) => (
            <li key={label}>
              <b>{label}</b>
              <span>{value}</span>
            </li>
          ))}
        </ul>
        {events.formatsLabel ? (
          <p className="inspire-event-formats-label">{events.formatsLabel}</p>
        ) : null}
        <div className="inspire-event-grid">
          {events.formats.map(([title, body]) => (
            <details key={title}>
              <summary>
                <h3>{title}</h3>
                <b>+</b>
              </summary>
              <p>{body}</p>
            </details>
          ))}
        </div>
        {events.custom ? (
          <div className="inspire-event-custom">
            <p>{events.custom[0]}</p>
            <span>{events.custom[1]}</span>
          </div>
        ) : null}
        <p className="inspire-event-support">{host.event}</p>
        <a
          className="inspire-event-primary-cta"
          href={`mailto:misscoookiez@gmail.com?subject=${encodeURIComponent(events.emailSubject)}`}
        >
          {events.cta}
        </a>
        <div className="inspire-event-faq-inline">
          <details>
            <summary>
              {events.faqTitle}
              <span className="inspire-event-faq-action" aria-hidden="true">
                <span>
                  {lang === "lv"
                    ? "ATVĒRT"
                    : lang === "ru"
                      ? "ОТКРЫТЬ"
                      : "OPEN"}
                </span>
                <span>
                  {lang === "lv"
                    ? "AIZVĒRT"
                    : lang === "ru"
                      ? "ЗАКРЫТЬ"
                      : "CLOSE"}
                </span>
              </span>
              <b>+</b>
            </summary>
            <div>
              {events.faq.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <b>+</b>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </details>
        </div>
      </section>{" "}
      <section className="inspire-contact-panel" aria-labelledby="inspire-contact-title">
        <p className="inspire-kicker">{lang === "lv" ? "KONTAKTI" : lang === "ru" ? "КОНТАКТЫ" : "CONTACT"}</p>
        <h2 id="inspire-contact-title">{lang === "lv" ? "Satiekamies Miera ielā." : lang === "ru" ? "Встретимся на улице Миера." : "Meet us on Miera iela."}</h2>
        <p>{t.address}</p>
        <div>
          <a href="mailto:misscoookiez@gmail.com">misscoookiez@gmail.com</a>
          <a href="https://wa.me/37128809550" target="_blank" rel="noreferrer">WhatsApp +371 28809550</a>
          <a href="https://www.instagram.com/artstudio.inspire" target="_blank" rel="noreferrer">@artstudio.inspire</a>
        </div>
      </section>
      <section id="kontakti" className="inspire-directions">
        <div className="inspire-directions-copy">
          <p className="inspire-kicker">{t.find}</p>
          <h2>{t.find}</h2>
          <p className="inspire-address-lead">{t.address}</p>
          <p>{t.directions}</p>
          <p>
            {lang === "lv" ? (
              <>
                Parkings: uz ielas, C zona līdz 20:00.
                <br />
                Svētdienās: bezmaksas.
                <br />
                <br />
                Ja brauc ar sabiedrisko transportu:
                <br />
                11. tramvajs: pietura Laima
                <br />
                Vai jebkurš transports, kas brauc pa Brīvības ielu: pietura
                Matīsa iela
              </>
            ) : lang === "ru" ? (
              <>
                Парковка: на улице, зона C до 20:00.
                <br />
                По воскресеньям: бесплатно.
                <br />
                <br />
                Общественный транспорт:
                <br />
                11-й трамвай: остановка Laima
                <br />
                Или транспорт по улице Brīvības: остановка Matīsa iela
              </>
            ) : (
              <>
                Parking: on the street, C zone until 20:00.
                <br />
                Sundays: free.
                <br />
                <br />
                Public transport:
                <br />
                Tram 11: Laima stop
                <br />
                Or services along Brīvības iela: Matīsa iela stop
              </>
            )}
          </p>
          <span className="inspire-directions-rule" />
          <p className="inspire-contact-label">
            {lang === "lv"
              ? "Saziņai izmanto sev ērtu veidu:"
              : lang === "ru"
                ? "Выберите удобный способ связи:"
                : "Choose the contact method that suits you:"}
          </p>
          <div className="inspire-contact-buttons">
            <a
              href="https://www.instagram.com/artstudio.inspire"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/37128809550"
              target="_blank"
              rel="noreferrer"
            >
              Whatsapp
            </a>
            <a href="mailto:misscoookiez@gmail.com">E-mail</a>
          </div>
        </div>
        <figure>
          <img
            src={image(
              "inspire.image.directions",
              "/art/inspire-door-directions.webp",
            )}
            alt="The entrance door to Art Studio Inspire"
          />
          <figcaption>
            {lang === "lv"
              ? "Sekojiet bultiņai līdz studijas durvīm."
              : "Follow the arrow to the studio door."}
          </figcaption>
        </figure>
        <iframe
          title="Map to Art Studio Inspire"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2175.2120325500114!2d24.128192791942578!3d56.96230038731691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eecfccbd837589%3A0x4c4607ad637d0f9f!2sAvanti%20celojumi!5e0!3m2!1sen!2slv!4v1788360123943!5m2!1sen!2slv"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
      <InspireLocalGuide lang={lang} />
      <section id="biezakie-jautajumi" className="inspire-faq" tabIndex={-1}>
        <div>
          {faq.title && <p className="inspire-kicker">{faq.title}</p>}
          <h2>{faq.lead}</h2>
          <p>Art Studio Inspire · Miera iela 17 · Rīga</p>
        </div>
        <div className="inspire-faq-list">
          {faq.items.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <b>+</b>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <InspireFooter lang={lang} />
      {imagePreview && (
        <div
          className="inspire-image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={imagePreview.alt}
          onClick={() => setImagePreview(null)}
        >
          <div
            className="inspire-image-lightbox-frame"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="inspire-image-lightbox-close"
              type="button"
              onClick={() => setImagePreview(null)}
              aria-label="Aizvērt attēlu"
            >
              ×
            </button>
            <img src={imagePreview.src} alt={imagePreview.alt} />
          </div>
        </div>
      )}
      {form && (
        <div className="inspire-modal" role="dialog" aria-modal="true" aria-labelledby="inspire-booking-modal-title">
          <form onSubmit={submit}>
            <button
              type="button"
              className="inspire-x"
              onClick={() => setForm(false)}
              aria-label={lang === "lv" ? "Aizvērt pieteikšanos" : lang === "ru" ? "Закрыть бронирование" : "Close booking"}
            >
              ×
            </button>
            {sent ? (
              <>
                <h2 id="inspire-booking-modal-title">{t.thanks}</h2>
                <p>
                  {lang === "lv"
                      ? "Vieta ir rezervēta. Drīzumā sazināsimies ar praktisko informāciju."
                      : lang === "ru"
                        ? "Место забронировано. Скоро свяжемся с практической информацией."
                        : "Your place is reserved. We will be in touch shortly with the practical details."}
                </p>
                {confirmationEmailSent ? <p className="inspire-confirmation-email">{lang === "lv" ? "Uz e-pastu nosūtījām apstiprinājumu ar kalendāra un rezervācijas pārvaldības saiti." : lang === "ru" ? "Мы отправили на эл. почту подтверждение со ссылками на календарь и управление бронированием." : "We have emailed your confirmation, calendar link and booking-management link."}</p> : null}
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setForm(false);
                  }}
                >
                  {t.close}
                </button>
              </>
            ) : (
              <>
                <>
                    <p className="inspire-kicker">
                      {calendarKind === "gift" || calendarKind === "pass"
                        ? lang === "lv"
                          ? calendarKind === "pass"
                            ? "IEGĀDĀTIES ABONEMENTU"
                            : "IEGĀDĀTIES DĀVANU KARTI"
                          : lang === "ru"
                            ? calendarKind === "pass"
                              ? "КУПИТЬ АБОНЕМЕНТ"
                              : "КУПИТЬ ПОДАРОЧНУЮ КАРТУ"
                            : calendarKind === "pass"
                              ? "BUY A CLASS PASS"
                              : "BUY A GIFT CARD"
                        : t.booking}
                    </p>
                    <h2 id="inspire-booking-modal-title">
                      {calendarKind === "gift"
                        ? lang === "lv"
                          ? "Dāvanu karte"
                          : lang === "ru"
                            ? "Подарочная карта"
                            : "Gift card"
                        : calendarKind === "pass"
                          ? lang === "lv"
                            ? "Nodarbību abonements"
                            : lang === "ru"
                              ? "Абонемент на занятия"
                              : "Class pass"
                          : t.bookingTitle}
                    </h2>
                    {checkoutDetail ? (
                      <p className="inspire-modal-format-detail">
                        {checkoutDetail}
                      </p>
                    ) : null}
                    {calendarKind === "gift" || calendarKind === "pass" ? (
                      <div className="inspire-gift-options">
                        <p>
                          {calendarKind === "pass"
                            ? lang === "lv"
                              ? "Izvēlies 4, 6 vai 8 nodarbības. Abonements ir derīgs 4 nedēļas no pirmās nodarbības."
                              : lang === "ru"
                                ? "Выберите 4, 6 или 8 занятий. Абонемент действует 4 недели с первого занятия."
                                : "Choose 4, 6 or 8 classes. The pass is valid for four weeks from the first class."
                            : lang === "lv"
                              ? "Izvēlies nodarbību skaitu — 2, 4, 6, 8 vai savu daudzumu."
                              : lang === "ru"
                                ? "Выберите количество занятий: 2, 4, 6, 8 или своё количество."
                                : "Choose 2, 4, 6, 8 classes or your own amount."}
                        </p>
                        <div>
                          {(calendarKind === "pass"
                            ? [4, 6, 8]
                            : [2, 4, 6, 8]
                          ).map((count) => (
                            <button
                              key={count}
                              type="button"
                              className={giftClasses === count ? "active" : ""}
                              onClick={() => setGiftClasses(count)}
                            >
                              {count}
                            </button>
                          ))}
                        </div>
                        {calendarKind === "gift" && (
                          <label>
                            {lang === "lv"
                              ? "Cits skaits"
                              : lang === "ru"
                                ? "Другое количество"
                                : "A different amount"}
                            <input
                              type="number"
                              min="2"
                              max="40"
                              value={giftClasses}
                              onChange={(e) =>
                                setGiftClasses(
                                  Math.max(
                                    2,
                                    Number.parseInt(e.target.value, 10) || 2,
                                  ),
                                )
                              }
                            />
                          </label>
                        )}
                        <strong>
                          {giftClasses} × €{giftClasses >= 4 ? "20" : "25"} = €
                          {giftClasses * (giftClasses >= 4 ? 20 : 25)}
                        </strong>
                      </div>
                    ) : calendarKind === "class" ? (
                      <div className="inspire-booking-calendar-wrap">
                        {scheduleWeeks.length > 0 && <div className="inspire-booking-week" aria-label={lang === "lv" ? "Izvēlies nodarbības dienu" : lang === "ru" ? "Выберите день занятия" : "Choose a class day"}>
                          <button type="button" aria-label={lang === "lv" ? "Iepriekšējā nedēļa" : lang === "ru" ? "Предыдущая неделя" : "Previous week"} onClick={() => changeScheduleWeek(-1)} disabled={scheduleWeek === 0}>‹</button>
                          <div>
                            {weekDays.map((day) => <button key={day.key} type="button" aria-label={`${day.fullLabel} ${day.date}`} disabled={!day.hasClass} className={`${day.hasClass ? "available" : ""} ${bookingDay === day.key ? "active" : ""}`} onClick={() => { setBookingDay(day.key); setBooking(null); setSelection(""); }}><small>{day.label}</small><b>{day.date}</b></button>)}
                          </div>
                          <button type="button" aria-label={lang === "lv" ? "Nākamā nedēļa" : lang === "ru" ? "Следующая неделя" : "Next week"} onClick={() => changeScheduleWeek(1)} disabled={scheduleWeek >= scheduleWeeks.length - 1}>›</button>
                        </div>}
                        <div className="inspire-booking-calendar" role="group" aria-label={t.choose}>
                        {bookingClasses.map((item) => {
                          const seats = remaining(item.id, item.seats);
                          const selected = selection === `class:${item.id}`;
                          return <button
                            key={item.id}
                            type="button"
                            className={selected ? "active" : ""}
                            disabled={seats < 1}
                            onClick={() => {
                              setBooking({ kind:"class", itemId:item.id, label:`${sessionName(item)} · ${item.date} · ${item.time}` });
                              setSelection(`class:${item.id}`);
                            }}
                          >
                            <time>{item.date}</time>
                            <strong>{item.time}</strong>
                            <span>{sessionName(item)}</span>
                            <small>{seats < 1 ? (lang === "lv" ? "PILNS" : lang === "ru" ? "НЕТ МЕСТ" : "FULL") : lang === "lv" ? "PIEEJAMA VIETA" : lang === "ru" ? "ЕСТЬ МЕСТО" : "AVAILABLE"}</small>
                          </button>;
                        })}
                        </div>
                      </div>
                    ) : (
                      <select
                        required
                        value={selection}
                        onChange={(e) => {
                          const [kind, itemId] = e.target.value.split(":");
                          const item =
                            kind === "class"
                              ? liveClasses.find((x) => x.id === itemId)
                              : livePrivateSlots.find((x) => x.id === itemId);
                          setBooking({
                            kind,
                            itemId,
                            label:
                              kind === "class"
                                ? `${sessionName(item)} · ${item.date} · ${item.time}`
                                : labelSlot(item),
                          });
                          setSelection(e.target.value);
                        }}
                      >
                        <option value="">{t.choose}</option>
                        {calendarKind === "class" && (
                          <optgroup label={t.group}>
                            {liveClasses.map((item) => (
                              <option
                                key={item.id}
                                disabled={remaining(item.id, item.seats) < 1}
                                value={`class:${item.id}`}
                              >
                                {sessionName(item)} · {item.date} · {item.time}
                              </option>
                            ))}
                          </optgroup>
                        )}
                        {calendarKind === "private" && (
                          <optgroup
                            label={
                              lang === "lv"
                                ? "INDIVIDUĀLĀS NODARBĪBAS"
                                : lang === "ru"
                                  ? "ИНДИВИДУАЛЬНЫЕ ЗАНЯТИЯ"
                                  : "PRIVATE SESSIONS"
                            }
                          >
                            {availablePrivateSlots.map((item) => (
                              <option
                                key={item.id}
                                value={`private:${item.id}`}
                              >
                                {labelSlot(item)}
                              </option>
                            ))}
                          </optgroup>
                        )}
                        {calendarKind === "rental" && (
                          <optgroup
                            label={
                              lang === "lv"
                                ? "STUDIJAS NOMA · €10/STUNDĀ"
                                : lang === "ru"
                                  ? "АРЕНДА СТУДИИ · €10/ЧАС"
                                  : "STUDIO RENT · €10/HOUR"
                            }
                          >
                            {availableRentalSlots.map((item) => (
                              <option
                                key={item.id}
                                value={`private:${item.id}`}
                              >
                                {labelSlot(item)}
                              </option>
                            ))}
                          </optgroup>
                        )}
                      </select>
                    )}
                    {calendarKind !== "gift" && calendarKind !== "pass" && (
                      <p className="inspire-cancellation inspire-modal-policy">
                        {lang === "lv"
                          ? "Apmaksāta rezervācija jāatceļ vai jāpārceļ vismaz 24 stundas pirms sākuma; līdz tam — bezmaksas atcelšana un automātiska atmaksa."
                          : lang === "ru"
                            ? "Оплаченную бронь нужно отменить или перенести не позднее чем за 24 часа до начала; до этого возможны бесплатная отмена и автоматический возврат."
                            : "A paid booking must be cancelled or rescheduled at least 24 hours before it starts; until then, cancellation is free and the refund is automatic."}
                      </p>
                    )}
                  </>
                <div className="inspire-customer-name">
                  <input required name="firstName" autoComplete="given-name" placeholder={lang === "lv" ? "Vārds" : lang === "ru" ? "Имя" : "First name"} />
                  <input required name="surname" autoComplete="family-name" placeholder={lang === "lv" ? "Uzvārds" : lang === "ru" ? "Фамилия" : "Last name"} />
                </div>
                <input
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={savedEmail}
                  placeholder={t.email}
                />
                <small className="inspire-email-memory">
                  {lang === "lv" ? "E-pastu atceramies tikai šajā ierīcē, lai nākamreiz būtu ātrāk." : lang === "ru" ? "Мы запоминаем email только на этом устройстве, чтобы в следующий раз было быстрее." : "We remember your email only on this device, to make the next booking faster."}
                </small>
                {calendarKind !== "gift" && calendarKind !== "pass" ? (
                  <div className="inspire-reservation-actions">
                    <button name="bookingAction" value="reserve">{lang === "lv" ? "REZERVĒT VIETU" : lang === "ru" ? "ЗАБРОНИРОВАТЬ МЕСТО" : "RESERVE A PLACE"}</button>
                    <button className="inspire-pay-option" name="bookingAction" value="pay">{lang === "lv" ? "VAI MAKSĀT TIEŠSAISTĒ" : lang === "ru" ? "ИЛИ ОПЛАТИТЬ ОНЛАЙН" : "OR PAY ONLINE"}</button>
                  </div>
                ) : <button name="bookingAction" value="pay">
                  {calendarKind === "gift" || calendarKind === "pass"
                      ? lang === "lv"
                        ? "IEGĀDĀTIES"
                        : lang === "ru"
                          ? "КУПИТЬ"
                          : "BUY"
                      : t.submit}
                </button>}
                <small className="inspire-checkout-status">
                  {status}
                </small>
              </>
            )}
          </form>
        </div>
      )}
    </main>
  );
}
