import { useState } from 'react';
import { SectionIntro } from './SectionIntro';

const mapPositions = {
  product: [50, 10],
  frontend: [19, 39],
  backend: [50, 41],
  ai: [81, 39],
  delivery: [33, 78],
  domain: [67, 78],
};

const mapConnections = [
  ['product', 'frontend'],
  ['product', 'backend'],
  ['product', 'ai'],
  ['frontend', 'backend'],
  ['backend', 'ai'],
  ['frontend', 'delivery'],
  ['backend', 'delivery'],
  ['backend', 'domain'],
  ['ai', 'domain'],
];

function CapabilityMap({ groups, active, setActive }) {
  return (
    <div className="capability-map" role="group" aria-label="Capability map">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {mapConnections.map(([from, to]) => {
          const [x1, y1] = mapPositions[from];
          const [x2, y2] = mapPositions[to];
          return (
            <line
              key={`${from}-${to}`}
              className={from === active || to === active ? 'is-active' : ''}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
      {Object.entries(groups).map(([id, group], index) => {
        const [left, top] = mapPositions[id];
        return (
          <button
            type="button"
            key={id}
            className={active === id ? 'is-active' : ''}
            style={{ '--left': `${left}%`, '--top': `${top}%`, '--delay': `${index * 80}ms` }}
            onClick={() => setActive(id)}
            onMouseEnter={() => setActive(id)}
            aria-pressed={active === id}
          >
            <span>0{index + 1}</span>
            {group.label}
          </button>
        );
      })}
    </div>
  );
}

export function Capabilities({ content }) {
  const [active, setActive] = useState('backend');
  const selected = content.groups[active];

  return (
    <section id="capabilities" className="section capability-section" aria-labelledby="capability-title">
      <SectionIntro
        label={content.label}
        title={content.title}
        intro={content.intro}
        id="capability-title"
      />

      <div className="capability-layout reveal">
        <CapabilityMap groups={content.groups} active={active} setActive={setActive} />
        <div className="capability-readout" aria-live="polite">
          <p className="capability-readout__instruction">{content.select}</p>
          <div className="capability-readout__index">{String(Object.keys(content.groups).indexOf(active) + 1).padStart(2, '0')}</div>
          <h3>{selected.label}</h3>
          <p>{selected.copy}</p>
          <ul className="tech-list">
            {selected.tools.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
        </div>
      </div>

      <div className="capability-ledger">
        {Object.entries(content.groups).map(([id, group], index) => (
          <button
            type="button"
            key={id}
            className={`reveal${active === id ? ' is-active' : ''}`}
            style={{ '--reveal-delay': `${index * 45}ms` }}
            onClick={() => setActive(id)}
          >
            <span>0{index + 1}</span>
            <strong>{group.label}</strong>
            <small>{group.tools.join(' · ')}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
