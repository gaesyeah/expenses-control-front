import type { ReactNode } from "react";
import styled from "styled-components";

type PageProps = Readonly<{ children: ReactNode }>;

export default function Page({ children }: PageProps) {
  return <SCPage>{children}</SCPage>;
}

const SCPage = styled.div`
  height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 15px;
`;
