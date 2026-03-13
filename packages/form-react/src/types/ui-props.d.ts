import React from 'react';

export type ButtonType = 'button' | 'submit' | 'reset';
export type Variant = 'primary' | 'secondary' | 'link';
export type Color = 'default' | 'error' | 'success' | 'warning' | 'info';
export type Size = 'sm' | 'md' | 'lg';

type BaseUiProps = {
  variant?: Variant;
  label?: string | React.ReactNode;
  color?: Color;
  size?: Size;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export type ButtonProps = BaseUiProps & {
  type?: ButtonType;
  onClick: (e: React.MouseEvent) => void;
};

export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick' | 'color'> &
  BaseUiProps & {
  to: string;
  navigate?: () => void;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
};