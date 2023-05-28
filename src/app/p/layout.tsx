"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { RetrieveUser } from "../../../state/reducers/auth.reducer";
import { css, Global, ThemeProvider } from "@emotion/react";
import _ from "lodash";
import { Themes } from "../../../variants/themes.variant";
import { createTheme } from "@mui/material";
import { ConvertOpacityToHEXRepresentation } from "../../../utils/convert";

const DynamicGlobalStyles = (styles: any) => css`
  @font-face {
    font-family: "Manrope";
  }
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  *::-webkit-scrollbar {
    width: 0.25rem;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: ${styles.textColor +
    ConvertOpacityToHEXRepresentation(60)};
  }
  *::-webkit-scrollbar-thumb:hover {
    border-radius: 5px;
    background-color: ${styles.textColor +
    ConvertOpacityToHEXRepresentation(40)};
  }
  *::-webkit-scrollbar-thumb:active {
    border-radius: 5px;
    background-color: ${styles.textColor +
    ConvertOpacityToHEXRepresentation(75)};
  }

  html,
  body {
    width: 100%;
    min-height: 100vh;
    font-size: 20px;
    box-sizing: border-box;
    background-color: ${styles.primaryColor};
    font-family: Manrope, sans-serif;
    color: #fff;
  }

  .up {
    transform: rotate(180deg);
  }
`;

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const MUITheme = createTheme();
  const theme = useSelector((store: RootState) => store.themeReducer.theme);

  // TODO TOTALLY FIX ROUTING
  const pathname = usePathname();
  const router = useRouter();
  const { isTokenExist, user } = useSelector(
    (store: RootState) => store.authReducer
  );
  const dispatch = useDispatch<AppDispatch>();
  let one = React.useRef(1);

  React.useEffect(() => {
    if (one.current) {
      one.current -= 1;
      dispatch(RetrieveUser());
    }
  }, [pathname]);
  React.useEffect(() => {
    if (isTokenExist === "not_exists" && pathname !== "/p/auth") {
      router.push("/p/auth");
    } else if (isTokenExist === "exists" && pathname === "/p/auth" && user) {
      router.push(`/p/verification/${user.id}`);
    }
  }, [user, isTokenExist, pathname, router]);
  return (
    <ThemeProvider theme={_.merge(Themes[theme], MUITheme)}>
      <Global styles={DynamicGlobalStyles} />
      {children}
    </ThemeProvider>
  );
}
