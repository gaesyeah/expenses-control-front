import styled from "styled-components";
import { routes } from "../routes/routes.route";
import NavigationButton from "./buttons/NavigationButton.component";

const HEADER_HEIGHT = "80px";

export default function Header() {
  return (
    <>
      <SCHeader>
        Controle de gastos
        <SCHeaderNavigation>
          {Object.values(routes).map((route) => (
            <NavigationButton route={route} key={route.label} />
          ))}
        </SCHeaderNavigation>
      </SCHeader>
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
  flex-direction: column;
  gap: 10px;
`;
const SCHeaderNavigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const SCHeaderSpacer = styled.div`
  height: ${HEADER_HEIGHT};
`;
