import "./about.css";

const education = [
  ["2019—2022", "G H Drawing Studio", "Drawing and painting classes with Ludmila Perec"],
  ["2018—2021", "University of Latvia", "Philosophy"],
  ["2016—2017", "Art Academy of Latvia", "Painting"],
  ["2008—2012", "Riga School of Design and Art", "Ceramics design"]
];
const exhibitions = [
  ["2021", "Olaine Museum of History and Art", "Personal exhibition · Latvia"],
  ["2018", "Hypertown", "Solo video-game themed exhibition · Riga"],
  ["2017", "BEDARKENING", "Solo painting exhibition · Olaine"],
  ["2015", "TwitchCon", "Twitch artists exhibition · San Francisco"],
  ["2014—15", "Tattoo Art Gallery / Gamestation", "Collaborative and solo exhibitions · Riga"]
];

export const metadata = { title:"About Sandra Rudzīte | Artist, teacher & streamer", description:"Sandra Rudzīte is a Latvian painter, art teacher and online creator whose work explores atmosphere, dark symbolism and the human inner world." };

export default function AboutPage(){return <main className="about-sandra">
  <div className="about-utility"><span>PAINTER · TEACHER · ONLINE CREATOR · RIGA, LATVIA</span><a href="/inspire">ART STUDIO INSPIRE ↗</a></div>
  <header className="about-header"><a className="about-name" href="/portfolio">SANDRA RUDZĪTE</a><nav><a href="/portfolio">PORTFOLIO</a><a href="/shop">SHOP</a><a aria-current="page" href="/about">ABOUT</a><a href="/contact">CONTACT</a></nav></header>
  <section className="about-hero"><div className="about-hero-copy"><p className="about-kicker">ABOUT THE ARTIST</p><h1>A painter<br/><em>who stays in the work.</em></h1><p>I make paintings, I teach painting, and I keep the whole sometimes messy process visible. The online world is part of my practice—but the work still begins with a brush, a surface, and enough time to look properly.</p></div><figure><img src="/art/sandra-portrait-hero.jpg" alt="Sandra Rudzīte in her studio"/><figcaption>RIGA · LATVIA</figcaption></figure></section>
  <section className="about-statement"><div><p className="about-kicker">THE SHORT VERSION</p><h2>I walk the walk of painting.</h2></div><div><p>I am Sandra Rudzīte, a traditional artist based in Latvia. My work moves through oil painting, drawing, dark art, landscape, still life, and the quiet emotional spaces between shadow and light.</p><p>I care immensely about teaching, but I do not teach from a distance. I keep making work, studying it, getting stuck in it, changing my mind, and bringing that real experience into the studio.</p></div></section>
  <section className="about-story"><div><p className="about-kicker">HOW IT STARTED</p><h2>First the stream.<br/>Then the painting.</h2></div><div className="about-story-copy"><p>I started online as a gamer on Twitch in 2013. To bring something more personal into that world, I began making portrait sketches of viewers between games. In 2014, I had the simple thought to paint the game instead of playing it. That became a series of video-game inspired oil paintings—and an early bridge between fine art and Twitch culture.</p><p>Since then, I have streamed the making of art, taught art classes online simply because it was fun to gather people around the process, and worked with contemporary creative platforms including Adobe. I still think of myself as a modern blogger in the useful sense: I like sharing the process, the references, the failed versions, and the decisions behind a painting.</p><p>None of that replaces the slower part. Art is still an endless study of the world, life, mood, and the many strange things people carry. I am drawn to shadows as much as light—not because darkness has to be dramatic, but because it can be honest.</p></div></section>
  <section className="about-teaching"><img src="/art/inspire-studio.jpeg" alt="Art Studio Inspire"/><div><p className="about-kicker">TEACHING</p><h2>Friendly does not mean shallow.</h2><p>In my classes, people can come with an ambitious, strange, dark, funny, or not-yet-formed idea. We make room for it, then look at the practical questions: composition, colour, drawing, materials, and how a work begins to hold together.</p><p>There is no pressure to become an “artist” overnight. The point is to make something real, understand a little more, and enjoy being in the room with paint.</p><a href="/inspire#nodarbibas">VISIT ART STUDIO INSPIRE →</a></div></section>
  <section className="about-cv"><div><p className="about-kicker">EDUCATION</p>{education.map(([year,title,detail])=><article key={title}><time>{year}</time><h3>{title}</h3><p>{detail}</p></article>)}</div><div><p className="about-kicker">SELECTED EXHIBITIONS</p>{exhibitions.map(([year,title,detail])=><article key={`${year}-${title}`}><time>{year}</time><h3>{title}</h3><p>{detail}</p></article>)}</div></section>
  <footer className="about-footer"><p>Let’s talk about a painting, a class, or an idea that needs a little room.</p><a href="mailto:misscoookiez@gmail.com">MISSCOOOKIEZ@GMAIL.COM</a></footer>
</main>}
