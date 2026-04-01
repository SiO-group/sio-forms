import { ButtonContainerProps, FormConfig, FormContainerProps } from "../types/form-config";
import { FormField } from "@sio-group/form-types";
import React, { useMemo, forwardRef, useImperativeHandle } from "react";
import { useForm } from "../hooks/useForm";
import { FormLayout, RadioFieldProps, SelectFieldProps, TextareaFieldProps, SwitchFieldProps } from "../types";
import { getColumnClasses } from "../utils/get-column-classes";
import { Checkbox, Input, Radio, Select, Textarea, Switch } from "./Fields";
import { Link, Button } from "@sio-group/ui-core";
import type { LinkProps, ButtonProps } from "@sio-group/ui-core";

const DefaultContainer: React.FC<FormContainerProps> = ({ children }) => (
  <div>{children}</div>
);

const DefaultButtonContainer: React.FC<ButtonContainerProps> = ({ children }) => (
  <div className="btn-group">{children}</div>
);

const DefaultFieldContainer: React.FC<{children: React.ReactNode}> = ({children}: {children: React.ReactNode}) => <>{children}</>

export const Form = forwardRef(({
  fields,
  layout = [],
  submitShow = true,
  submitAction,
  submitLabel = 'Bewaar',
  submitOnlyDirty = false,
  cancelShow = false,
  cancelAction,
  cancelLabel = 'Annuleren',
  cancelOnlyDirty = false,
  buttons = [],
  extraValidation = () => true,
  className,
  style,
  disableWhenOffline = false,
  container: Container = DefaultContainer,
  buttonContainer: ButtonContainer = DefaultButtonContainer,
}: FormConfig, ref) => {
  const { register, getValues, setValues, isValid, isBusy, isDirty, reset, submit } = useForm({
    disableWhenOffline,
  });

  useImperativeHandle(ref, () => ({
    setValues,
    reset,
    getValues
  }))

  const loadElement = (field: FormField, renderLayout: boolean = false) => {
    switch (field.type) {
      case 'textarea':
        return <Textarea {...register(field.name, field, renderLayout) as TextareaFieldProps} key={field.name} />;

      case 'checkbox':
        return <Checkbox {...register(field.name, field, renderLayout)} key={field.name} />;

      case 'switch':
        return <Switch {...register(field.name, field, renderLayout) as SwitchFieldProps} key={field.name} />;

      case 'radio':
        return <Radio {...register(field.name, field, renderLayout) as RadioFieldProps} key={field.name} />;

      case 'select':
        return <Select {...register(field.name, field, renderLayout) as SelectFieldProps} key={field.name} />

      case 'text':
      case 'search':
      case 'email':
      case 'tel':
      case 'password':
      case 'url':
      case 'number':
      case 'range':
      case 'date':
      case 'time':
      case 'datetime-local':
      case 'color':
      case 'file':
      case 'hidden':
        return <Input {...register(field.name, field, renderLayout)} key={field.name} />;

      default:
        return <div key={field.name}>{field.type} to implement</div>;
    }
  };

  const renderFields = () => {
    const target: FormLayout[] | FormField[] = layout?.length ? layout : fields;
    const hasLayout: boolean = layout?.length !== 0 || fields.some((f: FormField) => f.config.layout);

    const content = target.map((element) => {
      if ('fields' in element) {
        const classes: string = getColumnClasses(element.layout, element.layout?.className);
        const FieldContainer = element.container ?? DefaultFieldContainer;

        return (
          <div
            key={element.fields.join('-')}
            className={classes}
            style={element.layout?.style}
          >
            <FieldContainer>
              {element.fields.map((name: string) => {
                const field: FormField | undefined = fieldMap.get(name);
                return field ? loadElement(field) : null;
              })}
            </FieldContainer>
          </div>
        );
      }

      return loadElement(element, hasLayout);
    });


    return hasLayout
      ? <div className="sio-row">{content}</div>
      : content
  };

  const fieldMap = useMemo(() => {
    const map = new Map<string, FormField>();
    fields.forEach((f: FormField) => map.set(f.name, f));
    return map;
  }, [fields]);

  const handleCancel = () => {
    cancelAction?.();
    reset();
  };

  const handleSubmit = async () => {
    await submit(() => submitAction(getValues()));
    reset();
  };

  const renderButton = (props: ButtonProps | LinkProps, i: number) => {
    return props.type === 'link' ? (
      <Link {...(props as LinkProps)} key={i} />
    ) : (
      <Button {...(props as ButtonProps)} key={i} />
    );
  }

  const renderButtons = () => {
    return submitShow || cancelShow || buttons.length ? (
      <ButtonContainer>
        {submitShow && (
          <Button
            type='submit'
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            variant='primary'
            label={submitLabel}
            loading={isBusy()}
            disabled={!isValid() || !extraValidation(getValues()) || (submitOnlyDirty && !isDirty())}
          />
        )}
        {(cancelShow && (!cancelOnlyDirty || isDirty())) && (
          <Button
            type='button'
            onClick={handleCancel}
            variant='secondary'
            label={cancelLabel}
          />
        )}
        {buttons?.map(renderButton)}
      </ButtonContainer>
    ) : null;
  };

  return (
    <form className={className} style={style} noValidate>
      <Container>
        {renderFields()}
      </Container>
      {renderButtons()}
    </form>
  );
});

Form.displayName = 'Form';