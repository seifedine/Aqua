import {
  createTheme,
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { red, blue, grey } from "@mui/material/colors";

const aquaPalette = {
  primary: {
    main: '#fffff4',
    contrastText: '#000000',
  },
  secondary: {
    main: '#fffff3',
    contrastText: '#000000',
  },
  error: {
    main: '#fffff2',
  },
  warning: {
    main: '#fdfcec',
  },
  info: {
    main: '#fcfbeb',
  },
  success: {
    main: '#fcfbeb',
  },
  input: {
    main: '#fffff4',
  },
  background: {
    default: 'radial-gradient(circle, #a1cbc4 0%, #8fb2ac 33%, #769a94 66%, #5e8280 100%);',
    paper: '#ffffff',
  },
  text: {
    primary: '#000000',
    secondary: 'rgba(0, 0, 0, 0.7)',
    disabled: 'rgba(0, 0, 0, 0.5)',
    hint: 'rgba(0, 0, 0, 0.5)',
  },
};

const aquaTypography = {
  fontFamily: '"Inter", sans-serif', // Set the font family to Inter
  h1: {
    fontSize: "3rem",
  },
  h2: {
    fontSize: "2.5rem",
  },
  h3: {
    fontSize: "2rem",
  },
  h4: {
    fontSize: "1.75rem",
  },
  h5: {
    fontSize: "1.5rem",
  },
  h6: {
    fontSize: "1.25rem",
  },
  subtitle1: {
    fontSize: "0.9rem",
  },
  subtitle2: {
    fontSize: "0.8rem",
  },
}

const aquaComponents = {
  MuiInputBase: {
    styleOverrides: {
      input: {
        color: 'white',
      },
    },
  },
}
const themeOptions: ThemeOptions = {
  palette: aquaPalette,
  typography: aquaTypography,
  components: aquaComponents,
};

// A custom theme for this app
const theme = createTheme(themeOptions);

export const ThemeProvider = (props: { children?: React.ReactNode }) => {
  return <MuiThemeProvider {...props} theme={theme} />;
};
