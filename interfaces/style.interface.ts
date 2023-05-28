export interface ITheme {
  primaryColor: string;
  secondaryColor: string;
  accentColors: IAccentColors;
  textColor: string;
}

export interface IAccentColors {
  success: string;
  update: string;
  error: string;
  warning: string;
  info: string;
}
