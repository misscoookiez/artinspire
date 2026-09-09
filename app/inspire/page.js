"use client";
import { startTransition, useEffect, useMemo, useState } from "react";
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
import "./inspire-event-faq-inline.css";
import "./inspire-events-hero.css";
import "./inspire-local-guide.css";
import "./inspire-top-refine.css";
import "./inspire-about-continuity.css";
import "./inspire-art-direction.css";
import "./inspire-navigation.css";
import "./inspire-structure.css";
import "./inspire-events-layout-v2.css";
import "./inspire-proof-gallery-refine.css";
import "./inspire-capabilities-rhythm.css";
import "./inspire-questions-layout.css";
import "./inspire-space-layout.css";
import "./inspire-events-hero-refine.css";
import "./inspire-masthead-logo-refine.css";
import "./inspire-about-panel-refine.css";
import "./inspire-global-polish.css";
import "./inspire-directions-refine.css";
import "./inspire-contact-rhythm-refine.css";
import "./inspire-contact-atmosphere-refine.css";
import "./inspire-navigation-skin.css";
import "./inspire-mobile-density.css";
import "./inspire-contact-icon-system.css";

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
const landingStatementSlides = [
  ["/art/landing-confirmed-f88.webp", "Art Studio Inspire radošā vide"],
  ["/art/landing-confirmed-40ba.webp", "Jaunā māksliniece glezno Art Studio Inspire"],
  ["/art/landing-confirmed-ca08.webp", "Art Studio Inspire studijas noskaņa"],
  ["/art/landing-confirmed-447.webp", "Art Studio Inspire radošā vide"],
  ["/art/landing-approved-0502.webp", "Art Studio Inspire studijas noskaņa"],
  ["/art/landing-confirmed-exec.webp", "Radošs mirklis Art Studio Inspire"],
];
const youthGallerySlides = [
  ["/art/inspire-student-work.webp", "Skolēna darbs Art Studio Inspire"],
  ["/art/studio-slide-easel.webp", "Darbs uz molberta Art Studio Inspire"],
  [
    "/art/studio-slide-garden.webp",
    "Gleznojums uz molberta Art Studio Inspire",
  ],
  ["/art/studio-slide-eyes.webp", "Skolēna darbs Art Studio Inspire"],
  ["/art/inspire-slide-03.webp", "Skolēna darbs Art Studio Inspire"],
  ["/art/inspire-slide-06.webp", "Skolēna darbs Art Studio Inspire"],
];
const adultGallerySlides = [
  ...statementSlides.slice(0, 4),
  ["/art/student-process-adult.webp", "Pieaugušā studenta gleznošanas process Art Studio Inspire"],
  ["/art/inspire-slide-03.webp", "Pieaugušā studenta darbs Art Studio Inspire"],
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
// These deliberate repeats let the room galleries demonstrate the same
// multi-row behaviour they will have once further studio photographs arrive.
const studioPreviewGalleryImages = [...studioPreviewImages, ...studioPreviewImages];
const tattooPreviewGalleryImages = [...tattooPreviewImages, ...tattooPreviewImages, ...tattooPreviewImages];
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

const rigaDatePartsFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Riga",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const rigaTimePartsFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Riga",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});
const rigaDateKey = (dateValue) => {
  if (!dateValue) return "";
  const parts = rigaDatePartsFormatter.formatToParts(new Date(dateValue));
  const value = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
};
const weekdayInRiga = (dateValue) => new Date(`${rigaDateKey(dateValue)}T12:00:00Z`).getUTCDay();
const weekStartKey = (dateValue) => {
  const key = rigaDateKey(dateValue);
  if (!key) return "";
  const date = new Date(`${key}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  return date.toISOString().slice(0, 10);
};
const rigaMinuteOfDay = (dateValue) => {
  const value = Object.fromEntries(rigaTimePartsFormatter.formatToParts(new Date(dateValue)).map((part) => [part.type, part.value]));
  return Number(value.hour) * 60 + Number(value.minute);
};

function InspireRotatingGallery({ slides, resolveImage, className, label, intervalMs }) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    setActiveIndex(0);
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % slides.length),
      intervalMs,
    );
    return () => window.clearInterval(timer);
  }, [intervalMs, slides]);

  const nextIndex = (activeIndex + 1) % slides.length;
  return (
    <div className={className} aria-label={label}>
      {slides.map(([src, alt], index) => (index === activeIndex || index === nextIndex ? (
        <img
          className={index === activeIndex ? "active" : ""}
          key={`${src}-${index}`}
          src={resolveImage(src, index)}
          alt={alt}
          decoding="async"
          fetchPriority={index === activeIndex ? "high" : "low"}
        />
      ) : null))}
    </div>
  );
}

function InspireMoodQuote({ lang }) {
  const [quote, setQuote] = useState(0);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const quoteKey = `inspire-mood-quote-${lang}`;
    const savedQuote = Number.parseInt(window.sessionStorage.getItem(quoteKey) || "", 10);
    const firstQuote = Number.isInteger(savedQuote) && savedQuote >= 0 && savedQuote < moodQuotes[lang].length
      ? savedQuote
      : Math.floor(Math.random() * moodQuotes[lang].length);
    window.sessionStorage.setItem(quoteKey, String(firstQuote));
    setQuote(firstQuote);
    setLeaving(false);
    let swapTimer;
    const timer = window.setInterval(() => {
      setLeaving(true);
      swapTimer = window.setTimeout(() => {
        setQuote((current) => {
          let next = current;
          while (next === current) next = Math.floor(Math.random() * moodQuotes[lang].length);
          window.sessionStorage.setItem(quoteKey, String(next));
          return next;
        });
        setLeaving(false);
      }, 380);
    }, 8200);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(swapTimer);
    };
  }, [lang]);
  return <p className={`inspire-masthead-mood ${leaving ? "is-leaving" : ""}`} aria-live="polite">{moodQuotes[lang][quote]}</p>;
}

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
  ru: {
    kicker: "ПРАКТИЧЕСКАЯ СТОРОНА",
    title: "Вся студия — в вашем распоряжении.",
    lead: "Не нужно приходить с полной сумкой материалов или готовым планом. Материалы и профессиональная поддержка художницы уже здесь — идею, технику и темп найдём вместе.",
    items: [
      [
        "МАТЕРИАЛЫ",
        "Масло, акрил, гуашь, акварель, карандаши и другие художественные материалы есть в студии. Стандартный холст 30 × 40 см или бумага для акварели и рисунка входят в стоимость занятия; холст большего размера можно купить в студии примерно за €10–15 или принести свой.",
      ],
      [
        "ОСНОВЫ",
        "Когда работе это нужно, подключаем широкий арсенал теории и практики: рисунок, композицию и теорию цвета; работаем со строением лица и тела, пространством, пейзажем и всем, чего требует конкретная работа. Академическое художественное образование Сандры помогает разложить правила на понятные шаги — а не навязывать их там, где они мешают создавать.",
      ],
      [
        "СВОБОДНЕЕ",
        "Здесь непринуждённая художественная атмосфера, где ваш вкус — ориентир, а не то, что нужно исправлять. Преподаватель помогает заметить, пробовать и находить решения, но не навязывает один стиль. Мы экспериментируем с символами, материалами, цветом и формой, ищем ваш личный визуальный язык.",
      ],
      [
        "БОЛЬШИЕ РАБОТЫ",
        "Амбицию здесь не нужно уменьшать. Можно начать с одной работы и вырасти до большого холста, серии, интерьерной картины или портфолио. Мы помогаем разделить большую задумку на реальные этапы, выбрать формат и продолжать, когда работе нужно больше времени, пространства или смелости.",
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
        "Для заявок предоплата не нужна. Любую бронь можно отменить или перенести не позднее чем за 24 часа до начала — до этого отмена бесплатна, а возврат производится автоматически.",
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
    "IZMĒĢINĀJUMA NODARBĪBA",
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
    "TRIAL CLASS",
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
    "ПРОБНОЕ ЗАНЯТИЕ",
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
        "Viss nepieciešamais ir studijā — vari ierasties arī tikai ar ideju.",
        ["Eļļa, akrils, guaša, akvarelis, zīmuļi un papīrs", "Nodarbībā iekļauts 30 × 40 cm audekls vai papīrs", "Lielāki audekli: apmēram €10–15 vai savs līdzi"],
      ],
      [
        "PAMATI",
        "Zināšanas pieslēdzam tieši tad, kad tās palīdz Tavam darbam.",
        ["Zīmējums, kompozīcija un krāsu teorija", "Cilvēks, telpa, ainava un novērojums", "Noteikumi saprotamos soļos — lai ar tiem varētu spēlēties"],
      ],
      [
        "BRĪVĀK",
        "Tava gaume ir mēraukla, nevis kaut kas, kas jālabo.",
        ["Meklējam risinājumus, nevis vienu pareizo stilu", "Eksperimentējam ar simboliem, krāsām, formām un materiāliem", "Veidojam Tavu personisko vizuālo valodu"],
      ],
      [
        "LIELĀKI DARBI",
        "Ambīcija šeit nav jāsamazina.",
        ["No viena darba līdz lielam audeklam, sērijai vai portfolio", "Lielu ieceri sadalām reālos, paveicamos posmos", "Palīdzam izvēlēties formātu, laiku un nākamo soli"],
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
        "Everything you need is at the studio — you can arrive with just an idea.",
        ["Oils, acrylics, gouache, watercolour, pencils and paper", "A 30 × 40 cm canvas or paper is included", "Larger canvases: around €10–15, or bring your own"],
      ],
      [
        "FOUNDATIONS",
        "Knowledge comes in precisely when it helps your work.",
        ["Drawing, composition and colour theory", "The figure, space, landscape and observation", "Rules in usable steps — so you can play with them"],
      ],
      [
        "FREER WORK",
        "Your taste is the compass, not something to correct.",
        ["We look for solutions, not a single correct style", "Experiment with symbols, colour, form and materials", "Build a personal visual language"],
      ],
      [
        "LARGER WORKS",
        "Ambition does not need to be reduced here.",
        ["From one work to a larger canvas, series or portfolio", "Break a big intention into real, manageable stages", "Choose the format, time and next step together"],
      ],
    ],
  },
  ru: {
    kicker: "ПРАКТИЧЕСКАЯ СТОРОНА",
    title: "Вся студия — в вашем распоряжении.",
    lead: "Не нужно приходить с полным пакетом материалов или готовым планом. Всё необходимое и поддержка художницы уже здесь — идею, технику и темп найдём вместе.",
    items: [
      ["МАТЕРИАЛЫ", "Всё необходимое есть в студии — можно прийти только с идеей.", ["Масло, акрил, гуашь, акварель, карандаши и бумага", "Холст 30 × 40 см или бумага включены", "Большие холсты: около €10–15 или свой с собой"]],
      ["ОСНОВЫ", "Знания появляются именно тогда, когда помогают вашей работе.", ["Рисунок, композиция и теория цвета", "Фигура, пространство, пейзаж и наблюдение", "Правила понятными шагами — чтобы с ними можно было играть"]],
      ["СВОБОДНЕЕ", "Ваш вкус — ориентир, а не то, что нужно исправлять.", ["Ищем решения, а не единственный правильный стиль", "Экспериментируем с символами, цветом, формой и материалами", "Создаём личный визуальный язык"]],
      ["БОЛЬШИЕ РАБОТЫ", "Амбиции здесь не нужно уменьшать.", ["От одной работы к большому холсту, серии или портфолио", "Разделяем большую идею на реальные, выполнимые этапы", "Вместе выбираем формат, время и следующий шаг"]],
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
      ["LIELAIS KOPĪGAIS AUDEKLS", "no €200", ""],
    ],
    hangout:
      "Aptuvenais nepieciešamais laiks gleznas pabeigšanai — 3 stundas.\n\nKatram pasākuma formātam studijā pievienojam vēl 2–3 stundas brīvai būšanai kopā — lai var mierīgi ierasties, pakavēties un nesteigties prom pēc pēdējā otas vilciena. Drīkst ņemt līdzi savu ēdienu un dzērienus.\n\nVisus pasākuma formātus varam noorganizēt izbraukuma formātā — pie Jums!",
    formatsLabel: "PASĀKUMU IDEJAS — IZVĒLIES VIENU VAI APVIENO VAIRĀKAS",
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
    cta: "PĀRBAUDI PIEEJAMOS DATUMUS UN PIESAKI SAVU PASĀKUMU →",
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
      ["WATERCOLOUR", "€20 / person", ""],
      ["PAINTING", "€35 / person", ""],
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
      ["АКВАРЕЛЬ", "€20 / человек", ""],
      ["ЖИВОПИСЬ", "€35 / человек", ""],
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
    sub: "Gleznošanas nodarbības bērniem un pieaugušajiem · Miera iela 17, Rīga",
    lead: "MĀKSLAS STUDIJA CILVĒKIEM AR IDEJĀM.\nARĪ TIEM, KURI VĒL NEZINA, KA VIŅIEM TĀDAS IR.",
    apply: "PIETEIKTIES NODARBĪBAI",
    statement: "MĀKSLAS STUDIJA CILVĒKIEM AR IDEJĀM.\nARĪ TIEM, KURI VĒL NEZINA, KA VIŅIEM TĀDAS IR.",
    statementQuote: "Mēs sākam ar to, ko vēlies radīt, nevis ar to, ko jau proti.",
    statementBody: [
      "Tava ideja ir sākumpunkts. Mums ir svarīgi nevis iemācīt visiem gleznot vienādi, bet palīdzēt Tev arvien labāk saprast savu gaumi, redzējumu.",
      "Bērniem un pieaugušajiem — individualitāte šeit vienmēr ir galvenā vērtība.",
      "Mākslu apgūstam pašā radīšanas procesā — teoriju pieslēdzam tur, kur tā kļūst vajadzīga.",
    ],
    regular: "KATRU NEDĒĻU ATVĒRTĀS",
    group: "GRUPU NODARBĪBAS",
    reserve: "PIETEIKTIES",
    booking: "PIETEIKŠANĀS",
    format: "IZVĒLIES SAVU FORMĀTU",
    book: "REZERVĒT VIETU",
    price: "€15 IZMĒĢINĀJUMA NODARBĪBA · €25 VIENA NODARBĪBA · ABONEMENTS 4× €80",
    materialsIncluded: "VISI MATERIĀLI IEKĻAUTI",
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
    eventTitle: "Dzimšanas dienas\nDraugu vakari\nKomandu pasākumi",
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
    sub: "Painting classes for children & adults · Miera iela 17, Riga",
    lead: "AN ART STUDIO FOR PEOPLE WITH IDEAS.\nALSO FOR THOSE WHO DO NOT YET KNOW THEY HAVE THEM.",
    apply: "BOOK A CLASS",
    statement: "AN ART STUDIO FOR PEOPLE WITH IDEAS.\nALSO FOR THOSE WHO DO NOT YET KNOW THEY HAVE THEM.",
    statementQuote: "We begin with what you want to create, not with what you already know how to do.",
    statementBody: [
      "Your idea is the starting point. We do not want to teach everyone to paint alike; we want to help you understand your own taste and vision more deeply.",
      "For children and adults alike, individuality is always the central value here.",
      "We learn art while making it — bringing in theory only when it becomes useful.",
    ],
    regular: "OPEN EVERY WEEK",
    group: "GROUP CLASSES",
    reserve: "BOOK A PLACE",
    booking: "BOOKING",
    format: "CHOOSE YOUR FORMAT",
    book: "RESERVE A PLACE",
    price: "€15 TRIAL CLASS · €25 SINGLE CLASS · €80 FOUR-CLASS PASS",
    materialsIncluded: "ALL MATERIALS INCLUDED",
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
    eventTitle: "Birthdays\nevenings with friends\nteam events",
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
    sub: "Занятия живописью для детей и взрослых · Miera iela 17, Рига",
    lead: "ХУДОЖЕСТВЕННАЯ СТУДИЯ ДЛЯ ЛЮДЕЙ С ИДЕЯМИ.\nИ ДЛЯ ТЕХ, КТО ЕЩЁ НЕ ЗНАЕТ, ЧТО ОНИ У НИХ ЕСТЬ.",
    apply: "ЗАПИСАТЬСЯ НА ЗАНЯТИЕ",
    statement: "СТУДИЯ ДЛЯ ЛЮДЕЙ С ИДЕЯМИ.\nИ ДЛЯ ТЕХ, КТО ЕЩЁ НЕ ЗНАЕТ, ЧТО ОНИ У НИХ ЕСТЬ.",
    statementQuote: "Мы начинаем с того, что ты хочешь создать, а не с того, что уже умеешь.",
    statementBody: [
      "Твоя идея — это начало. Нам важно не научить всех рисовать одинаково, а помочь лучше почувствовать собственный вкус и видение.",
      "Для детей и взрослых индивидуальность здесь всегда остаётся главной ценностью.",
      "Искусству учимся в самом процессе создания — теорию подключаем тогда, когда она действительно нужна.",
    ],
    regular: "ОТКРЫТЫЕ КАЖДУЮ НЕДЕЛЮ",
    group: "ГРУППОВЫЕ ЗАНЯТИЯ",
    reserve: "ЗАПИСАТЬСЯ",
    booking: "БРОНИРОВАНИЕ",
    format: "ВЫБЕРИ СВОЙ ФОРМАТ",
    book: "ЗАБРОНИРОВАТЬ",
    price: "€15 ПРОБНОЕ ЗАНЯТИЕ · €25 ОДНО ЗАНЯТИЕ · €80 АБОНЕМЕНТ НА 4 ЗАНЯТИЯ",
    materialsIncluded: "ВСЕ МАТЕРИАЛЫ ВКЛЮЧЕНЫ",
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
    eventTitle: "Дни рождения\nвечера с друзьями\nсобытия для команд",
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
  const [contactStatus, setContactStatus] = useState("");
  const [calendarKind, setCalendarKind] = useState("all");
  const [checkoutOption, setCheckoutOption] = useState("");
  const [giftClasses, setGiftClasses] = useState(2);
  const [inquiryTopic, setInquiryTopic] = useState("");
  const [scheduleWeek, setScheduleWeek] = useState(-1);
  const [rentalWeek, setRentalWeek] = useState(0);
  const [bookingDay, setBookingDay] = useState("");
  const [eventMonth, setEventMonth] = useState(0);
  const [eventDate, setEventDate] = useState("");
  const [eventStartHour, setEventStartHour] = useState(11);
  const [eventDuration, setEventDuration] = useState(2);
  const [eventFormat, setEventFormat] = useState("watercolor");
  const [eventAttendees, setEventAttendees] = useState(1);
  const [lang, setLang] = useState("lv");
  const [showContactsFromMenu, setShowContactsFromMenu] = useState(false);
  const isContactView = page === "contact" || showContactsFromMenu;
  const isAboutView = page === "about" || page === "method";
  const chooseLanguage = (nextLanguage) => {
    startTransition(() => setLang(nextLanguage));
    try {
      window.localStorage.setItem("inspire-language", nextLanguage);
    } catch {}
  };
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
    ru: "В живописи Сандры Рудзите фигуративное и символическое часто становятся внутренним пейзажем: персонаж, животное, натюрморт или более тёмный свет — не просто декор, а способ удержать внимание на ощущении. Она работает между внимательным наблюдением и воображением — маслом, рисунком, акрилом и акварелью — не торопя работу, которой нужно время.\n\nХотя в её работах нередко появляются более тяжёлые, тёмные или символические мотивы, сама Сандра — лёгкий, радостный и любопытный человек: в студии есть место смеху, чаю и картине с милым котом. Она свободно работает в разных жанрах, а одно из её маленьких удовольствий — рисовать милых котиков.\n\nЕё опыт включает Adobe, онлайн-проекты об искусстве и повседневную жизнь работающей студии; в преподавании главное проще: помочь человеку увидеть, что именно он уже пытается сказать своим изображением.",
  }[lang];
  const hostStories = {
    lv: [
      ["NO GRŪTA SĀKUMA LĪDZ NEATLAIDĪBAI", "Sākumā zīmēšana Sandrai nebūt nenācās viegli — skolā māsa reizēm palīdzēja ar zīmējumiem, un pat viena konkursa balva patiesībā pienācās viņai. Taču mīlestība pret mākslu bija tik stipra, ka Sandra bija apņēmības pilna saprast, kā tā darbojas. Šī pieredze studijā paliek svarīga: iesācējs nav mazāks līmenis, bet cilvēks pašā sava ceļa sākumā."],
      ["KUR MEKLĒJAM IEDVESMU", "Studijā bieži atveram mākslas grāmatas — no Rembranta un Vrubeļa līdz Pīteram Doigam un impresionistiem. Īpaši tuvs ir simbolisms un psiholoģiskais slānis darbā. Pētām lielo mākslinieku paņēmienus, par tiem runājam un, kad tas palīdz paša darbam, izmantojam kā dzīvu atsauci, nevis kā paraugu, ko kopēt."],
      ["PRAKSE, KAS REDZAMA PASAULĒ", "Sandra daudzus gadus publiski dalījās ar savu procesu internetā un Twitch tiešraidēs. Viņas darbi regulāri nonāk kolekcijās Amerikā, Ziemeļeiropā un citviet pasaulē. Viņai bijušas personālizstādes Rīgā un Olainē, darbi rādīti arī TwitchCon Sanfrancisko — pieredze, kas studijā ienāk nevis kā distance, bet kā ļoti praktiska saruna par darbu."],
      ["IZGLĪTĪBA, PAMATI UN BRĪVĪBA", "Keramikas dizains Rīgas Dizaina un mākslas vidusskolā deva precīzu formu, kompozīcijas un materiālu izjūtu; glezniecība Latvijas Mākslas akadēmijā paplašināja skatienu uz moderno mākslu; profesionālā zīmēšanas un gleznošanas studija pie Ludmilas Perecas nostiprināja akadēmiskos pamatus. Filozofijas studijas Latvijas Universitātē iedeva paradumu domāt, analizēt un skatīties uz radošo procesu psiholoģiski, filozofiski un praktiski. Noteikumus mācāmies, lai ar tiem varētu spēlēties."],
      ["KĀPĒC IR ŠĪ STUDIJA", "Pēc gadiem pie datora Sandra gribēja vairāk dzīvas sarunas un iespēju cilvēkiem dot ko labu klātienē. Tāpēc šeit zināšanas satiekas ar brīvību: mākslai nav jābūt pareizai, glītai vai uzreiz saprotamai. Tai drīkst būt personisks motīvs, stipra individualitāte un kaut kas patiess, par ko rūp. Vienīgais noteikums — Tev pašam tai ir jāpatīk."],
    ],
    en: [
      ["FROM A DIFFICULT START TO PERSISTENCE", "Drawing did not come easily to Sandra at first — at school her sister sometimes helped with drawings, and even one competition prize really belonged to her. But she loved art enough to be determined to understand how it works. That experience still matters here: a beginner is not a lower level, but someone at the beginning of their own path."],
      ["WHERE WE LOOK FOR INSPIRATION", "The studio often opens art books — from Rembrandt and Vrubel to Peter Doig and the Impressionists. Symbolism and the psychological layer in a work are especially close to us. We study great artists’ methods, discuss them and, when they help a work, use them as a living reference rather than a template to copy."],
      ["A PRACTICE SEEN AROUND THE WORLD", "Sandra has shared her process publicly online and through Twitch livestreams for many years. Her works regularly enter collections in America, Northern Europe and elsewhere in the world. She has held solo exhibitions in Riga and Olaine, and shown work at TwitchCon in San Francisco — experience that enters the studio not as distance, but as a very practical conversation about making work."],
      ["EDUCATION, FOUNDATIONS AND FREEDOM", "Ceramics Design at Riga School of Design and Art developed a precise sense of form, composition and materials; Painting at the Art Academy of Latvia broadened Sandra’s view of modern art; and professional drawing and painting study with Ludmila Perec strengthened her academic foundations. Philosophy at the University of Latvia brought a habit of thinking about the creative process psychologically, philosophically and practically. We learn rules so that we can play with them."],
      ["WHY THIS STUDIO EXISTS", "After years in front of a computer, Sandra wanted more live conversation and a way to do something good with people in person. This is why knowledge meets freedom here: art does not have to be correct, pretty or immediately easy to understand. It can carry a personal motive, strong individuality and something genuine that matters. The only rule is that you have to like it."],
    ],
    ru: [
      ["ОТ ТРУДНОГО НАЧАЛА К УПОРСТВУ", "Поначалу рисование давалось Сандре совсем нелегко — в школе сестра иногда помогала ей с рисунками, и даже одна конкурсная награда по праву принадлежала сестре. Но любовь к искусству была настолько сильной, что Сандра решила понять, как оно работает. Этот опыт важен и в студии: начинающий — не низший уровень, а человек в начале собственного пути."],
      ["ГДЕ МЫ ИЩЕМ ВДОХНОВЕНИЕ", "В студии мы часто открываем книги по искусству — от Рембрандта и Врубеля до Питера Дойга и импрессионистов. Нам особенно близки символизм и психологический слой работы. Мы изучаем методы больших художников, обсуждаем их и, когда это помогает собственной работе, используем как живую опору, а не образец для копирования."],
      ["ПРАКТИКА, ВИДИМАЯ В МИРЕ", "Много лет Сандра публично делилась своим процессом онлайн и в прямых эфирах Twitch. Её работы регулярно попадают в коллекции Америки, Северной Европы и других стран. У неё были персональные выставки в Риге и Олайне, а также показ работ на TwitchCon в Сан-Франциско — опыт, который приходит в студию не как дистанция, а как очень практичный разговор о создании работы."],
      ["ОБРАЗОВАНИЕ, ОСНОВЫ И СВОБОДА", "Дизайн керамики в Рижской школе дизайна и искусства дал точное чувство формы, композиции и материалов; живопись в Латвийской академии художеств расширила взгляд на современное искусство; профессиональная студия рисунка и живописи Людмилы Перец укрепила академические основы. Философия в Латвийском университете дала привычку рассматривать творческий процесс психологически, философски и практически. Мы учим правила, чтобы потом с ними играть."],
      ["ПОЧЕМУ СУЩЕСТВУЕТ ЭТА СТУДИЯ", "После многих лет за компьютером Сандре захотелось больше живого общения и возможности делать что-то хорошее вместе с людьми. Здесь знание встречается со свободой: искусство не обязано быть правильным, красивым или сразу понятным. В нём может быть личный мотив, сильная индивидуальность и что-то настоящее, что важно именно вам. Единственное правило — вам самим оно должно нравиться."],
    ],
  }[lang];
  const showcaseSlides = page === "home" ? landingStatementSlides : statementSlides;
  const [imagePreview, setImagePreview] = useState(null);
  const [editableContent, setEditableContent] = useState({});
  const [sharedImages, setSharedImages] = useState({});
  const [availability, setAvailability] = useState({});
  const [savedEmail, setSavedEmail] = useState("");
  const approach = proofCopy[lang],
    faq = seoFaq[lang];
  const audienceOverview =
    lang === "lv"
      ? [
          {
            title: "PIEEJA PIEAUGUŠAJIEM",
            body: "Prasme un brīvība aug reizē: vari sākt ar pirmo ideju, atgriezties pie mākslas vai padziļināt savu praksi. Tehnika ir instruments, nevis pārbaude.",
            href: "/method#studija",
            cta: "SKATĪT PIEEJU PIEAUGUŠAJIEM →",
          },
          {
            title: "PIEEJA BĒRNIEM UN JAUNIEŠIEM",
            body: "Bērna gaume ir sākumpunkts. Īsti materiāli, izvēle un uzmanīgs atbalsts palīdz augt bez viena parauga.",
            href: "/method#berni-un-jauniesi",
            cta: "SKATĪT PIEEJU BĒRNIEM UN JAUNIEŠIEM →",
          },
        ]
      : lang === "ru"
        ? [
            {
              title: "ПОДХОД ДЛЯ ВЗРОСЛЫХ",
              body: "Навык и свобода растут вместе: можно начать с первой идеи, вернуться к искусству или углубить свою практику. Техника здесь — инструмент, а не проверка.",
              href: "/method#studija",
              cta: "ПОСМОТРЕТЬ ПОДХОД ДЛЯ ВЗРОСЛЫХ →",
            },
            {
              title: "ПОДХОД ДЛЯ ДЕТЕЙ И ПОДРОСТКОВ",
              body: "Вкус ребёнка — отправная точка. Настоящие материалы, выбор и внимательная поддержка помогают расти без единственного образца.",
              href: "/method#berni-un-jauniesi",
              cta: "ПОСМОТРЕТЬ ПОДХОД ДЛЯ ДЕТЕЙ И ПОДРОСТКОВ →",
            },
          ]
        : [
            {
              title: "AN APPROACH FOR ADULTS",
              body: "Skill and freedom grow together: begin with a first idea, return to art, or deepen an existing practice. Technique is a tool here, not a test.",
              href: "/method#studija",
              cta: "SEE THE ADULT APPROACH →",
            },
            {
              title: "AN APPROACH FOR CHILDREN & TEENS",
              body: "A child’s taste is the starting point. Real materials, choice and attentive guidance help them grow without a single prescribed model.",
              href: "/method#berni-un-jauniesi",
              cta: "SEE THE CHILDREN & TEENS APPROACH →",
            },
          ];
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
            [
              "От эскиза к большой работе",
              "Идея может начаться с маленького рисунка и вырасти в картину, серию или работу для портфолио. Мы помогаем заметить момент, когда работу стоит развивать, а не сразу начинать следующую.",
            ],
            [
              "Настоящие материалы, настоящие решения",
              "Дети знакомятся с краской, карандашом, углём, акварелью, акрилом и коллажем — не с единственной «правильной» техникой. Иногда именно материал подсказывает идее направление.",
            ],
            [
              "Смотрим на искусство, а не только делаем",
              "Мы рассматриваем книги по искусству, художников и образы, которые цепляют. Это учит смотреть внимательнее и находить слова для собственных идей.",
            ],
            [
              "Безопасное место для ошибок",
              "Неудачная линия, случайный цвет или изменившийся план — не повод всё выбрасывать. Учимся замечать, что сама работа предлагает сделать дальше.",
            ],
            [
              "Портфолио и художественная школа",
              "Когда подростку нужен более серьёзный вектор, работаем с портфолио, заданиями, рисунком с натуры и уверенностью в своей работе — без лишнего соревнования.",
            ],
            [
              "Родители видят процесс",
              "Важен не только готовый результат. Мы рассказываем, над чем ребёнок работает и что уже умеет замечать, выбирать и доводить до конца.",
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
            [
              "From a sketch to a larger work",
              "An idea can begin as a small drawing and grow into a painting, series or portfolio work. We help students see when it is worth developing a work rather than immediately starting another one.",
            ],
            [
              "Real materials, real choices",
              "Children meet paint, pencil, charcoal, watercolour, acrylic and collage—not one supposedly correct technique. A material can give an idea its direction.",
            ],
            [
              "We look at art, not only make it",
              "We look through art books, artists and images that catch our attention. This teaches closer looking and gives students words for their own ideas.",
            ],
            [
              "A kind place for mistakes",
              "An awkward line, accidental colour or changed plan is not a reason to throw a work away. We learn to notice what the work itself suggests doing next.",
            ],
            [
              "Portfolio and art school",
              "When a young person needs a more focused direction, we can work on portfolios, assignments, observational drawing and confidence in their work—without needless competition.",
            ],
            [
              "Parents can see the process",
              "The finished work is not the only thing that matters. We share what a child is working on and what they are learning to notice, choose and complete.",
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
    const updateContactView = () => {
      setShowContactsFromMenu(page === "home" && window.location.hash === "#kontakti");
    };
    updateContactView();
    window.addEventListener("hashchange", updateContactView);
    return () => window.removeEventListener("hashchange", updateContactView);
  }, [page]);
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return undefined;
    const timer = window.setTimeout(() => {
      if (hash === "studentu-darbi") {
        document
          .querySelectorAll("#studentu-darbi > details")
          .forEach((gallery) => {
            gallery.open = true;
          });
      }
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [page]);
  useEffect(() => {
    if (!window.matchMedia("(max-width: 800px)").matches) return undefined;
    let requested = false;
    try {
      requested = window.sessionStorage.getItem("inspire-mobile-content-jump") === "true";
      if (requested) window.sessionStorage.removeItem("inspire-mobile-content-jump");
    } catch {}
    if (!requested) return undefined;

    const firstContentId = {
      classes: "nodarbibas",
      method: "metode",
      events: "pasakumi",
      contact: "sazinies",
      about: "par-studiju",
      questions: "biezakie-jautajumi",
    }[page];
    const timer = window.setTimeout(() => {
      const target = document.getElementById(firstContentId);
      if (!target) return;
      if (page === "method") {
        const navigationHeight = document.querySelector(".inspire-icon-nav")?.getBoundingClientRect().height || 0;
        window.scrollTo({
          top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - navigationHeight),
          behavior: "auto",
        });
        return;
      }
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 110);
    return () => window.clearTimeout(timer);
  }, [page]);
  useEffect(() => {
    try {
      setSavedEmail(window.localStorage.getItem("inspire-booking-email") || "");
    } catch {}
  }, []);
  useEffect(() => {
    try {
      const savedLanguage = window.localStorage.getItem("inspire-language");
      if (["lv", "en", "ru"].includes(savedLanguage)) setLang(savedLanguage);
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
    let active = true;
    const load = (locale) =>
      fetch(`/api/content?page=inspire&locale=${locale}`).then((response) =>
        response.ok ? response.json() : null,
      );
    Promise.all([load(lang), load("lv")])
      .then(([localized, latvian]) => {
        if (!active) return;
        setEditableContent(localized?.content || {});
        setSharedImages(latvian?.content || {});
      })
      .catch(() => {
        if (active) {
          setEditableContent({});
          setSharedImages({});
        }
      });
    return () => {
      active = false;
    };
  }, [lang]);
  useEffect(() => {
    if (!["home", "classes", "events"].includes(page)) return undefined;
    let active = true;
    const scope = page === "events" ? "events" : "booking";
    const refresh = () =>
      fetch(`/api/catalog?scope=${scope}`)
        .then((response) => (response.ok ? response.json() : null))
        .then((result) => {
          if (active && result) startTransition(() => setAvailability(result));
        })
        .catch(() => {});
    refresh();
    const timer = window.setInterval(refresh, 20000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [page]);
  const content = (id, fallback) =>
    typeof editableContent[id] === "string" ? editableContent[id] : fallback;
  const image = (id, fallback) =>
    typeof sharedImages[id] === "string" ? sharedImages[id] : fallback;
  const openAboutChapter = (targetId) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const chapter = target.closest("details.inspire-depth-panel");
    if (chapter) chapter.open = true;
    const gallery = targetId === "studentu-darbi" ? target.querySelector("details") : null;
    if (gallery) gallery.open = true;
    window.setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
  };
  const closeMobileMenuAndShowContent = () => {
    const menu = document.querySelector(".inspire-icon-nav");
    const toggle = menu?.querySelector(".inspire-mobile-menu-toggle");
    menu?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    const mark = toggle?.querySelector("b");
    if (mark) mark.textContent = "+";
    if (!window.matchMedia("(max-width: 800px)").matches) return;
    try {
      window.sessionStorage.setItem("inspire-mobile-content-jump", "true");
    } catch {}
  };
  const aboutChapterLinks = lang === "lv"
    ? [["studentu-darbi", "STUDENTU DARBI"], ["par-sandru", "KAS VADA STUDIJU"], ["studija", "PIEEJA PIEAUGUŠAJIEM"], ["berni-un-jauniesi", "PIEEJA BĒRNIEM UN JAUNIEŠIEM"]]
    : lang === "ru"
      ? [["studentu-darbi", "РАБОТЫ УЧЕНИКОВ"], ["par-sandru", "КТО ВЕДЁТ СТУДИЮ"], ["studija", "ПОДХОД ДЛЯ ВЗРОСЛЫХ"], ["berni-un-jauniesi", "ПОДХОД К ДЕТЯМ И ПОДРОСТКАМ"]]
      : [["studentu-darbi", "STUDENT WORK"], ["par-sandru", "WHO RUNS THE STUDIO"], ["studija", "APPROACH FOR ADULTS"], ["berni-un-jauniesi", "APPROACH FOR CHILDREN & YOUTH"]];
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
  const allLiveClasses = useMemo(() => {
    if (!availability.classSessions?.length) return classes;
    const dateFormatter = new Intl.DateTimeFormat(
      lang === "lv" ? "lv-LV" : lang === "ru" ? "ru-RU" : "en-GB",
      { timeZone: "Europe/Riga", weekday: "short", day: "numeric", month: "short" },
    );
    const timeFormatter = new Intl.DateTimeFormat(
      lang === "ru" ? "ru-RU" : lang === "lv" ? "lv-LV" : "en-GB",
      { timeZone: "Europe/Riga", hour: "2-digit", minute: "2-digit", hour12: false },
    );
    return availability.classSessions.map((item) => ({
        id: item.id,
        startsAt: item.starts_at,
        endsAt: item.ends_at,
        date: dateFormatter.format(new Date(item.starts_at)),
        title: item.title_en,
        titleLv: item.title_lv,
        time: timeFormatter.format(new Date(item.starts_at)),
        price: item.price_cents / 100,
        seats: item.available ? 1 : 0,
        past: Boolean(item.past),
        level: "",
      }));
  }, [availability.classSessions, lang]);
  const isStudioWorkSession = (session) => /studio work session|patstāvīgs darbs studijā/i.test(session.title || session.titleLv || "");
  const [liveClasses, liveStudioWorkSlots] = useMemo(() => [
    allLiveClasses.filter((item) => !isStudioWorkSession(item)),
    allLiveClasses.filter((item) => isStudioWorkSession(item)),
  ], [allLiveClasses]);
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
  // Tattoo-room availability is deliberately a separate set of private slots.
  // Its €20 slots never borrow the painting-event calendar or studio-work seats.
  const availableTattooRoomSlots = livePrivateSlots.filter(
    (slot) => privateIsAvailable(slot.id) && slot.price_cents === 2000,
  );
  const availableRentalSlots = liveStudioWorkSlots.filter((slot) => slot.seats > 0);
  const availablePrivateSessions = availablePrivateSlots.map((slot) => ({
    ...slot,
    startsAt: slot.starts_at,
    time: new Intl.DateTimeFormat(lang === "lv" ? "lv-LV" : lang === "ru" ? "ru-RU" : "en-GB", { timeZone: "Europe/Riga", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(slot.starts_at)),
  }));
  const availableTattooRoomSessions = availableTattooRoomSlots.map((slot) => ({
    ...slot,
    startsAt: slot.starts_at,
    time: new Intl.DateTimeFormat(lang === "lv" ? "lv-LV" : lang === "ru" ? "ru-RU" : "en-GB", { timeZone: "Europe/Riga", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(slot.starts_at)),
  }));
  const sessionName = (session) => {
    const title = lang === "lv"
      ? session.titleLv?.replace(/\s*gleznošanas(?=\s+grupa)/i, "")
      : lang === "ru"
        ? session.title?.includes("Youth")
          ? "Для юных"
          : session.title?.includes("Adult")
            ? "Для взрослых"
            : "Смешанная группа"
        : session.title?.includes("Youth")
          ? "Youth group"
          : session.title?.includes("Adult")
            ? "Adult group"
            : "Mixed group";
    return title?.replace(/\s*\((?:ages?\s*)?8[–-]16(?:\s*(?:gadi|years))?\)/gi, "") || "";
  };
  const scheduleWeeks = useMemo(
    () => [...new Set(liveClasses.map((item) => weekStartKey(item.startsAt)).filter(Boolean))],
    [liveClasses],
  );
  const currentScheduleWeek = weekStartKey(new Date().toISOString());
  const initialScheduleWeek = Math.max(0, scheduleWeeks.findIndex((week) => week >= currentScheduleWeek));
  const activeScheduleWeek = scheduleWeek < 0 ? initialScheduleWeek : Math.min(scheduleWeek, Math.max(0, scheduleWeeks.length - 1));
  const visibleWeek = scheduleWeeks[activeScheduleWeek];
  const locale = lang === "lv" ? "lv-LV" : lang === "ru" ? "ru-RU" : "en-GB";
  const weekDays = visibleWeek
    ? Array.from({ length: 7 }, (_, index) => {
        const date = new Date(`${visibleWeek}T12:00:00Z`);
        date.setUTCDate(date.getUTCDate() + index);
        const hasClass = liveClasses.some(
          (item) => weekStartKey(item.startsAt) === visibleWeek && weekdayInRiga(item.startsAt) === date.getUTCDay(),
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
    Boolean(dateValue && dateKey) && rigaDateKey(dateValue) === dateKey;
  const bookingClasses = bookingDay
    ? liveClasses.filter((item) => sameCalendarDay(item.startsAt, bookingDay))
    : liveClasses;
  const bookableStudioSlots = calendarKind === "private"
    ? availablePrivateSessions
    : calendarKind === "treatment-room"
      ? availableTattooRoomSessions
      : availableRentalSlots;
  const rentalWeeks = [...new Set(bookableStudioSlots.map((item) => weekStartKey(item.startsAt)).filter(Boolean))];
  const visibleRentalWeek = rentalWeeks[Math.min(rentalWeek, Math.max(0, rentalWeeks.length - 1))];
  const rentalDays = visibleRentalWeek
    ? Array.from({ length: 7 }, (_, index) => {
        const date = new Date(`${visibleRentalWeek}T12:00:00Z`);
        date.setUTCDate(date.getUTCDate() + index);
        const key = date.toISOString().slice(0, 10);
        const hasSlots = bookableStudioSlots.some((item) => sameCalendarDay(item.startsAt, key));
        return { key, label: new Intl.DateTimeFormat(locale, { weekday: "narrow", timeZone: "UTC" }).format(date), fullLabel: new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: "UTC" }).format(date), date: new Intl.DateTimeFormat(locale, { day: "numeric", timeZone: "UTC" }).format(date), hasSlots };
      })
    : [];
  const rentalSlotsForDay = bookingDay ? bookableStudioSlots.filter((item) => sameCalendarDay(item.startsAt, bookingDay)) : [];
  const eventOffers = {
    watercolor: {
      label: lang === "lv" ? "AKVARELIS" : lang === "ru" ? "АКВАРЕЛЬ" : "WATERCOLOUR",
      duration: 2,
      description: lang === "lv" ? "Visi sēž pie galda un 2 stundas glezno ar akvareli — mierīgs, sarunām piemērots formāts." : lang === "ru" ? "Все сидят за столом и 2 часа рисуют акварелью — спокойный формат для общения." : "Everyone sits around the table and paints in watercolour for two relaxed hours.",
    },
    acrylic: {
      label: lang === "lv" ? "GLEZNOŠANA AR AKRILU" : lang === "ru" ? "АКРИЛОВАЯ ЖИВОПИСЬ" : "ACRYLIC PAINTING",
      duration: 3,
      description: lang === "lv" ? "Katrs glezno savu darbu ar akrila krāsām 3 stundas — ar materiāliem un vadību uz vietas." : lang === "ru" ? "Каждый создаёт свою работу акрилом в течение 3 часов — материалы и сопровождение включены." : "Everyone creates their own acrylic painting over three hours, with materials and guidance included.",
    },
    canvas: {
      label: lang === "lv" ? "LIELAIS KOPĪGAIS AUDEKLS" : lang === "ru" ? "ОБЩИЙ БОЛЬШОЙ ХОЛСТ" : "LARGE SHARED CANVAS",
      duration: 3,
      description: lang === "lv" ? "Visi viesi kopā glezno vienu lielu komandas darbu — paliekošu kopīgu mākslas darbu pēc pasākuma." : lang === "ru" ? "Все гости вместе создают одну большую командную работу — общее произведение искусства на память." : "All guests paint one large shared teamwork piece to keep as a lasting memory of the event.",
    },
    custom: {
      label: lang === "lv" ? "SAVA IDEJA" : lang === "ru" ? "СВОЯ ИДЕЯ" : "YOUR IDEA",
      duration: 2,
      description: lang === "lv" ? "Atnes savu pasākuma ideju — kopā atradīsim piemērotāko radošo formātu un ritmu." : lang === "ru" ? "Приходите со своей идеей события — вместе найдём подходящий творческий формат и ритм." : "Bring your event idea and we will shape the right creative format and pace together.",
    },
  };
  const eventOffer = eventOffers[eventFormat];
  const eventNeedsAttendees = eventFormat === "watercolor" || eventFormat === "acrylic";
  const eventPersonRate = eventFormat === "watercolor" ? 20 : eventFormat === "acrylic" ? 35 : 0;
  const eventAttendeeLabel = lang === "lv"
    ? (eventAttendees === 1 ? "dalībnieks" : "dalībnieki")
    : lang === "ru"
      ? (eventAttendees === 1 ? "участник" : "участников")
      : (eventAttendees === 1 ? "attendee" : "attendees");
  const eventBaseDuration = eventFormat === "custom" ? 0 : eventOffer.duration + 2;
  // Customers may enquire about any length from one hour. The price retains
  // each painting format's included studio time; choosing a shorter window
  // never creates a misleading discount on the creative activity itself.
  const minimumEventDuration = 1;
  const eventDurationOptions = Array.from(
    { length: 10 - minimumEventDuration + 1 },
    (_, index) => minimumEventDuration + index,
  );
  const eventClassEstimate = eventNeedsAttendees
    ? eventAttendees * eventPersonRate
    : eventFormat === "canvas"
      ? 200
      : eventDuration * 15;
  const eventMonthStarts = Array.from({ length: 6 }, (_, index) => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + index, 1, 12);
  });
  const activeEventMonth = eventMonthStarts[eventMonth] || eventMonthStarts[0];
  const eventMonthLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(activeEventMonth);
  const eventDayKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const eventHours = Array.from({ length: Math.max(0, 24 - eventDuration - 11 + 1) }, (_, index) => 11 + index);
  const eventOverlapsBusyTime = (dateKey, hour, duration, busyTime) => {
    const busyStartDay = rigaDateKey(busyTime.starts_at);
    const busyEndDay = rigaDateKey(busyTime.ends_at);
    if (dateKey < busyStartDay || dateKey > busyEndDay) return false;
    const busyStart = busyStartDay === dateKey ? rigaMinuteOfDay(busyTime.starts_at) : 0;
    const busyEnd = busyEndDay === dateKey ? rigaMinuteOfDay(busyTime.ends_at) : 24 * 60;
    const eventStart = hour * 60;
    const eventEnd = (hour + duration) * 60;
    return eventStart < busyEnd && eventEnd > busyStart;
  };
  const eventAvailableHours = (dateKey, duration = eventDuration) => {
    if (!dateKey) return [];
    const hours = Array.from({ length: Math.max(0, 24 - duration - 11 + 1) }, (_, index) => 11 + index);
    return hours.filter((hour) => !(availability.eventBusyTimes || []).some((busyTime) => eventOverlapsBusyTime(dateKey, hour, duration, busyTime)));
  };
  const eventStartIsAvailable = Boolean(eventDate && eventAvailableHours(eventDate).includes(eventStartHour));
  const eventCalendarCells = (() => {
    const first = new Date(activeEventMonth.getFullYear(), activeEventMonth.getMonth(), 1);
    const leading = (first.getDay() + 6) % 7;
    const total = new Date(activeEventMonth.getFullYear(), activeEventMonth.getMonth() + 1, 0).getDate();
    return Array.from({ length: leading + total }, (_, index) => {
      if (index < leading) return null;
      const date = new Date(activeEventMonth.getFullYear(), activeEventMonth.getMonth(), index - leading + 1, 12);
      const key = eventDayKey(date);
      const isPast = key < eventDayKey(new Date());
      return { key, day: date.getDate(), isPast, unavailable: !isPast && eventAvailableHours(key).length === 0 };
    });
  })();
  const selectedEventExtraHours = eventFormat === "custom"
    ? 0
    : Math.max(0, eventDuration - eventBaseDuration);
  const selectedEventExtraPrice = selectedEventExtraHours * 15;
  const selectedEventEstimate = eventClassEstimate + selectedEventExtraPrice;
  const weeklyColumns = visibleWeek ? [4, 6, 0].map((day) => {
    const date = new Date(`${visibleWeek}T12:00:00Z`);
    date.setUTCDate(date.getUTCDate() + ((day + 6) % 7));
    return {
      key: date.toISOString().slice(0, 10),
      date,
      sessions: liveClasses.filter(
        (item) =>
          weekStartKey(item.startsAt) === visibleWeek && weekdayInRiga(item.startsAt) === day,
      ),
    };
  }) : [];
  const weeklyDayLabel = (session, multiline = false) => {
    const date = new Date(session.startsAt);
    if (lang === "en") {
      return new Intl.DateTimeFormat(locale, {
        timeZone: "Europe/Riga",
        weekday: "long",
        day: "numeric",
        month: "short",
      }).format(date);
    }

    // Latvian and Russian dates use their native punctuation: a full weekday,
    // then the date on its own line in the schedule, with a dot after the day
    // number and title-case month.
    const weekdays = lang === "lv"
      ? ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"]
      : ["Воскр.", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const day = new Intl.DateTimeFormat(locale, { timeZone: "Europe/Riga", day: "numeric" }).format(date);
    const month = new Intl.DateTimeFormat(locale, { timeZone: "Europe/Riga", month: "short" })
      .format(date)
      .replace(/[.,]$/u, "");
    const monthTitle = month ? `${month.charAt(0).toLocaleUpperCase(locale)}${month.slice(1)}` : "";
    const dateLabel = `${day}. ${monthTitle}`;
    const weekday = weekdays[weekdayInRiga(session.startsAt)];
    return multiline ? <><span>{weekday}</span><span>{dateLabel}</span></> : `${weekday} ${dateLabel}`;
  };
  const changeScheduleWeek = (direction) => {
    const nextWeek = Math.max(0, Math.min(scheduleWeeks.length - 1, activeScheduleWeek + direction));
    if (nextWeek === activeScheduleWeek) return;
    setScheduleWeek(nextWeek);
    if (form && calendarKind === "class") {
      const nextSession = liveClasses.find((item) => weekStartKey(item.startsAt) === scheduleWeeks[nextWeek]);
      setBookingDay(nextSession ? rigaDateKey(nextSession.startsAt) : "");
      setBooking(null);
      setSelection("");
    }
  };
  const changeRentalWeek = (direction) => {
    const nextWeek = Math.max(0, Math.min(rentalWeeks.length - 1, rentalWeek + direction));
    if (nextWeek === rentalWeek) return;
    setRentalWeek(nextWeek);
    const firstSlot = bookableStudioSlots.find((item) => weekStartKey(item.startsAt) === rentalWeeks[nextWeek]);
    setBookingDay(firstSlot ? rigaDateKey(firstSlot.startsAt) : "");
    setBooking(null);
    setSelection("");
  };
  const openBooking = (kind, itemId, label) => {
    const selectedSession = kind === "class" ? liveClasses.find((item) => item.id === itemId) : null;
    if (selectedSession) {
      const week = scheduleWeeks.indexOf(weekStartKey(selectedSession.startsAt));
      if (week >= 0) setScheduleWeek(week);
      setBookingDay(rigaDateKey(selectedSession.startsAt));
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
    if (kind === "rental" || kind === "private" || kind === "treatment-room") {
      setRentalWeek(0);
      const firstSlot = kind === "private"
        ? availablePrivateSessions[0]
        : kind === "treatment-room"
          ? availableTattooRoomSessions[0]
          : availableRentalSlots[0];
      setBookingDay(rigaDateKey(firstSlot?.startsAt));
    } else setBookingDay(kind === "class" ? weekDays.find((day) => day.hasClass)?.key || "" : "");
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
  const openInquiry = (topic) => {
    setBooking({ kind: "inquiry" });
    setSelection("");
    setCalendarKind("inquiry");
    setCheckoutOption("");
    setInquiryTopic(topic);
    setBookingDay("");
    setStatus("");
    setSent(false);
    setConfirmationEmailSent(false);
    setForm(true);
  };
  const openEventFormat = (format) => {
    setEventFormat(format);
    setBooking(null);
    setSelection("");
    setCalendarKind("event-format");
    setInquiryTopic(events.emailSubject);
    setStatus("");
    setSent(false);
    setForm(true);
  };
  const openEventInquiry = (format = eventFormat) => {
    setEventFormat(format);
    setBooking({ kind: "inquiry" });
    setSelection("");
    setCalendarKind("event");
    setInquiryTopic(events.emailSubject);
    setEventMonth(0);
    setEventDate("");
    setEventStartHour(11);
    setEventDuration(1);
    setStatus("");
    setSent(false);
    setForm(true);
  };
  const submit = async (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter?.value || "reserve";
    const data = new FormData(e.currentTarget);
    const customerName = String(data.get("firstName") || "").trim();
    const customerEmail = String(data.get("email") || "").trim().toLowerCase();
    try {
      window.localStorage.setItem("inspire-booking-email", customerEmail);
      setSavedEmail(customerEmail);
    } catch {}
    if (!booking) return;
    if (booking.kind === "inquiry" || (calendarKind === "treatment-room" && action === "inquiry")) {
      setStatus(lang === "lv" ? "Nosūtām ziņu…" : lang === "ru" ? "Отправляем сообщение…" : "Sending your message…");
      try {
        const response = await fetch("/api/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: customerName,
            email: customerEmail,
            kind: calendarKind === "event" ? "event" : undefined,
            topic: calendarKind === "treatment-room"
              ? (lang === "lv" ? "Tattoo telpas datuma rezervēšanas pieprasījums" : lang === "ru" ? "Запрос на резервирование даты для тату-комнаты" : "Tattoo room date-reservation request")
              : String(data.get("topic") || inquiryTopic).trim(),
            message: `${String(data.get("message") || "").trim()}${calendarKind === "treatment-room" ? `\n\n${lang === "lv" ? "TATTOO TELPA" : lang === "ru" ? "ТАТУ-КОМНАТА" : "TATTOO ROOM"}\n${booking.label}\n${lang === "lv" ? "Cena" : lang === "ru" ? "Цена" : "Price"}: €20` : calendarKind === "event" ? `\n\nPASĀKUMA PIEPRASĪJUMS\nFormāts: ${eventOffer.label}${eventNeedsAttendees ? `\nDalībnieki: ${eventAttendees}` : ""}\nDatums: ${eventDate}\nLaiks: ${String(eventStartHour).padStart(2, "0")}:00–${String(eventStartHour + eventDuration).padStart(2, "0")}:00\nIlgums: ${eventDuration} stundas\nAptuvenā cena: €${selectedEventEstimate}${eventFormat === "custom" ? `\nTelpas noma: ${eventDuration} h × €15` : `\nIekļautais pasākuma ilgums: ${eventBaseDuration} h\nPapildu studijas laiks: ${selectedEventExtraHours} h × €15 = €${selectedEventExtraPrice}`}` : ""}`,
          }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Could not send your message.");
        setSent(true);
      } catch (error) {
        setStatus(error.message);
      }
      return;
    }
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
  const submitContact = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("firstName") || "").trim();
    const email = String(data.get("email") || "").trim().toLowerCase();
    const message = String(data.get("message") || "").trim();
    setContactStatus(lang === "lv" ? "Nosūtām ziņu…" : lang === "ru" ? "Отправляем сообщение…" : "Sending your message…");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          topic: lang === "lv" ? "Ziņa no kontaktu lapas" : lang === "ru" ? "Сообщение со страницы контактов" : "Message from the contact page",
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not send your message.");
      try {
        window.localStorage.setItem("inspire-booking-email", email);
        setSavedEmail(email);
      } catch {}
      e.currentTarget.reset();
      setContactStatus(lang === "lv" ? "Paldies — ziņa ir nosūtīta." : lang === "ru" ? "Спасибо — сообщение отправлено." : "Thank you — your message has been sent.");
    } catch (error) {
      setContactStatus(error.message);
    }
  };
  return (
    <main className={`inspire inspire-page-${showContactsFromMenu ? "contact" : page}`} lang={lang}>
      {page === "contact" ? <span className="inspire-contact-atmosphere-word" aria-hidden="true">RĪGA / RADĪT / IEDVESMOT</span> : null}
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
      {page === "questions" && <script
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
      />}
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
          <InspireMoodQuote lang={lang} />
        </div>
        <div className="inspire-language inspire-masthead-language" aria-label="Language">
          <button className={lang === "lv" ? "active" : ""} onClick={() => chooseLanguage("lv")}>LV</button>
          <button className={lang === "en" ? "active" : ""} onClick={() => chooseLanguage("en")}>EN</button>
          <button className={lang === "ru" ? "active" : ""} onClick={() => chooseLanguage("ru")}>RU</button>
        </div>
      </section>
      <nav className="inspire-icon-nav" aria-label="Inspire sections">
        <button
          type="button"
          className="inspire-mobile-menu-toggle"
          aria-expanded="false"
          aria-controls="inspire-navigation-links"
          onClick={(event) => {
            const menu = event.currentTarget.closest(".inspire-icon-nav");
            const open = !menu?.classList.contains("is-open");
            menu?.classList.toggle("is-open", open);
            event.currentTarget.setAttribute("aria-expanded", String(open));
            const mark = event.currentTarget.querySelector("b");
            if (mark) mark.textContent = open ? "×" : "+";
          }}
        >
          <span>{lang === "lv" ? "IZVĒLNE" : lang === "ru" ? "МЕНЮ" : "MENU"}</span>
          <b aria-hidden="true">+</b>
        </button>
        <div id="inspire-navigation-links" className="inspire-navigation-links">
        <a href="/classes" onClick={closeMobileMenuAndShowContent}>
          <img src="/art/inspire-icon-calendar.png" alt="" />
          <span>{t.apply}</span>
        </a>
        <a href="/method" onClick={closeMobileMenuAndShowContent}>
          <img src="/art/inspire-icon-palette.png" alt="" />
          <span>
            {lang === "lv"
              ? "MĀCĪBU METODE"
              : lang === "ru"
                ? "МЕТОД ОБУЧЕНИЯ"
                : "HOW WE WORK"}
          </span>
        </a>
        <a href="/events" onClick={closeMobileMenuAndShowContent}>
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
        <a href="/contact" onClick={closeMobileMenuAndShowContent}>
          <img src="/art/inspire-icon-pin.png" alt="" />
          <span>{lang === "lv" ? "KONTAKTI" : lang === "ru" ? "КОНТАКТЫ" : "CONTACT"}</span>
        </a>
        <a href="/about" onClick={closeMobileMenuAndShowContent}>
          <img src="/art/inspire-icon-easel.png" alt="" />
          <span>{lang === "lv" ? "PAR STUDIJU" : lang === "ru" ? "О СТУДИИ" : "ABOUT THE STUDIO"}</span>
        </a>
        <a href="/questions" onClick={closeMobileMenuAndShowContent}>
          <span>{lang === "lv" ? "JAUTĀJUMI" : lang === "ru" ? "ВОПРОСЫ" : "FAQ"}</span>
        </a>
        </div>
      </nav>
      {page === "home" && <section className="inspire-statement">
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
        <InspireRotatingGallery
          className="inspire-statement-slideshow"
          label="Art Studio Inspire gallery"
          slides={showcaseSlides}
          resolveImage={(src, index) => image(`inspire.image.statement.${index}`, src)}
          intervalMs={6200}
        />
      </section>}
      {page === "classes" && <section id="nodarbibas" className="inspire-section">
        <div className="inspire-schedule-heading">
          <div className="inspire-schedule-title">
            <p className="inspire-kicker">
              {lang === "lv"
                ? <><span>ATVĒRTĀS</span><span>KATRU NEDĒĻU</span></>
                : lang === "ru"
                  ? <><span>ОТКРЫТЫЕ</span><span>КАЖДУЮ НЕДЕЛЮ</span></>
                  : <><span>OPEN</span><span>EVERY WEEK</span></>}
            </p>
            <h2>{t.group}</h2>
          </div>
          {scheduleWeeks.length > 0 && <div className="inspire-week-switcher" aria-label={lang === "lv" ? "Nedēļas grafiks" : lang === "ru" ? "Расписание недели" : "Weekly schedule"}>
            <button type="button" aria-label={lang === "lv" ? "Iepriekšējā nedēļa" : lang === "ru" ? "Предыдущая неделя" : "Previous week"} onClick={() => changeScheduleWeek(-1)} disabled={activeScheduleWeek === 0}>‹</button>
            <div className="inspire-week-strip" aria-label={new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(new Date(`${visibleWeek}T12:00:00`))}>
              {weekDays.map((day) => <span key={day.key} aria-label={`${day.fullLabel} ${day.date}`} className={day.hasClass ? "available" : ""}><small>{day.label}</small><b>{day.date}</b></span>)}
            </div>
            <button type="button" aria-label={lang === "lv" ? "Nākamā nedēļa" : lang === "ru" ? "Следующая неделя" : "Next week"} onClick={() => changeScheduleWeek(1)} disabled={activeScheduleWeek >= scheduleWeeks.length - 1}>›</button>
          </div>}
        </div>
        <div className="inspire-weekly-columns">
          {weeklyColumns.map((column) => (
            <div key={column.key}>
              <h3>{weeklyDayLabel({ startsAt: column.date.toISOString() }, true)}</h3>
              {column.sessions.length ? column.sessions.map((session) => {
                const seats = remaining(session.id, session.seats);
                return (
                <button
                  key={session.id}
                  className={session.past ? "is-past" : ""}
                  disabled={seats < 1 || session.past}
                  onClick={() => openBooking("class", session.id, `${session.date} · ${session.time} · ${sessionName(session)}`)}
                >
                  <b>{session.time}</b>
                  <small>{sessionName(session)}</small>
                  <i>{session.past ? (lang === "lv" ? "PAGĀJUSI" : lang === "ru" ? "ЗАВЕРШЕНО" : "PAST") : seats < 1 ? (lang === "lv" ? "PILNS" : lang === "ru" ? "НЕТ МЕСТ" : "FULL") : `${t.reserve} →`}</i>
                </button>
                );
              }) : <span className="inspire-empty-session" aria-label={lang === "lv" ? "Šajā dienā nodarbība nenotiek" : lang === "ru" ? "В этот день занятия нет" : "No class on this day"}>{lang === "lv" ? "NODARBĪBU NAV" : lang === "ru" ? "ЗАНЯТИЙ НЕТ" : "NO CLASS"}</span>}
            </div>
          ))}
        </div>
        <p className="inspire-prices">
          <span>{t.price}</span>
          <small>{t.materialsIncluded}</small>
          <small>{lang === "lv" ? "NODARBĪBAS ILGUMS — 2 STUNDAS" : lang === "ru" ? "ДЛИТЕЛЬНОСТЬ ЗАНЯТИЯ — 2 ЧАСА" : "CLASS DURATION — 2 HOURS"}</small>
        </p>
      </section>}
      {page === "classes" && <section className="inspire-section inspire-booking">
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
                  : option === "treatment-room"
                    ? "treatment-room"
                  : "class";
            const hasNoSlots =
              option === "rental"
                ? !availableRentalSlots.length
                : option === "private"
                  ? !availablePrivateSlots.length
                  : option === "treatment-room" && !availableTattooRoomSlots.length;
            const personal = option === "membership";
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
                  <button
                    type="button"
                    className="inspire-rent-contact"
                    onClick={() => openInquiry(subject)}
                  >
                    {contactLabel}
                  </button>
                ) : directPurchase ? (
                  <button
                    onClick={option === "pass" ? openClassPass : () => openGiftCard()}
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
              <div className="inspire-space-preview inspire-gallery-grid" aria-label={host.details}>
                {studioPreviewGalleryImages.map(([src, alt], index) => (
                  <button
                    key={`${src}-${index}`}
                    type="button"
                    aria-label={`${alt}. Skatīt lielākā izmērā`}
                    onClick={() => setImagePreview({ src, alt })}
                  >
                    <img src={src} alt={alt} loading="lazy" decoding="async" onLoad={(event) => {
                      const { naturalWidth, naturalHeight } = event.currentTarget;
                      if (naturalWidth && naturalHeight) event.currentTarget.parentElement.style.setProperty("--gallery-ratio", naturalWidth / naturalHeight);
                    }} />
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
                className="inspire-space-preview inspire-tattoo-preview inspire-gallery-grid"
                aria-label={host.tattooTitle}
              >
                {tattooPreviewGalleryImages.map(([src, alt], index) => (
                  <button
                    key={`${src}-${index}`}
                    type="button"
                    aria-label={`${alt}. Skatīt lielākā izmērā`}
                    onClick={() => setImagePreview({ src, alt })}
                  >
                    <img src={src} alt={alt} loading="lazy" decoding="async" onLoad={(event) => {
                      const { naturalWidth, naturalHeight } = event.currentTarget;
                      if (naturalWidth && naturalHeight) event.currentTarget.parentElement.style.setProperty("--gallery-ratio", naturalWidth / naturalHeight);
                    }} />
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
            ? "PIETEIKUMIEM APMAKSA NETIEK PRASĪTA UZREIZ. Jebkura rezervācija jāatceļ vai jāpārceļ vismaz 24 stundas pirms nodarbības; līdz tam — bezmaksas atcelšana un automātiska atmaksa."
            : lang === "ru"
              ? "ДЛЯ ЗАЯВОК ПРЕДОПЛАТА НЕ НУЖНА. Любую бронь нужно отменить или перенести не позднее чем за 24 часа до занятия; до этого возможны бесплатная отмена и автоматический возврат."
              : "APPLICATIONS DO NOT REQUIRE PAYMENT UPFRONT. Any reservation must be cancelled or rescheduled at least 24 hours before the class; until then, cancellation is free and the refund is automatic."}
        </p>
      </section>}
      {page === "about" && (
        <section id="par-studiju" className="inspire-about-studio-intro">
          <div>
            <p className="inspire-kicker">
              {lang === "lv" ? "PAR STUDIJU" : lang === "ru" ? "О СТУДИИ" : "ABOUT THE STUDIO"}
            </p>
            <h1>
              {lang === "lv" ? "Vieta, kur idejai dod laiku." : lang === "ru" ? "Место, где идее дают время." : "A place that gives ideas time."}
            </h1>
          </div>
          <div className="inspire-about-studio-intro-copy">
            <p>
              {content(
                "inspire.about.studio.intro",
                lang === "lv"
                  ? "Art Studio Inspire ir neatkarīga gleznošanas studija Rīgas centrā, Miera ielā 17. To izveidoja māksliniece Sandra Rudzīte kā regulāru, pieejamu vietu bērniem, jauniešiem un pieaugušajiem — lai gleznotu, mācītos un īstenotu savas idejas bez spiediena iederēties vienā stilā. Materiāli un profesionāls atbalsts ir uz vietas; darbu sākam no tā, kas Tev šobrīd svarīgs."
                  : lang === "ru"
                    ? "Art Studio Inspire — независимая художественная студия в центре Риги, на улице Миера, 17. Художница Сандра Рудзите создала её как постоянное, доступное место для детей, подростков и взрослых — чтобы рисовать, учиться и воплощать свои идеи без давления соответствовать одному стилю. Материалы и профессиональная поддержка есть в студии; мы начинаем с того, что важно вам сейчас."
                    : "Art Studio Inspire is an independent painting studio in central Riga, at Miera iela 17. Artist Sandra Rudzīte created it as a regular, accessible place for children, young people and adults to paint, learn and realise their ideas without pressure to fit one style. Materials and professional support are here; we begin with what matters to you now.",
              )}
            </p>
            <ul aria-label={lang === "lv" ? "Studijas pamatinformācija" : "Studio essentials"}>
              <li>{lang === "lv" ? "Miera iela 17, Rīga" : lang === "ru" ? "Миера, 17, Рига" : "Miera iela 17, Riga"}</li>
              <li>{lang === "lv" ? "Bērniem, jauniešiem un pieaugušajiem" : lang === "ru" ? "Для детей, подростков и взрослых" : "For children, young people and adults"}</li>
              <li>{lang === "lv" ? "Materiāli un atbalsts uz vietas" : lang === "ru" ? "Материалы и поддержка на месте" : "Materials and support on site"}</li>
            </ul>
          </div>
        </section>
      )}
      {isAboutView && <section id={page === "method" ? "metode" : undefined} className="inspire-capabilities">
        <div>
          <p className="inspire-kicker">
            {lang === "lv" ? "PAR STUDIJU" : lang === "ru" ? "О СТУДИИ" : "ABOUT THE STUDIO"}
          </p>
          <h2>{capabilities.title}</h2>
          <p>{capabilities.lead}</p>
          {page !== "home" && (
            <nav className="inspire-about-chapter-nav" aria-label={lang === "lv" ? "Par studiju sadaļas" : lang === "ru" ? "Разделы о студии" : "About the studio sections"}>
              {aboutChapterLinks.map(([targetId, label]) => (
                <button key={targetId} type="button" onClick={() => openAboutChapter(targetId)}>
                  <span>{label}</span>
                  <b aria-hidden="true">→</b>
                </button>
              ))}
            </nav>
          )}
        </div>
        <div className="inspire-capability-grid">
          {capabilities.items.map(([title, body, bullets], index) => (
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
              {bullets && (
                <ul>
                  {bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </article>
          ))}
        </div>
        {page === "home" && (
          <div className="inspire-capability-audiences" aria-label={lang === "lv" ? "Studijas pieejas" : lang === "ru" ? "Подходы студии" : "Studio approaches"}>
            {audienceOverview.map((item) => (
              <details key={item.title} className="inspire-capability-audience">
                <summary>
                  <span>{item.title}</span>
                  <b aria-hidden="true">+</b>
                  <em>
                    {lang === "lv"
                      ? "ATVĒRT MĀCĪBU METODI"
                      : lang === "ru"
                        ? "ОТКРЫТЬ МЕТОД"
                        : "OPEN THE METHOD"}
                  </em>
                </summary>
                <div>
                  <p>{item.body}</p>
                  <a href={item.href}>{item.cta}</a>
                </div>
              </details>
            ))}
          </div>
        )}
      </section>}
      {isAboutView && <section className="inspire-depth">
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
              <section className="inspire-host-story-section inspire-host-story-inline">
                <div className="inspire-host-stories">
                  <p className="inspire-kicker">
                    {lang === "lv" ? "SANDRAS STĀSTS" : lang === "ru" ? "ИСТОРИЯ САНДРЫ" : "SANDRA’S STORY"}
                  </p>
                  {hostStories.map(([title, body]) => (
                    <details key={title}>
                      <summary>
                        <strong>{title}</strong>
                        <b>+</b>
                      </summary>
                      <p>{body}</p>
                    </details>
                  ))}
                </div>
              </section>
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
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={image(
                    "inspire.image.host.1",
                    "/art/sandra-studio-tea-upright.webp",
                  )}
                  alt="Sandra Rudzīte enjoying tea in her sunlit studio"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={image(
                    "inspire.image.host.2",
                    "/art/sandra-studio-07.webp",
                  )}
                  alt="Sandra Rudzīte painting a dramatic studio work"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </section>
          <section className="inspire-host-art-section">
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
              <div className="inspire-gallery-grid">
                {[
                  ["/art/sandra-art-red-eyes.webp", "Red Eyes, original painting by Sandra Rudzīte"],
                  ["/art/sandra-art-eye.webp", "Eye, original painting by Sandra Rudzīte"],
                  ["/art/sandra-art-raven.webp", "Raven, original painting by Sandra Rudzīte"],
                  ["/art/sandra-art-drips.webp", "Abstract painting with layered drips by Sandra Rudzīte"],
                  ["/art/sandra-art-sea.webp", "Dreamy seascape painting by Sandra Rudzīte"],
                  ["/art/sandra-art-lakeside.webp", "Lakeside landscape painting by Sandra Rudzīte"],
                  ["/art/sandra-art-canal.webp", "Canal landscape painting by Sandra Rudzīte"],
                  ["/art/sandra-art-raven-drawing.webp", "Raven drawing by Sandra Rudzīte"],
                ].map(([src, alt]) => (
                  <button
                    type="button"
                    key={src}
                    onClick={() => setImagePreview({ src, alt })}
                    aria-label={`${alt}. Skatīt lielākā izmērā`}
                  >
                    <img
                      src={src}
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                      onLoad={(event) => {
                        const { naturalWidth, naturalHeight } = event.currentTarget;
                        if (naturalWidth && naturalHeight) event.currentTarget.parentElement.style.setProperty("--gallery-ratio", naturalWidth / naturalHeight);
                      }}
                    />
                  </button>
                ))}
              </div>
              </details>
            </div>
          </section>
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
            <em className="inspire-panel-open-hint" aria-hidden="true">
              {lang === "lv" ? "ATVĒRT" : lang === "ru" ? "ОТКРЫТЬ" : "OPEN"}
              <b>⌄</b>
            </em>
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
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="inspire-proof-list">
              {approach.items.map(([title, body], index) => (
                <details key={title} open={index === 0}>
                  <summary>
                    <strong>{content(`inspire.adults.item.${index}.title`, title)}</strong>
                    <b>+</b>
                  </summary>
                  <p>{content(`inspire.adults.item.${index}.body`, body)}</p>
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
            <em className="inspire-panel-open-hint" aria-hidden="true">
              {lang === "lv" ? "ATVĒRT" : lang === "ru" ? "ОТКРЫТЬ" : "OPEN"}
              <b>⌄</b>
            </em>
          </summary>
          <section id="berni-un-jauniesi" className="inspire-proof inspire-youth-proof">
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
              <p>{content("inspire.youth.body", t.youthBody)}</p>
            </div>
            <div className="inspire-proof-list">
              {youthPrinciples.map(([title, body], index) => (
                <details key={title} open={index === 0}>
                  <summary>
                    <strong>{content(`inspire.youth.item.${index}.title`, title)}</strong>
                    <b>+</b>
                  </summary>
                  <p>{content(`inspire.youth.item.${index}.body`, body)}</p>
                </details>
              ))}
            </div>
          </section>
        </details>
      </section>}
      {isAboutView && <section id="studentu-darbi" className="inspire-student-galleries">
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
              ? "SKATĪT PIEAUGUŠO DARBUS"
              : lang === "ru"
                ? "ПОСМОТРЕТЬ РАБОТЫ ВЗРОСЛЫХ"
                : "VIEW ADULT WORK"}
            <b>+</b>
          </summary>
          <div className="inspire-gallery-grid">
            {adultGallerySlides.map(([src, alt], index) => (
              <button
                type="button"
                key={`${src}-${index}`}
                className="inspire-student-gallery-item"
                onClick={() => setImagePreview({ src: image(`inspire.image.gallery.adult.${index}`, src), alt })}
              >
                <img
                  src={image(`inspire.image.gallery.adult.${index}`, src)}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  onLoad={(event) => {
                    const { naturalWidth, naturalHeight } = event.currentTarget;
                    if (naturalWidth && naturalHeight) event.currentTarget.parentElement.style.setProperty("--gallery-ratio", naturalWidth / naturalHeight);
                  }}
                />
              </button>
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
          <div className="inspire-gallery-grid">
            {youthGallerySlides.map(([src, alt], index) => (
              <button
                type="button"
                key={`${src}-${index}`}
                className="inspire-student-gallery-item"
                onClick={() => setImagePreview({ src: image(`inspire.image.gallery.youth.${index}`, src), alt })}
              >
                <img
                  src={image(`inspire.image.gallery.youth.${index}`, src)}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  onLoad={(event) => {
                    const { naturalWidth, naturalHeight } = event.currentTarget;
                    if (naturalWidth && naturalHeight) event.currentTarget.parentElement.style.setProperty("--gallery-ratio", naturalWidth / naturalHeight);
                  }}
                />
              </button>
            ))}
          </div>
        </details>
      </section>}
      {page === "events" && <section id="pasakumi" className="inspire-events">
        <div className="inspire-events-top">
          <div className="inspire-events-intro">
            <p className="inspire-kicker">{t.events}</p>
            <h2 className="inspire-events-title">
              {content("inspire.events.title", t.eventTitle)
                .replace(/\s*·\s*/g, "\n")
                .split("\n")
                .map((line, index) => (
                  <span key={`${line}-${index}`}>{line.charAt(0).toLocaleUpperCase(locale)}{line.slice(1)}</span>
                ))}
            </h2>
            <p>
              {content("inspire.events.lead", events.lead)}
              <span className="inspire-events-shared-phrase">
                {lang === "lv"
                  ? "Kopīgi radīta pieredze kļūst par atmiņu, kas satuvina."
                  : lang === "ru"
                    ? "Совместно созданный опыт становится воспоминанием, которое сближает."
                    : "A shared creative experience becomes a memory that brings people closer."}
              </span>
            </p>
            <button
              type="button"
              className="inspire-event-primary-cta"
              onClick={() => openEventInquiry()}
            >
              {events.cta}
            </button>
          </div>
          <InspireRotatingGallery
            className="inspire-event-gallery inspire-event-slideshow"
            label="Private events at Art Studio Inspire"
            slides={eventSlides}
            resolveImage={(src, index) => image(`inspire.image.event.${index}`, src)}
            intervalMs={5200}
          />
        </div>
        <div className="inspire-event-rates" aria-label={lang === "lv" ? "Pasākuma sākuma cenas" : lang === "ru" ? "Стартовые цены события" : "Event starting prices"}>
          {events.rates.map(([title, price, meta], index) => (
            <button
              type="button"
              key={title}
              onClick={() => openEventFormat(["watercolor", "acrylic", "canvas"][index])}
              aria-label={`${title}: ${price}`}
            >
              <p>{title}</p>
              <b>{price}</b>
              {meta ? <span>{meta}</span> : null}
            </button>
          ))}
        </div>
        <section className="inspire-event-included" aria-labelledby="event-included-title">
          <p id="event-included-title" className="inspire-event-section-label">
            {lang === "lv" ? "KAS PIEEJAMS TAVAM PASĀKUMAM" : lang === "ru" ? "ЧТО МОЖНО ДОБАВИТЬ К ВАШЕМУ СОБЫТИЮ" : "WHAT YOUR EVENT CAN INCLUDE"}
          </p>
          <ul className="inspire-event-highlights">
          {eventHighlights.map(([label, value]) => (
            <li key={label}>
              <b>{label}</b>
              <span>{value}</span>
            </li>
          ))}
          </ul>
        </section>
        {events.formatsLabel ? (
          <p className="inspire-event-formats-label">{events.formatsLabel}</p>
        ) : null}
        <div className="inspire-event-grid">
          {events.formats.map(([title, body], index) => (
            <details key={title} open={index === 0}>
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
            <div className="inspire-event-room-details inspire-space-details">
              <details>
                <summary>
                  {host.details}
                  <b>+</b>
                </summary>
                <div>
                  <p>{content("inspire.host.space", host.studio)}</p>
                  <p>{host.hire}</p>
                  <div className="inspire-space-preview inspire-gallery-grid" aria-label={host.details}>
                    {studioPreviewGalleryImages.map(([src, alt], index) => (
                      <button
                        key={`${src}-${index}`}
                        type="button"
                        aria-label={`${alt}. Skatīt lielākā izmērā`}
                        onClick={() => setImagePreview({ src, alt })}
                      >
                        <img src={src} alt={alt} loading="lazy" decoding="async" onLoad={(event) => {
                          const { naturalWidth, naturalHeight } = event.currentTarget;
                          if (naturalWidth && naturalHeight) event.currentTarget.parentElement.style.setProperty("--gallery-ratio", naturalWidth / naturalHeight);
                        }} />
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
                  <div className="inspire-space-preview inspire-tattoo-preview inspire-gallery-grid" aria-label={host.tattooTitle}>
                    {tattooPreviewGalleryImages.map(([src, alt], index) => (
                      <button
                        key={`${src}-${index}`}
                        type="button"
                        aria-label={`${alt}. Skatīt lielākā izmērā`}
                        onClick={() => setImagePreview({ src, alt })}
                      >
                        <img src={src} alt={alt} loading="lazy" decoding="async" onLoad={(event) => {
                          const { naturalWidth, naturalHeight } = event.currentTarget;
                          if (naturalWidth && naturalHeight) event.currentTarget.parentElement.style.setProperty("--gallery-ratio", naturalWidth / naturalHeight);
                        }} />
                      </button>
                    ))}
                  </div>
                </div>
              </details>
            </div>
          </div>
        ) : null}
        <p className="inspire-event-support">{host.event}</p>
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
      </section>}
      {isContactView && <section id="sazinies" className="inspire-contact-panel" aria-label={lang === "lv" ? "Sazinies ar mums" : lang === "ru" ? "Свяжитесь с нами" : "Contact us"}>
        <div className="inspire-contact-card inspire-contact-card-info">
          <p className="inspire-contact-card-kicker">{lang === "lv" ? "SAZINIES AR MUMS" : lang === "ru" ? "СВЯЖИТЕСЬ С НАМИ" : "GET IN TOUCH"}</p>
          <h3>{lang === "lv" ? "Radīsim ko īpašu kopā!" : lang === "ru" ? "Давайте создадим что-то особенное вместе!" : "Let’s create something special together!"}</h3>
          <p className="inspire-contact-card-copy">{lang === "lv" ? "Mēs vienmēr esam atvērti jaunām idejām, sadarbībai un radošiem projektiem." : lang === "ru" ? "Мы всегда открыты новым идеям, сотрудничеству и творческим проектам." : "We are always open to new ideas, collaborations and creative projects."}</p>
          <div className="inspire-contact-details">
            <p className="inspire-contact-phone"><span>{lang === "lv" ? "Tālrunis" : lang === "ru" ? "Телефон" : "Phone"}</span><strong>+371 2880 9550</strong></p>
            <p className="inspire-contact-address"><span>{lang === "lv" ? "Adrese" : lang === "ru" ? "Адрес" : "Address"}</span><strong>Miera iela 17, Rīga</strong></p>
          </div>
          <div className="inspire-contact-socials">
            <a className="inspire-contact-instagram" href="https://www.instagram.com/artstudio.inspire" target="_blank" rel="noreferrer">Instagram <b>→</b></a>
            <a className="inspire-contact-whatsapp" href="https://wa.me/37128809550" target="_blank" rel="noreferrer">WhatsApp <b>→</b></a>
          </div>
        </div>
        <form className="inspire-contact-card inspire-contact-card-message" onSubmit={submitContact}>
          <p className="inspire-contact-card-kicker">{lang === "lv" ? "GATAVI SARUNAI?" : lang === "ru" ? "ГОТОВЫ ПОГОВОРИТЬ?" : "READY TO TALK?"}</p>
          <h3>{lang === "lv" ? "Sazinies ar mums" : lang === "ru" ? "Свяжитесь с нами" : "Get in touch"}</h3>
          <p className="inspire-contact-card-copy">{lang === "lv" ? "Pastāsti par savu ideju — mēs atbildēsim drīzumā!" : lang === "ru" ? "Расскажите о своей идее — мы скоро ответим!" : "Tell us about your idea — we will reply soon!"}</p>
          <div className="inspire-contact-composer">
            <input required name="firstName" autoComplete="given-name" aria-label={lang === "lv" ? "Vārds" : lang === "ru" ? "Имя" : "Name"} placeholder={lang === "lv" ? "Vārds" : lang === "ru" ? "Имя" : "Name"} />
            <input required name="email" type="email" autoComplete="email" aria-label={t.email} defaultValue={savedEmail} placeholder={t.email} />
            <textarea required name="message" rows="4" aria-label={lang === "lv" ? "Ziņa" : lang === "ru" ? "Сообщение" : "Message"} placeholder={lang === "lv" ? "Ziņa" : lang === "ru" ? "Сообщение" : "Message"} />
          </div>
          <button className="inspire-contact-send" type="submit">{lang === "lv" ? "Nosūtīt ziņu" : lang === "ru" ? "Отправить сообщение" : "Send message"}</button>
          {contactStatus ? <p className="inspire-contact-status" role="status">{contactStatus}</p> : null}
        </form>
      </section>}
      {isContactView && <section id="kontakti" className="inspire-directions">
        <div className="inspire-directions-copy">
          <p className="inspire-kicker">{t.find}</p>
          <h2>{t.find}</h2>
          <p className="inspire-directions-location">{lang === "lv" ? "Miera iela 17, Rīga, Latvija" : lang === "ru" ? "Улица Миера, 17, Рига, Латвия" : "Miera iela 17, Riga, Latvia"}</p>
          <p className="inspire-directions-entry">{lang === "lv" ? "Ieeja ir pie veikala M50; lejā pa kāpnēm redzēsi studijas durvis." : lang === "ru" ? "Вход находится рядом с магазином M50; спуститесь по лестнице — и увидите дверь студии." : "The entrance is beside M50; go down the stairs to the studio door."}</p>
          <p className="inspire-address-lead">{lang === "lv" ? <>Studija atrodas pašā Rīgas sirdī<br />mākslinieku, mazu radošu veikalu<br />un kultūras vietu rajonā.</> : lang === "ru" ? <>Студия находится в самом сердце Риги<br />на улице Миера, в районе художников<br />небольших творческих магазинов и культурных мест.</> : <>The studio is in the heart of Riga<br />on Miera iela — a district of artists<br />small creative shops and cultural places.</>}</p>
          <div className="inspire-directions-practical">
            <p><strong>{lang === "lv" ? "Autostāvvieta" : lang === "ru" ? "Парковка" : "Parking"}</strong><span>{lang === "lv" ? <>C zona uz ielas līdz 20.00<br />Svētdienās bez maksas</> : lang === "ru" ? "Зона C на улице до 20:00; по воскресеньям бесплатно." : "C zone on the street until 20:00; free on Sundays."}</span></p>
            <p><strong>{lang === "lv" ? "Sabiedriskais transports" : lang === "ru" ? "Общественный транспорт" : "Public transport"}</strong><span>{lang === "lv" ? <>Pietura Laima — 11. tramvajs<br />Pietura Matīsa iela — autobusiem un trolejbusiem pa Brīvības ielu</> : lang === "ru" ? "Остановка Laima — трамвай №11. Остановка Matīsa iela — автобусы и троллейбусы по улице Brīvības." : "Laima stop — tram 11. Matīsa iela stop — buses and trolleybuses along Brīvības iela."}</span></p>
          </div>
        </div>
        <figure>
          <img
            src={image(
              "inspire.image.directions",
              "/art/inspire-door-directions.webp",
            )}
            alt="The entrance door to Art Studio Inspire"
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            {lang === "lv"
              ? "Sekojiet bultiņai līdz studijas durvīm."
              : "Follow the arrow to the studio door."}
          </figcaption>
        </figure>
        <div className="inspire-directions-map">
          <iframe
            title="Map to Art Studio Inspire"
            src="https://www.google.com/maps?q=56.9621791,24.1304391&z=18&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a href="https://maps.app.goo.gl/GUmohcYmRLpuYKmv9" target="_blank" rel="noreferrer">{lang === "lv" ? "Atvērt Google Maps" : lang === "ru" ? "Открыть Google Maps" : "Open in Google Maps"} <span aria-hidden="true">↗</span></a>
        </div>
      </section>}
      {(isContactView || page === "questions") && <InspireLocalGuide lang={lang} />}
      {page === "questions" && <section id="biezakie-jautajumi" className="inspire-faq" tabIndex={-1}>
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
      </section>}
      {page === "questions" && <section className="inspire-energy-strip" aria-hidden="true">
        <span>✦</span>
      </section>}
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
                  {booking?.kind === "inquiry"
                    ? lang === "lv"
                      ? "Ziņa ir nosūtīta. Drīzumā atbildēsim."
                      : lang === "ru"
                        ? "Сообщение отправлено. Скоро ответим."
                        : "Your message has been sent. We will reply shortly."
                    : lang === "lv"
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
                      {calendarKind === "event" || calendarKind === "event-format"
                        ? (lang === "lv" ? "PRIVĀTAIS PASĀKUMS" : lang === "ru" ? "ЧАСТНОЕ СОБЫТИЕ" : "PRIVATE EVENT")
                        : calendarKind === "inquiry"
                          ? (lang === "lv" ? "KONTAKTI" : lang === "ru" ? "КОНТАКТЫ" : "CONTACT")
                        : calendarKind === "gift" || calendarKind === "pass"
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
                      {calendarKind === "event-format"
                        ? eventOffer.label
                        : calendarKind === "event"
                          ? (lang === "lv" ? "Pārbaudi datumus" : lang === "ru" ? "Проверьте даты" : "Check available dates")
                        : calendarKind === "inquiry"
                          ? (lang === "lv" ? "Nosūtīt ziņu" : lang === "ru" ? "Отправить сообщение" : "Send a message")
                        : calendarKind === "gift"
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
                    {calendarKind === "inquiry" ? null : calendarKind === "event-format" ? (
                      <div className="inspire-event-format-dialog">
                        <p>{eventOffer.description}</p>
                        <small>{eventFormat === "custom"
                          ? (lang === "lv" ? "Sākuma aprēķins: telpas noma €15 par katru izvēlēto stundu." : lang === "ru" ? "Начальный расчёт: аренда студии €15 за каждый выбранный час." : "The estimate starts with studio hire at €15 for each selected hour.")
                          : (lang === "lv" ? `${eventOffer.duration} stundas radošajai daļai · vēl 2 stundas studijā ir iekļautas.` : lang === "ru" ? `${eventOffer.duration} часа творческой части · ещё 2 часа в студии включены.` : `${eventOffer.duration} hours of creative activity · plus 2 included studio hours.`)}</small>
                        <button type="button" onClick={() => openEventInquiry(eventFormat)}>{lang === "lv" ? "IZVĒLĒTIES ŠO FORMĀTU UN DATUMU →" : lang === "ru" ? "ВЫБРАТЬ ЭТОТ ФОРМАТ И ДАТУ →" : "CHOOSE THIS FORMAT & DATE →"}</button>
                      </div>
                    ) : calendarKind === "event" ? (
                      <div className="inspire-event-booking-flow">
                        <div className="inspire-event-month-switcher" aria-label={lang === "lv" ? "Pasākuma mēnesis" : "Event month"}>
                          <button type="button" disabled={eventMonth === 0} onClick={() => setEventMonth((month) => Math.max(0, month - 1))}>‹</button>
                          <strong>{eventMonthLabel}</strong>
                          <button type="button" disabled={eventMonth === eventMonthStarts.length - 1} onClick={() => setEventMonth((month) => Math.min(eventMonthStarts.length - 1, month + 1))}>›</button>
                        </div>
                        <div className="inspire-event-calendar" role="group" aria-label={lang === "lv" ? "Pieejamie datumi" : "Available dates"}>
                          {["P", "O", "T", "C", "P", "S", "Sv"].map((day, index) => <small key={`${day}-${index}`}>{day}</small>)}
                          {eventCalendarCells.map((day, index) => day ? <button key={day.key} type="button" disabled={day.isPast || day.unavailable} className={eventDate === day.key ? "active" : ""} onClick={() => { const hours = eventAvailableHours(day.key); setEventDate(day.key); setEventStartHour(hours.includes(eventStartHour) ? eventStartHour : (hours[0] || 11)); }}>{day.day}</button> : <span key={`blank-${index}`} />)}
                        </div>
                        <div className="inspire-event-time-controls">
                          <div className="inspire-event-selection-details">
                            <label><b>{lang === "lv" ? "Vēlamais pasākuma ilgums" : lang === "ru" ? "Желаемая продолжительность события" : "Preferred event duration"}</b><select value={eventDuration} onChange={(e) => { const duration = Number(e.target.value); const hours = eventAvailableHours(eventDate, duration); setEventDuration(duration); setEventStartHour((hour) => hours.includes(hour) ? hour : (hours[0] || 11)); }}>{eventDurationOptions.map((duration) => <option key={duration} value={duration}>{duration} h</option>)}</select></label>
                            {eventNeedsAttendees ? <label><b>{lang === "lv" ? "Cik cilvēki piedalīsies?" : lang === "ru" ? "Сколько человек будет участвовать?" : "How many people will attend?"}</b><select value={eventAttendees} onChange={(e) => setEventAttendees(Number(e.target.value))}>{Array.from({ length: 20 }, (_, index) => index + 1).map((count) => <option key={count} value={count}>{count}</option>)}</select></label> : null}
                          </div>
                          <div className="inspire-event-start-time"><b>{lang === "lv" ? "Vēlamais sākuma laiks" : lang === "ru" ? "Желаемое время начала" : "Preferred start time"}</b><div className="inspire-event-hour-grid">{eventHours.map((hour) => <button key={hour} type="button" disabled={!eventDate || !eventAvailableHours(eventDate).includes(hour)} className={eventStartHour === hour ? "active" : ""} onClick={() => setEventStartHour(hour)}>{String(hour).padStart(2, "0")}:00</button>)}</div></div>
                        </div>
                        <div className="inspire-event-format-picker" role="group" aria-label={lang === "lv" ? "Pasākuma formāts" : "Event format"}>
                          {Object.entries(eventOffers).map(([key, offer]) => <button key={key} type="button" className={eventFormat === key ? "active" : ""} onClick={() => { const hours = eventAvailableHours(eventDate, 1); setEventFormat(key); setEventDuration(1); setEventStartHour((hour) => hours.includes(hour) ? hour : (hours[0] || 11)); }}><b>{offer.label}</b><span>{key === "custom" ? (lang === "lv" ? "no €15 / h" : lang === "ru" ? "от €15 / ч" : "from €15 / h") : `${offer.duration} h`}</span></button>)}
                        </div>
                        <div className="inspire-event-time-summary"><b>{eventOffer.label} · {eventFormat === "custom" ? (lang === "lv" ? "no €15 / h" : lang === "ru" ? "от €15 / ч" : "from €15 / h") : `€${selectedEventEstimate}`}</b><span>{eventDate ? `${eventDate} · ${String(eventStartHour).padStart(2, "0")}:00–${String(eventStartHour + eventDuration).padStart(2, "0")}:00` : (lang === "lv" ? "Izvēlies datumu" : lang === "ru" ? "Выберите дату" : "Choose a date")}</span><small>{eventFormat === "custom"
                          ? (lang === "lv" ? `Telpas noma: ${eventDuration} h × €15 = €${selectedEventEstimate}.` : lang === "ru" ? `Аренда студии: ${eventDuration} ч × €15 = €${selectedEventEstimate}.` : `Studio hire: ${eventDuration} h × €15 = €${selectedEventEstimate}.`)
                          : eventNeedsAttendees
                            ? (lang === "lv" ? `${eventAttendees} ${eventAttendeeLabel} × €${eventPersonRate} = €${eventClassEstimate}. Gleznošanas laiks: ${eventOffer.duration} h. Papildu studijas laiks: 2 h iekļauts. Kopā iekļauts: ${eventBaseDuration} h. Papildu laiks: ${selectedEventExtraHours} h × €15 = €${selectedEventExtraPrice}.` : lang === "ru" ? `${eventAttendees} ${eventAttendeeLabel} × €${eventPersonRate} = €${eventClassEstimate}. Творческая часть: ${eventOffer.duration} ч. Ещё 2 ч в студии включены. Всего включено: ${eventBaseDuration} ч. Дополнительное время: ${selectedEventExtraHours} ч × €15 = €${selectedEventExtraPrice}.` : `${eventAttendees} ${eventAttendeeLabel} × €${eventPersonRate} = €${eventClassEstimate}. Painting activity: ${eventOffer.duration} h. An additional 2 h at the studio are included. Total included: ${eventBaseDuration} h. Extra time: ${selectedEventExtraHours} h × €15 = €${selectedEventExtraPrice}.`)
                            : (lang === "lv" ? `Lielais kopīgais audekls: €200. Gleznošanas laiks: ${eventOffer.duration} h. Papildu studijas laiks: 2 h iekļauts. Kopā iekļauts: ${eventBaseDuration} h. Papildu laiks: ${selectedEventExtraHours} h × €15 = €${selectedEventExtraPrice}.` : lang === "ru" ? `Общий большой холст: €200. Творческая часть: ${eventOffer.duration} ч. Ещё 2 ч в студии включены. Всего включено: ${eventBaseDuration} ч. Дополнительное время: ${selectedEventExtraHours} ч × €15 = €${selectedEventExtraPrice}.` : `Large shared canvas: €200. Painting activity: ${eventOffer.duration} h. An additional 2 h at the studio are included. Total included: ${eventBaseDuration} h. Extra time: ${selectedEventExtraHours} h × €15 = €${selectedEventExtraPrice}.`)}</small><em>{lang === "lv" ? "Aptuvena cena — gala summu apstiprināsim pēc detaļu saskaņošanas." : lang === "ru" ? "Ориентировочная цена — подтвердим итог после согласования деталей." : "Estimated price — we will confirm the final total once the details are agreed."}</em></div>
                      </div>
                    ) : calendarKind === "gift" || calendarKind === "pass" ? (
                      <div className="inspire-gift-options">
                        <p>
                          {calendarKind === "pass"
                            ? lang === "lv"
                              ? "Izvēlies 4, 6 vai 8 nodarbības. Abonements ir derīgs 4 nedēļas no pirmās nodarbības."
                              : lang === "ru"
                                ? "Выберите 4, 6 или 8 занятий. Абонемент действует 4 недели с первого занятия."
                                : "Choose 4, 6 or 8 classes. The pass is valid for four weeks from the first class."
                            : lang === "lv"
                              ? "Izvēlies 2, 4, 6 vai 8 nodarbības, vai ievadi savu daudzumu. 2 nodarbības — €25 katra; no 3 nodarbībām — €20 katra."
                              : lang === "ru"
                            ? "Выберите 2, 4, 6, 8 занятий или своё количество. 2 занятия — €25 за каждое; от 3 занятий — €20 за каждое."
                                : "Choose 2, 4, 6 or 8 classes, or enter your own amount. 2 classes are €25 each; 3 or more are €20 each."}
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
                          {giftClasses} × €{giftClasses > 2 ? "20" : "25"} = €
                          {giftClasses * (giftClasses > 2 ? 20 : 25)}
                        </strong>
                      </div>
                    ) : calendarKind === "class" ? (
                      <div className="inspire-booking-calendar-wrap">
                        {scheduleWeeks.length > 0 && <div className="inspire-booking-week" aria-label={lang === "lv" ? "Izvēlies nodarbības dienu" : lang === "ru" ? "Выберите день занятия" : "Choose a class day"}>
                          <button type="button" aria-label={lang === "lv" ? "Iepriekšējā nedēļa" : lang === "ru" ? "Предыдущая неделя" : "Previous week"} onClick={() => changeScheduleWeek(-1)} disabled={activeScheduleWeek === 0}>‹</button>
                          <div>
                            {weekDays.map((day) => <button key={day.key} type="button" aria-label={`${day.fullLabel} ${day.date}`} disabled={!day.hasClass} className={`${day.hasClass ? "available" : ""} ${bookingDay === day.key ? "active" : ""}`} onClick={() => { setBookingDay(day.key); setBooking(null); setSelection(""); }}><small>{day.label}</small><b>{day.date}</b></button>)}
                          </div>
                          <button type="button" aria-label={lang === "lv" ? "Nākamā nedēļa" : lang === "ru" ? "Следующая неделя" : "Next week"} onClick={() => changeScheduleWeek(1)} disabled={activeScheduleWeek >= scheduleWeeks.length - 1}>›</button>
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
                    ) : calendarKind === "rental" || calendarKind === "private" || calendarKind === "treatment-room" ? (
                      <div className="inspire-booking-calendar-wrap inspire-rental-calendar-wrap">
                        {rentalWeeks.length > 0 ? <div className="inspire-booking-week" aria-label={lang === "lv" ? "Izvēlies dienu" : lang === "ru" ? "Выберите день" : "Choose a day"}>
                          <button type="button" aria-label={lang === "lv" ? "Iepriekšējā nedēļa" : lang === "ru" ? "Предыдущая неделя" : "Previous week"} onClick={() => changeRentalWeek(-1)} disabled={rentalWeek === 0}>‹</button>
                          <div>{rentalDays.map((day) => <button key={day.key} type="button" disabled={!day.hasSlots} className={`${day.hasSlots ? "available" : ""} ${bookingDay === day.key ? "active" : ""}`} onClick={() => { setBookingDay(day.key); setBooking(null); setSelection(""); }}><small>{day.label}</small><b>{day.date}</b></button>)}</div>
                          <button type="button" aria-label={lang === "lv" ? "Nākamā nedēļa" : lang === "ru" ? "Следующая неделя" : "Next week"} onClick={() => changeRentalWeek(1)} disabled={rentalWeek >= rentalWeeks.length - 1}>›</button>
                        </div> : null}
                        <div className="inspire-rental-slot-list" role="group" aria-label={lang === "lv" ? "Pieejamie divu stundu laiki" : lang === "ru" ? "Доступное двухчасовое время" : "Available two-hour times"}>
                          {rentalSlotsForDay.map((item) => {
                            const isPrivate = calendarKind === "private" || calendarKind === "treatment-room";
                            const isTattooRoom = calendarKind === "treatment-room";
                            const kind = isPrivate ? "private" : "class";
                            const selected = selection === `${kind}:${item.id}`;
                            const title = isTattooRoom
                              ? (lang === "lv" ? "Tattoo telpa" : lang === "ru" ? "Тату-комната" : "Tattoo room")
                              : isPrivate ? (lang === "lv" ? "Individuāla nodarbība" : lang === "ru" ? "Индивидуальное занятие" : "Individual class") : (lang === "lv" ? "Patstāvīgs darbs studijā" : lang === "ru" ? "Самостоятельная работа в студии" : "Studio work");
                            return <button key={item.id} type="button" className={selected ? "active" : ""} onClick={() => { setBooking({ kind, itemId: item.id, label: `${title} · ${weeklyDayLabel(item)} · ${item.time}` }); setSelection(`${kind}:${item.id}`); }}><strong>{item.time}</strong><span>{isTattooRoom ? (lang === "lv" ? "Aprīkota telpa · €20" : lang === "ru" ? "Оборудованная комната · €20" : "Equipped room · €20") : isPrivate ? (lang === "lv" ? "2 stundas · individuāls laiks" : lang === "ru" ? "2 часа · индивидуальное время" : "2 hours · private time") : (lang === "lv" ? "2 stundas · vieta studijā" : lang === "ru" ? "2 часа · место в студии" : "2 hours · a studio place")}</span></button>;
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
                      </select>
                    )}
                    {calendarKind !== "gift" && calendarKind !== "pass" && calendarKind !== "event" && calendarKind !== "event-format" && (
                      <p className="inspire-cancellation inspire-modal-policy">
                        {lang === "lv"
                          ? "Jebkura rezervācija jāatceļ vai jāpārceļ vismaz 24 stundas pirms sākuma; līdz tam — bezmaksas atcelšana un automātiska atmaksa."
                          : lang === "ru"
                            ? "Любую бронь нужно отменить или перенести не позднее чем за 24 часа до начала; до этого возможны бесплатная отмена и автоматический возврат."
                            : "Any reservation must be cancelled or rescheduled at least 24 hours before it starts; until then, cancellation is free and the refund is automatic."}
                      </p>
                    )}
                  </>
                {calendarKind !== "event-format" && <>
                <div className="inspire-customer-name">
                  <input required name="firstName" autoComplete="given-name" aria-label={lang === "lv" ? "Vārds" : lang === "ru" ? "Имя" : "Name"} placeholder={lang === "lv" ? "Vārds" : lang === "ru" ? "Имя" : "Name"} />
                </div>
                {calendarKind === "inquiry" && <input required name="topic" defaultValue={inquiryTopic} aria-label={lang === "lv" ? "Ziņas tēma" : lang === "ru" ? "Тема сообщения" : "Message topic"} placeholder={lang === "lv" ? "Ziņas tēma" : lang === "ru" ? "Тема сообщения" : "Message topic"} />}
                <input
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-label={t.email}
                  defaultValue={savedEmail}
                  placeholder={t.email}
                />
                {calendarKind !== "inquiry" && <small className="inspire-email-memory">
                  {lang === "lv" ? "E-pastu atceramies tikai šajā ierīcē, lai nākamreiz būtu ātrāk." : lang === "ru" ? "Мы запоминаем email только на этом устройстве, чтобы в следующий раз было быстрее." : "We remember your email only on this device, to make the next booking faster."}
                </small>}
                {calendarKind === "inquiry" || calendarKind === "event" ? (
                  <>
                    <label className="inspire-inquiry-message">
                      {lang === "lv" ? "Ziņa" : lang === "ru" ? "Сообщение" : "Message"}
                      <textarea name="message" required rows="5" placeholder={calendarKind === "event" ? (lang === "lv" ? "Cilvēku skaits, pasākuma ideja, īpašas vēlmes…" : "Guest count, your idea and any special wishes…") : (lang === "lv" ? "Pastāsti, kas Tev interesē…" : lang === "ru" ? "Расскажите, что вас интересует…" : "Tell us what you would like to discuss…")} />
                    </label>
                    <button name="bookingAction" value="inquiry" disabled={calendarKind === "event" && (!eventDate || !eventStartIsAvailable)}>{calendarKind === "event" ? (lang === "lv" ? "NOSŪTĪT PASĀKUMA PIEPRASĪJUMU" : "SEND EVENT REQUEST") : (lang === "lv" ? "NOSŪTĪT ZIŅU" : lang === "ru" ? "ОТПРАВИТЬ СООБЩЕНИЕ" : "SEND MESSAGE")}</button>
                  </>
                ) : calendarKind !== "gift" && calendarKind !== "pass" ? (
                  <div className="inspire-reservation-actions">
                    <button className="inspire-reserve-option" name="bookingAction" value={calendarKind === "treatment-room" ? "inquiry" : "reserve"}>{calendarKind === "treatment-room" ? (lang === "lv" ? "NOSŪTĪT DATUMA REZERVĒŠANAS PIEPRASĪJUMU" : lang === "ru" ? "ОТПРАВИТЬ ЗАПРОС НА РЕЗЕРВИРОВАНИЕ ДАТЫ" : "SEND DATE-RESERVATION REQUEST") : (lang === "lv" ? "REZERVĒT VIETU" : lang === "ru" ? "ЗАБРОНИРОВАТЬ МЕСТО" : "RESERVE A PLACE")}</button>
                    <button className="inspire-pay-option" name="bookingAction" value="pay">{lang === "lv" ? "REZERVĒT UN MAKSĀT TIEŠSAISTĒ" : lang === "ru" ? "ЗАБРОНИРОВАТЬ И ОПЛАТИТЬ ОНЛАЙН" : "RESERVE & PAY ONLINE"}</button>
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
                </>}
              </>
            )}
          </form>
        </div>
      )}
    </main>
  );
}
