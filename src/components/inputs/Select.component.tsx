import type { ComponentProps } from "react";
import { inputStyles, SCLabel } from "./styles";
import type { InputStateOnFormProps } from "../../types/props.types";
import type { FormType } from "../../types/form.types";
import styled from "styled-components";

type SelectProps<T extends FormType, K extends keyof T> = Readonly<
  InputStateOnFormProps<
    {
      options:
        | (Pick<ComponentProps<"option">, "value"> & { label: string })[]
        | undefined;
    } & ComponentProps<"select">,
    T,
    K
  >
>;

export default function Select<T extends FormType, K extends keyof T>({
  stateOnForm: { data, onChangeData },
  options: initialOptions,
  label,
  field,
  disabled,
  isLoading,
  ...rest
}: SelectProps<T, K>) {
  const placeholderOption = { label: "selecione", value: "" };
  const value = data?.[field];
  const options = value
    ? (initialOptions ?? [])
    : [placeholderOption, ...(initialOptions ?? [])];

  return (
    <SCLabel>
      {label}
      <SCSelect
        {...rest}
        $isLoading={isLoading}
        disabled={disabled || isLoading}
        value={value}
        onChange={(event) => onChangeData(field, event)}
      >
        {options.map(({ label, value }) => (
          <option key={`${label}-${value}`} value={value}>
            {label}
          </option>
        ))}
      </SCSelect>
    </SCLabel>
  );
}

const SCSelect = styled.select<{ $isLoading: boolean }>`
  cursor: pointer;
  ${inputStyles}
`;
