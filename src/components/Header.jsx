import { useEffect, useRef, useState } from 'react';

export function Header({ language, setLanguage, nav, activeSection }) {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef(null);
  const links = [
    ['systems', nav.systems],
    ['trajectory', nav.trajectory],
    ['capabilities', nav.capabilities],
    ['contact', nav.contact],
  ];

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    const main = document.getElementById('main');
    if (open) main?.setAttribute('inert', '');
    else main?.removeAttribute('inert');

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    if (open) firstLinkRef.current?.focus();

    return () => {
      document.body.classList.remove('menu-open');
      main?.removeAttribute('inert');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <a className="skip-link" href="#main">
        {nav.skip}
      </a>
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Vicente Vázquez — Inicio">
          <span className="brand__desktop">VICENTE VÁZQUEZ / AI PRODUCT ENGINEER</span>
          <span className="brand__mobile">VV / AI PRODUCT</span>
        </a>

        <nav id="mobile-menu" className={`site-nav${open ? ' is-open' : ''}`} aria-label={nav.main}>
          <div className="site-nav__links">
            {links.map(([id, label], index) => (
              <a
                key={id}
                ref={index === 0 ? firstLinkRef : undefined}
                className={activeSection === id ? 'is-active' : ''}
                href={`#${id}`}
                onClick={closeMenu}
                aria-current={activeSection === id ? 'location' : undefined}
              >
                <span>0{index + 1}</span>
                {label}
              </a>
            ))}
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
      </header>
    </>
  );
}
