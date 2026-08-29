import { ArrowLink, Reveal, SiteChrome } from "../components";

export default function StudioPage() {
  return (
    <SiteChrome>
      <main className="inner-main studio-page">
        <section className="rm-hero">
          <div className="rm-title"><span>EIDOS</span><h1>STUDIO</h1></div>
          <p>Architecture <i /> Interior Design <i /> BIM Services</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/projects/office.webp" alt="A contemporary workplace interior" />
        </section>
        <section className="rm-intro">
          <Reveal><p>Design thinking meets</p><h2>technical precision.</h2></Reveal>
          <Reveal>
            <p className="section-kicker">Who we are</p>
            <p>EIDOS Design Studio is a multidisciplinary architecture and design firm specialising in architectural design, interior contracting and comprehensive retail turnkey solutions. We work with blue-chip clients and independent businesses alike, delivering tailored design-and-build solutions across the Middle East.</p>
          </Reveal>
        </section>
        <section className="rm-profile">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/projects/lobby.webp" alt="Sculptural hospitality interior" />
          </div>
          <Reveal>
            <p className="section-kicker">How we work</p>
            <h2>Listen.<br />Refine.<br />Deliver.</h2>
            <p>Our process is grounded, transparent and collaborative — so every client&rsquo;s vision is understood before it is translated into built form, and stays intact all the way through to handover.</p>
          </Reveal>
        </section>
        <section className="rm-services">
          <p className="section-kicker">Our services</p>
          {[
            ["01", "Architecture", "Concept through authority submission, with detailing that survives the site."],
            ["02", "Interior Design", "Retail, hospitality, workplace and residential interiors, designed end to end."],
            ["03", "BIM Services", "Coordinated models, clash-free documentation and quantities you can build from."],
          ].map(([number, title, copy]) => (
            <Reveal className="rm-service" key={title}>
              <span>{number}</span><h3>{title}</h3><p>{copy}</p>
            </Reveal>
          ))}
          <ArrowLink href="/contact-us">Start a conversation</ArrowLink>
        </section>
      </main>
    </SiteChrome>
  );
}
