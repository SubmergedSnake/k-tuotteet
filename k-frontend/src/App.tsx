import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import ProductSearch from './components/ProductSearch';
import { useState } from 'react';

function App() {


  const theme = createTheme({
    palette: {
      primary: {
        main: '#0076ca',
      },
      secondary: {
        main: '#f86800',
        light: '#ffbb64'
      },
      background: {
        paper: '#fafafa',
      }
    },
    typography: {
      fontFamily: [
        'Arvo',
        'Roboto',
      ].join(','),
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ProductSearch />
      </ThemeProvider>
    </div>
  );
}

export default App;
