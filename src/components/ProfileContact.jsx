import { useEffect, useState } from 'react';
import { ArrowIcon, CopyIcon, DownloadIcon, ExternalIcon } from './Icons';

const EMAIL = 'vicvaz074@outlook.com';

export function ProfileContact({ profile, contact, footer, cvHref }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <>
      <section className="section profile-section" aria-labelledby="profile-title">
        <p className="section-label reveal">{profile.label}</p>
        <div className="profile-layout">
          <div className="profile-copy reveal">
            <h2 id="profile-title">{profile.title}</h2>
            <p>{profile.body}</p>
            <small>{profile.note}</small>
          </div>
          <dl className="profile-facts reveal">
            {profile.facts.map(([term, description]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="contact-section__signal" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="section-label reveal">{contact.label}</p>
        <div className="contact-layout">
          <div className="contact-heading reveal">
            <h2 id="contact-title">{contact.title}</h2>
            <p>{contact.body}</p>
          </div>
          <div className="contact-links reveal">
            <a className="contact-link contact-link--primary" href={`mailto:${EMAIL}`}>
              <span>
                <small>EMAIL</small>
                {contact.email}
              </span>
              <ArrowIcon />
            </a>
            <button type="button" className="contact-link contact-link--copy" onClick={copyEmail}>
              <span>
                <small>{contact.copyEmail}</small>
                {copied ? contact.copied : EMAIL}
              </span>
              <CopyIcon />
            </button>
            <a className="contact-link" href="https://www.linkedin.com/in/vicvaz074" target="_blank" rel="noreferrer">
              <span><small>SOCIAL</small>{contact.linkedin}</span>
              <ExternalIcon />
            </a>
            <a className="contact-link" href="https://github.com/vicvaz074" target="_blank" rel="noreferrer">
              <span><small>CODE</small>{contact.github}</span>
              <ExternalIcon />
            </a>
            <a className="contact-link" href={cvHref} download>
              <span><small>PDF</small>{contact.cv}</span>
              <DownloadIcon />
            </a>
          </div>
        </div>
        <footer className="site-footer">
          <p>{contact.location}</p>
          <p>{footer.note}</p>
          <a href="#top">{footer.top}<ArrowIcon direction="up" /></a>
        </footer>
      </section>
    </>
  );
}
