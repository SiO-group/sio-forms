export interface FieldSetters {
  handleChange: (value: unknown) => void;
  setFocused: (focussed: boolean) => void;
  setTouched: (touched: boolean) => void;
  setErrors: (errors: string[]) => void;
}