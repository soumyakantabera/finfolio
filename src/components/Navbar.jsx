import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const corePages = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'projects', label: 'Projects', path: '/projects' },
  { key: 'about', label: 'About', path: '/about' },
  { key: 'contact', label: 'Contact', path: '/contact' },
];

export default function Navbar({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const closeBtnRef = useRef(null);
  const openBtnRef = useRef(null);
  const visiblePages = data?.settings?.visiblePages || {};
  const customPages = data?.settings?.customPages || [];
  const siteTitle = data?.settings?.siteTitle || 'FinFolio';

  const navLinks = corePages.filter((p) => visiblePages[p.key] !== false);
  const customLinks = customPages.map((cp) => ({
    label: cp.title,
    path: `/page/${cp.slug}`,
  }));

  const isActive = (path) => location.pathname === path;

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ESC to close + focus trap
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
      openBtnRef.current?.focus();
      return;
    }
    if (e.key === 'Tab' && menuRef.current) {
      const focusable = menuRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [menuOpen, handleKeyDown]);

  const linkSx = (path) => ({
    color: isActive(path) ? '#000' : '#555',
    fontWeight: isActive(path) ? 700 : 500,
    borderBottom: isActive(path) ? '2px solid #000' : '2px solid transparent',
    borderRadius: 0,
    mx: 0.5,
    position: 'relative',
    transition: 'color 0.2s ease',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#000',
      borderBottom: '2px solid #000',
    },
    '&:focus-visible': {
      outline: '2px solid #000',
      outlineOffset: '2px',
    },
  });

  const allLinks = [
    ...navLinks.map((item, i) => ({ ...item, index: i })),
    ...customLinks.map((item, i) => ({ ...item, key: item.path, index: navLinks.length + i })),
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: '#fff', color: '#111' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ fontWeight: 700, flexGrow: 1, color: '#111', textDecoration: 'none' }}
          >
            {siteTitle}
          </Typography>

          {/* Desktop links */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            {navLinks.map((item) => (
              <Button key={item.key} component={Link} to={item.path} sx={linkSx(item.path)}>
                {item.label}
              </Button>
            ))}
            {customLinks.map((item) => (
              <Button key={item.path} component={Link} to={item.path} sx={linkSx(item.path)}>
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile menu button */}
          <Box
            ref={openBtnRef}
            component="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-overlay"
            sx={{
              display: { xs: 'flex', sm: 'none' },
              alignItems: 'center',
              gap: 1,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              p: 1,
              color: '#111',
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              minHeight: 44,
              '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
            }}
          >
            Menu
          </Box>
        </Toolbar>
      </AppBar>

      {/* Full-screen editorial mobile menu overlay */}
      {menuOpen && (
        <Box
          id="mobile-nav-overlay"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          sx={{
            position: 'fixed',
            inset: 0,
            bgcolor: '#fff',
            zIndex: 1400,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Menu header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              minHeight: 56,
              borderBottom: '1px solid #e0e0e0',
              flexShrink: 0,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: '#111', letterSpacing: '-0.02em' }}
            >
              {siteTitle}
            </Typography>
            <Box
              component="button"
              ref={closeBtnRef}
              onClick={() => { setMenuOpen(false); openBtnRef.current?.focus(); }}
              aria-label="Close navigation menu"
              sx={{
                background: 'none',
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                p: 0,
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#111',
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'border-color 0.2s ease',
                '&:hover': { borderColor: '#000' },
                '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
              }}
            >
              ✕
            </Box>
          </Box>

          {/* Primary nav links */}
          <Box component="nav" aria-label="Primary navigation" sx={{ flex: 1, px: 2, pt: 4 }}>
            {navLinks.map((item, i) => (
              <Box
                key={item.key}
                component={Link}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 2,
                  py: 2,
                  borderBottom: '1px solid #f0f0f0',
                  textDecoration: 'none',
                  color: isActive(item.path) ? '#000' : '#333',
                  minHeight: 56,
                  transition: 'color 0.15s ease, padding-left 0.15s ease',
                  '&:hover': { color: '#000', pl: 0.5 },
                  '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#999',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    fontVariantNumeric: 'tabular-nums',
                    minWidth: 24,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: isActive(item.path) ? 700 : 500,
                    fontSize: '1.5rem',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}

            {/* Custom page links — secondary style */}
            {customLinks.length > 0 && (
              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                <Typography
                  variant="overline"
                  sx={{ color: '#999', letterSpacing: '0.15em', display: 'block', mb: 1 }}
                >
                  Pages
                </Typography>
                {customLinks.map((item) => (
                  <Box
                    key={item.path}
                    component={Link}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    sx={{
                      display: 'block',
                      py: 1.5,
                      textDecoration: 'none',
                      color: isActive(item.path) ? '#000' : '#555',
                      fontWeight: isActive(item.path) ? 600 : 400,
                      fontSize: '1rem',
                      minHeight: 44,
                      transition: 'color 0.15s ease',
                      '&:hover': { color: '#000' },
                      '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                    }}
                  >
                    {item.label}
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Menu footer */}
          <Box
            sx={{
              px: 2,
              py: 3,
              borderTop: '1px solid #e0e0e0',
              flexShrink: 0,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}
            >
              © {new Date().getFullYear()} {siteTitle}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
