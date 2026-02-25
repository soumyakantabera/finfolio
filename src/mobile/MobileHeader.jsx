import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const corePages = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'projects', label: 'Projects', path: '/projects' },
  { key: 'about', label: 'About', path: '/about' },
  { key: 'contact', label: 'Contact', path: '/contact' },
];

export default function MobileHeader({ data }) {
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

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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

  return (
    <>
      {/* Compact fixed header */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1200,
          bgcolor: '#fff',
          borderBottom: '1px solid #000',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: '14px',
          height: 48,
        }}
      >
        <Typography
          component={Link}
          to="/"
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: '0.9rem',
            color: '#000',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          {siteTitle}
        </Typography>
        <Box
          ref={openBtnRef}
          component="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-overlay"
          sx={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            p: 0,
            color: '#000',
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            minHeight: 44,
            display: 'flex',
            alignItems: 'center',
            '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
          }}
        >
          Menu
        </Box>
      </Box>

      {/* Fullscreen white menu */}
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
          }}
        >
          {/* Menu header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: '14px',
              height: 48,
              borderBottom: '1px solid #000',
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: '#000',
                letterSpacing: '-0.02em',
              }}
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
                border: 'none',
                cursor: 'pointer',
                p: 0,
                color: '#000',
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                minHeight: 44,
                display: 'flex',
                alignItems: 'center',
                '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
              }}
            >
              Close
            </Box>
          </Box>

          {/* Nav links */}
          <Box component="nav" aria-label="Primary navigation" sx={{ flex: 1, px: '14px', pt: 3 }}>
            {navLinks.map((item, i) => (
              <Box
                key={item.key}
                component={Link}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 1.5,
                  py: 1.5,
                  borderBottom: '1px dashed #000',
                  textDecoration: 'none',
                  color: '#000',
                  minHeight: 44,
                  '&:active': { pl: 0.5 },
                  '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#000',
                    fontWeight: 600,
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    fontVariantNumeric: 'tabular-nums',
                    minWidth: 20,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: isActive(item.path) ? 700 : 500,
                    fontSize: '1.25rem',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}

            {customLinks.length > 0 && (
              <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid #000' }}>
                <Typography
                  variant="overline"
                  sx={{ color: '#000', letterSpacing: '0.15em', display: 'block', mb: 0.5, fontWeight: 700, fontSize: '0.6rem' }}
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
                      py: 1,
                      textDecoration: 'none',
                      color: '#000',
                      fontWeight: isActive(item.path) ? 700 : 400,
                      fontSize: '0.9rem',
                      minHeight: 44,
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
          <Box sx={{ px: '14px', py: 2, borderTop: '1px solid #000', flexShrink: 0 }}>
            <Typography
              variant="caption"
              sx={{ color: '#000', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, fontSize: '0.6rem' }}
            >
              © {new Date().getFullYear()} {siteTitle}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
