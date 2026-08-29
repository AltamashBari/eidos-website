import Link from "next/link";
import { Reveal, SiteChrome } from "../components";
import { news } from "../data";

export default function MediaPage() {
  return (
    <SiteChrome>
      <main className="inner-main media-page">
        <section className="media-hero">
          <p className="section-kicker">Press room</p>
          <h1>EIDOS in<br />the news</h1>
          <div className="media-animal" aria-hidden="true">R</div>
        </section>
        <section className="media-grid">
          {news.map(([date, title], index) => (
            <Reveal className={`media-card media-card-${index % 3}`} key={title}>
              <Link href="/media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={index % 3 === 0 ? "/images/projects/retail.webp" : index % 3 === 1 ? "/images/projects/office.webp" : "/images/projects/lobby.webp"}
                  alt="EIDOS project press feature"
                />
                <span>{date}</span>
                <h2>{title}</h2>
                <i aria-hidden="true">↗</i>
              </Link>
            </Reveal>
          ))}
        </section>
      </main>
    </SiteChrome>
  );
}
