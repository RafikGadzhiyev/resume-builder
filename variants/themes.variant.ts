import { ITheme } from "../interfaces/style.interface";
import { ThemeType } from "../types";

export const Themes: { [key in ThemeType]: ITheme } = {
  dark: {
    primaryColor: "#1C1C1E",
    secondaryColor: "#262626",
    textColor: "#ffffff",
    accentColors: {
      success: "#0AFF14",
      update: "#0AFF14",
      error: "#D8584C",
      warning: "#E1D800",
      info: "#DBFEFF",
    },
  },
  light: {
    primaryColor: "#FFFBF5",
    secondaryColor: "#F7EFE5",
    textColor: "#000000",
    accentColors: {
      success: "#0AFF14",
      update: "#828FF7",
      error: "#D8584C",
      warning: "#E1D800",
      info: "#DBFEFF",
    },
  },
  brown: {
    primaryColor: "#694141",
    secondaryColor: "#422828",
    textColor: "#ffffff",
    accentColors: {
      success: "#0AFF14",
      update: "#828FF7",
      error: "#D8584C",
      warning: "#E1D800",
      info: "#DBFEFF",
    },
  },
  aqua: {
    primaryColor: "#82CFCF",
    secondaryColor: "#639F9F",
    textColor: "#ffffff",
    accentColors: {
      success: "#0AFF14",
      update: "#828FF7",
      error: "#D8584C",
      warning: "#E1D800",
      info: "#DBFEFF",
    },
  },
  purple: {
    primaryColor: "#C780FA",
    secondaryColor: "#E3ACF9",
    textColor: "#ffffff",
    accentColors: {
      success: "#0AFF14",
      update: "#828FF7",
      error: "#D8584C",
      warning: "#E1D800",
      info: "#DBFEFF",
    },
  },
  sage: {
    primaryColor: "#99A98F",
    secondaryColor: "#C1D0B5",
    textColor: "#ffffff",
    accentColors: {
      success: "#0AFF14",
      update: "#828FF7",
      error: "#D8584C",
      warning: "#E1D800",
      info: "#DBFEFF",
    },
  },
  indigo: {
    primaryColor: "#7286D3",
    secondaryColor: "#8EA7E9",
    textColor: "#ffffff",
    accentColors: {
      success: "#0AFF14",
      update: "#828FF7",
      error: "#D8584C",
      warning: "#E1D800",
      info: "#DBFEFF",
    },
  },
};
