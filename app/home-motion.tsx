"use client";

import Link from "next/link";
import { CSSProperties, RefObject, useCallback, useEffect, useRef } from "react";
import { clamp01, motionConfig, rangeProgress } from "./motionConfig";

const sectors = [
  ["Architecture", "", "/images/projects/office.webp"],
  ["Interior Designing", "", "/images/projects/lobby.webp"],
  ["BIM Services", "", "/images/projects/office.webp"],
  ["Exhibition Design", "", "/images/projects/retail.webp"],
  ["Event Design", "", "/images/projects/lobby.webp"],
  ["Collaborations", "", "/images/projects/retail.webp"],
] as const;

function useScrubbedChapter(
  chapterRef: RefObject<HTMLElement | null>,
  update: (node: HTMLElement, progress: number) => void,
) {
  useEffect(() => {
    const node = chapterRef.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const render = () => {
      frame = 0;
      if (reduced.matches) {
        update(node, 1);
        return;
      }
      const rect = node.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      update(node, clamp01(-rect.top / scrollable));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    reduced.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, [chapterRef, update]);
}

function IntroChapter() {
  const chapterRef = useRef<HTMLElement>(null);

  const updateIntro = useCallback((node: HTMLElement, progress: number) => {
    const yellowEnter = rangeProgress(progress, 0, 0.047);
    const blueEnter = rangeProgress(progress, 0.115, 0.18);
    const blueCutoutExit = rangeProgress(progress, 0.18, 0.2);
    const whiteEnter = rangeProgress(progress, 0.195, 0.268);
    const whiteCutoutLead = rangeProgress(progress, 0.16, 0.195);
    const taglineEnter = rangeProgress(progress, 0.27, 0.3);
    const logoExit = rangeProgress(progress, 0.355, 0.395);
    const sectorProgress = rangeProgress(progress, ...motionConfig.home.sectorTravel);
    const sectorIn = rangeProgress(progress, 0.315, 0.35);
    const sectorPeopleIn = rangeProgress(progress, 0.4, 0.44);
    const skylineExit = rangeProgress(sectorProgress, 0.02, 0.16);
    const textureProgress = rangeProgress(progress, 0.02, 0.16);

    node.style.setProperty("--chapter-p", progress.toFixed(5));
    node.style.setProperty("--orange-x", `${yellowEnter * -100}%`);
    node.style.setProperty("--dark-y", `${blueEnter * -100}%`);
    node.style.setProperty("--dark-copy-top", `${35 + blueEnter * 11.5}%`);
    const blueCutoutLead = -(44 - blueEnter * 5.7);
    node.style.setProperty("--dark-cutout-y", `${blueCutoutLead + blueCutoutExit * (-57.7 - blueCutoutLead)}vh`);
    node.style.setProperty("--white-y", `${whiteEnter * -100}%`);
    const whiteCutoutStart = 50 + whiteCutoutLead * -94.9;
    node.style.setProperty("--white-cutout-y", `${whiteCutoutStart + whiteEnter * (-51.3 - whiteCutoutStart)}vh`);
    node.style.setProperty("--logo-opacity", Math.max(0, 1 - logoExit).toFixed(5));
    node.style.setProperty("--logo-y", `${(1 - whiteEnter) * 100}vh`);
    node.style.setProperty("--logo-scale", (0.75 + taglineEnter * 0.25).toFixed(5));
    node.style.setProperty("--logo-top", `${42.75 - taglineEnter * 10.65}%`);
    node.style.setProperty("--tagline-opacity", taglineEnter.toFixed(5));
    node.style.setProperty("--tagline-y", `${(1 - taglineEnter) * 39}px`);
    node.style.setProperty("--scroll-cue-opacity", (rangeProgress(progress, 0.285, 0.31) * Math.max(0, 1 - logoExit)).toFixed(5));
    node.style.setProperty("--sector-in", sectorIn.toFixed(5));
    node.style.setProperty("--sector-people-in", sectorPeopleIn.toFixed(5));
    node.style.setProperty("--sector-cloud-opacity", (sectorPeopleIn * 0.6).toFixed(5));
    node.style.setProperty("--sector-base-y", `${(1 - sectorIn) * 22}vh`);
    node.style.setProperty("--sector-sand-y", `${(1 - sectorIn) * 28}vh`);
    node.style.setProperty("--sector-visibility", sectorIn > 0.001 ? "visible" : "hidden");
    node.style.setProperty("--sector-skyline-opacity", Math.max(0, 1 - skylineExit).toFixed(5));
    node.style.setProperty("--r-one-x", `${64 + textureProgress * 12}vw`);
    node.style.setProperty("--r-one-y", `${-17 + textureProgress * 108}vh`);
    node.style.setProperty("--r-one-rotate", `${textureProgress * 90}deg`);
    node.style.setProperty("--r-one-scale", `${1 - textureProgress * 0.17}`);
    node.style.setProperty("--r-two-y", `${100 - textureProgress * 100}vh`);
    node.style.setProperty("--r-texture-opacity", rangeProgress(progress, 0.005, 0.02).toFixed(5));
    node.style.setProperty("--cream-x", `${yellowEnter * -8}vw`);
    node.style.setProperty(
      "--sector-x",
      `${-motionConfig.home.sectorTravelViewportWidths + sectorProgress * motionConfig.home.sectorTravelViewportWidths * motionConfig.home.sectorMainParallax}vw`,
    );
    node.style.setProperty(
      "--sector-rear-x",
      `${-motionConfig.home.sectorTravelViewportWidths + sectorProgress * motionConfig.home.sectorTravelViewportWidths * motionConfig.home.sectorRearParallax}vw`,
    );
    node.style.setProperty("--sector-front-x", `${-322.6 + sectorProgress * 322.6}vw`);
    node.style.setProperty(
      "--sector-accent-x",
      `${-motionConfig.home.sectorTravelViewportWidths + sectorProgress * motionConfig.home.sectorTravelViewportWidths * motionConfig.home.sectorAccentParallax}vw`,
    );

    // Each panel gets a PLATEAU at full focus, not a single instant of it.
    // The old curve was a pure triangle — 1 - |p - centre| / 0.2 — which peaks
    // for zero duration, so every panel was already fading before it had
    // finished arriving. HOLD is the flat top; FADE is the falloff after it.
    const SECTOR_HOLD = 0.06;
    const SECTOR_FADE = 0.16;

    node.querySelectorAll<HTMLElement>("[data-sector]").forEach((sector, index, all) => {
      const center = index / Math.max(1, all.length - 1);
      const distance = Math.abs(sectorProgress - center);
      const focus = clamp01(1 - Math.max(0, distance - SECTOR_HOLD) / SECTOR_FADE);
      sector.style.setProperty("--sector-focus", focus.toFixed(4));
      sector.style.setProperty("--sector-opacity", ((0.28 + focus * 0.72) * sectorPeopleIn).toFixed(4));
      sector.style.setProperty("--sector-scale", (0.97 + focus * 0.03).toFixed(4));
    });
  }, []);

  useScrubbedChapter(chapterRef, updateIntro);

  return (
    <section
      ref={chapterRef}
      className="kinetic-intro"
      style={{ "--chapter-height": `${motionConfig.home.introViewportHeights}svh` } as CSSProperties}
    >
      <div className="kinetic-pin">
        <div className="intro-story-stage">
          <div className="intro-opening-copy">
            <h1>We create spaces</h1>
            <p>that tell stories</p>
          </div>
          <span className="intro-cream-cutout" aria-hidden="true" />
          <div className="intro-orange-panel">
            <div><p>we shape ideas into</p><h2>Refined spaces</h2></div>
            <span className="intro-orange-cutout" aria-hidden="true" />
          </div>
          <div className="intro-dark-panel">
            <div><p>we design</p><h2>Experiences</h2></div>
            <span className="intro-dark-cutout" aria-hidden="true" />
          </div>
          <div className="intro-logo-scene">
            <span className="intro-white-cutout" aria-hidden="true" />
          </div>
          <div className="intro-logo-overlay">
            <div className="intro-logo-lockup">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/eidos-logo.png" alt="EIDOS Design Studio" />
              <p>EIDOS Design studio – shaping ideas into refined design experiences.</p>
            </div>
            <a className="scroll-cue" href="#sectors"><span>⌄</span>Scroll down</a>
          </div>
        </div>

        <div id="sectors" className="sector-panorama" aria-label="Design sectors">
          <div className="sector-accent-track" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => (
              <span key={index} className={`sector-accent sector-accent-${(index % 3) + 1}`} style={{ left: `${index * 104 + 45}vw` }} />
            ))}
          </div>
          <div className="sector-track">
            {sectors.map(([name, description, image], index) => (
              <article className={`sector-panel sector-panel-${(index % 3) + 1}`} data-sector key={name}>
                <div className="sector-figure" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="" />
                </div>
                <div className="sector-copy">
                  <h2>{name}</h2>
                  <p>{description}</p>
                  <Link href={`/projects#${name.toLowerCase().replaceAll(" ", "-")}`} aria-label={`View ${name} projects`}>▶</Link>
                </div>
              </article>
            ))}
          </div>
          <span className="sector-ground" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function TeamChapter() {
  const chapterRef = useRef<HTMLElement>(null);

  const updateTeam = useCallback((node: HTMLElement, progress: number) => {
    const entrance = rangeProgress(progress, 0, 0.08);
    const horizontalTravel = rangeProgress(progress, 0.18, 0.69);
    const statsEntrance = rangeProgress(progress, 0.18, 0.34);
    node.style.setProperty("--team-p", progress.toFixed(5));
    node.style.setProperty("--team-rise", `${(1 - entrance) * 100}%`);
    node.style.setProperty("--team-x", `${horizontalTravel * motionConfig.home.teamTravelViewportWidths * -1}vw`);
    node.style.setProperty("--team-accent-x", `${progress * -300}vw`);
    node.style.setProperty("--stats-rise", `${(1 - statsEntrance) * 50}%`);
  }, []);

  useScrubbedChapter(chapterRef, updateTeam);

  return (
    <section
      ref={chapterRef}
      id="team"
      className="kinetic-team"
      style={{
        "--team-height": `${motionConfig.home.teamViewportHeights}svh`,
        "--chapter-overlap": `${motionConfig.home.chapterOverlapViewportHeights}svh`,
      } as CSSProperties}
    >
      <div className="kinetic-pin team-pin">
        <div className="team-track">
          <article className="team-panel people-panel">
            <p>At EIDOS Design Studio, we are driven by a passion for<br />thoughtful design and meaningful innovation – balancing<br />creativity with clarity to craft solutions that respond to<br />each client&rsquo;s vision. Good design begins with listening,<br />and succeeds through intent.</p>
          </article>

          <article className="team-panel stats-scene">
            <div className="stats-panel">
              <div><strong>13+</strong><span>Years of multi-sector expertise</span></div>
              <div><strong>350+</strong><span>Projects</span></div>
              <div><strong>1:1</strong><span>Psychologist briefing</span></div>
              <div><strong>12+</strong><span>Countries</span></div>
              <div className="stat-notes">
                {["Neuroscience + Design", "A focus on social sustainability", "UAE, KSA + Philippines", "In-house MEP team"].map((note, index) => (
                  <span key={note}>{note}</span>
                ))}
              </div>
            </div>
          </article>

          <article className="team-panel panther-panel">
            <div className="panther-copy">
              <p>The cat that got the...</p>
              <h2>Crème de<br />la crème<br />of design<br />talent</h2>
            </div>
            <span className="panther-mark-shape" aria-hidden="true" />
          </article>
        </div>
      </div>
    </section>
  );
}

export function HomeKineticSequence() {
  return (
    <>
      <IntroChapter />
      <TeamChapter />
    </>
  );
}
