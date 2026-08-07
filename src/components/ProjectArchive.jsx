import { useState } from 'react';
import hackathonImage from '../img/hackaton.png';
import truckImage from '../img/camion.png';
import robotImage from '../img/qbot.png';
import { ArrowIcon } from './Icons';
import { SectionIntro } from './SectionIntro';

const images = {
  hackathon: hackathonImage,
  truck: truckImage,
  robot: robotImage,
};

function ProjectSignal({ labels }) {
  return (
    <div className="project-signal" aria-hidden="true">
      <span className="project-signal__axis project-signal__axis--x" />
      <span className="project-signal__axis project-signal__axis--y" />
      <span className="project-signal__pulse" />
      {labels.map((label, index) => (
        <span className="project-signal__node" key={label} style={{ '--signal-index': index }}>
          <small>0{index + 1}</small>
          {label}
        </span>
      ))}
    </div>
  );
}

export function ProjectArchive({ content }) {
  const [activeId, setActiveId] = useState(content.projects[0].id);
  const activeIndex = content.projects.findIndex((project) => project.id === activeId);
  const activeProject = content.projects[activeIndex] ?? content.projects[0];
  const activeImage = activeProject.image ? images[activeProject.image] : null;

  return (
    <section id="archive" className="section archive-section" aria-labelledby="archive-title">
      <SectionIntro
        label={content.label}
        title={content.title}
        intro={content.intro}
        id="archive-title"
      />

      <div className="archive-explorer reveal">
        <div className="project-index">
          <div className="project-index__header">
            <span>INDEX</span>
            <span>{String(content.projects.length).padStart(2, '0')} ENTRIES</span>
          </div>
          <div className="project-index__list" role="tablist" aria-label={content.listLabel} aria-orientation="vertical">
            {content.projects.map((project, index) => {
              const active = project.id === activeProject.id;
              return (
                <button
                  id={`project-tab-${project.id}`}
                  key={project.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="project-detail"
                  className={active ? 'is-active' : ''}
                  onClick={() => setActiveId(project.id)}
                >
                  <span className="project-index__number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="project-index__copy">
                    <small>{project.period}</small>
                    <strong>{project.title}</strong>
                    <em>{project.meta}</em>
                  </span>
                  <ArrowIcon />
                </button>
              );
            })}
          </div>
        </div>

        <article
          id="project-detail"
          className="project-stage"
          role="tabpanel"
          aria-labelledby={`project-tab-${activeProject.id}`}
          key={activeProject.id}
        >
          <div className={`project-stage__visual${activeImage ? ' has-image' : ' has-signal'}`}>
            {activeImage ? (
              <img src={activeImage} alt={activeProject.alt} loading="lazy" />
            ) : (
              <ProjectSignal labels={activeProject.signal} />
            )}
            <span className="project-stage__period">{activeProject.period}</span>
          </div>

          <div className="project-stage__body">
            <p className="project-stage__meta">{activeProject.meta}</p>
            <h3>{activeProject.title}</h3>
            <p className="project-stage__summary">{activeProject.summary}</p>
            <p className="project-stage__role">{activeProject.role}</p>

            <div className="project-stage__evidence">
              <p>{content.contributionLabel}</p>
              <ul>
                {activeProject.proof.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="project-stage__stack">
              <p>{content.stackLabel}</p>
              <ul className="tech-list">
                {activeProject.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
          <p className="project-stage__privacy">{content.privacyNote}</p>
        </article>
      </div>
    </section>
  );
}
