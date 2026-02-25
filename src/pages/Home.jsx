import React, { useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Chip,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import QuoteBlock from '../components/QuoteBlock';

export default function HomePage({ data }) {
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
      <Box sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
            {/* Left: headline */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography
                variant="overline"
                sx={{ color: '#999', letterSpacing: '0.15em', mb: 2, display: 'block' }}
              >
                01 / Introduction
              </Typography>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  whiteSpace: 'pre-line',
                  mb: 2,
                }}
              >
                {home.heroTitle}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: '#555', fontWeight: 400, mb: 3, maxWidth: 500 }}
              >
                {home.heroSubtitle}
              </Typography>
              {home.introText && (
                <Typography variant="body1" sx={{ color: '#666', maxWidth: 500, mb: 4 }}>
                  {home.introText}
                </Typography>
              )}
              {home.ctaButtons?.length > 0 && (
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {home.ctaButtons.map((btn, i) => (
                    <Button
                      key={btn.id || i}
                      component={RouterLink}
                      to={btn.link}
                      variant={i === 0 ? 'contained' : 'outlined'}
                      size="large"
                      sx={{
                        bgcolor: i === 0 ? '#000' : 'transparent',
                        color: i === 0 ? '#fff' : '#000',
                        borderColor: '#000',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: i === 0 ? '#222' : '#000',
                          color: '#fff',
                          borderColor: '#000',
                          transform: 'translateY(-1px)',
                        },
                        '&:active': { transform: 'translateY(0)' },
                      }}
                    >
                      {btn.label}
                    </Button>
                  ))}
                </Box>
              )}
            </Grid>

            {/* Right: snapshot panel */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  border: '1px solid #e0e0e0',
                  p: { xs: 3, md: 4 },
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: '#999', letterSpacing: '0.15em', mb: 2, display: 'block' }}
                >
                  Snapshot
                </Typography>
                {[
                  { label: 'Name', value: about?.name },
                  { label: 'Role', value: home.snapshotRole || about?.introTitle },
                  { label: 'Location', value: home.snapshotLocation || about?.address },
                  { label: 'Availability', value: home.snapshotAvailability },
                ].filter((r) => r.value).map((row) => (
                  <Box
                    key={row.label}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      py: 1.5,
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                      {row.label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'right' }}>
                      {row.value}
                    </Typography>
                  </Box>
                ))}
                {/* Quick links */}
                {(contact?.linkedin || contact?.github || contact?.email) && (
                  <Box sx={{ mt: 2, display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                    {contact?.email && (
                      <Typography
                        component="a"
                        href={`mailto:${contact.email}`}
                        variant="caption"
                        sx={{ color: '#555', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s ease', borderBottom: '1px solid transparent', '&:hover': { color: '#000', borderBottom: '1px solid #000' } }}
                      >
                        Email
                      </Typography>
                    )}
                    {contact?.linkedin && (
                      <Typography
                        component="a"
                        href={contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="caption"
                        sx={{ color: '#555', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s ease', borderBottom: '1px solid transparent', '&:hover': { color: '#000', borderBottom: '1px solid #000' } }}
                      >
                        LinkedIn
                      </Typography>
                    )}
                    {contact?.github && (
                      <Typography
                        component="a"
                        href={contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="caption"
                        sx={{ color: '#555', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s ease', borderBottom: '1px solid transparent', '&:hover': { color: '#000', borderBottom: '1px solid #000' } }}
                      >
                        GitHub
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── 02 / Key Metrics ── */}
      {home.stats?.length > 0 && (
        <Box sx={{ borderBottom: '1px solid #e0e0e0' }}>
          <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
            <Grid container spacing={0}>
              {home.stats.map((stat, i) => (
                <Grid
                  size={{ xs: 6, sm: 3 }}
                  key={stat.id || i}
                  sx={{
                    textAlign: 'center',
                    py: 2,
                    borderRight: i < home.stats.length - 1 ? { sm: '1px solid #e0e0e0' } : 'none',
                    borderBottom: { xs: i < home.stats.length - 2 ? '1px solid #e0e0e0' : 'none', sm: 'none' },
                  }}
                >
                  <Typography
                    variant="h3"
                    className="tabular-nums"
                    sx={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 700,
                      fontSize: { xs: '1.75rem', md: '2.25rem' },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: '#888', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}
                  >
                    {stat.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* ── 03 / Featured Work ── */}
      {allProjects.length > 0 && (
        <Box sx={{ borderBottom: '1px solid #e0e0e0' }}>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4, flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography
                  variant="overline"
                  sx={{ color: '#999', letterSpacing: '0.15em', display: 'block', mb: 0.5 }}
                >
                  03 / Work
                </Typography>
                <Typography variant="h4" fontWeight={600}>
                  Featured Work
                </Typography>
              </Box>
              {categories.length > 1 && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {categories.map((cat) => (
                    <Box
                      key={cat}
                      onClick={() => setFilter(cat)}
                      sx={{
                        px: 2,
                        py: 0.5,
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: filter === cat ? '#000' : '#ddd',
                        bgcolor: filter === cat ? '#000' : 'transparent',
                        color: filter === cat ? '#fff' : '#555',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        transition: 'all 0.2s ease',
                        '&:hover': { borderColor: '#000', bgcolor: filter === cat ? '#000' : '#f5f5f5' },
                      }}
                    >
                      {cat}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
            <Grid container spacing={3}>
              {displayProjects.slice(0, 6).map((project) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
                  <Box
                    component={RouterLink}
                    to={`/projects/${project.slug}`}
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      border: '1px solid #e0e0e0',
                      p: 3,
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'border-color 0.2s ease',
                      '&:hover': {
                        borderColor: '#000',
                        '& .card-meta': { opacity: 1, transform: 'translateY(0)' },
                        '& .card-border-accent': { transform: 'scaleX(1)' },
                      },
                      '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                    }}
                  >
                    {/* Animated top border accent */}
                    <Box
                      className="card-border-accent"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        bgcolor: '#000',
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                    <Typography
                      variant="overline"
                      sx={{ color: '#999', display: 'block', mb: 1 }}
                    >
                      {project.category}
                    </Typography>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {project.description}
                    </Typography>
                    {project.tags?.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                        {project.tags.map((tag) => (
                          <Chip key={tag} label={tag} size="small" variant="outlined" />
                        ))}
                      </Box>
                    )}
                    {/* Hover-revealed metadata strip */}
                    <Box
                      className="card-meta"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pt: 2,
                        borderTop: '1px solid #f0f0f0',
                        opacity: 0,
                        transform: 'translateY(4px)',
                        transition: 'opacity 0.25s ease, transform 0.25s ease',
                      }}
                    >
                      {project.date && (
                        <Typography variant="caption" sx={{ color: '#999' }}>
                          {project.date}
                        </Typography>
                      )}
                      <Typography variant="caption" sx={{ color: '#000', fontWeight: 600 }}>
                        View →
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                component={RouterLink}
                to="/projects"
                endIcon={<ArrowForwardIcon />}
                sx={{ color: '#000', fontWeight: 600 }}
              >
                View all projects
              </Button>
            </Box>
          </Container>
        </Box>
      )}

      {/* ── 04 / Featured Quote ── */}
      {quotes?.length > 0 && (
        <Container maxWidth="lg">
          <QuoteBlock quotes={quotes} mode="featured" />
        </Container>
      )}

      {/* ── 05 / Highlights ── */}
      {featuredProjects.length > 0 && (
        <Box sx={{ borderBottom: '1px solid #e0e0e0' }}>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
            <Typography
              variant="overline"
              sx={{ color: '#999', letterSpacing: '0.15em', display: 'block', mb: 0.5 }}
            >
              05 / Highlights
            </Typography>
            <Typography variant="h4" fontWeight={600} sx={{ mb: 4 }}>
              Notable Work
            </Typography>
            {featuredProjects.slice(0, 4).map((project, i) => (
              <Box
                key={project.id}
                component={RouterLink}
                to={`/projects/${project.slug}`}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  py: 2,
                  borderBottom: i < featuredProjects.length - 1 ? '1px solid #f0f0f0' : 'none',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'padding-left 0.2s ease',
                  '&:hover': { pl: 1, '& .highlight-arrow': { opacity: 1 } },
                }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body1" fontWeight={600}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                    {project.subtitle || project.description}
                  </Typography>
                </Box>
                <Typography
                  className="highlight-arrow"
                  variant="caption"
                  sx={{ color: '#000', fontWeight: 600, ml: 2, opacity: 0, transition: 'opacity 0.2s ease', flexShrink: 0 }}
                >
                  →
                </Typography>
              </Box>
            ))}
          </Container>
        </Box>
      )}

      {/* ── 06 / Custom Sections ── */}
      {home.customSections?.length > 0 && (
        <Box sx={{ borderBottom: '1px solid #e0e0e0' }}>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
            {home.customSections.map((section, i) => (
              <Box key={section.id || i} sx={{ mb: i < home.customSections.length - 1 ? 6 : 0 }}>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  {section.title}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line', maxWidth: 700 }}>
                  {section.content}
                </Typography>
              </Box>
            ))}
          </Container>
        </Box>
      )}

      {/* ── 07 / CTA Footer ── */}
      <Box sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Typography
            variant="overline"
            sx={{ color: '#999', letterSpacing: '0.15em', display: 'block', mb: 1 }}
          >
            Get in touch
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: 2 }}
          >
            Let&apos;s connect.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
            Interested in working together, discussing markets, or just saying hello? I&apos;d love to hear from you.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {contact?.email && (
              <Button
                href={`mailto:${contact.email}`}
                variant="contained"
                size="large"
                sx={{ bgcolor: '#000', transition: 'all 0.2s ease', '&:hover': { bgcolor: '#222', transform: 'translateY(-1px)' }, '&:active': { transform: 'translateY(0)' } }}
              >
                Email me
              </Button>
            )}
            <Button
              component={RouterLink}
              to="/contact"
              variant="outlined"
              size="large"
              sx={{ color: '#000', borderColor: '#000', transition: 'all 0.2s ease', '&:hover': { borderColor: '#000', bgcolor: '#000', color: '#fff', transform: 'translateY(-1px)' }, '&:active': { transform: 'translateY(0)' } }}
            >
              Contact page
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
