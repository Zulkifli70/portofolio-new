import { contact } from "../data/portfolio";

export default function Contact() {
  return (
    <div className="view contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="view-title" style={{ borderBottom: 0, marginBottom: 0 }}>
          Let's build something.
        </h1>
      </div>

      <a className="contact-email" href={`mailto:${contact.email}`}>
        {contact.email}
      </a>

      <div className="contact-row">
        <span>© {new Date().getFullYear()} Zulkifli Firdausi</span>
        <div className="socials">
          <a href={contact.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
        </div>
      </div>
    </div>
  );
}
