import {FC} from "react";
import type { ITheme } from "../interfaces/style.interface";
import styled from "@emotion/styled";
import { ThemeType } from "../types";
import { useDispatch } from "react-redux";
import { changeTheme } from "../state/slices/theme.slice";

const Container = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 0 10px -5px ${(styles: any) => styles.theme.textColor};
`;

const Color = styled.div`
  width: 100%;
`;

export const ColorSet: FC<
  Record<keyof ITheme, any> & { paletteName: ThemeType }
> = ({ primaryColor, secondaryColor, paletteName }) => {
  const dispatch = useDispatch();
  return (
    <Container onClick={() => dispatch(changeTheme(paletteName))}>
      <Color style={{ backgroundColor: primaryColor }} />
      <Color style={{ backgroundColor: secondaryColor }} />
    </Container>
  );
};
