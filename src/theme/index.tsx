import { useMemo, ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  ThemeOptions,
} from "@mui/material/styles";

import { palette } from "./palette";
import { shadows } from "./shadow";
// import { overrides } from './';
import { typography } from "./typography";
import { customShadows, CustomShadowType } from "./custom-shadow";

declare module "@mui/material/styles" {
  interface TypeBackground {
    default: string;
    paper: string;
    neutral: string;
  }

  interface ThemeOptions {
    customShadows?: CustomShadowType;
  }

  interface Theme {
    customShadows?: CustomShadowType;
  }
}

declare module "@mui/material/styles/createTypography" {
  interface TypographyOptions {
    fontSecondaryFamily?: string;
    fontWeightSemiBold?: number;
  }
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const memoizedValue: ThemeOptions = useMemo(
    () => ({
      palette: palette,
      typography,
      shadows: shadows(),
      customShadows: customShadows,
      shape: { borderRadius: 8 },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              boxShadow: customShadows.card,
              borderRadius: 16,
              position: "relative",
              zIndex: 0,
            },
          },
        },
      },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
