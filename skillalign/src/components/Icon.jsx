const paths = {
  activity: (
    <>
      <path d="M3 12h4l2.2-6 4.6 12 2.2-6H21" />
    </>
  ),
  arrow: <path d="M5 12h13m-5-5 5 5-5 5" />,
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
      <path d="M4 5.5v16M8 7h8m-8 4h8" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chart: (
    <>
      <path d="M4 19V5m0 14h16" />
      <path d="m7 15 3-4 3 2 4-6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 18h6m-5 3h4" />
      <path d="M8.5 14.5a6 6 0 1 1 7 0c-.9.7-1.5 1.5-1.5 2.5h-4c0-1-.6-1.8-1.5-2.5Z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  bell: (
    <>
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
};

function Icon({ name, size = 18, strokeWidth = 1.8, title }) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className="icon"
      fill="none"
      height={size}
      role={title ? "img" : undefined}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name] || paths.grid}
    </svg>
  );
}

export default Icon;
