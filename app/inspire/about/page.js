"use client";
import { useState } from "react";
import "./page.css";

const copy = {
  lv: { back:"← UZ SĀKUMLAPU", kicker:"PAR ART STUDIO INSPIRE", title:"Telpa idejām, krāsai un savam ritmam.", lead:"Mākslas studija Rīgas centrā bērniem, jauniešiem un pieaugušajiem.", body:["Inspire ir dzīva darbnīca Miera ielā 17 — vieta, kur var atnākt ar skici, domu vai vienkārši ziņkāri. Uz vietas ir materiāli, darba vieta un atbalsts, lai sāktu bez steigas.","Regulārajās grupās, individuālajās nodarbībās un radošajos vakaros mēs savienojam brīvību ar praktisku palīdzību. Tehnika, krāsa un kompozīcija parādās tad, kad tās palīdz idejai kļūt stiprākai.","Studiju vada māksliniece Sandra Rudzīte. Te ir vieta nopietnam darbam, eksperimentiem, tējai, kļūdām un arī idejām, kas sākumā vēl neizklausās līdz galam skaidras."], note:"Te nevajag ierasties gatavam. Pietiek ar vēlmi kaut ko radīt.", cta:"SKATĪT NODARBĪBAS →" },
  en: { back:"← BACK TO HOME", kicker:"ABOUT ART STUDIO INSPIRE", title:"Room for ideas, colour and your own rhythm.", lead:"A painting studio in central Riga for children, young people and adults.", body:["Inspire is a working studio at Miera iela 17: come with a sketch, an idea, or simply curiosity. Materials, a place to work and thoughtful support are all here, so there is no need to arrive fully prepared.","In weekly groups, private sessions and creative evenings, freedom sits beside practical help. Technique, colour and composition enter the conversation when they make an idea stronger.","The studio is led by artist Sandra Rudzīte. There is room for serious work, experiments, tea, mistakes and ideas that do not yet have a fully clear shape."], note:"You do not need to arrive ready. Wanting to make something is enough.", cta:"VIEW CLASSES →" },
  ru: { back:"← НА ГЛАВНУЮ", kicker:"О ART STUDIO INSPIRE", title:"Пространство для идей, цвета и своего ритма.", lead:"Художественная студия в центре Риги для детей, молодёжи и взрослых.", body:["Inspire — живая мастерская на улице Миера, 17. Можно прийти с эскизом, мыслью или просто любопытством. Здесь есть материалы, рабочее место и поддержка, чтобы начать без спешки.","В регулярных группах, индивидуальных занятиях и творческих вечерах свобода сочетается с практической помощью. Техника, цвет и композиция появляются тогда, когда помогают идее стать сильнее.","Студию ведёт художница Сандра Рудзите. Здесь есть место для серьёзной работы, экспериментов, чая, ошибок и идей, которые пока ещё не обрели ясную форму."], note:"Не нужно приходить готовым. Достаточно желания что-то создать.", cta:"ПОСМОТРЕТЬ ЗАНЯТИЯ →" },
};

export default function InspireAboutPage() {
  const [lang, setLang] = useState("lv");
  const t = copy[lang];
  return <main className="inspire-about-page" lang={lang}>
    <header>
      <a href="/">{t.back}</a>
      <div aria-label="Language">{Object.keys(copy).map((code) => <button key={code} className={lang === code ? "active" : ""} onClick={() => setLang(code)}>{code.toUpperCase()}</button>)}</div>
    </header>
    <section className="inspire-about-hero">
      <div>
        <p>{t.kicker}</p><h1>{t.title}</h1><h2>{t.lead}</h2>
        <div className="inspire-about-copy">{t.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <blockquote>{t.note}</blockquote><a className="inspire-about-cta" href="/#nodarbibas">{t.cta}</a>
      </div>
      <div className="inspire-about-images">
        <img src="/art/inspire-studio.webp" alt="Art Studio Inspire" />
        <img src="/art/inspire-slide-02.webp" alt="Art Studio Inspire" />
        <img src="/art/inspire-slide-03.webp" alt="Art Studio Inspire" />
      </div>
    </section>
  </main>;
}
