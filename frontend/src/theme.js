import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0046C7',
    },
    secondary: {
      main: '#FF8A00',
    },
    background: {
      default: '#ffffff',
      paper: '#F5F7FB',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
    },
  },

  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',

    h1: {
      fontWeight: 700,
      letterSpacing: '0.04em',
      fontSize: '2.8rem',
      '@media (max-width:900px)': {
        fontSize: '2.2rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.9rem',
      },
    },

    h2: {
      fontWeight: 700,
      letterSpacing: '0.03em',
      fontSize: '2.4rem',
      '@media (max-width:900px)': {
        fontSize: '2rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.7rem',
      },
    },

    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      '@media (max-width:900px)': {
        fontSize: '1.75rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },

    h4: {
      fontWeight: 600,
      fontSize: '1.6rem',
      '@media (max-width:900px)': {
        fontSize: '1.4rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },

    h5: {
      fontWeight: 600,
      fontSize: '1.3rem',
      '@media (max-width:600px)': {
        fontSize: '1.15rem',
      },
    },

    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },

    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      '@media (max-width:600px)': {
        fontSize: '0.95rem',
      },
    },

    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.6,
      '@media (max-width:600px)': {
        fontSize: '0.85rem',
      },
    },

    subtitle1: {
      fontSize: '1rem',
      '@media (max-width:600px)': {
        fontSize: '0.9rem',
      },
    },

    subtitle2: {
      fontSize: '0.85rem',
      '@media (max-width:600px)': {
        fontSize: '0.8rem',
      },
    },

    button: {
      fontWeight: 600,
      fontSize: '0.95rem',
      '@media (max-width:600px)': {
        fontSize: '0.9rem',
      },
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
