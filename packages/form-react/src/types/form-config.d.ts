import { ComponentType, CSSProperties, ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { FormField } from "@sio-group/form-types";
import { FormLayout } from "./form-layout";
import type { LinkProps, ButtonProps } from "@sio-group/ui-core";

type FormContainerProps = ComponentPropsWithoutRef<'form'>;
type ButtonContainerProps = HTMLAttributes<HTMLDivElement>;

export interface FormConfig {
  fields: FormField[];
  layout?: FormLayout[];

  submitShow?: boolean;
  submitAction: (values: Record<string, any>) => void | Promise<void>;
  submitLabel?: string;
  submitOnlyDirty?: boolean;
  cancelShow?: boolean;
  cancelAction?: () => void;
  cancelLabel?: string;
  cancelOnlyDirty?: boolean;

  buttons?: (ButtonProps | LinkProps)[];
  extraValidation?: (values: Record<string, any>) => boolean | Promise<boolean>

  className?: string;
  style?: CSSProperties;

  disableWhenOffline?: boolean;

  container?: ComponentType<FormContainerProps>;
  buttonContainer?: ComponentType<ButtonContainerProps>;
}