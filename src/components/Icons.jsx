export function ArrowIcon({ direction = 'right' }) {
  return (
    <svg
      aria-hidden="true"
      className={`icon icon--${direction}`}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

export function DownloadIcon() {
  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 20 20" fill="none">
      <path d="M10 3v10m0 0 4-4m-4 4L6 9M4 17h12" />
    </svg>
  );
}

export function ExternalIcon() {
  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 20 20" fill="none">
      <path d="M8 5H4v11h11v-4M10 4h6v6M16 4l-7 7" />
    </svg>
  );
}

export function CopyIcon() {
  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 20 20" fill="none">
      <rect x="7" y="7" width="9" height="9" />
      <path d="M13 7V4H4v9h3" />
    </svg>
  );
}

export function PlusIcon({ open }) {
  return (
    <svg aria-hidden="true" className={`icon plus-icon${open ? ' is-open' : ''}`} viewBox="0 0 20 20" fill="none">
      <path d="M3 10h14M10 3v14" />
    </svg>
  );
}
