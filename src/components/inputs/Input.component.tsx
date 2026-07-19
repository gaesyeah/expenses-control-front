import type { ComponentProps, HTMLInputTypeAttribute } from "react";
import styled from "styled-components";
import type { FormType } from "../../types/form.types";
import { inputStyles, SCLabel } from "./styles";
import type { InputStateOnFormProps } from "../../types/props.types";

type AllowedInputType = Exclude<
  HTMLInputTypeAttribute,
  | "button"
  | "checkbox"
  | "file"
  | "hidden"
  | "image"
  | "radio"
  | "reset"
  | "submit"
>;

type InputProps<T extends FormType, K extends keyof T> = Readonly<
  InputStateOnFormProps<
    Omit<ComponentProps<"input">, "type" | "value" | "onChange"> & {
      type: AllowedInputType;
    },
    T,
    K
  >
>;

export default function Input<T extends FormType, K extends keyof T>({
  stateOnForm: { data, onChangeData },
  type,
  label,
  field,
  isLoading,
  disabled,
  ...rest
}: InputProps<T, K>) {
  return (
    <SCLabel>
      {label}
      <SCInput
        {...rest}
        disabled={disabled || isLoading}
        type={type}
        value={data?.[field]}
        onChange={(event) => onChangeData(field, event)}
        $isLoading={isLoading}
      />
    </SCLabel>
  );
}

const SCInput = styled.input<{ $isLoading?: boolean }>`
  ${inputStyles}
`;
