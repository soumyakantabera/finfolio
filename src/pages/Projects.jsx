import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Chip, Box, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import LaunchIcon from '@mui/icons-material/Launch';

const serifFont = '"Space Grotesk", "Helvetica", "Arial", sans-serif';
const accentFont = '"Sora", "Helvetica", "Arial", sans-serif';

const RESEARCH_CATEGORY = 'Research Papers';

export default function ProjectsPage({ data }) {
  const allProjects = (data.projects || []).filter((p) => p.status !== 'draft');

  // Derive sorted unique categories; Research Papers always last if present
  const categories = ['All', ...Array.from(
    new Set(allProjects.map((p) => p.category).filter(Boolean))
  ).sort((a, b) => {
    if (a === RESEARCH_CATEGORY) return 1;
    if (b === RESEARCH_CATEGORY) return -1;
    return a.localeCompare(b);
  })];

  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = activeTab === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === activeTab);

  const isResearchTab = activeTab === RESEARCH_CATEGORY;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 }, px: { xs: 2, md: 5 } }}>
        {/* Section numbering */}
        <Typography
          sx={{
            fontFamily: accentFont,
            fontSize: { xs: '0.85rem', md: '1rem' },
            color: '#000000',
            letterSpacing: '0.1em',
            mb: 1,
          }}
        >
          01 / Gallery
        </Typography>

        {/* Page title */}
        <Typography
          variant="h2"
          sx={{
            fontFamily: serifFont,
            fontWeight: 700,
            fontSize: { xs: '2.5rem', md: '4.5rem' },
            color: '#000000',
            mb: { xs: 3, md: 4 },
            lineHeight: 1.1,
          }}
        >
          Projects
        </Typography>

        {/* Category filter tabs */}
        {categories.length > 2 && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mb: { xs: 4, md: 5 },
              borderBottom: '1px solid #000',
              pb: 2,
            }}
            role="tablist"
            aria-label="Filter projects by category"
          >
            {categories.map((cat) => (
              <Box
                key={cat}
                component="button"
                role="tab"
                aria-selected={activeTab === cat}
                onClick={() => setActiveTab(cat)}
                sx={{
                  fontFamily: accentFont,
                  fontSize: '0.75rem',
                  fontWeight: activeTab === cat ? 700 : 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  background: activeTab === cat ? '#000' : 'transparent',
                  color: activeTab === cat ? '#FFF' : '#000',
                  border: '1px solid #000',
                  px: 1.5,
                  py: 0.75,
                  cursor: 'pointer',
                  minHeight: 36,
                  '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                }}
              >
                {cat}
              </Box>
            ))}
          </Box>
        )}

        {/* Research Papers grid */}
        {isResearchTab ? (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {filteredProjects.map((project, index) => (
              <Grid key={project.id} size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.06 }}
                  style={{ height: '100%' }}
                >
                  <Box
                    sx={{
                      border: '1px solid #000',
                      p: { xs: 2.5, md: 3 },
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Category + date row */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
                      <Typography
                        sx={{ fontFamily: accentFont, fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000' }}
                      >
                        {project.category}
                      </Typography>
                      {(project.date || project.year) && (
                        <Typography sx={{ fontFamily: accentFont, fontSize: '0.7rem', color: '#000' }}>
                          {project.date || project.year}
                        </Typography>
                      )}
                    </Box>

                    {/* Title */}
                    <Typography
                      component="h3"
                      sx={{
                        fontFamily: serifFont,
                        fontWeight: 700,
                        fontSize: { xs: '1.15rem', md: '1.35rem' },
                        lineHeight: 1.25,
                        color: '#000',
                        mb: 0.75,
                      }}
                    >
                      {project.title}
                    </Typography>

                    {/* Publication info */}
                    {project.publication && (
                      <Typography sx={{ fontFamily: accentFont, fontSize: '0.8rem', fontStyle: 'italic', color: '#000', mb: 0.25 }}>
                        {project.publication}
                      </Typography>
                    )}
                    {project.authors && (
                      <Typography sx={{ fontFamily: accentFont, fontSize: '0.75rem', color: '#000', mb: 1 }}>
                        {project.authors}
                      </Typography>
                    )}

                    {/* Description */}
                    {project.description && (
                      <Typography sx={{ fontFamily: accentFont, fontSize: '0.85rem', lineHeight: 1.6, color: '#000', mb: 1.5, flex: 1 }}>
                        {project.description}
                      </Typography>
                    )}

                    {/* Tags */}
                    {project.tags?.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 2 }}>
                        {project.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{ fontFamily: accentFont, fontSize: '0.65rem', borderColor: '#000', color: '#000', borderRadius: 0, height: 22 }}
                          />
                        ))}
                      </Box>
                    )}

                    {/* Always-visible action buttons */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
                      {project.slug && (
                        <Button
                          component={Link}
                          to={`/projects/${project.slug}`}
                          variant="contained"
                          size="small"
                          sx={{
                            bgcolor: '#000', color: '#FFF', borderRadius: 0, boxShadow: 'none', minHeight: 36,
                            fontFamily: accentFont, fontSize: '0.75rem',
                            '&:hover': { bgcolor: '#000' },
                          }}
                        >
                          Details →
                        </Button>
                      )}
                      {project.doi && (
                        <Button
                          component="a"
                          href={project.doi.startsWith('http') ? project.doi : `https://doi.org/${project.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outlined"
                          size="small"
                          endIcon={<LaunchIcon sx={{ fontSize: '0.75rem !important' }} />}
                          sx={{
                            borderColor: '#000', color: '#000', borderRadius: 0, minHeight: 36,
                            fontFamily: accentFont, fontSize: '0.75rem',
                            '&:hover': { bgcolor: '#000', color: '#FFF', borderColor: '#000' },
                          }}
                        >
                          DOI
                        </Button>
                      )}
                      {project.links?.map((lnk) => (
                        <Button
                          key={lnk.label}
                          component="a"
                          href={lnk.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outlined"
                          size="small"
                          endIcon={<LaunchIcon sx={{ fontSize: '0.75rem !important' }} />}
                          sx={{
                            borderColor: '#000', color: '#000', borderRadius: 0, minHeight: 36,
                            fontFamily: accentFont, fontSize: '0.75rem',
                            '&:hover': { bgcolor: '#000', color: '#FFF', borderColor: '#000' },
                          }}
                        >
                          {lnk.label}
                        </Button>
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        ) : (
          /* Standard project grid */
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {filteredProjects.map((project, index) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.06 }}
                  style={{ height: '100%' }}
                >
                  <Box
                    sx={{
                      border: '1px solid #000',
                      p: { xs: 2.5, md: 3 },
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Category + date row */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
                      {project.category && (
                        <Typography
                          sx={{ fontFamily: accentFont, fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000' }}
                        >
                          {project.category}
                        </Typography>
                      )}
                      {(project.date || project.year) && (
                        <Typography sx={{ fontFamily: accentFont, fontSize: '0.7rem', color: '#000' }}>
                          {project.date || project.year}
                        </Typography>
                      )}
                    </Box>

                    {/* Title */}
                    <Typography
                      component="h3"
                      sx={{
                        fontFamily: serifFont,
                        fontWeight: 700,
                        fontSize: { xs: '1.15rem', md: '1.35rem' },
                        lineHeight: 1.25,
                        color: '#000',
                        mb: 0.5,
                      }}
                    >
                      {project.title}
                    </Typography>

                    {/* Description */}
                    {project.description && (
                      <Typography
                        sx={{
                          fontFamily: accentFont,
                          fontSize: '0.85rem',
                          lineHeight: 1.6,
                          color: '#000',
                          mb: 1.5,
                          flex: 1,
                        }}
                      >
                        {project.description}
                      </Typography>
                    )}

                    {/* Tags */}
                    {project.tags?.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 2 }}>
                        {project.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{ fontFamily: accentFont, fontSize: '0.65rem', borderColor: '#000', color: '#000', borderRadius: 0, height: 22 }}
                          />
                        ))}
                      </Box>
                    )}

                    {/* Always-visible action button */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
                      {project.slug && (
                        <Button
                          component={Link}
                          to={`/projects/${project.slug}`}
                          variant="contained"
                          size="small"
                          sx={{
                            bgcolor: '#000', color: '#FFF', borderRadius: 0, boxShadow: 'none', minHeight: 36,
                            fontFamily: accentFont, fontSize: '0.75rem',
                            '&:hover': { bgcolor: '#000' },
                          }}
                        >
                          Details →
                        </Button>
                      )}
                      {project.links?.slice(0, 1).map((lnk) => (
                        <Button
                          key={lnk.label}
                          component="a"
                          href={lnk.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outlined"
                          size="small"
                          endIcon={<LaunchIcon sx={{ fontSize: '0.75rem !important' }} />}
                          sx={{
                            borderColor: '#000', color: '#000', borderRadius: 0, minHeight: 36,
                            fontFamily: accentFont, fontSize: '0.75rem',
                            '&:hover': { bgcolor: '#000', color: '#FFF', borderColor: '#000' },
                          }}
                        >
                          {lnk.label}
                        </Button>
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {filteredProjects.length === 0 && (
          <Typography
            sx={{
              mt: 4,
              textAlign: 'center',
              fontFamily: accentFont,
              color: '#000000',
            }}
          >
            No projects found.
          </Typography>
        )}
      </Container>
    </motion.div>
  );
}
