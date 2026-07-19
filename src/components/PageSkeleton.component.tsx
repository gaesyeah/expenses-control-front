import type { ReactNode } from "react";
import styled from "styled-components";

type PageSkeletonProps = Readonly<{ children: ReactNode }>;

export default function PageSkeleton({ children }: PageSkeletonProps) {
  return <SCPageSkeleton>{children}</SCPageSkeleton>;
}

const SCPageSkeleton = styled.div`
  height: 100dvh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 15px;
`;
