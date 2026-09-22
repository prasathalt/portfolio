import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { ArrowLeft } from "lucide-react";
import { projects, type Project } from "../lib/data";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Prasath S" },
      { name: "description", content: "Explore the full portfolio of Prasath S. Categorized case studies across brand systems, digital, packaging, and campaigns." },
    ],
  }),
  component: WorkPage,
});

const CATEGORIES = ["All", "Brand system", "Packaging", "Digital", "Campaigns"];

function WorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter projects based on category
  const filteredProjects = projects.filter((p) =>
    activeCategory === "All" ? true : p.tags.includes(activeCategory)
  );

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Entrance animations and ScrollTriggers
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".work-header-anim", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    // We animate the projects every time the category changes
    gsap.fromTo(".case-study",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".case-list",
          start: "top 85%",
        }
      }
    );
  }, { dependencies: [activeCategory], scope: containerRef });

  // Reset scroll triggers when category changes to handle new heights
  useEffect(() => {
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, [activeCategory]);

  return (
    <div ref={containerRef} className="page-work" style={{ minHeight: "100vh", background: "var(--black)", color: "var(--white)" }}>
      {/* ── Nav ── */}
      <nav className="site-nav" style={{ opacity: 1, transform: "none", position: "relative" }}>
        <Link to={"/" as any} className="nav-logo" style={{ display: "inline-flex", gap: "0.5rem", color: "var(--white)" }}>
          <ArrowLeft size={16} /> BACK HOME
        </Link>
      </nav>

      <main style={{ padding: "clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 4rem)" }}>
        {/* ── Header ── */}
        <header style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <h1 className="work-header-anim" style={{ opacity: 0, transform: "translateY(20px)", fontFamily: "var(--font-display)", fontSize: "clamp(4rem, 10vw, 8rem)", fontWeight: 700, letterSpacing: "-0.04em", textTransform: "uppercase", lineHeight: 0.9 }}>
            All <span style={{ color: "var(--red)" }}>Work</span>
          </h1>
          <p className="work-header-anim" style={{ opacity: 0, transform: "translateY(20px)", marginTop: "1.5rem", maxWidth: "34rem", color: "var(--gray-light)", lineHeight: 1.6 }}>
            A comprehensive look at the projects shaping brands across construction, hospitality, luxury, and finance.
          </p>
        </header>

        {/* ── Filters ── */}
        <div className="work-header-anim category-filters" style={{ opacity: 0, transform: "translateY(20px)", display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "4rem", borderBottom: "1px solid rgba(240,240,240,0.1)", paddingBottom: "2rem" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              style={{
                background: "none",
                border: "none",
                color: activeCategory === cat ? "var(--white)" : "var(--gray)",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "color 0.25s ease",
                padding: "0.5rem 0",
              }}
            >
              {cat} {activeCategory === cat && <span style={{ color: "var(--red)" }}>✦</span>}
            </button>
          ))}
        </div>

        {/* ── Projects List ── */}
        <div className="case-list">
          {filteredProjects.length === 0 ? (
            <p style={{ color: "var(--gray)" }}>No projects found for this category.</p>
          ) : (
            filteredProjects.map((project, index) => (
              <div className="case-study" key={project.id} style={{ opacity: 0 }}>
                <div className="project-meta">
                  <div className="project-num">{(index + 1).toString().padStart(2, '0')}</div>
                  <div className="project-info">
                    <p className="project-cat">{project.category}</p>
                    <h3>{project.name}</h3>
                    <p className="project-summary">{project.summary}</p>
                    <p className="project-services">{project.services}</p>
                  </div>
                  <div className="project-year">{project.year}</div>
                </div>

                <div className="project-gallery">
                  <figure className="gallery-main">
                    <img src={project.images[0].url} alt={`${project.name} project cover`} loading="lazy" />
                  </figure>
                  <div className="gallery-support">
                    <figure>
                      <img src={project.images[1].url} alt={`${project.name} supporting application`} loading="lazy" />
                    </figure>
                    <figure>
                      <img src={project.images[2].url} alt={`${project.name} brand detail`} loading="lazy" />
                    </figure>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
