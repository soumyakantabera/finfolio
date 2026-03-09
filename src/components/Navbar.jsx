import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const fontStack = '"Manrope", "Helvetica", "Arial", sans-serif';

const corePages = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'projects', label: 'Projects', path: '/projects' },
  { key: 'about', label: 'About', path: '/about' },
  { key: 'contact', label: 'Contact', path: '/contact' },
];

export default function Navbar({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  const allLinks = [
    ...navLinks,
    ...customLinks.map((cl, i) => ({ key: `custom-${i}`, ...cl })),
  ];

  const isActive = (path) => router.pathname === path;

  // Track scroll for glassmorphism shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    return () => {
      document.body.style.overflow = '';
    };
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

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(250,250,250,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color: '#111',
          boxShadow: scrolled
            ? '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)'
            : 'none',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'transparent' : '#EBEBEB',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            width: '100%',
            mx: 'auto',
            px: { xs: '20px', sm: '32px', md: '40px' },
            py: 0,
            minHeight: { xs: 56, md: 64 },
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              fontWeight: 800,
              flexGrow: 1,
              color: '#0A0A0A',
              textDecoration: 'none',
              fontFamily: fontStack,
              fontSize: { xs: '1.05rem', sm: '1.15rem' },
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {siteTitle}
          </Typography>

          {/* Desktop navigation */}
          <Box
            component="nav"
            aria-label="Primary navigation"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: '2px',
            }}
          >
            {allLinks.map((item) => (
              <Box
                key={item.key || item.path}
                component={Link}
                href={item.path}
                sx={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: '12px',
                  py: '6px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  color: isActive(item.path) ? '#0A0A0A' : '#64748B',
                  fontFamily: fontStack,
                  fontWeight: isActive(item.path) ? 600 : 500,
                  fontSize: '0.84rem',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                  transition:
                    'color 0.15s ease, background-color 0.15s ease',
                  backgroundColor: isActive(item.path)
                    ? '#F0F0F0'
                    : 'transparent',
                  '&:hover': {
                    color: '#0A0A0A',
                    backgroundColor: '#F0F0F0',
                  },
                  '&:focus-visible': {
                    outline: '2px solid #0A0A0A',
                    outlineOffset: '2px',
                  },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Box>

          {/* Mobile hamburger button */}
          <Box
            ref={openBtnRef}
            component="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-overlay"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              p: '8px',
              minWidth: 44,
              minHeight: 44,
              borderRadius: '8px',
              transition: 'background-color 0.15s ease',
              '&:hover': { backgroundColor: '#F0F0F0' },
              '&:focus-visible': {
                outline: '2px solid #0A0A0A',
                outlineOffset: '2px',
              },
            }}
          >
            <Box
              sx={{
                width: 18,
                height: '1.5px',
                bgcolor: '#0A0A0A',
                borderRadius: '1px',
              }}
            />
            <Box
              sx={{
                width: 18,
                height: '1.5px',
                bgcolor: '#0A0A0A',
                borderRadius: '1px',
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Full-screen mobile menu overlay with fade transition */}
      <Box
        id="mobile-nav-overlay"
        ref={menuRef}
        role="dialog"
        aria-modal={menuOpen ? 'true' : undefined}
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
        sx={{
          position: 'fixed',
          inset: 0,
          bgcolor: '#FAFAFA',
          zIndex: 1400,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.25s cubic-bezier(0.4,0,0.2,1), visibility 0.25s cubic-bezier(0.4,0,0.2,1)',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {/* Menu header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: '20px',
            minHeight: 56,
            borderBottom: '1px solid #EBEBEB',
            flexShrink: 0,
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            href="/"
            onClick={() => setMenuOpen(false)}
            sx={{
              fontWeight: 800,
              color: '#0A0A0A',
              textDecoration: 'none',
              fontFamily: fontStack,
              fontSize: '1.05rem',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {siteTitle}
          </Typography>
          <Box
            component="button"
            ref={closeBtnRef}
            onClick={() => {
              setMenuOpen(false);
              openBtnRef.current?.focus();
            }}
            aria-label="Close navigation menu"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              background: 'none',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#0A0A0A',
              transition: 'background-color 0.15s ease, border-color 0.15s ease',
              '&:hover': {
                backgroundColor: '#F0F0F0',
                borderColor: '#D4D4D4',
              },
              '&:focus-visible': {
                outline: '2px solid #0A0A0A',
                outlineOffset: '2px',
              },
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Box>
        </Box>

        {/* Navigation links */}
        <Box
          component="nav"
          aria-label="Primary navigation"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            px: '20px',
            pt: 4,
            pb: 3,
          }}
        >
          {navLinks.map((item, i) => (
            <Box
              key={item.key}
              component={Link}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                py: '16px',
                borderBottom: '1px solid #EBEBEB',
                textDecoration: 'none',
                color: isActive(item.path) ? '#0A0A0A' : '#525252',
                minHeight: 56,
                transition: 'color 0.15s ease, padding-left 0.2s ease',
                '&:hover': {
                  color: '#0A0A0A',
                  pl: '4px',
                },
                '&:focus-visible': {
                  outline: '2px solid #0A0A0A',
                  outlineOffset: '2px',
                },
              }}
            >
              <Typography
                sx={{
                  color: '#A3A3A3',
                  fontFamily: fontStack,
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  letterSpacing: '0.05em',
                  fontVariantNumeric: 'tabular-nums',
                  minWidth: 20,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </Typography>
              <Typography
                sx={{
                  fontFamily: fontStack,
                  fontWeight: isActive(item.path) ? 700 : 500,
                  fontSize: '1.6rem',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.2,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}

          {/* Custom page links */}
          {customLinks.length > 0 && (
            <Box sx={{ mt: 3, pt: 2 }}>
              <Typography
                sx={{
                  color: '#A3A3A3',
                  fontFamily: fontStack,
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  mb: 1.5,
                }}
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
                    display: 'flex',
                    alignItems: 'center',
                    py: '12px',
                    textDecoration: 'none',
                    color: isActive(item.path) ? '#0A0A0A' : '#525252',
                    fontFamily: fontStack,
                    fontWeight: isActive(item.path) ? 600 : 400,
                    fontSize: '1rem',
                    letterSpacing: '-0.01em',
                    minHeight: 44,
                    transition: 'color 0.15s ease',
                    '&:hover': { color: '#0A0A0A' },
                    '&:focus-visible': {
                      outline: '2px solid #0A0A0A',
                      outlineOffset: '2px',
                    },
                  }}
                >
                  {item.label}
                </Box>
              ))}
            </Box>
          )}

          {/* Spacer */}
          <Box sx={{ flex: 1 }} />
        </Box>

        {/* Menu footer */}
        <Box
          sx={{
            px: '20px',
            py: '20px',
            borderTop: '1px solid #EBEBEB',
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              color: '#A3A3A3',
              fontFamily: fontStack,
              fontSize: '0.7rem',
              letterSpacing: '0.05em',
              fontWeight: 500,
            }}
          >
            &copy; {new Date().getFullYear()} {siteTitle}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
