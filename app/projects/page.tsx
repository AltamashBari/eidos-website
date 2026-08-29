import { ProjectsExplorer, SiteChrome } from "../components";
import { projects } from "../data";

export default function ProjectsPage() {
  return (
    <SiteChrome>
      <main className="inner-main projects-page">
        <section className="projects-intro">
          <p className="section-kicker">The work</p>
          <h1>Spaces with<br />something to say.</h1>
          <div className="project-counts">
            <div><strong>350+</strong><span>Projects</span></div>
            <div><strong>85+</strong><span>Awards</span></div>
            <div><strong>12+</strong><span>Countries</span></div>
          </div>
        </section>
        <section className="project-index">
          <ProjectsExplorer projects={projects} />
        </section>
      </main>
    </SiteChrome>
  );
}
