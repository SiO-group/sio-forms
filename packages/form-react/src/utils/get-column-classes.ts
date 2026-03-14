import { LayoutType } from "@sio-group/form-types";

export const getColumnClasses = (layout?: LayoutType, className?: string): string => {
  if (!layout) return 'sio-col-xs-12';

  const classes: string[] = [];

  if (className) classes.push(className);

  if (layout.sm) classes.push(`sio-col-sm-${layout.sm}`);
  if (layout.md) classes.push(`sio-col-md-${layout.md}`);
  if (layout.lg) classes.push(`sio-col-lg-${layout.lg}`);

  if (layout.order) {
    if (layout.order.sm) classes.push(`sio-order-sm-${layout.order.sm}`);
    if (layout.order.md) classes.push(`sio-order-md-${layout.order.md}`);
    if (layout.order.lg) classes.push(`sio-order-lg-${layout.order.lg}`);
  }

  return classes.join(' ');
};