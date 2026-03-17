import { ButtonContainerProps, FormConfig, FormContainerProps } from "../types/form-config";
import { FormField } from "@sio-group/form-types";
import React, { useMemo } from "react";
import { useForm } from "../hooks/useForm";
import { ButtonProps, LinkProps, FormLayout, RadioFieldProps, SelectFieldProps, TextareaFieldProps } from "../types";
import { getColumnClasses } from "../utils/get-column-classes";
import { Checkbox, Input, Radio, Select, Textarea } from "./Fields";
import { Link } from "./Link";
import { Button } from "./Button";

const DefaultContainer: React.FC<FormContainerProps> = ({ children }) => (
  <div>{children}</div>
);

const DefaultButtonContainer: React.FC<ButtonContainerProps> = ({ children }) => (
  <div className="btn-group">{children}</div>
);

export const Form = ({
    fields,
    layout = [],
    submitShow = true,
    submitAction,
    submitLabel = 'Bewaar',
    cancelShow = false,
    cancelAction,
    cancelLabel = 'Annuleren',
    buttons = [],
    extraValidation = () => true,
    className,
    style,
    disableWhenOffline = false,
    container: Container = DefaultContainer,
    buttonContainer: ButtonContainer = DefaultButtonContainer,
}: FormConfig) => {
  const { register, getValues, isValid, isBusy, isDirty, reset, submit } = useForm({
    disableWhenOffline,
  });

  const loadElement = (field: FormField, renderLayout: boolean = false) => {
    switch (field.type) {
      case 'textarea':
        return <Textarea {...register(field.name, field, renderLayout) as TextareaFieldProps} key={field.name} />;

      case 'checkbox':
        return <Checkbox {...register(field.name, field, renderLayout)} key={field.name} />;

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

        return (
          <div
            key={element.fields.join('-')}
            className={classes}
            style={element.layout?.style}
          >
            {element.fields.map((name: string) => {
              const field: FormField | undefined = fieldMap.get(name);
              return field ? loadElement(field) : null;
            })}
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
            onClick={handleSubmit}
            variant='primary'
            label={submitLabel}
            loading={isBusy()}
            disabled={!isValid() || !extraValidation(getValues())}
          />
        )}
        {cancelShow && (
          <Button
            type='button'
            onClick={handleCancel}
            variant='secondary'
            label={cancelLabel}
            disabled={!isDirty()}
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
}