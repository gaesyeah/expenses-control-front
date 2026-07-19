import type { ComponentProps } from "react";
import styled, { css } from "styled-components";
import type { routes } from "../../routes/routes.route";
import { useLocation, useNavigate } from "react-router-dom";

type NavigationButtonProps = Readonly<
  { route: (typeof routes)[keyof typeof routes] } & ComponentProps<"button">
>;

export default function NavigationButton({
  route: { label, path },
  ...rest
}: NavigationButtonProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <SCNavigationButton
      {...rest}
      type="button"
      $path={path}
      $pathname={pathname}
      onClick={() => navigate(path)}
    >
      {label}
    </SCNavigationButton>
  );
}

const SCNavigationButton = styled.button<{
  $path: string;
  $pathname: string;
}>`
  height: 30px;
  border-radius: 8px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 16px;
  font-weight: 600;
  ${({
    $path,
    $pathname,
    theme: {
      colors: { font, background },
    },
  }) =>
    $path === $pathname
      ? css`
          border: 2px solid ${background.white};
          background-color: ${background.white};
          color: ${font.main};
        `
      : css`
          border: 2px solid ${background.white};
          background-color: ${background.main};
          color: ${font.white};
        `}
`;
