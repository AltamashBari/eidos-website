import { ProjectsExplorer, SiteChrome } from "../components";
import { projects } from "../data";

export default function ProjectsPage() {
  return (
    <SiteChrome>
      <main className="inner-main projects-page">
        <section className="projects-intro">
          <p className="section-kicker">The work</p>
          <h1>Spaces with<br />something to say.</h1>
          {/* COUNTS — hidden until the studio's own figures are confirmed,
              rather than published as invented numbers. Restore by removing
              the comment markers; .project-counts is still styled for three.

              <div className="project-counts">
                <div><strong>000+</strong><span>Projects</span></div>
                <div><strong>00+</strong><span>Awards</span></div>
                <div><strong>00+</strong><span>Countries</span></div>
              </div>
          */}
        </section>
        <section className="project-index">
          <ProjectsExplorer projects={projects} />
        </section>
      </main>
    </SiteChrome>
  );
}
