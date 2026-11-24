import { useEffect, useRef, useState } from "react";
import { contact } from "../data/portfolio";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="view contact">
      <div>
        {/* <p className="eyebrow">Contact</p> */}
        <h1 className="view-title" style={{ borderBottom: 0, marginBottom: 0 }}>
          Let's Connect!.
        </h1>
      </div>

      <div className="contact-links">
        <button
          type="button"
          className="contact-link contact-copy"
          onClick={copyEmail}
          aria-label={
            copied
              ? "Email copied to clipboard"
              : `Copy ${contact.email} to clipboard`
          }
        >
          <span className="contact-link-text">{contact.email}</span>
          {copied ? (
            <svg
              className="contact-link-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>
          ) : (
            <svg
              className="contact-link-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </svg>
          )}
          <span className="contact-copy-status" role="status">
            {copied ? "Email copied to clipboard" : ""}
          </span>
        </button>

        <a
          className="contact-link"
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
        <a
          className="contact-link"
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
      </div>

      <div className="contact-row">
        <span>© {new Date().getFullYear()} Zulkifli Firdausi</span>
      </div>
    </div>
  );
}
