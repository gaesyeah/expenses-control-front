import type { ComponentProps, HTMLInputTypeAttribute } from "react";
import styled from "styled-components";
import type useStateOnForm from "../hooks/useStateOnForm";
import type { FormType } from "../types/form.types";

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
  Omit<ComponentProps<"input">, "type" | "value" | "onChange"> & {
    type: AllowedInputType;
    label?: string;
    field: K;
    stateOnForm: ReturnType<typeof useStateOnForm<T>>;
    isLoading?: boolean;
  }
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

const SCLabel = styled.label`
  display: flex;
  flex-direction: column;
`;
const SCInput = styled.input<{ $isLoading?: boolean }>`
  padding-left: 10px;
  margin-top: 4px;
  border-radius: 10px;
  height: 40px;
  &:disabled {
    cursor: ${({ $isLoading }) => ($isLoading ? "progress" : undefined)};
  }
`;
