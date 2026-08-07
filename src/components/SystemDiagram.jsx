const positions = {
  product: [14, 50],
  interface: [37, 22],
  services: [37, 78],
  data: [63, 20],
  ai: [65, 57],
  delivery: [87, 50],
};

const connections = [
  ['product', 'interface'],
  ['product', 'services'],
  ['interface', 'data'],
  ['interface', 'ai'],
  ['services', 'ai'],
  ['services', 'delivery'],
  ['data', 'delivery'],
  ['ai', 'delivery'],
];

export function SystemDiagram({ layers, activeLayer, setActiveLayer, label }) {
  return (
    <div className="system-diagram" role="group" aria-label={label}>
      <svg className="system-diagram__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {connections.map(([from, to], index) => {
          const [x1, y1] = positions[from];
          const [x2, y2] = positions[to];
          const active = from === activeLayer || to === activeLayer;

          return (
            <g key={`${from}-${to}`}>
              <line
                className={active ? 'diagram-line is-active' : 'diagram-line'}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                vectorEffect="non-scaling-stroke"
              />
              {index % 2 === 0 && (
                <circle className="diagram-particle" r="0.9">
                  <animateMotion
                    dur={`${4.5 + index * 0.22}s`}
                    repeatCount="indefinite"
                    path={`M${x1},${y1} L${x2},${y2}`}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {Object.entries(layers).map(([id, layer], index) => {
        const [left, top] = positions[id];
        return (
          <button
            key={id}
            type="button"
            className={`system-node system-node--${id}${activeLayer === id ? ' is-active' : ''}`}
            style={{ '--node-left': `${left}%`, '--node-top': `${top}%`, '--node-delay': `${index * 80}ms` }}
            onClick={() => setActiveLayer(id)}
            onMouseEnter={() => setActiveLayer(id)}
            aria-pressed={activeLayer === id}
          >
            <span className="system-node__index">0{index + 1}</span>
            <span>{layer.label}</span>
          </button>
        );
      })}

      <span className="system-diagram__axis system-diagram__axis--x" aria-hidden="true">X / DELIVERY</span>
      <span className="system-diagram__axis system-diagram__axis--y" aria-hidden="true">Y / CONTEXT</span>
    </div>
  );
}
