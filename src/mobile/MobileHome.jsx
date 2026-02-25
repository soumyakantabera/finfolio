import React, { useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import QuoteBlock from '../components/QuoteBlock';

export default function MobileHome({ data }) {
  const { home, projects, about, contact, quotes } = data;
  const allProjects = (projects || []).filter((p) => p.status !== 'draft');
  const featuredProjects = allProjects.filter((p) => p.featured);
  const [filter, setFilter] = useState('All');

  const categories = useMemo(
    () => ['All', ...new Set(allProjects.map((p) => p.category).filter(Boolean))],
    [allProjects]
  );

  const displayProjects = filter === 'All' ? allProjects : allProjects.filter((p) => p.category === filter);

  return (
    <Box>
      {/* ── 01 / Hero ── */}
      <Box sx={{ borderBottom: '1px solid #000', px: '14px', py: '20px' }}>
        <Typography
          variant="overline"
          sx={{ color: '#000', letterSpacing: '0.12em', mb: 1, display: 'block', fontWeight: 700, fontSize: '0.6rem' }}
        >
          01 / Introduction
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: '1.5rem',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            whiteSpace: 'pre-line',
            mb: 1,
          }}
        >
          {home.heroTitle}
        </Typography>
        <Typography
          sx={{
            color: '#000',
            fontWeight: 400,
            mb: 2,
            fontSize: '0.85rem',
            lineHeight: 1.5,
          }}
        >
          {home.heroSubtitle}
        </Typography>
        {home.ctaButtons?.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {home.ctaButtons.map((btn, i) => (
              <Box
                key={btn.id || i}
                component={RouterLink}
                to={btn.link}
                className="mobile-btn-press"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: i === 0 ? '#000' : '#fff',
                  color: i === 0 ? '#fff' : '#000',
                  border: '1px solid #000',
                  py: 1.25,
                  textDecoration: 'none',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  minHeight: 44,
                  '&:active': { transform: 'translate(1px, 1px)' },
                }}
              >
                {btn.label}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Snapshot — compact list */}
      <Box sx={{ borderBottom: '1px solid #000', px: '14px', py: '16px' }}>
        <Typography
          variant="overline"
          sx={{ color: '#000', letterSpacing: '0.12em', mb: 1, display: 'block', fontWeight: 700, fontSize: '0.6rem' }}
        >
          Snapshot
        </Typography>
        {[
          { label: 'Name', value: about?.name },
          { label: 'Role', value: home.snapshotRole || about?.introTitle },
          { label: 'Location', value: home.snapshotLocation || about?.address },
          { label: 'Availability', value: home.snapshotAvailability },
        ].filter((r) => r.value).map((row, i, arr) => (
          <Box
            key={row.label}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1,
              borderBottom: i < arr.length - 1 ? '1px dashed #000' : 'none',
              minHeight: 36,
            }}
          >
            <Typography sx={{ color: '#000', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, fontSize: '0.6rem' }}>
              {row.label}
            </Typography>
            <Typography sx={{ fontWeight: 500, fontSize: '0.8rem', textAlign: 'right' }}>
              {row.value}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ── 02 / Key Metrics ── */}
      {home.stats?.length > 0 && (
        <Box sx={{ borderBottom: '1px solid #000', px: '14px', py: '16px' }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 0,
          }}>
            {home.stats.map((stat, i) => (
              <Box
                key={stat.id || i}
                sx={{
                  textAlign: 'center',
                  py: 1.25,
                  borderRight: i % 2 === 0 ? '1px solid #000' : 'none',
                  borderBottom: i < home.stats.length - 2 ? '1px solid #000' : 'none',
                }}
              >
                <Typography
                  className="tabular-nums"
                  sx={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{ color: '#000', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, fontSize: '0.55rem' }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* ── 03 / Featured Work (compact list) ── */}
      {allProjects.length > 0 && (
        <Box sx={{ borderBottom: '1px solid #000', px: '14px', py: '20px' }}>
          <Typography
            variant="overline"
            sx={{ color: '#000', letterSpacing: '0.12em', display: 'block', mb: 0.5, fontWeight: 700, fontSize: '0.6rem' }}
          >
            03 / Work
          </Typography>
          <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: '1.15rem', mb: 1.5 }}>
            Featured Work
          </Typography>

          {/* Filters — horizontal scroll tabs, no pills */}
          {categories.length > 1 && (
            <Box
              sx={{
                display: 'flex',
                gap: 0,
                mb: 2,
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                mx: '-14px',
                px: '14px',
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              {categories.map((cat) => (
                <Box
                  key={cat}
                  component="button"
                  onClick={() => setFilter(cat)}
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    cursor: 'pointer',
                    border: 'none',
                    borderBottom: filter === cat ? '2px solid #000' : '2px solid transparent',
                    bgcolor: 'transparent',
                    color: '#000',
                    fontSize: '0.7rem',
                    fontWeight: filter === cat ? 700 : 500,
                    fontFamily: 'inherit',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    minHeight: 36,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                  }}
                >
                  {cat}
                </Box>
              ))}
            </Box>
          )}

          {/* Compact list items */}
          {displayProjects.slice(0, 6).map((project, i, arr) => (
            <Box
              key={project.id}
              component={RouterLink}
              to={`/projects/${project.slug}`}
              className="mobile-ink-link"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1.25,
                borderBottom: i < arr.length - 1 ? '1px dashed #000' : 'none',
                textDecoration: 'none',
                color: '#000',
                minHeight: 44,
                '&:active': { pl: 0.5 },
              }}
            >
              <Box sx={{ flex: 1, minWidth: 0, mr: 1 }}>
                <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#000' }}>
                  {project.category}
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.3 }}>
                  {project.title}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', lineHeight: 1.4, color: '#000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {project.description}
                </Typography>
              </Box>
              <Typography sx={{ color: '#000', fontWeight: 600, fontSize: '0.75rem', flexShrink: 0 }}>
                Details →
              </Typography>
            </Box>
          ))}

          <Box
            component={RouterLink}
            to="/projects"
            sx={{
              display: 'block',
              textAlign: 'center',
              mt: 2,
              color: '#000',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.8rem',
              py: 1,
              border: '1px solid #000',
              minHeight: 44,
              lineHeight: '28px',
              '&:active': { bgcolor: '#000', color: '#fff' },
            }}
          >
            View all projects →
          </Box>
        </Box>
      )}

      {/* ── 04 / Quote ── */}
      {quotes?.length > 0 && (
        <Box sx={{ px: '14px' }}>
          <QuoteBlock quotes={quotes} mode="featured" />
        </Box>
      )}

      {/* ── 05 / Highlights (simple list) ── */}
      {featuredProjects.length > 0 && (
        <Box sx={{ borderBottom: '1px solid #000', px: '14px', py: '20px' }}>
          <Typography
            variant="overline"
            sx={{ color: '#000', letterSpacing: '0.12em', display: 'block', mb: 0.5, fontWeight: 700, fontSize: '0.6rem' }}
          >
            05 / Highlights
          </Typography>
          <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: '1.15rem', mb: 1.5 }}>
            Notable Work
          </Typography>
          {featuredProjects.slice(0, 4).map((project, i, arr) => (
            <Box
              key={project.id}
              component={RouterLink}
              to={`/projects/${project.slug}`}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                py: 1.25,
                borderBottom: i < arr.length - 1 ? '1px dashed #000' : 'none',
                textDecoration: 'none',
                color: '#000',
                minHeight: 40,
                '&:active': { pl: 0.5 },
                '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
              }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{project.title}</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#000' }}>
                  {project.subtitle || project.description}
                </Typography>
              </Box>
              <Typography sx={{ color: '#000', fontWeight: 600, fontSize: '0.75rem', ml: 1, flexShrink: 0 }}>→</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* ── 06 / Custom Sections ── */}
      {home.customSections?.length > 0 && (
        <Box sx={{ borderBottom: '1px solid #000', px: '14px', py: '20px' }}>
          {home.customSections.map((section, i) => (
            <Box key={section.id || i} sx={{ mb: i < home.customSections.length - 1 ? 3 : 0 }}>
              <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: '1.15rem', mb: 1 }}>
                {section.title}
              </Typography>
              <Typography sx={{ whiteSpace: 'pre-line', fontSize: '0.85rem', lineHeight: 1.6 }}>
                {section.content}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* ── 07 / CTA Footer ── */}
      <Box sx={{ borderBottom: '1px solid #000', px: '14px', py: '24px', textAlign: 'center' }}>
        <Typography
          variant="overline"
          sx={{ color: '#000', letterSpacing: '0.12em', display: 'block', mb: 0.5, fontWeight: 700, fontSize: '0.6rem' }}
        >
          Get in touch
        </Typography>
        <Typography
          sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1.35rem', mb: 1 }}
        >
          Let&apos;s connect.
        </Typography>
        <Typography sx={{ mb: 2, fontSize: '0.85rem', lineHeight: 1.5, color: '#000' }}>
          Interested in working together? I&apos;d love to hear from you.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {contact?.email && (
            <Box
              component="a"
              href={`mailto:${contact.email}`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#000',
                color: '#fff',
                border: '1px solid #000',
                py: 1.25,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                minHeight: 44,
                '&:active': { transform: 'translate(1px, 1px)' },
              }}
            >
              Email me
            </Box>
          )}
          <Box
            component={RouterLink}
            to="/contact"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#fff',
              color: '#000',
              border: '1px solid #000',
              py: 1.25,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.8rem',
              minHeight: 44,
              '&:active': { bgcolor: '#000', color: '#fff' },
            }}
          >
            Contact page
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
