import styled from "styled-components";
import type { theme } from "../styles/Theme.theme";

type colorKey = keyof (typeof theme)["colors"]["status"];

type StatusBadgeProps = Readonly<{
  color: colorKey;
  text: string;
}>;

export default function StatusBadge({ color, text }: StatusBadgeProps) {
  return <SCStatusBadge $color={color}>{text}</SCStatusBadge>;
}

const SCStatusBadge = styled.div<{ $color: colorKey }>`
  background-color: ${({ $color, theme }) => theme.colors.status[$color]};
  color: ${({ theme }) => theme.colors.font.white};
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  width: 90px;
  margin: 0 auto;
  text-align: center;
`;
