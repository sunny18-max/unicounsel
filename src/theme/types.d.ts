import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      secondary: string;
      accent: string;
      background: string;
      surface: string;
      error: string;
      success?: string;
      warning?: string;
      text: {
        primary: string;
        secondary: string;
        disabled: string;
      };
      border: string;
    };
    typography: {
      fontFamily: string;
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      body1: string;
      body2: string;
      caption: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
  }
}