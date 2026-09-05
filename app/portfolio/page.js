"use client";
import { useEffect, useState } from "react";
import "./portfolio.css";

const art = [
  {src:"/art/portfolio-current-01.jpg",title:"Untitled I",category:"PAINTINGS",medium:"Oil on canvas",year:"STUDIO ARCHIVE"},
  {src:"/art/portfolio-current-02.jpg",title:"Untitled II",category:"PAINTINGS",medium:"Oil on canvas",year:"STUDIO ARCHIVE"},
  {src:"/art/portfolio-current-03.jpg",title:"Untitled III",category:"PAINTINGS",medium:"Oil on canvas",year:"STUDIO ARCHIVE"},
  {src:"/art/portfolio-current-04.jpg",title:"Untitled IV",category:"PAINTINGS",medium:"Oil on canvas",year:"STUDIO ARCHIVE"},
  {src:"/art/portfolio-current-05.jpg",title:"Untitled V",category:"PAINTINGS",medium:"Oil on canvas",year:"STUDIO ARCHIVE"},
  {src:"/art/portfolio-current-06.jpg",title:"Untitled VI",category:"PAINTINGS",medium:"Oil on canvas",year:"STUDIO ARCHIVE"},
  {src:"/art/portfolio-current-07.jpg",title:"Untitled VII",category:"PAINTINGS",medium:"Oil on canvas",year:"STUDIO ARCHIVE"},
  {src:"/art/black-cat.jpg",title:"Black cat",category:"DRAWINGS",medium:"Watercolour and ink",year:"STUDIO ARCHIVE"},
  {src:"/art/abstract-bricks.jpg",title:"Abstract bricks",category:"ABSTRACT",medium:"Oil and acrylic",year:"STUDIO ARCHIVE"},
  {src:"/art/prism.jpg",title:"Prism",category:"ABSTRACT",medium:"Oil on canvas",year:"STUDIO ARCHIVE"},
  {src:"/art/dark-souls-ii.jpg",title:"Dark Souls II",category:"GAME INSPIRED",medium:"Ink on paper",year:"STUDIO ARCHIVE"},
  {src:"/art/ciri.jpg",title:"Ciri",category:"GAME INSPIRED",medium:"Charcoal on paper",year:"STUDIO ARCHIVE"},
  {src:"/art/inspire-student-work.webp",title:"Wing study",category:"OTHER",medium:"Mixed media",year:"STUDIO ARCHIVE"},
  {src:"/art/inspire-studio.webp",title:"In the studio",category:"OTHER",medium:"Studio archive",year:"STUDIO ARCHIVE"}
];
const categories=["PORTFOLIO","PAINTINGS","DRAWINGS","ABSTRACT","GAME INSPIRED","OTHER"];

export default function Portfolio(){
  const [filter,setFilter]=useState("PORTFOLIO");
  const [selected,setSelected]=useState(null);
  const shown=filter==="PORTFOLIO"?art:art.filter(item=>item.category===filter);
  useEffect(()=>{const close=(event)=>event.key==="Escape"&&setSelected(null);window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close)},[]);
  return <main className="sandra-portfolio">
    <div className="portfolio-cartline"><span>YOUR CART</span><span>♙ 0</span></div>
    <header><a className="portfolio-name" href="/portfolio">SANDRA RUDZĪTE</a><nav>{categories.map(c=><button aria-pressed={filter===c} className={filter===c?"active":""} onClick={()=>setFilter(c)} key={c}>{c}</button>)}</nav><div className="portfolio-extra"><a href="/shop">PAINTINGS FOR SALE</a><a href="/about">ABOUT</a><a href="/contact">CONTACT</a><a href="/inspire">INSPIRE ART STUDIO</a></div></header>
    <section className="portfolio-intro"><div><p>WHO LOOKS OUTSIDE, DREAMS;<br/>WHO LOOKS INSIDE, AWAKES.</p><small>— CARL JUNG</small></div><img src="/art/sandra-portrait-hero.jpg" alt="Sandra Rudzīte in her studio"/></section>
    <section className="portfolio-title"><p>SELECTED WORKS · 2014—2026</p><h1>{filter}</h1></section>
    {shown.length ? <div className="portfolio-gallery">{shown.map((item,i)=><button className="art-card" onClick={()=>setSelected(item)} key={`${item.title}-${i}`}><figure><img src={item.src} alt={item.title}/><figcaption>{item.title}<span>VIEW →</span></figcaption></figure></button>)}</div> : <p className="portfolio-empty">New works in this collection will appear here soon.</p>}
    <footer>© SANDRA RUDZĪTE · RIGA, LATVIA <span><a href="/contact">CONTACT</a> · INSTAGRAM</span></footer>
    {selected && <div className="art-lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onClick={()=>setSelected(null)}><button className="lightbox-close" aria-label="Close artwork" onClick={()=>setSelected(null)}>×</button><div className="lightbox-content" onClick={event=>event.stopPropagation()}><img src={selected.src} alt={selected.title}/><div><p>{selected.category} · {selected.year}</p><h2>{selected.title}</h2><span>{selected.medium}</span><a href="/contact">ENQUIRE ABOUT THIS WORK →</a></div></div></div>}
  </main>
}
