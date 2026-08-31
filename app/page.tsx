import { ArrowLink, ProjectCard, SiteChrome } from "./components";
import { awards, featuredProjects, news } from "./data";
import Link from "next/link";
import { HomeKineticSequence } from "./home-motion";

// Local placeholders — swap these for EIDOS project photography.
const homeNewsImages = [
  "/images/projects/lobby.webp",
  "/images/projects/retail.webp",
];

const featuredReferenceImages = [
  "/images/projects/lobby.webp",
  "/images/projects/retail.webp",
  "/images/projects/office.webp",
];

export default function Home() {
  return (
    <SiteChrome>
      <main>
        <HomeKineticSequence />

        <section id="featured" className="featured-section">
          <div className="featured-heading">
            <h2>Featured Projects</h2>
            <ArrowLink href="/projects">View all</ArrowLink>
          </div>
          <div className="featured-grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                project={project}
                index={index}
                variant="featured"
                imageOverride={featuredReferenceImages[index]}
                key={project.slug}
              />
            ))}
          </div>
        </section>

        <section id="news" className="news-section">
          <div className="news-list">
            {news.slice(0, 2).map(([date, title], index) => (
              <Link href="/media" key={title}>
                <div className="news-image-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={homeNewsImages[index]} alt="" />
                </div>
                {/* The <em> slot is where the publication's name goes. It stays
                    empty until there is a real feature to credit. */}
                <div className="news-copy"><p>{title}</p><span>{date}</span></div>
              </Link>
            ))}
          </div>
          <span className="news-shape-overlay" aria-hidden="true" />
        </section>

        <section id="awards-home" className="awards-teaser">
          <div className="awards-heading"><h2>Awards</h2><Link href="/awards" aria-label="View all awards">View all ▶</Link></div>
          <div className="awards-home-track">
            {awards.slice(0, 2).map(({ year, items }) => (
              <article key={year}>
                <strong>{year}</strong>
                <div>{items.map((item) => <p key={item}>{item}</p>)}</div>
              </article>
            ))}
          </div>
          <span className="award-shape-mid" aria-hidden="true" />
          <span className="award-shape-base" aria-hidden="true" />
        </section>
      </main>
    </SiteChrome>
  );
}
