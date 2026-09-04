"use client";

const copy={
  lv:{summary:"PRAKTISKA INFORMĀCIJA PAR STUDIJU",items:[
    ["KUR UN KAM","Art Studio Inspire ir mākslas studija Rīgas centrā, Miera ielā 17 — ērti no Klusā centra, Skanstes un Brīvības ielas puses. Te ir gleznošanas nodarbības bērniem, pusaudžiem un pieaugušajiem, arī tad, ja meklē pirmo hobiju vai gribi atgriezties pie mākslas pēc ilga pārtraukuma."],
    ["KO VAR DARĪT","Akvarelis, akrils, eļļa, zīmējums, kompozīcija, krāsu teorija, darbs no dabas, akadēmiskie pamati un intuitīva vai sirreāla gleznošana. Vari nākt uz profesionālāku gleznošanas kursu, mierīgu hobija nodarbību, individuālu sesiju vai vienkārši izmēģināt īstus materiālus bez spiediena uz rezultātu."],
    ["KAS IR IEKĻAUTS","Krāsas, otas, papīrs, audekļi un darba vieta ir studijā. Akvareļu nodarbība parasti ilgst 2 stundas, gleznošanas nodarbība — 3 stundas. Regulārai grupai var pieteikties bez tūlītējas apmaksas; apmaksātu rezervāciju var atcelt bez maksas līdz 24 stundām pirms sākuma."],
    ["GRUPAS UN PASĀKUMI","Privātām grupām veidojam gleznošanas vakarus, dzimšanas dienas, neona gleznošanu, draugu vakarus, komandu pasākumus un izbraukuma radošās aktivitātes. Tā nav konveijera meistarklase ar vienu obligātu bildi — pasākumu pielāgojam grupas vecumam, noskaņai un idejai."]
  ]},
  en:{summary:"PRACTICAL STUDIO INFORMATION",items:[
    ["WHERE & FOR WHOM","Art Studio Inspire is an art studio in central Riga at Miera iela 17, easy to reach from Klusais centrs, Skanste and Brīvības iela. It offers painting classes for children, teenagers and adults — whether you are looking for a first hobby or returning to art after a long break."],
    ["WHAT YOU CAN MAKE","Watercolour, acrylic, oil, drawing, composition, colour theory, observation, academic foundations, intuitive and surreal painting are all possible here. Come for a more serious painting course, a relaxed hobby class, a private session, or simply to try real materials without pressure to produce a perfect result."],
    ["WHAT IS INCLUDED","Paint, brushes, paper, canvases and a working place are at the studio. A watercolour evening is usually 2 hours; a painting evening is 3. A weekly-group application does not require immediate payment; paid bookings can be cancelled free of charge up to 24 hours before they start."],
    ["GROUPS & EVENTS","For private groups we create painting evenings, birthdays, children’s neon painting, girls’ nights, team events and travel-to-you creative activities. This is not a production-line workshop with one compulsory painting: each event follows the group’s age, mood and idea."]
  ]},
  ru:{summary:"ПРАКТИЧЕСКАЯ ИНФОРМАЦИЯ О СТУДИИ",items:[
    ["ГДЕ И ДЛЯ КОГО","Art Studio Inspire — художественная студия в центре Риги, на Miera iela 17, удобная из Тихого центра, Скансте и с улицы Brīvības. Здесь есть занятия живописью для детей, подростков и взрослых — как для первого хобби, так и для возвращения к искусству после перерыва."],
    ["ЧЕМ МОЖНО ЗАНЯТЬСЯ","Акварель, акрил, масло, рисунок, композиция, теория цвета, работа с натуры, академические основы, интуитивная и сюрреалистичная живопись. Можно прийти на более профессиональный курс, спокойное хобби-занятие, индивидуальную сессию или просто попробовать настоящие материалы без давления на результат."],
    ["ЧТО ВКЛЮЧЕНО","Краски, кисти, бумага, холсты и рабочее место есть в студии. Вечер акварели обычно длится 2 часа, вечер живописи — 3. На регулярную группу можно подать заявку без немедленной оплаты; платную бронь можно отменить бесплатно не позднее чем за 24 часа до начала."],
    ["ГРУППЫ И СОБЫТИЯ","Для частных групп мы делаем вечера творческие вечера живописи, дни рождения, неоновую живопись для детей, вечера с подругами, командные события и выездные творческие активности. Это не конвейерный мастер-класс с одной обязательной картиной: формат подбирается под возраст, настроение и идею группы."]
  ]}
};

export default function InspireLocalGuide({lang}){
  const guide=copy[lang]||copy.lv;
  const footer=lang==="lv"?{location:"RĪGA · MIERA IELA 17",contact:"KONTAKTI",instagram:"INSTAGRAM",questions:"JAUTĀJUMI"}:lang==="ru"?{location:"РИГА · УЛИЦА МИЕРА 17",contact:"КОНТАКТЫ",instagram:"INSTAGRAM",questions:"ВОПРОСЫ"}:{location:"RIGA · MIERA IELA 17",contact:"CONTACT",instagram:"INSTAGRAM",questions:"QUESTIONS"};
  return <><section className="inspire-local-guide"><details><summary>{guide.summary}<b>+</b></summary><div className="inspire-local-guide-grid">{guide.items.map(([title,text])=><article key={title}><b>{title}</b><p>{text}</p></article>)}</div></details></section><footer className="inspire-site-footer"><p>© {new Date().getFullYear()} ART STUDIO INSPIRE</p><span>{footer.location}</span><nav><a href="mailto:misscoookiez@gmail.com">{footer.contact}</a><a href="https://www.instagram.com/artstudio.inspire" target="_blank" rel="noreferrer">{footer.instagram}</a><a href="#biezakie-jautajumi">{footer.questions}</a></nav></footer></>;
}
