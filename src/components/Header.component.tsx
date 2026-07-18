import styled from "styled-components";

const HEADER_HEIGHT = "50px";

export default function Header() {
  return (
    <>
      <SCHeader>Controle de gastos</SCHeader>
      <SCHeaderSpacer />
    </>
  );
}

const SCHeader = styled.header`
  height: ${HEADER_HEIGHT};
  background-color: ${({ theme }) => theme.colors.background.main};
  color: ${({ theme }) => theme.colors.font.white};
  font-size: 22px;
  font-weight: 700;
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SCHeaderSpacer = styled.div`
  height: ${HEADER_HEIGHT};
`;
