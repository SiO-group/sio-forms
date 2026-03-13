export type IconType =
  | string
  | { type: 'class'; value: string; }
  | { type: 'emoji'; value: string; }
  | { type: 'html'; value: string; }
