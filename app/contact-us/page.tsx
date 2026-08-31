import { ContactForm, SiteChrome } from "../components";

export default function ContactPage() {
  return (
    <SiteChrome>
      <main className="inner-main contact-page">
        <section className="contact-hero">
          <p className="section-kicker">Say hello</p>
          <h1>Let&rsquo;s make<br />something.</h1>
          <div className="contact-details">
            {/* PLACEHOLDER — no real contact details are published yet.
                Replace both lines with the studio's own email address and,
                if it should be public, the studio address. Wrap the email in
                <a href="mailto:..."> so it keeps the underlined link style. */}
            <p>Email address to follow</p>
            <p>Studio address to follow</p>
          </div>
          <div className="contact-sun" aria-hidden="true" />
        </section>
        <section className="contact-form-section">
          <div><p className="section-kicker">New business · press · collaborations</p><h2>What are you<br />dreaming up?</h2></div>
          <ContactForm />
        </section>
        {/* OFFICES — removed rather than filled with invented locations.
            When the studio's real office cities are confirmed, restore this
            block; the .offices styles in globals.css are still in place and
            the grid is built for three columns.

            <section className="offices">
              <div><span>City</span><p>What happens here</p></div>
              ...
            </section>
        */}
      </main>
    </SiteChrome>
  );
}
