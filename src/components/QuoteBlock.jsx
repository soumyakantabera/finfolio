import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

export default function QuoteBlock({ quotes, mode = 'featured' }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const displayQuotes = mode === 'featured'
    ? (quotes || []).filter((q) => q.featured)
    : (quotes || []).sort((a, b) => (a.order || 0) - (b.order || 0));

  useEffect(() => {
    if (mode === 'rotating' && displayQuotes.length > 1) {
      const timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % displayQuotes.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [mode, displayQuotes.length]);

  if (displayQuotes.length === 0) return null;

  const quote = mode === 'rotating' ? displayQuotes[activeIndex] : displayQuotes[0];
  if (!quote) return null;

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        borderTop: '1px solid #000',
        borderBottom: '1px solid #000',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        component="blockquote"
        sx={{
          fontFamily: '"Space Grotesk", "Sora", sans-serif',
          fontWeight: 500,
          fontStyle: 'normal',
          letterSpacing: '-0.01em',
          lineHeight: 1.4,
          maxWidth: 700,
          mx: 'auto',
          px: { xs: 1, sm: 2 },
          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2.125rem' },
          color: '#000',
          '&::before': { content: '"\\201C"', display: 'block', fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1, color: '#000', mb: 1 },
        }}
      >
        {quote.text}
      </Typography>
      {quote.attribution && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 2,
            color: '#000',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: 600,
          }}
        >
          — {quote.attribution}
        </Typography>
      )}
      {mode === 'rotating' && displayQuotes.length > 1 && (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 3 }}>
          {displayQuotes.map((_, i) => (
            <Box
              key={i}
              onClick={() => setActiveIndex(i)}
              sx={{
                width: 8,
                height: 8,
                bgcolor: i === activeIndex ? '#000' : '#fff',
                border: '1px solid #000',
                cursor: 'pointer',
                transition: 'none',
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
