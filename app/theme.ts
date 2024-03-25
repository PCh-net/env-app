'use client';
import { createTheme } from '@mui/material/styles';

const lime200 = '#d9f99d'; // lime-200
const lime500 = '#84cc16'; // lime-500
const lime700 = '#65a30d'; // lime-700

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      body {
        background: radial-gradient(ellipse at top, ${lime200}, ${lime500}, ${lime700});
        background-repeat: no-repeat; /* Zapobiega powtarzaniu się tła */
        background-attachment: fixed; /* Opcjonalnie, sprawia że tło jest nieruchome przy przewijaniu */
        background-size: cover; /* Zapewnia, że tło pokrywa całą dostępną przestrzeń */
        min-height: 100vh; /* Ustawia minimalną wysokość na 100% wysokości okna przeglądarki */
      }
      `,
    },
  },
});

export default theme;
