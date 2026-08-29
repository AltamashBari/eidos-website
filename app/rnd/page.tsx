import { Reveal, SiteChrome } from "../components";
import { research } from "../data";

export default function ResearchPage() {
  return (
    <SiteChrome>
      <main className="inner-main research-page">
        <section className="research-hero">
          <p className="section-kicker">R&D at EIDOS</p>
          <h1>Applied<br />Explorations</h1>
          <p>Research, provocations and useful tools for a more human built environment.</p>
          <div className="research-r" aria-hidden="true">E</div>
        </section>
        <section className="research-list">
          {research.map(([date, title, description], index) => (
            <Reveal className="research-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><time>{date}</time><h2>{title}</h2><p>{description}</p></div>
              <i aria-hidden="true">↗</i>
            </Reveal>
          ))}
        </section>
      </main>
    </SiteChrome>
  );
}
