import { ContactForm, SiteChrome } from "../components";

export default function ContactPage() {
  return (
    <SiteChrome>
      <main className="inner-main contact-page">
        <section className="contact-hero">
          <p className="section-kicker">Say hello</p>
          <h1>Let&rsquo;s make<br />something.</h1>
          <div className="contact-details">
            <a href="mailto:hello@eidosdesignstudio.com">hello@eidosdesignstudio.com</a>
            <p>Warehouse 44, Alserkal Avenue<br />Al Quoz, Dubai, UAE</p>
          </div>
          <div className="contact-sun" aria-hidden="true" />
        </section>
        <section className="contact-form-section">
          <div><p className="section-kicker">New business · press · collaborations</p><h2>What are you<br />dreaming up?</h2></div>
          <ContactForm />
        </section>
        <section className="offices">
          <div><span>Dubai</span><p>Headquarters & design studio</p></div>
          <div><span>Riyadh</span><p>KSA projects & partnerships</p></div>
          <div><span>Manila</span><p>Design and delivery studio</p></div>
        </section>
      </main>
    </SiteChrome>
  );
}
