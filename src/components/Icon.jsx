const paths = {
  compass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM16 8l-3 5-5 3 3-5 5-3Z',
  capital: 'M3 9h18L12 3 3 9ZM5 11v7m5-7v7m4-7v7m5-7v7M3 21h18',
  people: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-7a4 4 0 0 1 0 8m5 9v-2a4 4 0 0 0-3-3.87',
  technology: 'M7 7h10v10H7zM10 1v3m4-3v3M10 20v3m4-3v3M1 10h3m-3 4h3m16-4h3m-3 4h3M10 10h4v4h-4z',
  search: 'M21 21l-5-5M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z',
  network: 'M9 3h6v6H9zM2 16h6v6H2zM16 16h6v6h-6zM12 9v4H5v3m7-3h7v3',
  layers: 'm12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5',
  growth: 'M3 17l6-6 4 4 8-10m-7 0h7v7M3 22h18',
  spark: 'm12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z',
  building: 'M4 21V3h12v18M16 9h4v12M2 21h20M8 7h4M8 11h4M8 15h4M9 21v-3h2v3',
  institution: 'M2 8 12 2l10 6M4 9h16v12H4zM8 12v6m4-6v6m4-6v6M2 22h20',
  truck: 'M1 4h13v13H1zM14 8h4l4 5v4h-8M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm12 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  energy: 'm13 2-9 12h7l-1 8 10-12h-7l0-8Z',
  book: 'M12 5C8 2 4 2 2 3v16c4-1 7 0 10 2m0-16c4-3 8-3 10-2v16c-4-1-7 0-10 2V5Z',
  leaf: 'M20 3C7 1 2 7 4 14c2 7 14 7 16-11ZM3 22 16 8',
  person: 'M20 21a8 8 0 0 0-16 0M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  check: 'm5 12 4 4L19 6',
  shop: 'M3 10v11h18V10M2 10l2-7h16l2 7M2 10h20M9 21v-7h6v7M8 3l-1 7m9-7 1 7',
};

export function Icon({ name, size = 24, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name] || paths.compass} /></svg>;
}
