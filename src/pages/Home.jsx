import React from 'react';
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

  return (
    <Box>
      {/* ── 01 / Hero ── */}
      <Box>
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 14 }, px: { xs: 2, md: 5 } }}>
          <Grid container spacing={{ xs: 2, md: 3 }} alignItems="flex-start">
            {/* Left: headline */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography
                variant="overline"
                sx={{ color: '#555', letterSpacing: '0.15em', mb: { xs: 1.5, md: 2 }, display: 'block', fontWeight: 600 }}
              >
                01 / Introduction
              </Typography>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
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
                sx={{
                  color: '#333',
                  fontWeight: 400,
                  mb: 3,
                  maxWidth: 500,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  lineHeight: 1.6,
                }}
              >
                {home.heroSubtitle}
              </Typography>
              {home.introText && (
                <Typography variant="body1" sx={{ color: '#444', maxWidth: 500, mb: 4, lineHeight: 1.7 }}>
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
                        bgcolor: i === 0 ? '#111' : 'transparent',
                        color: i === 0 ? '#fff' : '#111',
                        borderColor: '#111',
                        minHeight: 48,
                        px: { xs: 3, md: 4 },
                        '&:hover': {
                          bgcolor: '#111',
                          color: '#fff',
                          borderColor: '#111',
                        },
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
                  border: '1px solid #f0f0f0',
                  p: { xs: 2.5, md: 4 },
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: '#555', letterSpacing: '0.15em', mb: 2, display: 'block', fontWeight: 600 }}
                >
                  Snapshot
                </Typography>
                {[
                  { label: 'Name', value: about?.name },
                  { label: 'Role', value: home.snapshotRole || about?.introTitle },
                  { label: 'Last Course', value: about?.education?.[0] ? `${about.education[0].degree}, ${about.education[0].institution}` : undefined },
                  { label: 'Programming', value: about?.programmingLanguages },
                  { label: 'Languages', value: about?.languagesKnown },
                  { label: 'Location', value: home.snapshotLocation || about?.address },
                  { label: 'Availability', value: home.snapshotAvailability },
                ].filter((r) => r.value).map((row) => (
                  <Box
                    key={row.label}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 1.5,
                      borderBottom: '1px solid #f0f0f0',
                      minHeight: 44,
                    }}
                  >
                    <Typography variant="caption" sx={{ color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                      {row.label}
                    </Typography>
                    <Typography variant="body2" sx={{
                      fontWeight: ['Name', 'Last Course', 'Programming', 'Languages'].includes(row.label) ? 700 : 500,
                      fontSize: ['Name'].includes(row.label) ? '1.1rem' : ['Last Course', 'Programming', 'Languages'].includes(row.label) ? '0.95rem' : undefined,
                      textAlign: 'right',
                    }}>
                      {row.value}
                    </Typography>
                  </Box>
                ))}
                {/* Quick links */}
                {(contact?.linkedin || contact?.github || contact?.email) && (
                  <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {contact?.email && (
                      <Typography
                        component="a"
                        href={`mailto:${contact.email}`}
                        variant="caption"
                        className="ink-link"
                        sx={{ color: '#111', textDecoration: 'none', fontWeight: 600, py: 0.5, minHeight: 44, display: 'inline-flex', alignItems: 'center' }}
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
                        className="ink-link"
                        sx={{ color: '#111', textDecoration: 'none', fontWeight: 600, py: 0.5, minHeight: 44, display: 'inline-flex', alignItems: 'center' }}
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
                        className="ink-link"
                        sx={{ color: '#111', textDecoration: 'none', fontWeight: 600, py: 0.5, minHeight: 44, display: 'inline-flex', alignItems: 'center' }}
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
        <Box>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 }, px: { xs: 2, md: 5 } }}>
            <Grid container spacing={0}>
              {home.stats.map((stat, i) => (
                <Grid
                  size={{ xs: 6, sm: 3 }}
                  key={stat.id || i}
                  sx={{
                    textAlign: 'center',
                    py: 3,
                    borderRight: i < home.stats.length - 1 ? { sm: '1px solid #f0f0f0' } : 'none',
                    borderBottom: { xs: i < home.stats.length - 2 ? '1px solid #f0f0f0' : 'none', sm: 'none' },
                  }}
                >
                  <Typography
                    variant="h3"
                    className="tabular-nums"
                    sx={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 700,
                      fontSize: { xs: '1.5rem', md: '2.25rem' },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, fontSize: { xs: '0.65rem', md: '0.75rem' } }}
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
        <Box>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 }, px: { xs: 2, md: 5 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: { xs: 3, md: 6 }, flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography
                  variant="overline"
                  sx={{ color: '#555', letterSpacing: '0.15em', display: 'block', mb: 0.5, fontWeight: 600 }}
                >
                  03 / Work
                </Typography>
                <Typography variant="h4" fontWeight={600} sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
                  Featured Work
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {allProjects.slice(0, 6).map((project) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
                  <Box
                    component={RouterLink}
                    to={`/projects/${project.slug}`}
                    className="frame-shift"
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      border: '1px solid #f0f0f0',
                      p: { xs: 2.5, md: 4 },
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:focus-visible': { outline: '2px solid #111', outlineOffset: '2px' },
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{ color: '#555', display: 'block', mb: 1, fontWeight: 600 }}
                    >
                      {project.category}
                    </Typography>
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {project.description}
                    </Typography>
                    {project.tags?.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                        {project.tags.map((tag) => (
                          <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderColor: '#f0f0f0', color: '#555' }} />
                        ))}
                      </Box>
                    )}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pt: 2,
                        borderTop: '1px solid #f0f0f0',
                      }}
                    >
                      {project.date && (
                        <Typography variant="caption" sx={{ color: '#888' }}>
                          {project.date}
                        </Typography>
                      )}
                      <Typography variant="caption" sx={{ color: '#111', fontWeight: 600 }}>
                        Details →
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 5, textAlign: 'center' }}>
              <Button
                component={RouterLink}
                to="/projects"
                endIcon={<ArrowForwardIcon />}
                sx={{ color: '#111', fontWeight: 600, minHeight: 48 }}
              >
                View all projects
              </Button>
            </Box>
          </Container>
        </Box>
      )}

      {/* ── 04 / Featured Quote ── */}
      {quotes?.length > 0 && (
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 5 } }}>
          <QuoteBlock quotes={quotes} mode="featured" />
        </Container>
      )}

      {/* ── 05 / Highlights ── */}
      {featuredProjects.length > 0 && (
        <Box>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 }, px: { xs: 2, md: 5 } }}>
            <Typography
              variant="overline"
              sx={{ color: '#555', letterSpacing: '0.15em', display: 'block', mb: 0.5, fontWeight: 600 }}
            >
              05 / Highlights
            </Typography>
            <Typography variant="h4" fontWeight={600} sx={{ mb: { xs: 3, md: 5 }, fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
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
                  minHeight: 56,
                  borderBottom: i < featuredProjects.length - 1 ? '1px solid #f0f0f0' : 'none',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': { fontWeight: 700 },
                  '&:focus-visible': { outline: '2px solid #111', outlineOffset: '2px' },
                }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body1" fontWeight={600}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 400 }}>
                    {project.subtitle || project.description}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: '#111', fontWeight: 600, ml: 2, flexShrink: 0 }}
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
        <Box>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 }, px: { xs: 2, md: 5 } }}>
            {home.customSections.map((section, i) => (
              <Box key={section.id || i} sx={{ mb: i < home.customSections.length - 1 ? 6 : 0 }}>
                <Typography variant="h4" fontWeight={600} gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
                  {section.title}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line', maxWidth: 700, lineHeight: 1.7 }}>
                  {section.content}
                </Typography>
              </Box>
            ))}
          </Container>
        </Box>
      )}

      {/* ── 07 / CTA Footer ── */}
      <Box>
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 14 }, px: { xs: 2, md: 5 }, textAlign: 'center' }}>
          <Typography
            variant="overline"
            sx={{ color: '#555', letterSpacing: '0.15em', display: 'block', mb: 1, fontWeight: 600 }}
          >
            Get in touch
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: 2, fontSize: { xs: '2rem', md: '3.5rem' } }}
          >
            Let&apos;s connect.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 500, mx: 'auto', lineHeight: 1.7 }}>
            Interested in working together, discussing markets, or just saying hello? I&apos;d love to hear from you.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {contact?.email && (
              <Button
                href={`mailto:${contact.email}`}
                variant="contained"
                size="large"
                sx={{ bgcolor: '#111', minHeight: 48, px: { xs: 3, md: 4 }, '&:hover': { bgcolor: '#333' } }}
              >
                Email me
              </Button>
            )}
            <Button
              component={RouterLink}
              to="/contact"
              variant="outlined"
              size="large"
              sx={{ color: '#111', borderColor: '#111', minHeight: 48, px: { xs: 3, md: 4 }, '&:hover': { borderColor: '#111', bgcolor: '#111', color: '#fff' } }}
            >
              Contact page
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
