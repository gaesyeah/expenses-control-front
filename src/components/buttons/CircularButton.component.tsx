import type { ComponentProps, ReactNode } from "react";
import styled, { css } from "styled-components";

type CircularButtonProps = {
  children: ReactNode;
  size?: number;
  isLoading?: boolean;
} & ComponentProps<"button">;

export default function CircularButton({
  size = 35,
  children,
  isLoading,
  disabled,
  ...rest
}: CircularButtonProps) {
  return (
    <SCCircularButton
      {...rest}
      disabled={disabled || isLoading}
      $isLoading={isLoading}
      type="button"
      $size={size}
    >
      {children}
    </SCCircularButton>
  );
}

const SCCircularButton = styled.button<{ $size: number; $isLoading?: boolean }>`
  overflow: auto;
  border-radius: 100%;
  border: 2px solid ${({ theme }) => theme.colors.background.main};
  ${({ $size }) => css`
    width: ${$size}px;
    height: ${$size}px;
  `}
  &:disabled {
    cursor: ${({ $isLoading }) => ($isLoading ? "progress" : undefined)};
  }
`;
