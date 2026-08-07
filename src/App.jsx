import { useEffect, useState } from 'react';
import { ArchiveErrorBoundary } from './components/ArchiveErrorBoundary';
import { Capabilities } from './components/Capabilities';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProfileContact } from './components/ProfileContact';
import { ProjectArchive } from './components/ProjectArchive';
import { SelectedSystems } from './components/SelectedSystems';
import { Trajectory } from './components/Trajectory';
import { content } from './data/content';
import './styles/app.css';

const LANGUAGE_KEY = 'vv-portfolio-language-v2';

function getInitialLanguage() {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_KEY);
    if (stored === 'es' || stored === 'en') return stored;
  } catch {
    // Storage may be unavailable in strict privacy modes; browser language remains a safe fallback.
  }
  return window.navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export default function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [activeSection, setActiveSection] = useState('systems');
  const copy = content[language];
  const cvFile = language === 'es' ? 'Vicente_Vazquez_CV_ES.pdf' : 'Vicente_Vazquez_CV_EN.pdf';
  const cvHref = `${import.meta.env.BASE_URL}cv/${cvFile}`;

  useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_KEY, language);
    } catch {
      // The selected language still works for the current session without persistence.
    }
    document.documentElement.lang = language;
    document.title = copy.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.meta.description);
  }, [copy.meta.description, copy.meta.title, language]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, [language]);

  useEffect(() => {
    const ids = ['systems', 'trajectory', 'capabilities', 'archive', 'contact'];
    let frame;

    const updateActiveSection = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const pageBottom = window.scrollY + window.innerHeight;
        const documentBottom = document.documentElement.scrollHeight;
        const marker = window.scrollY + window.innerHeight * 0.36;
        let current = ids[0];

        if (pageBottom >= documentBottom - 4) {
          current = 'contact';
        } else {
          ids.forEach((id) => {
            const section = document.getElementById(id);
            if (section && section.offsetTop <= marker) current = id;
          });
        }

        setActiveSection((previous) => (previous === current ? previous : current));
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  useEffect(() => {
    let frame;
    const updatePointer = (event) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
        document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
      });
    };
    window.addEventListener('pointermove', updatePointer, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', updatePointer);
    };
  }, []);

  return (
    <div className="app-shell">
      <Header
        language={language}
        setLanguage={setLanguage}
        nav={copy.nav}
        activeSection={activeSection}
        cvHref={cvHref}
      />
      <main id="main">
        <Hero content={copy.hero} cvHref={cvHref} />
        <SelectedSystems content={copy.systems} />
        <Trajectory content={copy.trajectory} />
        <Capabilities content={copy.capabilities} />
        <ArchiveErrorBoundary>
          <ProjectArchive content={copy.archive} />
        </ArchiveErrorBoundary>
        <ProfileContact profile={copy.profile} contact={copy.contact} footer={copy.footer} cvHref={cvHref} />
      </main>
    </div>
  );
}
