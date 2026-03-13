export const CustomIcons =  {
  Date: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" fill="none"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor"/>
    </svg>
  ),
  Time: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
      <circle cx="12" cy="12" r="1" fill="currentColor" fillOpacity="0.3" stroke="none" />
    </svg>
  ),
  DateTime: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="14" height="14" rx="2" ry="2" />
      <line x1="5" y1="2" x2="5" y2="5" />
      <line x1="13" y1="2" x2="13" y2="5" />
      <line x1="2" y1="7" x2="16" y2="7" />

      <circle cx="19" cy="15" r="4" />
      <polyline points="19 13 19 15 21 16" />
    </svg>
  ),
  FileUpload: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
      <path d="M12 12v6m0-6 2 2m-2-2-2 2" />
    </svg>
  ),
  CloudUpload: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 16v-6m0 0-2 2m2-2 2 2" />
      <path d="M16 16h3a4 4 0 0 0 0-8h-1.5A5.5 5.5 0 0 0 7 9a5 5 0 0 0-1 9.8" />
    </svg>
  ),
  TrashIcon: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 6h18" />
      <rect x="6" y="6" width="12" height="14" rx="1" ry="1" />

      <path d="M9 3h6" />
      <path d="M10 3v3M14 3v3" />

      <line x1="10" y1="10" x2="10" y2="16" />
      <line x1="14" y1="10" x2="14" y2="16" />
    </svg>
  ),
  SimpleTrashIcon: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 6h18" />
      <rect x="6" y="8" width="12" height="12" rx="1" ry="1" />
      <path d="M9 4h6" />
    </svg>
  ),
  DeleteTrashIcon: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 6h18" />
      <rect x="6" y="6" width="12" height="14" rx="1" ry="1" />
      <path d="M9 3h6" />
      <path d="M10 3v3M14 3v3" />
      <line x1="9" y1="10" x2="15" y2="16" />
      <line x1="15" y1="10" x2="9" y2="16" />
    </svg>
  ),
  FileIcon: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  ),
  Word: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
      <polyline points="13 2 13 9 20 9"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="16" x2="16" y2="16"/>
      <line x1="8" y1="19" x2="13" y2="19"/>
    </svg>
  ),
  Excel: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
      <polyline points="13 2 13 9 20 9"/>
      <rect x="7" y="12" width="10" height="7" rx="1"/>
      <line x1="7" y1="15.5" x2="17" y2="15.5"/>
      <line x1="11.5" y1="12" x2="11.5" y2="19"/>
    </svg>
  ),
  PowerPoint: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
      <polyline points="13 2 13 9 20 9"/>
      <rect x="7" y="12" width="10" height="7" rx="1"/>
      <path d="M9 17l2-3 2 2 2-3"/>
    </svg>
  ),
  Pdf: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
      <polyline points="13 2 13 9 20 9"/>
      <rect x="7" y="14" width="10" height="4" rx="1"/>
    </svg>
  ),
  Image: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
      <polyline points="13 2 13 9 20 9"/>
      <circle cx="9" cy="13" r="1.5"/>
      <path d="M7 18l3-3 2 2 3-3 2 4"/>
    </svg>
  ),
  Audio: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
      <polyline points="13 2 13 9 20 9"/>
      <path d="M8 16v-2"/>
      <path d="M10 17v-4"/>
      <path d="M12 18v-6"/>
      <path d="M14 17v-4"/>
      <path d="M16 16v-2"/>
    </svg>
  ),
  Video: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
      <polyline points="13 2 13 9 20 9"/>
      <rect x="7" y="12" width="8" height="6" rx="1"/>
      <polygon points="11 14 14 15 11 16"/>
    </svg>
  ),
  Globe: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z" />
    </svg>
  ),
};