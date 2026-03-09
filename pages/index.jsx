import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Chip,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Navbar from '../src/components/Navbar';
import QuoteBlock from '../src/components/QuoteBlock';
import BentoSnapshot from '../src/components/BentoSnapshot';
import { defaultData, loadData } from '../src/data/portfolioData';
import { motion } from 'framer-motion';

const serifFont = '"Manrope", "Helvetica", "Arial", sans-serif';
const accentFont = '"Manrope", "Helvetica", "Arial", sans-serif';

/* ── Staggered entrance animation for cards ── */
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function HomePage({ initialData }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const loaded = loadData();
    setData(loaded);
  }, []);

  const { home, projects, about, contact, quotes } = data;
  const allProjects = (projects || []).filter((p) => p.status !== 'draft');
  const featuredProjects = allProjects.filter((p) => p.featured);

  return (
    <>
      <Head><title>FinFolio</title></Head>
      <Navbar data={data} />
      <Box>
        {/* ── 01 / Hero ── */}
        <motion.div {...reveal}>
          <Box>
            <Container maxWidth="lg" sx={{ py: { xs: 5, md: 14 }, px: { xs: 2, md: 5 } }}>
              <Grid container spacing={{ xs: 2, md: 3 }} alignItems="flex-start">
                {/* Left: headline */}
                <Grid size={{ xs: 12, md: 7 }} sx={{ borderRight: { md: '1px solid #E0E0E0' }, pr: { md: 4 } }}>
                  <Typography
                    variant="overline"
                    sx={{ color: '#555', letterSpacing: '0.15em', mb: { xs: 1.5, md: 2 }, display: 'block', fontWeight: 500, fontFamily: accentFont, fontSize: { xs: '0.85rem', md: '1rem' } }}
                  >
                    01 / Introduction
                  </Typography>
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                      fontFamily: serifFont,
                      fontWeight: 700,
                      fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
                      letterSpacing: '-0.03em',
                      lineHeight: 1.15,
                      whiteSpace: 'pre-line',
                      mb: 2,
                      color: '#111',
                    }}
                  >
                    {home.heroTitle}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#111',
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
                    <Typography variant="body1" sx={{ color: '#111', maxWidth: 500, mb: 4, lineHeight: 1.7 }}>
                      {home.introText}
                    </Typography>
                  )}
                  {home.ctaButtons?.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      {home.ctaButtons.map((btn, i) => (
                        <Button
                          key={btn.id || i}
                          component={Link}
                          href={btn.link}
                          variant={i === 0 ? 'contained' : 'outlined'}
                          size="large"
                          sx={{
                            bgcolor: i === 0 ? '#000' : 'transparent',
                            color: i === 0 ? '#FFF' : '#000',
                            borderColor: '#000',
                            borderRadius: '8px',
                            boxShadow: 'none',
                            minHeight: 48,
                            px: { xs: 3, md: 4 },
                            '&:hover': {
                              bgcolor: '#000',
                              color: '#FFF',
                              borderColor: '#000',
                              boxShadow: 'none',
                            },
                          }}
                        >
                          {btn.label}
                        </Button>
                      ))}
                    </Box>
                  )}
                </Grid>

                {/* Right: Bento Grid snapshot */}
                <Grid size={{ xs: 12, md: 5 }}>
                  <BentoSnapshot home={home} about={about} contact={contact} />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </motion.div>

        {/* ── 02 / Key Metrics ── */}
        {home.stats?.length > 0 && (
          <motion.div {...reveal}>
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
                        borderRight: i < home.stats.length - 1 ? { sm: '1px solid #E0E0E0' } : 'none',
                        borderBottom: { xs: i < home.stats.length - 2 ? '1px solid #E0E0E0' : 'none', sm: 'none' },
                      }}
                    >
                      <Typography
                        variant="h3"
                        className="tabular-nums"
                        sx={{
                          fontFamily: serifFont,
                          fontWeight: 700,
                          fontSize: { xs: '1.5rem', md: '2.25rem' },
                          color: '#111',
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, fontSize: { xs: '0.65rem', md: '0.75rem' }, fontFamily: accentFont }}
                      >
                        {stat.label}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
          </motion.div>
        )}

        {/* ── 03 / Featured Work ── */}
        {allProjects.length > 0 && (
          <motion.div {...reveal}>
            <Box>
              <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 }, px: { xs: 2, md: 5 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: { xs: 3, md: 6 }, flexWrap: 'wrap', gap: 2 }}>
                  <Box>
                    <Typography
                      variant="overline"
                      sx={{ color: '#555', letterSpacing: '0.15em', display: 'block', mb: 0.5, fontWeight: 500, fontFamily: accentFont, fontSize: { xs: '0.85rem', md: '1rem' } }}
                    >
                      03 / Work
                    </Typography>
                    <Typography variant="h4" fontWeight={600} sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' }, fontFamily: serifFont, color: '#111' }}>
                      Featured Work
                    </Typography>
                  </Box>
                </Box>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  {allProjects.slice(0, 6).map((project, idx) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
                      <motion.div
                        custom={idx}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        whileHover={{
                          scale: 1.03,
                          rotateX: -1,
                          rotateY: 1.5,
                          boxShadow: '0 12px 40px rgba(0,0,0,0.10)',
                        }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        style={{ height: '100%', perspective: '800px', transformStyle: 'preserve-3d' }}
                      >
                        <Box
                          component={Link}
                          href={`/projects/${project.slug}`}
                          className="frame-shift"
                          sx={{
                            display: 'block',
                            textDecoration: 'none',
                            color: 'inherit',
                            border: '1px solid var(--c-border)',
                            borderRadius: 'var(--radius-lg)',
                            p: { xs: 2.5, md: 4 },
                            height: '100%',
                            position: 'relative',
                            overflow: 'hidden',
                            bgcolor: 'var(--c-surface)',
                            transition: 'background var(--transition-base), border-color var(--transition-base)',
                            '&:hover': {
                              bgcolor: 'var(--c-surface-hover)',
                              borderColor: 'var(--c-fg-muted)',
                            },
                            '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                          }}
                        >
                          <Typography
                            variant="overline"
                            sx={{ color: 'var(--c-fg-secondary)', display: 'block', mb: 1, fontWeight: 600, fontFamily: accentFont }}
                          >
                            {project.category}
                          </Typography>
                          <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.15rem', md: '1.5rem' }, fontFamily: serifFont, color: 'var(--c-fg)' }}>
                            {project.title}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, color: 'var(--c-fg)' }}>
                            {project.description}
                          </Typography>
                          {project.tags?.length > 0 && (
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                              {project.tags.map((tag) => (
                                <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderColor: 'var(--c-border)', color: 'var(--c-fg-secondary)', fontFamily: accentFont, borderRadius: '999px' }} />
                              ))}
                            </Box>
                          )}
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              pt: 2,
                              borderTop: '1px solid var(--c-border)',
                            }}
                          >
                            {project.date && (
                              <Typography variant="caption" sx={{ color: 'var(--c-fg-secondary)', fontFamily: accentFont }}>
                                {project.date}
                              </Typography>
                            )}
                            <Box
                              component="span"
                              sx={{
                                display: 'inline-block',
                                bgcolor: '#000',
                                color: '#FFF',
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                fontFamily: accentFont,
                                px: 1.5,
                                py: 0.5,
                                borderRadius: '999px',
                              }}
                            >
                              Details →
                            </Box>
                          </Box>
                        </Box>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ mt: 5, textAlign: 'center' }}>
                  <Button
                    component={Link}
                    href="/projects"
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ bgcolor: '#000', color: '#FFF', fontWeight: 600, minHeight: 48, borderRadius: '8px', boxShadow: 'none', px: 4, '&:hover': { bgcolor: '#222', boxShadow: 'none' } }}
                  >
                    View all projects
                  </Button>
                </Box>
              </Container>
            </Box>
          </motion.div>
        )}

        {/* ── 04 / Featured Quote ── */}
        {quotes?.length > 0 && (
          <motion.div {...reveal}>
            <Container maxWidth="lg" sx={{ px: { xs: 2, md: 5 } }}>
              <QuoteBlock quotes={quotes} mode="featured" />
            </Container>
          </motion.div>
        )}

        {/* ── 05 / Highlights ── */}
        {featuredProjects.length > 0 && (
          <motion.div {...reveal}>
            <Box>
              <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 }, px: { xs: 2, md: 5 } }}>
                <Typography
                  variant="overline"
                  sx={{ color: '#555', letterSpacing: '0.15em', display: 'block', mb: 0.5, fontWeight: 500, fontFamily: accentFont, fontSize: { xs: '0.85rem', md: '1rem' } }}
                >
                  05 / Highlights
                </Typography>
                <Typography variant="h4" fontWeight={600} sx={{ mb: { xs: 3, md: 5 }, fontSize: { xs: '1.5rem', md: '2.5rem' }, fontFamily: serifFont, color: '#111' }}>
                  Notable Work
                </Typography>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  {featuredProjects.slice(0, 4).map((project, i) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={project.id}>
                      <motion.div
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        whileHover={{
                          scale: 1.03,
                          rotateX: -1,
                          rotateY: 1.5,
                          boxShadow: '0 12px 40px rgba(0,0,0,0.10)',
                        }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        style={{ height: '100%', perspective: '800px', transformStyle: 'preserve-3d' }}
                      >
                        <Box
                          component={Link}
                          href={`/projects/${project.slug}`}
                          sx={{
                            display: 'block',
                            textDecoration: 'none',
                            color: 'inherit',
                            border: '1px solid var(--c-border)',
                            borderRadius: 'var(--radius-lg)',
                            p: { xs: 2.5, md: 4 },
                            height: '100%',
                            bgcolor: 'var(--c-surface)',
                            transition: 'background var(--transition-base), border-color var(--transition-base)',
                            '&:hover': {
                              bgcolor: 'var(--c-surface-hover)',
                              borderColor: 'var(--c-fg-muted)',
                            },
                            '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                          }}
                        >
                          <Typography variant="body1" fontWeight={700} sx={{ color: '#111', fontSize: { xs: '1.15rem', md: '1.35rem' }, fontFamily: serifFont, mb: 1 }}>
                            {project.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.6, mb: 2 }}>
                            {project.subtitle || project.description}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, borderTop: '1px solid var(--c-border)' }}>
                            {project.date && (
                              <Typography variant="caption" sx={{ color: 'var(--c-fg-secondary)', fontFamily: accentFont }}>
                                {project.date}
                              </Typography>
                            )}
                            <Box
                              component="span"
                              sx={{
                                display: 'inline-block',
                                bgcolor: '#000',
                                color: '#FFF',
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                fontFamily: accentFont,
                                px: 1.5,
                                py: 0.5,
                                borderRadius: '999px',
                              }}
                            >
                              Details →
                            </Box>
                          </Box>
                        </Box>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
          </motion.div>
        )}

        {/* ── 06 / Custom Sections ── */}
        {home.customSections?.length > 0 && (
          <motion.div {...reveal}>
            <Box>
              <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 }, px: { xs: 2, md: 5 } }}>
                {home.customSections.map((section, i) => (
                  <Box key={section.id || i} sx={{ mb: i < home.customSections.length - 1 ? 6 : 0 }}>
                    <Typography variant="h4" fontWeight={600} gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' }, fontFamily: serifFont, color: '#111' }}>
                      {section.title}
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line', maxWidth: 700, lineHeight: 1.7, color: '#111' }}>
                      {section.content}
                    </Typography>
                  </Box>
                ))}
              </Container>
            </Box>
          </motion.div>
        )}

        {/* ── 07 / CTA Footer ── */}
        <motion.div {...reveal}>
          <Box>
            <Container maxWidth="lg" sx={{ py: { xs: 5, md: 14 }, px: { xs: 2, md: 5 }, textAlign: 'center' }}>
              <Typography
                variant="overline"
                sx={{ color: '#555', letterSpacing: '0.15em', display: 'block', mb: 1, fontWeight: 500, fontFamily: accentFont, fontSize: { xs: '0.85rem', md: '1rem' } }}
              >
                Get in touch
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontFamily: serifFont, fontWeight: 700, mb: 2, fontSize: { xs: '2rem', md: '3.5rem' }, color: '#111' }}
              >
                Let&apos;s connect.
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, maxWidth: 500, mx: 'auto', lineHeight: 1.7, color: '#111' }}>
                Interested in working together, discussing markets, or just saying hello? I&apos;d love to hear from you.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                {contact?.email && (
                  <Button
                    href={`mailto:${contact.email}`}
                    variant="contained"
                    size="large"
                    sx={{ bgcolor: '#000', color: '#FFF', borderRadius: '8px', boxShadow: 'none', minHeight: 48, px: { xs: 3, md: 4 }, '&:hover': { bgcolor: '#000', boxShadow: 'none' } }}
                  >
                    Email me
                  </Button>
                )}
                <Button
                  component={Link}
                  href="/contact"
                  variant="outlined"
                  size="large"
                  sx={{ color: '#000', borderColor: '#000', borderRadius: '8px', boxShadow: 'none', minHeight: 48, px: { xs: 3, md: 4 }, '&:hover': { borderColor: '#000', bgcolor: '#000', color: '#FFF', boxShadow: 'none' } }}
                >
                  Contact page
                </Button>
              </Box>
            </Container>
          </Box>
        </motion.div>
      </Box>
    </>
  );
}

export function getStaticProps() {
  return { props: { initialData: defaultData } };
}
