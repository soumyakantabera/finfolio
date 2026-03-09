import { createTheme } from '@mui/material/styles';

const headingFont = '"Manrope", "Helvetica", "Arial", sans-serif';
const bodyFont = '"Sora", "Helvetica", "Arial", sans-serif';
const accentFont = '"Sora", "Helvetica", "Arial", sans-serif';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#000000' },
    secondary: { main: '#000000' },
    background: { default: '#FAFAFA', paper: '#FFFFFF' },
    text: { primary: '#111111', secondary: '#555555' },
    divider: '#E0E0E0',
  },
  typography: {
    fontFamily: bodyFont,
    h1: { fontFamily: headingFont, fontWeight: 700, letterSpacing: '-0.03em', fontSize: '2.75rem', lineHeight: 1.15 },
    h2: { fontFamily: headingFont, fontWeight: 700, letterSpacing: '-0.02em', fontSize: '2.25rem', lineHeight: 1.2 },
    h3: { fontFamily: headingFont, fontWeight: 600, letterSpacing: '-0.01em', fontSize: '1.75rem', lineHeight: 1.25 },
    h4: { fontFamily: headingFont, fontWeight: 600, letterSpacing: '-0.01em', fontSize: '1.5rem', lineHeight: 1.3 },
    h5: { fontFamily: headingFont, fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.35 },
    h6: { fontFamily: headingFont, fontWeight: 600, fontSize: '1.1rem', lineHeight: 1.4 },
    subtitle1: { fontFamily: bodyFont, fontWeight: 500, lineHeight: 1.6 },
    subtitle2: { fontFamily: bodyFont, fontWeight: 500, lineHeight: 1.6 },
    body1: { fontFamily: bodyFont, fontWeight: 400, lineHeight: 1.75, fontSize: '0.95rem' },
    body2: { fontFamily: bodyFont, fontWeight: 400, lineHeight: 1.7, fontSize: '0.875rem' },
    caption: { fontFamily: accentFont, fontWeight: 400, fontSize: '0.75rem', color: '#555555' },
    overline: { fontFamily: accentFont, fontWeight: 500, letterSpacing: '0.12em', fontSize: '0.7rem' },
    button: { fontFamily: bodyFont, textTransform: 'none', fontWeight: 500, fontSize: '0.875rem' },
  },
  shape: { borderRadius: 0 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '10px 28px',
          boxShadow: 'none',
          '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        outlined: {
          borderColor: '#000',
          '&:hover': { backgroundColor: '#000', color: '#fff', borderColor: '#000' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          border: '1px solid #E0E0E0',
          transition: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 0, borderColor: '#E0E0E0', color: '#111' },
        outlined: { borderColor: '#E0E0E0' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: 'none', borderBottom: '1px solid #E0E0E0' },
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
        notchedOutline: { borderColor: '#E0E0E0' },
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
        root: { borderColor: '#E0E0E0' },
      },
    },
  },
});

export default theme;
