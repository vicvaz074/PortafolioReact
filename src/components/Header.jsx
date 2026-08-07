import { useEffect, useRef, useState } from 'react';
import { ArrowIcon, DownloadIcon, ExternalIcon } from './Icons';

const EMAIL = 'vicvaz074@outlook.com';

export function Header({ language, setLanguage, nav, activeSection, cvHref }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const firstLinkRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const wasOpenRef = useRef(false);
  const links = [
    ['systems', nav.systems],
    ['trajectory', nav.trajectory],
    ['capabilities', nav.capabilities],
    ['archive', nav.work],
    ['contact', nav.contact],
  ];

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const main = document.getElementById('main');
    if (!open) {
      main?.removeAttribute('inert');
      if (wasOpenRef.current) toggleRef.current?.focus();
      wasOpenRef.current = false;
      return undefined;
    }

    wasOpenRef.current = true;
    main?.setAttribute('inert', '');
    const focusFrame = window.requestAnimationFrame(() => firstLinkRef.current?.focus());

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key !== 'Tab') return;

      const menuItems = menuRef.current?.querySelectorAll(
        'a[href], button:not([disabled])',
      );
      const focusable = [toggleRef.current, ...(menuItems ?? [])].filter(Boolean);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    let frame;
    const updateProgress = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        headerRef.current?.style.setProperty('--scroll-progress', `${Math.min(progress, 100)}%`);
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      document.body.classList.remove('menu-open');
      document.getElementById('main')?.removeAttribute('inert');
    };
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1121px)');
    const closeOnDesktop = (event) => {
      if (event.matches) setOpen(false);
    };

    desktopQuery.addEventListener('change', closeOnDesktop);
    return () => desktopQuery.removeEventListener('change', closeOnDesktop);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <a className="skip-link" href="#main">
        {nav.skip}
      </a>
      <header ref={headerRef} className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label={nav.home}>
          <span className="brand__mark" aria-hidden="true">V/V</span>
          <span className="brand__copy">
            <strong>Vicente Vázquez</strong>
            <small>AI Product Engineer</small>
          </span>
        </a>

        <nav
          ref={menuRef}
          id="mobile-menu"
          className={`site-nav${open ? ' is-open' : ''}`}
          aria-label={nav.main}
        >
          <div className="site-nav__summary" aria-hidden="true">
            <span>{nav.navigation}</span>
            <span>{nav.sectionCount}</span>
          </div>

          <div className="site-nav__links">
            {links.map(([id, label], index) => (
              <a
                key={id}
                ref={index === 0 ? firstLinkRef : undefined}
                className={activeSection === id ? 'is-active' : ''}
                href={`#${id}`}
                onClick={closeMenu}
                aria-current={activeSection === id ? 'location' : undefined}
                style={{ '--menu-index': index }}
              >
                <span className="site-nav__number">0{index + 1}</span>
                <strong>{label}</strong>
                <ArrowIcon />
              </a>
            ))}
          </div>

          <a className="header-cv" href={cvHref} download>
            <DownloadIcon />
            <span>{nav.resume}</span>
          </a>

          <div className="site-nav__utilities">
            <p className="site-nav__availability">
              <span aria-hidden="true" />
              {nav.availability}
            </p>
            <div className="site-nav__utility-links">
              <a href={`mailto:${EMAIL}`}>
                <small>{nav.email}</small>
                <span>{EMAIL}</span>
                <ArrowIcon />
              </a>
              <a href={cvHref} download>
                <small>PDF</small>
                <span>{nav.resume}</span>
                <DownloadIcon />
              </a>
              <a href="https://www.linkedin.com/in/vicvaz074" target="_blank" rel="noreferrer">
                <small>SOCIAL</small>
                <span>LinkedIn</span>
                <ExternalIcon />
              </a>
              <a href="https://github.com/vicvaz074" target="_blank" rel="noreferrer">
                <small>CODE</small>
                <span>GitHub</span>
                <ExternalIcon />
              </a>
            </div>
          </div>

          <div className="language-switch" aria-label={nav.language}>
            {['es', 'en'].map((code) => (
              <button
                key={code}
                type="button"
                className={language === code ? 'is-active' : ''}
                onClick={() => {
                  setLanguage(code);
                  closeMenu();
                }}
                aria-pressed={language === code}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>

        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? nav.close : nav.menu}</span>
          <span className={`menu-toggle__mark${open ? ' is-open' : ''}`} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>

        <span className="header-progress" aria-hidden="true" />
      </header>
    </>
  );
}
