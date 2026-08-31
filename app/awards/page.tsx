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
          <p>Big ideas, beautifully made. This timeline fills in as recognition comes.</p>
          <div className="tiger-mark" aria-hidden="true">EIDOS</div>
        </section>
        <section className="awards-timeline">
          {awards.map((award) => (
            <Reveal className="award-year" key={award.year}>
              <h2>{award.year}</h2>
              <div>
                {award.items.map((item) => (
                  // The awarding body is a placeholder — naming a real one
                  // beside placeholder entries would read as a false claim.
                  <article key={item}>
                    <span>Awarding body</span>
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
