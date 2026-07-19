import styled from "styled-components";
import type { theme } from "../styles/Theme.theme";

type colorKey = keyof (typeof theme)["colors"]["status"];

type StatusBadgeProps = Readonly<{
  color: colorKey;
  text: string;
}>;

export default function StatusBadge({ color, text }: StatusBadgeProps) {
  return (
    <SCStatusBadge title={text} $color={color}>
      {text}
    </SCStatusBadge>
  );
}

const SCStatusBadge = styled.div<{ $color: colorKey }>`
  background-color: ${({ $color, theme }) => theme.colors.status[$color]};
  color: ${({ theme }) => theme.colors.font.white};
  margin: 0 auto;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  max-width: 90px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
