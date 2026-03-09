import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const router = useRouter();
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

  const isActive = (path) => router.pathname === path;

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

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
    color: '#000',
    fontFamily: '"Sora", "Helvetica", "Arial", sans-serif',
    textTransform: 'uppercase',
    fontWeight: isActive(path) ? 700 : 400,
    borderBottom: isActive(path) ? '1px solid #000' : '1px solid transparent',
    borderRadius: 0,
    px: 2,
    py: 0.75,
    fontSize: '0.7rem',
    letterSpacing: '0.08em',
    position: 'relative',
    transition: 'border-color 0.2s ease',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#000',
      borderBottom: '1px solid #000',
    },
    '&:focus-visible': {
      outline: '2px solid #000',
      outlineOffset: '2px',
    },
  });

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#FFF', color: '#000', boxShadow: 'none', borderBottom: '1px solid #000' }}>
        <Toolbar sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 1, minHeight: { xs: 56, sm: 72 } }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{ fontWeight: 800, flexGrow: 1, color: '#000', textDecoration: 'none', fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif', fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }}
          >
            {siteTitle}
          </Typography>

          {/* Desktop links */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
            {navLinks.map((item) => (
              <Button key={item.key} component={Link} href={item.path} sx={linkSx(item.path)}>
                {item.label}
              </Button>
            ))}
            {customLinks.map((item) => (
              <Button key={item.path} component={Link} href={item.path} sx={linkSx(item.path)}>
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
              color: '#000',
              fontFamily: '"Sora", "Helvetica", "Arial", sans-serif',
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
            bgcolor: '#FFF',
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
              px: 3,
              minHeight: 64,
              borderBottom: '1px solid #000',
              flexShrink: 0,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: '#000', letterSpacing: '-0.02em', fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
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
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontFamily: '"Sora", "Helvetica", "Arial", sans-serif',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
              }}
            >
              ✕
            </Box>
          </Box>

          {/* Primary nav links */}
          <Box component="nav" aria-label="Primary navigation" sx={{ flex: 1, px: 3, pt: 5 }}>
            {navLinks.map((item, i) => (
              <Box
                key={item.key}
                component={Link}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 2,
                  py: 2,
                  borderBottom: '1px solid #000',
                  textDecoration: 'none',
                  color: '#000',
                  minHeight: 56,
                  transition: 'padding-left 0.15s ease',
                  '&:hover': { pl: 0.5 },
                  '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: '#000',
                    fontFamily: '"Sora", "Helvetica", "Arial", sans-serif',
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
                    fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif',
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
              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #000' }}>
                <Typography
                  variant="overline"
                  sx={{ color: '#000', letterSpacing: '0.15em', display: 'block', mb: 1, fontWeight: 600 }}
                >
                  Pages
                </Typography>
                {customLinks.map((item) => (
                  <Box
                    key={item.path}
                    component={Link}
                    href={item.path}
                    onClick={() => setMenuOpen(false)}
                    sx={{
                      display: 'block',
                      py: 1.5,
                      textDecoration: 'none',
                      color: '#000',
                      fontWeight: isActive(item.path) ? 700 : 400,
                      fontSize: '1rem',
                      minHeight: 44,
                      '&:hover': { fontWeight: 700 },
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
              px: 3,
              py: 3,
              borderTop: '1px solid #000',
              flexShrink: 0,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: '#000', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}
            >
              © {new Date().getFullYear()} {siteTitle}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
