import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

const fontStack = '"Manrope", "Helvetica", "Arial", sans-serif';

/* ── Framer Motion helpers ── */
const tileVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/* ── Tile wrapper with 3D hover effect ── */
function BentoTile({ children, gridArea, index, sx = {} }) {
  return (
    <motion.div
      custom={index}
      variants={tileVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{
        scale: 1.02,
        rotateX: -2,
        rotateY: 2,
        boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      style={{
        gridArea,
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
    >
      <Box
        sx={{
          height: '100%',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--radius-lg)',
          bgcolor: 'var(--c-surface)',
          p: { xs: 2, md: 2.5 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transition: 'background var(--transition-base), box-shadow var(--transition-base)',
          '&:hover': {
            bgcolor: 'var(--c-surface-hover)',
          },
          ...sx,
        }}
      >
        {children}
      </Box>
    </motion.div>
  );
}

/**
 * BentoSnapshot — Bento Grid layout for the Snapshot section.
 *
 * Renders snapshot data (name, role, education, programming, languages,
 * location, availability, quick links) as individual animated tiles in a
 * responsive grid.
 */
export default function BentoSnapshot({ home, about, contact }) {
  const snapshotItems = [
    { key: 'name', label: 'Name', value: about?.name, area: 'name', featured: true },
    { key: 'role', label: 'Role', value: home?.snapshotRole || about?.introTitle, area: 'role', featured: true },
    {
      key: 'course',
      label: 'Last Course',
      value: about?.education?.[0]
        ? `${about.education[0].degree}, ${about.education[0].institution}`
        : undefined,
      area: 'course',
    },
    { key: 'programming', label: 'Programming', value: about?.programmingLanguages, area: 'prog' },
    { key: 'languages', label: 'Languages', value: about?.languagesKnown, area: 'lang' },
    { key: 'location', label: 'Location', value: home?.snapshotLocation || about?.address, area: 'loc' },
    { key: 'availability', label: 'Availability', value: home?.snapshotAvailability, area: 'avail' },
  ].filter((item) => item.value);

  const hasLinks = contact?.linkedin || contact?.github || contact?.email;

  return (
    <Box>
      <Typography
        variant="overline"
        sx={{
          color: 'var(--c-fg-secondary)',
          letterSpacing: '0.15em',
          mb: 2,
          display: 'block',
          fontWeight: 500,
          fontFamily: fontStack,
          fontSize: '0.85rem',
        }}
      >
        Snapshot
      </Typography>

      {/* Bento Grid container */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' },
          gridTemplateAreas: {
            xs: `
              "name name"
              "role role"
              "course course"
              "prog lang"
              "loc avail"
              ${hasLinks ? '"links links"' : ''}
            `,
            md: `
              "name name role"
              "course course prog"
              "lang loc avail"
              ${hasLinks ? '"links links links"' : ''}
            `,
          },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {snapshotItems.map((item, i) => (
          <BentoTile key={item.key} gridArea={item.area} index={i}>
            <Typography
              variant="caption"
              sx={{
                color: 'var(--c-fg-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 600,
                fontFamily: fontStack,
                fontSize: '0.65rem',
                mb: 0.5,
              }}
            >
              {item.label}
            </Typography>
            <Typography
              variant={item.featured ? 'body1' : 'body2'}
              sx={{
                fontWeight: item.featured ? 600 : 500,
                color: 'var(--c-fg)',
                lineHeight: 1.5,
                fontSize: item.featured ? { xs: '0.95rem', md: '1.05rem' } : undefined,
              }}
            >
              {item.value}
            </Typography>
          </BentoTile>
        ))}

        {/* Quick-links tile */}
        {hasLinks && (
          <BentoTile gridArea="links" index={snapshotItems.length}>
            <Typography
              variant="caption"
              sx={{
                color: 'var(--c-fg-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 600,
                fontFamily: fontStack,
                fontSize: '0.65rem',
                mb: 0.5,
              }}
            >
              Connect
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            {contact?.email && (
              <Typography
                component="a"
                href={`mailto:${contact.email}`}
                variant="caption"
                className="ink-link"
                sx={{
                  color: 'var(--c-fg)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontFamily: fontStack,
                  py: 0.5,
                  minHeight: 44,
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'opacity var(--transition-fast)',
                  '&:hover': { opacity: 0.7 },
                }}
              >
                Email ↗
              </Typography>
            )}
            {contact?.linkedin && (
              <Typography
                component="a"
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variant="caption"
                className="ink-link"
                sx={{
                  color: 'var(--c-fg)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontFamily: fontStack,
                  py: 0.5,
                  minHeight: 44,
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'opacity var(--transition-fast)',
                  '&:hover': { opacity: 0.7 },
                }}
              >
                LinkedIn ↗
              </Typography>
            )}
            {contact?.github && (
              <Typography
                component="a"
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="caption"
                className="ink-link"
                sx={{
                  color: 'var(--c-fg)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontFamily: fontStack,
                  py: 0.5,
                  minHeight: 44,
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'opacity var(--transition-fast)',
                  '&:hover': { opacity: 0.7 },
                }}
              >
                GitHub ↗
              </Typography>
            )}
            </Box>
          </BentoTile>
        )}
      </Box>
    </Box>
  );
}
