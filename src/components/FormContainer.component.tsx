import type { ComponentProps, ReactNode } from "react";
import styled from "styled-components";

type FormContainerProps = Readonly<
  ComponentProps<"form"> & { children: ReactNode }
>;

export default function FormContainer({
  onSubmit,
  children,
  ...rest
}: FormContainerProps) {
  return (
    <SCForm
      {...rest}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
    >
      {children}
    </SCForm>
  );
}

const SCForm = styled.form`
  padding-left: 10px;
  padding-right: 10px;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
