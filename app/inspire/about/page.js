"use client";
import { useState } from "react";
import "./page.css";

const copy = {
  lv: {
    back: "← UZ STUDIJU",
    kicker: "KAS VADA STUDIJU",
    title: "Sandra Rudzīte",
    lead: "Glezniecībā jau 18 gadus — un mīlestība pret mākslu joprojām neļauj apstāties.",
    body: [
      "Sandra vada Art Studio Inspire nevis no malas, bet no darbnīcas — ar eļļu, akvareli, zīmējumu, akrilu un lielām idejām uz audekla. Viņa ir strādājusi ar Adobe, rādījusi savu darbu un mācīšanu tiešsaistē, bet studijā svarīgākais paliek dzīvs, praktisks process: paskatīties, izmēģināt, kļūdīties, pamanīt un turpināt.",
      "Viņas glezniecībā figurālais un simboliskais bieži kļūst par iekšēju ainavu. Tēls, dzīvnieks, klusā daba vai tumšāka gaisma nav tikai dekorācija, bet veids, kā noturēt skatienu pie sajūtas.",
      "Lai gan darbos reizēm ienāk tumšāki vai simboliski motīvi, studijā ir vieta vieglumam: smiekliem, tējai, ziņkārībai un arī gleznai par mīļu kaķi. Mācīšanā svarīgākais ir palīdzēt cilvēkam ieraudzīt, ko viņš pats mēģina pateikt attēlā.",
    ],
    note: "Mēs sākam ar to, ko vēlies radīt, nevis ar to, ko jau proti.",
    cta: "SKATĪT NODARBĪBAS →",
  },
  en: {
    back: "← BACK TO THE STUDIO",
    kicker: "WHO RUNS THE STUDIO",
    title: "Sandra Rudzīte",
    lead: "Painting has been part of her life for 18 years — and her love of art still refuses to let go.",
    body: [
      "Sandra runs Art Studio Inspire from inside the work itself: oils, watercolour, drawing, acrylics and ambitious canvases. She has worked with Adobe and shared painting and teaching online, but the studio stays rooted in a real hands-on process: looking, trying, getting something wrong, noticing, and continuing.",
      "In her painting, the figurative and symbolic often become an inner landscape. A figure, animal, still life or darker light is not decoration, but a way of holding attention on a feeling.",
      "Even when the work carries darker or symbolic subjects, the studio has room for lightness: laughter, tea, curiosity, and a painting of a sweet cat. In teaching, the essential thing is helping someone see what they are already trying to say in an image.",
    ],
    note: "We begin with what you want to create, not with what you already know how to do.",
    cta: "VIEW CLASSES →",
  },
  ru: {
    back: "← В СТУДИЮ",
    kicker: "КТО ВЕДЁТ СТУДИЮ",
    title: "Сандра Рудзите",
    lead: "В живописи уже 18 лет — и любовь к искусству по-прежнему не даёт ей останавливаться.",
    body: [
      "Сандра ведёт Art Studio Inspire изнутри самой работы: масло, акварель, рисунок, акрил и большие идеи на холсте. Она работала с Adobe и показывала живопись и обучение онлайн, но основа студии остаётся живой и практичной: смотреть, пробовать, ошибаться, замечать и продолжать.",
      "В её живописи фигуративное и символическое часто становятся внутренним пейзажем. Персонаж, животное, натюрморт или более тёмный свет — не просто декор, а способ удержать внимание на ощущении.",
      "Даже когда в работах появляются более тёмные или символические мотивы, в студии есть место лёгкости: смеху, чаю, любопытству и картине с милым котом. В преподавании главное — помочь человеку увидеть, что именно он уже пытается сказать своим изображением.",
    ],
    note: "Мы начинаем с того, что вы хотите создать, а не с того, что уже умеете.",
    cta: "ПОСМОТРЕТЬ ЗАНЯТИЯ →",
  },
};

export default function InspireAboutPage() {
  const [lang, setLang] = useState("lv");
  const t = copy[lang];
  return <main className="inspire-about-page">
    <header>
      <a href="/inspire">{t.back}</a>
      <div aria-label="Language">
        {Object.keys(copy).map((code) => <button key={code} className={lang === code ? "active" : ""} onClick={() => setLang(code)}>{code.toUpperCase()}</button>)}
      </div>
    </header>
    <section className="inspire-about-hero">
      <div>
        <p>{t.kicker}</p>
        <h1>{t.title}</h1>
        <h2>{t.lead}</h2>
        <div className="inspire-about-copy">{t.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <blockquote>{t.note}</blockquote>
        <a className="inspire-about-cta" href="/inspire#nodarbibas">{t.cta}</a>
      </div>
      <div className="inspire-about-images">
        <img src="/art/sandra-profile-lead.webp" alt="Sandra Rudzīte in the studio" />
        <img src="/art/sandra-studio-tea-upright.webp" alt="Sandra Rudzīte in Art Studio Inspire" />
        <img src="/art/sandra-studio-07.webp" alt="Sandra Rudzīte painting" />
      </div>
    </section>
  </main>;
}
