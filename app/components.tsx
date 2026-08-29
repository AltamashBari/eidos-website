"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CSSProperties, FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { Project, ProjectCategory } from "./data";
import { clamp01, motionConfig } from "./motionConfig";
import { useSpring } from "./useSpring";

// Nav hover chips reference the palette tokens directly, and only use the
// darker three — the hover state prints white text over them.
const navigation = [
  ["Work", "/projects", "var(--charcoal)"],
  ["Awards", "/awards", "var(--burgundy)"],
  ["Media", "/media", "var(--terracotta)"],
  ["R&D", "/rnd", "var(--charcoal)"],
  ["Studio", "/studio", "var(--burgundy)"],
  ["Contact", "/contact-us", "var(--terracotta)"],
];

export function Logo() {
  return (
    <span className="logo" aria-label="EIDOS Design Studio">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/eidos-logo.png" alt="EIDOS Design Studio" />
    </span>
  );
}

function MotionWord({ label, mobile = false }: { label: string; mobile?: boolean }) {
  const letters = Array.from(label);
  const delays = letters.map((_, index) => {
    if (!mobile) return index * motionConfig.nav.characterStaggerMs;
    if (letters.length === 1) return 0;
    return (index / (letters.length - 1)) * motionConfig.mobileNav.totalCharacterStaggerMs;
  });

  return (
    <span
      className={`motion-word ${mobile ? "motion-word-mobile" : ""}`}
      style={{ "--word-chars": letters.length } as CSSProperties}
      aria-hidden="true"
    >
      <span className="motion-word-row motion-word-row-a">
        {letters.map((letter, index) => (
          <i key={`${letter}-${index}`} style={{ "--char-delay": `${delays[index]}ms` } as CSSProperties}>
            {letter === " " ? "\u00a0" : letter}
          </i>
        ))}
      </span>
      <span className="motion-word-row motion-word-row-b">
        {letters.map((letter, index) => (
          <i key={`${letter}-${index}`} style={{ "--char-delay": `${delays[index]}ms` } as CSSProperties}>
            {letter === " " ? "\u00a0" : letter}
          </i>
        ))}
      </span>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  // The menu is driven by a spring rather than a fixed-duration CSS
  // transition, so it can be grabbed and reversed mid-flight.
  // Apple's shipped drawer is damping 0.8 / response 0.3; this runs slower
  // and calmer (0.95 / 0.5) to match the studio's unhurried pacing —
  // still fully interruptible, just less eager.
  useSpring(open ? 1 : 0, { damping: 0.95, response: 0.5 }, (p) => {
    panelRef.current?.style.setProperty("--menu-p", p.toFixed(4));
  });

  return (
    <>
      <header className="site-header">
        <Link href="/" className="logo-link" aria-label="EIDOS Design Studio home">
          <Logo />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, href, color]) => (
            <Link
              href={href}
              key={href}
              aria-label={label}
              style={{ "--nav-color": color } as CSSProperties}
              className={pathname === href || pathname.startsWith(`${href}/`) ? "active" : ""}
            >
              <MotionWord label={label} />
            </Link>
          ))}
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-label">{open ? "Close" : "Menu"}</span>
          <span className="menu-icon" aria-hidden="true"><i /><i /><i /><i /></span>
        </button>
      </header>
      <nav ref={panelRef} id="mobile-menu" className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        {navigation.map(([label, href, color], index) => (
          <Link
            href={href}
            key={href}
            aria-label={label}
            style={{ "--item-stagger": index * 0.06, "--nav-color": color } as CSSProperties}
            onClick={() => setOpen(false)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <MotionWord label={label} mobile />
          </Link>
        ))}
      </nav>
    </>
  );
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const startedAt = performance.now();
    document.body.classList.add("is-loading");

    const criticalImages = Array.from(document.images).filter((image) => image.loading !== "lazy");
    const imagesReady = Promise.allSettled(
      criticalImages.map((image) => {
        if (image.complete) return image.decode?.().catch(() => undefined) ?? Promise.resolve();
        return new Promise<void>((resolve) => {
          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => resolve(), { once: true });
        });
      }),
    );
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const maximumWait = new Promise<void>((resolve) => {
      window.setTimeout(resolve, motionConfig.loader.maximumAssetWaitMs);
    });

    // Reveal the moment assets are ready. There is no artificial floor — holding
    // a ready page behind a loader is latency we chose to add.
    Promise.race([Promise.allSettled([imagesReady, fontsReady]), maximumWait]).then(() => {
      const remaining = Math.max(0, motionConfig.loader.minimumVisibleMs - (performance.now() - startedAt));
      const reveal = () => {
        if (cancelled) return;
        setLoaded(true);
        document.body.classList.remove("is-loading");
        document.body.classList.add("page-ready");
      };
      if (remaining <= 0) reveal();
      else window.setTimeout(reveal, remaining);
    });

    return () => {
      cancelled = true;
      document.body.classList.remove("is-loading", "page-ready");
    };
  }, []);

  // NOTE: the click interceptor that used to live here has been removed.
  // It delayed every internal link by 300ms and then called
  // window.location.assign(), forcing a full document reload — discarding
  // React and re-running the loader on arrival. Next's <Link> already does
  // client-side navigation, so links are now instant. The cover wipe is
  // handled declaratively by the View Transitions API in globals.css, which
  // animates without standing between the click and the navigation.

  useEffect(() => {
    let frame = 0;
    let cards: HTMLElement[] = [];
    let galleryImages: HTMLImageElement[] = [];

    const collect = () => {
      cards = Array.from(document.querySelectorAll<HTMLElement>(".project-card"));
      galleryImages = Array.from(document.querySelectorAll<HTMLImageElement>(".editorial-gallery img"));
      schedule();
    };

    const render = () => {
      frame = 0;
      const viewport = window.innerHeight;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const flowBase = clamp01((viewport - rect.top) / (viewport + rect.height));
        const progress = clamp01((flowBase - 0.12) / 0.53);
        const imageBase = clamp01((viewport * 1.35 - rect.top) / (viewport * 1.35 + rect.height));
        const imageProgress = clamp01((imageBase - 0.13) / 0.57);
        const scale = motionConfig.projectCard.imageScaleStart
          + imageProgress * (motionConfig.projectCard.imageScaleEnd - motionConfig.projectCard.imageScaleStart);
        const copyY = (1 - progress) * motionConfig.projectCard.copyTravelPx;
        const shapeY = motionConfig.projectCard.shapeStartPercent
          + progress * (motionConfig.projectCard.shapeEndPercent - motionConfig.projectCard.shapeStartPercent);
        card.style.setProperty("--card-p", progress.toFixed(5));
        card.style.setProperty("--image-scale", scale.toFixed(5));
        card.style.setProperty("--copy-y", `${copyY.toFixed(2)}px`);
        card.style.setProperty("--shape-y", `${shapeY.toFixed(2)}%`);
      });
      galleryImages.forEach((image) => {
        const rect = image.getBoundingClientRect();
        const progress = clamp01((viewport - rect.top) / (viewport + rect.height));
        image.style.setProperty("--gallery-scale", (1 + progress * 0.12).toFixed(5));
        image.style.setProperty("--gallery-y", `${(0.5 - progress) * 34}px`);
      });
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    collect();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    const observer = new MutationObserver(collect);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className={`preloader ${loaded ? "loaded" : ""}`} aria-hidden="true">
        <Logo />
        <span className="loader-line" />
      </div>
      <div className="page-cover" aria-hidden="true">
        <Logo />
      </div>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`motion-static ${className}`}>
      {children}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Logo />
        <p>Architecture · interiors · human experience</p>
      </div>
      <div className="footer-links">
        <Link href="/projects">Work</Link>
        <Link href="/rnd">Research</Link>
        <Link href="/contact-us">Contact</Link>
      </div>
      <div className="social-links" aria-label="Social links">
        <a href="#" rel="noreferrer">IG</a>
        <a href="#" rel="noreferrer">IN</a>
        <a href="#" rel="noreferrer">YT</a>
      </div>
      <p className="copyright">Copyright © 2026 EIDOS Design Studio</p>
    </footer>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="arrow-link">
      {children}<span aria-hidden="true">▶</span>
    </Link>
  );
}

export function ProjectCard({
  project,
  index = 0,
  variant = "default",
  imageOverride,
}: {
  project: Project;
  index?: number;
  variant?: "default" | "featured";
  imageOverride?: string;
}) {
  return (
    <Link href={`/project-inside/${project.slug}`} className={`project-card ${variant === "featured" ? "featured-project-card" : ""}`}>
      <div className="project-image-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageOverride ?? project.image} alt={`${project.title} interior`} loading="lazy" referrerPolicy={imageOverride ? "no-referrer" : undefined} />
        <span className="project-plus" aria-hidden="true">+</span>
      </div>
      <div className="project-card-copy">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <h3>{project.title}</h3>
        <p>{project.category} · {project.year}</p>
      </div>
      <span className={`project-shape project-shape-${(index % 3) + 1}`} aria-hidden="true" />
    </Link>
  );
}

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const categories: Array<"All" | ProjectCategory> = [
    "All",
    "Commercial",
    "F&B",
    "Hospitality",
    "Education",
    "Residential",
    "Retail",
    "Product",
  ];
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const visible = active === "All" ? projects : projects.filter((project) => project.category === active);

  return (
    <>
      <div className="filter-row" role="group" aria-label="Filter projects">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={active === category ? "active" : ""}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="projects-grid" aria-live="polite">
        {visible.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}
      </div>
    </>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState("");
  // §16 — validate inline, not on submit. A field is only judged once the
  // user has left it, so nothing turns red while they are still typing.
  const [notes, setNotes] = useState<Record<string, string>>({});

  const validateField = (el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
    el.setAttribute("data-touched", "");
    setNotes((prev) => ({ ...prev, [el.name]: el.validity.valid ? "" : messageFor(el) }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      // Mark everything touched so every problem surfaces at once, then
      // move focus to the first one rather than relying on a browser popup.
      const fields = Array.from(
        form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select"),
      );
      fields.forEach(validateField);
      fields.find((f) => !f.validity.valid)?.focus();
      setStatus("Please check the highlighted fields.");
      return;
    }
    setStatus("Thanks — we've got your note and will be in touch.");
    form.reset();
    setNotes({});
    form.querySelectorAll("[data-touched]").forEach((el) => el.removeAttribute("data-touched"));
  };

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <label>
        Your name
        <input name="name" autoComplete="name" required minLength={2}
               onBlur={(e) => validateField(e.currentTarget)} />
        <span className="field-note">{notes.name}</span>
      </label>
      <label>
        Email address
        <input name="email" type="email" autoComplete="email" required
               onBlur={(e) => validateField(e.currentTarget)} />
        <span className="field-note">{notes.email}</span>
      </label>
      <label>
        I’m interested in
        <select name="interest" defaultValue="" required
                onBlur={(e) => validateField(e.currentTarget)}
                onChange={(e) => validateField(e.currentTarget)}>
          <option value="" disabled>Select a service</option>
          <option>Architecture</option>
          <option>Interior design</option>
          <option>BIM services</option>
          <option>Exhibition &amp; event design</option>
          <option>Careers</option>
        </select>
        <span className="field-note">{notes.interest}</span>
      </label>
      <label className="wide">
        Tell us about your project
        <textarea name="message" rows={5} required minLength={12}
                  onBlur={(e) => validateField(e.currentTarget)} />
        <span className="field-note">{notes.message}</span>
      </label>
      <button type="submit">Send enquiry <span aria-hidden="true">↗</span></button>
      <p role="status">{status}</p>
    </form>
  );
}

/** Plain-language validation copy — no jargon, says what to do (§16). */
function messageFor(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  const v = el.validity;
  if (v.valueMissing) {
    if (el.tagName === "SELECT") return "Pick one";
    return el.name === "message" ? "Tell us a little about it" : "This one's needed";
  }
  if (v.typeMismatch) return "That email doesn't look right";
  if (v.tooShort) return el.name === "message" ? "A sentence or two, please" : "A bit longer, please";
  return "Please check this";
}
