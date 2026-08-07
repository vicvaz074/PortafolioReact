import hackathonImage from '../img/hackaton.png';
import truckImage from '../img/camion.png';
import robotImage from '../img/qbot.png';
import { SectionIntro } from './SectionIntro';

const images = {
  hackathon: hackathonImage,
  truck: truckImage,
  robot: robotImage,
};

export function ProjectArchive({ content }) {
  return (
    <section id="archive" className="section archive-section" aria-labelledby="archive-title">
      <SectionIntro
        label={content.label}
        title={content.title}
        intro={content.intro}
        id="archive-title"
      />

      <div className="archive-grid">
        {content.projects.map((project, index) => (
          <article
            className={`archive-card archive-card--${index + 1} reveal`}
            style={{ '--reveal-delay': `${index * 80}ms` }}
            key={project.title}
          >
            <div className="archive-card__media">
              <img src={images[project.image]} alt={project.alt} loading="lazy" />
              <span>{project.year}</span>
            </div>
            <div className="archive-card__content">
              <p>{project.meta}</p>
              <h3>{project.title}</h3>
              <p>{project.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
