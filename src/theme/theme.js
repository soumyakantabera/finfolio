import { createTheme } from '@mui/material/styles';

const headingFont = '"Space Grotesk", "Sora", "Helvetica", "Arial", sans-serif';
const bodyFont = '"Sora", "Helvetica", "Arial", sans-serif';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#000000' },
    secondary: { main: '#000000' },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#000000', secondary: '#000000' },
    divider: '#000000',
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
          padding: '8px 20px',
          boxShadow: 'none',
          transition: 'all 0.2s ease',
          '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none', transform: 'translateY(-1px)' },
          '&:active': { transform: 'translateY(0)' },
        },
        outlined: {
          borderColor: '#000',
          '&:hover': { backgroundColor: '#000', color: '#fff', borderColor: '#000' },
          '&:active': { transform: 'translateY(0)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          border: '1px solid #000',
          transition: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 0, borderColor: '#000', color: '#000' },
        outlined: { borderColor: '#000' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: 'none', borderBottom: '1px solid #000' },
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
        notchedOutline: { borderColor: '#000' },
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
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 0, backgroundColor: '#fff', border: '1px solid #000', height: 6 },
        bar: { borderRadius: 0, backgroundColor: '#000' },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { borderRadius: 0 },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: '#000' },
      },
    },
  },
});

export default theme;
