import { createTheme } from '@mui/material/styles';

const headingFont = '"Space Grotesk", "Sora", "Helvetica", "Arial", sans-serif';
const bodyFont = '"Sora", "Helvetica", "Arial", sans-serif';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#111111' },
    secondary: { main: '#111111' },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#111111', secondary: '#555555' },
    divider: '#eee',
  },
  typography: {
    fontFamily: bodyFont,
    h1: { fontFamily: headingFont, fontWeight: 700, letterSpacing: '-0.03em', fontSize: '3rem' },
    h2: { fontFamily: headingFont, fontWeight: 700, letterSpacing: '-0.02em', fontSize: '2.25rem' },
    h3: { fontFamily: headingFont, fontWeight: 600, letterSpacing: '-0.01em', fontSize: '1.75rem' },
    h4: { fontFamily: headingFont, fontWeight: 600, letterSpacing: '-0.01em', fontSize: '1.5rem' },
    h5: { fontFamily: headingFont, fontWeight: 500, fontSize: '1.25rem' },
    h6: { fontFamily: headingFont, fontWeight: 500, fontSize: '1.1rem' },
    subtitle1: { fontFamily: bodyFont, fontWeight: 500 },
    subtitle2: { fontFamily: bodyFont, fontWeight: 500 },
    body1: { fontFamily: bodyFont, fontWeight: 400, lineHeight: 1.7 },
    body2: { fontFamily: bodyFont, fontWeight: 400, lineHeight: 1.6 },
    caption: { fontFamily: bodyFont, fontWeight: 400, fontSize: '0.75rem' },
    overline: { fontFamily: bodyFont, fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.7rem' },
    button: { fontFamily: bodyFont, textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 0 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:focus-visible': { outline: '2px solid #111', outlineOffset: '2px' },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        outlined: {
          borderColor: '#111',
          '&:hover': { backgroundColor: '#111', color: '#fff', borderColor: '#111' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          border: '1px solid #eee',
          transition: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 0, borderColor: '#eee', color: '#111' },
        outlined: { borderColor: '#eee' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: 'none', borderBottom: '1px solid #eee' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 0, boxShadow: 'none' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 0 },
        notchedOutline: { borderColor: '#eee' },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 0, boxShadow: 'none' },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: { borderRadius: 0 },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { borderRadius: 0 },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#eee' },
      },
    },
  },
});

export default theme;
