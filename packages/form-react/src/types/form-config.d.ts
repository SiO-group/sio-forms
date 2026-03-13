import { ComponentType, CSSProperties, ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { FormField } from "@sio/form-types";
import { FormLayout } from "./form-layout";
import { ButtonProps, LinkProps } from "./ui-props";

type FormContainerProps = ComponentPropsWithoutRef<'form'>;
type ButtonContainerProps = HTMLAttributes<HTMLDivElement>;

export interface FormConfig {
  fields: FormField[];
  layout?: FormLayout[];

  submitShow?: boolean;
  submitAction: (values: Record<string, any>) => void | Promise<void>;
  submitLabel?: string;
  cancelShow?: boolean;
  cancelAction?: () => void;
  cancelLabel?: string;

  buttons?: (ButtonProps | LinkProps)[];
  extraValidation?: (values: Record<string, any>) => boolean | Promise<boolean>

  className?: string;
  style?: CSSProperties;

  disableWhenOffline?: boolean;

  container?: ComponentType<FormContainerProps>;
  buttonContainer?: ComponentType<ButtonContainerProps>;
}