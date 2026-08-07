import { useState } from 'react';
import { ArrowIcon, PlusIcon } from './Icons';
import { SectionIntro } from './SectionIntro';

function ArchitectureFlow({ flow, foundation }) {
  return (
    <div className="architecture" aria-label={`${flow.join(', ')}. ${foundation}`}>
      <div className="architecture__flow">
        {flow.map((item, index) => (
          <div className="architecture__step" key={item}>
            <span>0{index + 1}</span>
            <strong>{item}</strong>
            {index < flow.length - 1 && <ArrowIcon />}
          </div>
        ))}
      </div>
      <div className="architecture__foundation">
        <span />
        <p>{foundation}</p>
        <span />
      </div>
    </div>
  );
}

export function SelectedSystems({ content }) {
  const [openCase, setOpenCase] = useState('privacy');

  return (
    <section id="systems" className="section systems-section" aria-labelledby="systems-title">
      <SectionIntro
        label={content.label}
        title={content.title}
        intro={content.intro}
        id="systems-title"
      />

      <div className="case-list">
        {content.cases.map((item, index) => {
          const open = openCase === item.id;
          const panelId = `case-panel-${item.id}`;
          return (
            <article
              className={`case-study reveal${open ? ' is-open' : ''}`}
              style={{ '--reveal-delay': `${index * 70}ms` }}
              key={item.id}
            >
              <button
                type="button"
                className="case-study__trigger"
                onClick={() => setOpenCase(open ? '' : item.id)}
                aria-expanded={open}
                aria-controls={panelId}
              >
                <span className="case-study__number">{item.number}</span>
                <span className="case-study__heading">
                  <span>{item.meta}</span>
                  <strong>{item.title}</strong>
                </span>
                <span className="case-study__action">
                  <span>{open ? content.close : content.open}</span>
                  <PlusIcon open={open} />
                </span>
              </button>

              <div id={panelId} className="case-study__panel" hidden={!open}>
                <div className="case-study__summary">
                  <p className="case-study__body">{item.body}</p>
                  <p className="case-study__outcome">{item.outcome}</p>
                  <ul className="tech-list" aria-label="Technology stack">
                    {item.stack.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                </div>
                <ArchitectureFlow flow={item.flow} foundation={item.foundation} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
