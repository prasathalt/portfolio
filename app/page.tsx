"use client";

import Link from "next/link";
import { ArrowUpRight, Play, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

import motionAsset from "../src/assets/motion-graphics.mp4.asset.json";
import motionPoster from "../src/assets/motion-poster.jpg";
import resumeAsset from "../src/assets/prasath-resume.pdf.asset.json";
import logoMca from "../src/assets/projects/logo-mca.webp.asset.json";
import logoOzmex from "../src/assets/projects/logo-ozmex.webp.asset.json";
import logoDeepam from "../src/assets/projects/logo-deepam.webp.asset.json";
import { projects, type AssetJson } from "../src/lib/data";

const experience = [
  ["Dec 2025 — Present", "Graphic Designer", "Starlfinx Fintech Technology · Dubai"],
  ["Feb 2025 — Dec 2025", "Graphics Designer, Digital Marketing", "Chennai Event Hunters"],
  ["Apr 2024 — Feb 2025", "Jr Creative & Motion Designer", "Mindzmap Digital Solutions"],
  ["Mar 2024 — Apr 2024", "Graphic Designer Intern", "Creative Artz Institute"],
];

const capabilities = [
  { label: "Capabilities", text: "Art Direction · Brand Identity · Digital Campaigns · UI/UX · Motion Graphics · Print & Packaging" },
  { label: "Tools", text: "Adobe Creative Cloud · Figma · After Effects · Premiere Pro · Generative AI" },
];

const MARQUEE_ITEMS = ["Identity", "Art Direction", "Packaging", "Motion", "Digital", "Campaigns"];

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    let raf: number;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => document.body.classList.add("cursor-hover");
    const onLeave = () => document.body.classList.remove("cursor-hover");
    const links = document.querySelectorAll("a, button, [data-cursor]");

    window.addEventListener("mousemove", onMove);
    links.forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      links.forEach(el => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}

// ─── Loading Screen ───────────────────────────────────────────────────────────
function Loader({ onDone }: { onDone: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: onDone,
        });
      },
    });

    tl.to([logoRef.current, lineRef.current, counterRef.current], {
      opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out",
    });

    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate() {
        if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.val)).padStart(3, "0");
      },
    }, "-=0.2");

    tl.to(barRef.current, {
      width: "100%",
      duration: 1.6,
      ease: "power2.inOut",
    }, "<");

    tl.to({}, { duration: 0.3 });
  }, { scope: loaderRef });

  return (
    <div id="loader" ref={loaderRef}>
      <div id="loader-logo" ref={logoRef}>
        PRASATH <span>S</span>
      </div>
      <div id="loader-line" ref={lineRef}>Brand &amp; Motion Designer · Dubai</div>
      <div id="loader-counter">
        <span ref={counterRef}>000</span>
      </div>
      <div id="loader-bar" ref={barRef} />
    </div>
  );
}

// ─── Scroll Progress ──────────────────────────────────────────────────────────
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div id="scroll-progress" ref={barRef} />;
}

// ─── Main Portfolio ───────────────────────────────────────────────────────────
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Portfolio() {
  const mainRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heroKickerRef = useRef<HTMLSpanElement>(null);
  const heroLine1Ref = useRef<HTMLSpanElement>(null);
  const heroLine2Ref = useRef<HTMLSpanElement>(null);
  const heroMetaRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const loaderDone = useRef(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const playHeroEntrance = () => {
    const tl = gsap.timeline();
    tl.to(navRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    tl.to(heroKickerRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");
    tl.to([heroLine1Ref.current, heroLine2Ref.current], {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
    }, "-=0.5");
    tl.to(heroMetaRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");
  };

  useEffect(() => {
    gsap.set([navRef.current, heroKickerRef.current, heroLine1Ref.current, heroLine2Ref.current, heroMetaRef.current], {
      opacity: 0, y: 20,
    });
  }, []);

  useGSAP(() => {
    if (!loaderDone.current) return;
    const elements = document.querySelectorAll(".gsap-fade, .gsap-fade-left");
    elements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: el.classList.contains("gsap-fade-left") ? 0 : 40, x: el.classList.contains("gsap-fade-left") ? -40 : 0 },
        {
          opacity: 1, y: 0, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });
  }, { dependencies: [], scope: mainRef });

  const handleLoaderDone = () => {
    loaderDone.current = true;
    playHeroEntrance();

    const elements = document.querySelectorAll(".gsap-fade, .gsap-fade-left");
    elements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: el.classList.contains("gsap-fade-left") ? 0 : 40, x: el.classList.contains("gsap-fade-left") ? -40 : 0 },
        {
          opacity: 1, y: 0, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });
    ScrollTrigger.refresh();
  };

  const marqueeFull = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <>
      <Cursor />
      <Loader onDone={handleLoaderDone} />
      <ScrollProgress />

      <div ref={mainRef}>
        <nav className="site-nav" ref={navRef} aria-label="Main navigation">
          <a className="nav-logo" href="#top" aria-label="Prasath S home">
            PRASATH <span className="nav-logo-symbol">&nbsp;S</span>
          </a>

          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#reel">Reel</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>

          <a
            className="nav-resume nav-resume-link"
            href={resumeAsset.url}
            target="_blank"
            rel="noreferrer"
          >
            Résumé ↗
          </a>
        </nav>

        <header className="hero" id="top">
          <div className="hero-bg">
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={motionPoster.src}
              aria-hidden="true"
            >
              <source src={motionAsset.url} type="video/mp4" />
            </video>
            <div className="hero-overlay" aria-hidden="true" />
          </div>

          <div className="hero-content">
            <span className="hero-kicker" ref={heroKickerRef}>
              Prasath S · Art Director &amp; Designer
            </span>

            <h1 className="hero-title">
              <span className="line">
                <span className="line-inner" ref={heroLine1Ref}>Ideas shaped</span>
              </span>
              <span className="line">
                <span className="line-inner" ref={heroLine2Ref}>into <em>motion.</em></span>
              </span>
            </h1>

            <div className="hero-meta" ref={heroMetaRef}>
              <p className="hero-desc">
                Identity systems, campaigns and motion—crafted with clarity, energy and a sharp visual point of view.
              </p>
              <div className="hero-ctas">
                <a className="btn-primary" href="#reel">
                  Watch Reel <Play size={15} fill="currentColor" />
                </a>
                <a className="btn-ghost" href="#work">
                  Explore Work
                </a>
              </div>
              <div className="hero-location">
                Dubai, UAE<br />
                <span style={{ color: "var(--red)" }}>2026</span>
              </div>
            </div>
          </div>
        </header>

        <div className="marquee-section" aria-label="Creative capabilities">
          <div className="marquee-track">
            {marqueeFull.map((item, i) => (
              <span key={i}>
                {item} <b className="sep">✦</b>
              </span>
            ))}
          </div>
        </div>

        <section className="work-section" id="work">
          <div className="work-heading gsap-fade">
            <div className="section-label">
              <span className="eyebrow">02 / Selected Projects</span>
              <div className="divider" />
              <span className="count">06 case studies · 2024—2025</span>
            </div>
            <h2>Selected<br /><span>Work</span></h2>
          </div>

          <div className="logo-folio gsap-fade">
            <div className="project-meta">
              <div className="project-num">01</div>
              <div className="project-info">
                <p className="project-cat">Brand identity · Multi-industry</p>
                <h3>Logo Folio</h3>
                <p className="project-summary">
                  A curated collection of identity marks exploring distinct symbols, wordmarks and visual personalities across hospitality, technology and consumer brands.
                </p>
                <p className="project-services">Logo design · Concept development · Identity systems</p>
              </div>
              <div className="project-year">Vol. 05</div>
            </div>

            <div className="logo-grid">
              {([
                [logoMca, "MCA identity mark"],
                [logoOzmex, "Ozmex identity mark"],
                [logoDeepam, "Deepam Flower Decorations identity mark"],
              ] as [AssetJson, string][]).map(([image, alt]) => (
                <figure key={alt}>
                  <img src={image.url} alt={alt} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>

          <div className="work-preview-container gsap-fade" style={{ marginTop: "4rem" }}>
            <div className="work-preview-track" style={{ display: "flex", gap: "2rem", overflowX: "auto", paddingBottom: "2rem", scrollbarWidth: "none" }}>
              {projects.map((project) => (
                <Link href="/work" key={project.id} className="preview-card" style={{ minWidth: "80vw", display: "block" }}>
                  <figure style={{ aspectRatio: "16/9", overflow: "hidden", background: "var(--black-2)", marginBottom: "1rem" }}>
                    <img src={project.images[0].url} alt={project.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }} />
                  </figure>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, textTransform: "uppercase" }}>{project.name}</h3>
                    <span style={{ color: "var(--gray)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{project.category}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
              <Link href="/work" className="btn-primary" style={{ padding: "1rem 3rem", fontSize: "1rem" }}>
                Explore All Work <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="reel-section" id="reel">
          <div className="section-label gsap-fade">
            <span className="eyebrow">01 / Motion Reel</span>
            <div className="divider" />
            <span className="count">Selected sequences · 00:05</span>
          </div>

          <div className="reel-frame gsap-fade" data-cursor>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={motionPoster.src}
            >
              <source src={motionAsset.url} type="video/mp4" />
            </video>
            <div className="reel-play-btn" aria-hidden="true">
              <Play size={24} fill="currentColor" />
            </div>
            <div className="reel-caption">
              <strong>Design that moves.</strong>
              <small>Brand · Type · Motion</small>
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-grid">
            <div>
              <p className="about-eyebrow gsap-fade">03 / About</p>
              <p className="about-lead gsap-fade">
                I turn ideas into clear visual systems.
              </p>
              <p className="about-body gsap-fade">
                With 3+ years across branding, digital campaigns, visual communication, UI/UX, motion graphics and AI-driven creativity — I craft work with a designer&apos;s eye and a director&apos;s instinct.
              </p>
              <div className="caps-grid gsap-fade">
                {capabilities.map(({ label, text }) => (
                  <div className="cap-block" key={label}>
                    <label>{label}</label>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="exp-eyebrow gsap-fade">04 / Experience</p>
              <div className="exp-list">
                {experience.map(([date, role, company]) => (
                  <div className="exp-item gsap-fade" key={`${date}-${role}`}>
                    <div className="exp-date">{date}</div>
                    <div className="exp-role">{role}</div>
                    <div className="exp-company">{company}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="contact-section" id="contact">
          <div className="contact-bg">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={motionPoster.src}
              aria-hidden="true"
            >
              <source src={motionAsset.url} type="video/mp4" />
            </video>
          </div>

          <div className="contact-content">
            <p className="contact-eyebrow gsap-fade">05 / Let&apos;s collaborate</p>
            <h2 className="contact-heading gsap-fade">
              Make<br />something<br /><em>move.</em>
            </h2>

            <a className="email-link gsap-fade" href="mailto:prasathallen00@gmail.com">
              prasathallen00@gmail.com <ArrowUpRight size={20} />
            </a>

            <div className="footer-bar gsap-fade">
              <a href="https://www.behance.net/prasathallen" target="_blank" rel="noreferrer">
                Behance <ArrowUpRight size={12} />
              </a>
              <a href={resumeAsset.url} target="_blank" rel="noreferrer">
                Résumé <ArrowUpRight size={12} />
              </a>
              <span className="copy">© 2026 Prasath S</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
