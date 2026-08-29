import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLink, Reveal, SiteChrome } from "../../components";
import { projects } from "../../data";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(index + 1) % projects.length];
  const alternatingImage = project.image.includes("office")
    ? "/images/projects/lobby.webp"
    : project.image.includes("retail")
      ? "/images/projects/office.webp"
      : "/images/projects/retail.webp";

  return (
    <SiteChrome>
      <main className="inner-main project-detail">
        <section className="project-hero-detail">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.image} alt={`${project.title} hero interior`} />
          <div className="project-title-band">
            <p>{project.category}</p>
            <h1>{project.title}</h1>
            <div><span>{project.location}</span><span>{project.year}</span><span>{project.scope}</span></div>
          </div>
        </section>

        <section className="project-brief">
          <Reveal>
            <p className="section-kicker">The brief</p>
            <h2>A distinctive experience with a strong visual identity and an intuitive human rhythm.</h2>
          </Reveal>
          <Reveal>
            <p className="section-kicker">Our approach</p>
            <p>We started with how the space should feel, then translated that story into movement, material, colour and detail. Sculptural geometry guides the eye while tactile finishes bring warmth at every scale.</p>
          </Reveal>
        </section>

        <section className="editorial-gallery">
          <Reveal className="gallery-wide">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={alternatingImage} alt={`Material detail for ${project.title}`} />
          </Reveal>
          <Reveal className="gallery-tall">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.image} alt={`Architectural perspective of ${project.title}`} />
          </Reveal>
          <Reveal className="project-quote">
            <blockquote>“A place where culture is expressed quietly through form, pattern and touch.”</blockquote>
          </Reveal>
          <Reveal className="gallery-offset">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={alternatingImage} alt={`Interior atmosphere at ${project.title}`} />
          </Reveal>
        </section>

        <section className="next-project">
          <p>Next project</p>
          <Link href={`/project-inside/${nextProject.slug}`}>
            <span>{nextProject.category}</span>
            <h2>{nextProject.title}</h2>
            <i aria-hidden="true">↗</i>
          </Link>
          <ArrowLink href="/projects">Back to all work</ArrowLink>
        </section>
      </main>
    </SiteChrome>
  );
}
