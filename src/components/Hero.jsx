import { useState } from 'react';
import systemField from '../assets/system-field.jpg';
import { ArrowIcon, DownloadIcon } from './Icons';
import { SystemDiagram } from './SystemDiagram';

export function Hero({ content, cvHref }) {
  const [activeLayer, setActiveLayer] = useState('ai');
  const active = content.layers[activeLayer];

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        <h1 id="hero-title">{content.title}</h1>
        <div className="hero__intro">
          <p>{content.body}</p>
          <div className="hero__actions">
            <a className="button button--solid" href="#systems">
              {content.primary}
              <ArrowIcon direction="down" />
            </a>
            <a className="button button--text" href={cvHref} download>
              {content.secondary}
              <DownloadIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="hero__system">
        <img className="hero__system-field" src={systemField} alt="" aria-hidden="true" />
        <div className="hero__system-topline">
          <span className="desktop-only">{content.select}</span>
          <span className="mobile-only">{content.touch}</span>
          <span>SYS.01 / {activeLayer.toUpperCase()}</span>
        </div>
        <SystemDiagram
          layers={content.layers}
          activeLayer={activeLayer}
          setActiveLayer={setActiveLayer}
          label={content.layerLabel}
        />
        <div className="hero__system-readout" aria-live="polite">
          <span>{active.label}</span>
          <p>{active.copy}</p>
        </div>
      </div>

      <div className="hero__status">
        <span className="status-light" aria-hidden="true" />
        <p>{content.status}</p>
      </div>
    </section>
  );
}
