import styled, { css } from "styled-components";

export const SCLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

export const inputStyles = css<{ $isLoading?: boolean }>`
  padding-left: 10px;
  border-radius: 10px;
  height: 40px;

  &:disabled {
    cursor: ${({ $isLoading }) => ($isLoading ? "progress" : undefined)};
  }
`;
