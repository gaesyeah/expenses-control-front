import type useStateOnForm from "../hooks/useStateOnForm.hook";
import type { FormType } from "./form.types";

export type InputStateOnFormProps<
  T,
  D extends FormType,
  K extends keyof D,
> = T & {
  stateOnForm: ReturnType<typeof useStateOnForm<D>>;
  field: K;
  isLoading?: boolean;
  label?: string;
  /* errorValidation?: { validation: boolean; message: string }; */
};
