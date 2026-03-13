import type { Properties as CSSProperties } from 'csstype';

export type ColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface LayoutType {
  sm?: ColumnSize;
  md?: ColumnSize;
  lg?: ColumnSize;
  order?: { sm?: number; md?: number; lg?: number };
  className?: string;
  style?: CSSProperties
}