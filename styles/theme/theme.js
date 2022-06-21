import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#66b2ff',
    },
    background: {
      default: '#0a1929',
    },
  },
});

export default responsiveFontSizes(theme);
