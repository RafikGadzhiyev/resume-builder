import { Themes } from "../variants/themes.variant";
import { ColorSet } from "./ColorSet";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { ThemeType } from "../types";

const Container = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  background-color: ${(styles: any) => styles.theme.primaryColor};
  z-index: 100;
  border-radius: 10px;
  padding: 0.25rem;
  position: absolute;
  top: 175%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px -5px ${(styles: any) => styles.theme.textColor};
`;
export const Palette = () => {
  return (
    <Container
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      {(Object.keys(Themes) as ThemeType[]).map((themeKey: ThemeType) => {
        const theme = Themes[themeKey];
        return (
          <ColorSet
            key={themeKey}
            primaryColor={theme.primaryColor}
            secondaryColor={theme.secondaryColor}
            accentColors={theme.accentColors}
            textColor={theme.textColor}
            paletteName={themeKey}
          />
        );
      })}
    </Container>
  );
};
