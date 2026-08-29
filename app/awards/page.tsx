import { Reveal, SiteChrome } from "../components";
import { awards } from "../data";

export default function AwardsPage() {
  return (
    <SiteChrome>
      <main className="inner-main awards-page">
        <section className="awards-hero">
          <div>
            <p className="section-kicker">Recognition</p>
            <h1>Awards</h1>
          </div>
          <p>Big ideas, beautifully made. A running timeline of work recognized across the region and beyond.</p>
          <div className="tiger-mark" aria-hidden="true">EIDOS</div>
        </section>
        <section className="awards-timeline">
          {awards.map((award) => (
            <Reveal className="award-year" key={award.year}>
              <h2>{award.year}</h2>
              <div>
                {award.items.map((item) => (
                  <article key={item}>
                    <span>Commercial Interior Design Awards</span>
                    <h3>{item}</h3>
                  </article>
                ))}
              </div>
            </Reveal>
          ))}
        </section>
      </main>
    </SiteChrome>
  );
}
