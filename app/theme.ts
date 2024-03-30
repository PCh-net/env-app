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
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        min-height: 100vh;
      }
      `,
    },
  },
});

export default theme;
