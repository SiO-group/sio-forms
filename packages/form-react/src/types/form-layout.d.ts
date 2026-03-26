import {ComponentType, ReactNode} from "react";
import { LayoutType } from "@sio-group/form-types";

export interface FormLayout {
  fields: string[];
  layout?: LayoutType;
  container?: ComponentType<{children: ReactNode}>
}