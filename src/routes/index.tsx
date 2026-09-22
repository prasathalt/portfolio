import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import motionAsset from "../assets/motion-graphics.mp4.asset.json";
import motionPoster from "../assets/motion-poster.jpg";
import resumeAsset from "../assets/prasath-resume.pdf.asset.json";
import logoMca from "../assets/projects/logo-mca.webp.asset.json";
import logoOzmex from "../assets/projects/logo-ozmex.webp.asset.json";
import logoDeepam from "../assets/projects/logo-deepam.webp.asset.json";
import elevatedCover from "../assets/projects/elevated-cover.jpg.asset.json";
import elevatedWeb from "../assets/projects/elevated-web.webp.asset.json";
import elevatedTube from "../assets/projects/elevated-tube.webp.asset.json";
import mughalCover from "../assets/projects/mughal-cover.webp.asset.json";
import mughalPack from "../assets/projects/mughal-pack.webp.asset.json";
import mughalStationery from "../assets/projects/mughal-stationery.webp.asset.json";
import gangaCover from "../assets/projects/ganga-cover.webp.asset.json";
import gangaTable from "../assets/projects/ganga-table.webp.asset.json";
import gangaDisplay from "../assets/projects/ganga-display.webp.asset.json";
import goldenCover from "../assets/projects/golden-cover.webp.asset.json";
import goldenSystem from "../assets/projects/golden-system.webp.asset.json";
import goldenPattern from "../assets/projects/golden-pattern.webp.asset.json";
import growfinCover from "../assets/projects/growfin-cover.webp.asset.json";
import growfinStationery from "../assets/projects/growfin-stationery.webp.asset.json";
import growfinCampaign from "../assets/projects/growfin-campaign.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prasath S — Brand & Motion Designer" },
      { name: "description", content: "Portfolio of Prasath S, featuring identity systems, packaging, campaigns and motion design." },
      { property: "og:title", content: "Prasath S — Brand & Motion Designer" },
      { property: "og:description", content: "Selected identity, packaging, campaign and motion work by Prasath S." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

type Project = {
  name: string;
  category: string;
  year: string;
  summary: string;
  services: string;
  images: [{ url: string }, { url: string }, { url: string }];
};

const projects: Project[] = [
  {
    name: "Elevated",
    category: "Construction · Brand system",
    year: "2024",
    summary: "A precise, future-facing identity for a construction brand, extended across digital, print, site safety and everyday brand touchpoints.",
    services: "Identity · Art direction · Digital · Collateral",
    images: [elevatedCover, elevatedWeb, elevatedTube],
  },
  {
    name: "Mughal",
    category: "Hospitality · Food & beverage",
    year: "2024",
    summary: "A rich restaurant identity shaped by Mughal visual heritage, combining contemporary food imagery with packaging and branded dining materials.",
    services: "Brand identity · Packaging · Campaigns",
    images: [mughalCover, mughalPack, mughalStationery],
  },
  {
    name: "Ganga Sweets",
    category: "Retail · Confectionery",
    year: "2024",
    summary: "A vibrant packaging language for traditional Indian sweets, using festive pattern, colour and food styling to build a recognisable retail presence.",
    services: "Packaging · Art direction · Product imagery",
    images: [gangaCover, gangaTable, gangaDisplay],
  },
  {
    name: "Golden Perfumes",
    category: "Luxury · Fragrance",
    year: "2024",
    summary: "A restrained premium identity for a fragrance house, developed through elegant typography, a refined monogram and a structured visual guideline system.",
    services: "Identity · Guidelines · Print collateral",
    images: [goldenCover, goldenSystem, goldenPattern],
  },
  {
    name: "GrowFin",
    category: "Finance · Digital brand",
    year: "2025",
    summary: "An approachable finance identity built around growth and aspiration, translated into a cohesive digital campaign and professional stationery system.",
    services: "Brand identity · Digital campaign · Collateral",
    images: [growfinCover, growfinStationery, growfinCampaign],
  },
];

const experience = [
  ["Dec 2025 — Present", "Graphic Designer", "Starlfinx Fintech Technology · Dubai"],
  ["Feb 2025 — Dec 2025", "Graphics Designer, Digital Marketing", "Chennai Event Hunters"],
  ["Apr 2024 — Feb 2025", "Jr Creative & Motion Designer", "Mindzmap Digital Solutions"],
  ["Mar 2024 — Apr 2024", "Graphic Designer Intern", "Creative Artz Institute"],
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        element.classList.add("is-visible");
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Portfolio() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <main className="portfolio-shell">
      <div className="scroll-track" aria-hidden="true"><span style={{ transform: `scaleY(${progress})` }} /></div>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Prasath S, home">
          <svg className="brand-symbol" viewBox="0 0 31.5 48.5" aria-hidden="true"><path d="M21.5 0V19.5H31.5V29L10 48.5V28.5H.5V18.5Z" fill="currentColor"/><path d="M.5 18.5h9v10h-9zm21.5 1h9.5V29H22z" fill="var(--background)"/></svg>
        </a>
        <div className="nav-links"><a href="#work">Work</a><a href="#reel">Reel</a><a href="#about">About</a><a href="#contact">Contact</a><a className="nav-resume" href={resumeAsset.url} target="_blank" rel="noreferrer">Résumé</a></div>
      </nav>

      <header className="hero" id="top">
        <video className="hero-video" autoPlay muted loop playsInline preload="auto" poster={motionPoster} aria-hidden="true"><source src={motionAsset.url} type="video/mp4" /></video>
        <div className="video-veil" aria-hidden="true" />
        <div className="hero-content">
          <span className="hero-kicker">Prasath S · Art Director & Designer</span>
          <h1><span>Ideas shaped</span><span>into <em>motion.</em></span></h1>
          <p className="hero-intro">Identity systems, campaigns and motion—crafted with clarity, energy and a sharp visual point of view.</p>
          <div className="hero-actions"><a className="action-primary" href="#reel">Watch reel <ArrowDownRight size={18} /></a><a className="action-secondary" href="#work">Explore work</a></div>
          <div className="hero-foot"><span>Dubai, UAE</span><span>Scroll / 2026</span></div>
        </div>
      </header>

      <section className="reel-section" id="reel">
        <Reveal>
          <div className="section-heading"><div><span className="eyebrow">01 / Motion</span><h2>Showreel</h2></div><span>Selected sequences · 00:05</span></div>
          <div className="reel-frame"><video autoPlay muted loop playsInline preload="metadata" poster={motionPoster}><source src={motionAsset.url} type="video/mp4" /></video><div className="reel-caption"><span>Design that moves.</span><small>Brand · Type · Motion</small></div></div>
        </Reveal>
      </section>

      <div className="marquee" aria-label="Creative capabilities"><div className="marquee-track">{["Identity", "Art Direction", "Packaging", "Motion", "Digital", "Campaigns", "Identity", "Art Direction", "Packaging", "Motion", "Digital", "Campaigns"].map((item, index) => <span key={`${item}-${index}`}>{item}<b>✳</b></span>)}</div></div>

      <section className="work-section" id="work">
        <Reveal className="section-heading"><div><span className="eyebrow">02 / Selected projects</span><h2>Work</h2></div><span>06 case studies · 2024—2025</span></Reveal>

        <Reveal className="logo-feature">
          <div className="project-copy"><span className="project-index">01</span><div><p className="project-category">Brand identity · Multi-industry</p><h3>Logo Folio</h3><p className="project-summary">A curated collection of identity marks exploring distinct symbols, wordmarks and visual personalities across hospitality, technology and consumer brands.</p><p className="project-services">Logo design · Concept development · Identity systems</p></div><span className="project-year">Vol. 05</span></div>
          <div className="logo-grid">{[[logoMca,"MCA identity mark"],[logoOzmex,"Ozmex identity mark"],[logoDeepam,"Deepam Flower Decorations identity mark"]].map(([image,alt]) => <figure key={alt as string}><img src={(image as {url:string}).url} alt={alt as string} loading="lazy" /></figure>)}</div>
        </Reveal>

        <div className="case-list">
          {projects.map((project, index) => (
            <Reveal className="case-study" key={project.name}>
              <div className="project-copy"><span className="project-index">0{index + 2}</span><div><p className="project-category">{project.category}</p><h3>{project.name}</h3><p className="project-summary">{project.summary}</p><p className="project-services">{project.services}</p></div><span className="project-year">{project.year}</span></div>
              <div className="project-gallery"><figure className="gallery-main"><img src={project.images[0].url} alt={`${project.name} project cover`} loading="lazy" /></figure><div className="gallery-support"><figure><img src={project.images[1].url} alt={`${project.name} supporting application`} loading="lazy" /></figure><figure><img src={project.images[2].url} alt={`${project.name} brand detail`} loading="lazy" /></figure></div></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="profile-section" id="about">
        <Reveal className="about-block"><span className="eyebrow">03 / About</span><p className="about-lead">I turn ideas into clear visual systems—crafted with a designer&apos;s eye and a director&apos;s instinct.</p><p className="about-copy">With 3+ years across branding, digital campaigns, visual communication, UI/UX, motion graphics and AI-driven creativity.</p><div className="capabilities"><div><span>Capabilities</span><p>Art Direction · Brand Identity · Digital Campaigns · UI/UX · Motion Graphics · Print &amp; Packaging</p></div><div><span>Tools</span><p>Adobe Creative Cloud · Figma · After Effects · Premiere Pro · Generative AI</p></div></div></Reveal>
        <Reveal className="experience-block"><span className="eyebrow">04 / Experience</span><div className="experience-list">{experience.map(([date, role, company]) => <div className="experience-item" key={`${date}-${role}`}><span>{date}</span><h3>{role}</h3><p>{company}</p></div>)}</div></Reveal>
      </section>

      <footer className="contact-section" id="contact"><video autoPlay muted loop playsInline preload="metadata" poster={motionPoster} aria-hidden="true"><source src={motionAsset.url} type="video/mp4" /></video><div className="contact-veil" aria-hidden="true"/><Reveal className="contact-content"><span className="eyebrow">05 / Let&apos;s collaborate</span><h2>Make something<br/><em>move.</em></h2><a className="email-link" href="mailto:prasathallen00@gmail.com">prasathallen00@gmail.com <ArrowUpRight /></a><div className="footer-links"><a href="https://www.behance.net/prasathallen" target="_blank" rel="noreferrer">Behance <ArrowUpRight size={14}/></a><a href={resumeAsset.url} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={14}/></a><span>© 2026 Prasath S</span></div></Reveal></footer>
    </main>
  );
}
