import type { ComponentProps, ReactNode } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled, { useTheme } from "styled-components";

type SubmitButtonProps = Readonly<
  {
    isLoading?: boolean;
    children: ReactNode;
  } & ComponentProps<"button">
>;

export default function SubmitButton({
  isLoading,
  children,
  disabled,
  ...rest
}: SubmitButtonProps) {
  const { white } = useTheme().colors.font;
  return (
    <SCSubmitButton
      {...rest}
      disabled={disabled || isLoading}
      $isLoading={isLoading}
      type="submit"
    >
      {isLoading ? <ThreeDots visible={isLoading} color={white} /> : children}
    </SCSubmitButton>
  );
}

const SCSubmitButton = styled.button<{ $isLoading?: boolean }>`
  height: 40px;
  border-radius: 10px;
  border: none;
  font-size: 17px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.main};
  color: ${({ theme }) => theme.colors.font.white};
  &:disabled {
    cursor: ${({ $isLoading }) => ($isLoading ? "progress" : undefined)};
  }
`;
