import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Chip, Box } from '@mui/material';
import { motion } from 'framer-motion';

const serifFont = '"Space Grotesk", "Helvetica", "Arial", sans-serif';
const accentFont = '"Sora", "Helvetica", "Arial", sans-serif';

export default function ProjectsPage({ data }) {
  const projects = (data.projects || []).filter((p) => p.status !== 'draft');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
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
            mb: { xs: 4, md: 6 },
            lineHeight: 1.1,
          }}
        >
          Projects
        </Typography>

        {/* Top border for the list */}
        <Box sx={{ borderTop: '1px solid #000000' }}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
            >
              <Box
                component={project.slug ? Link : 'article'}
                to={project.slug ? `/projects/${project.slug}` : undefined}
                sx={{
                  display: 'block',
                  borderBottom: '1px solid #000000',
                  py: { xs: 2.5, md: 3.5 },
                  px: { xs: 1, md: 2 },
                  textDecoration: 'none',
                  color: '#000000',
                  cursor: project.slug ? 'pointer' : 'default',
                  '&:hover .project-title': {
                    transform: 'translateX(12px)',
                  },
                  '&:focus-within': { outline: '2px solid #000000', outlineOffset: '2px' },
                }}
              >
                {/* Metadata row: category, featured badge, date */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 0.5,
                    flexWrap: 'wrap',
                  }}
                >
                  {project.category && (
                    <Typography
                      sx={{
                        fontFamily: accentFont,
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#000000',
                      }}
                    >
                      {project.category}
                    </Typography>
                  )}
                  {project.featured && (
                    <Typography
                      sx={{
                        fontFamily: accentFont,
                        fontSize: '0.7rem',
                        color: '#000000',
                      }}
                    >
                      [Featured]
                    </Typography>
                  )}
                  {project.year && (
                    <Typography
                      sx={{
                        fontFamily: accentFont,
                        fontSize: '0.75rem',
                        color: '#000000',
                        ml: 'auto',
                      }}
                    >
                      {project.year}
                    </Typography>
                  )}
                </Box>

                {/* Project title */}
                <Typography
                  className="project-title"
                  sx={{
                    fontFamily: serifFont,
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '2.75rem' },
                    lineHeight: 1.15,
                    color: '#000000',
                    transition: 'transform 0.3s ease',
                    mb: 0.5,
                  }}
                >
                  {project.title}
                </Typography>

                {/* Subtitle */}
                {project.subtitle && (
                  <Typography
                    sx={{
                      fontFamily: serifFont,
                      fontSize: '1rem',
                      fontStyle: 'italic',
                      color: '#000000',
                      mb: 0.5,
                    }}
                  >
                    {project.subtitle}
                  </Typography>
                )}

                {/* Research Paper metadata */}
                {project.category === 'Research Papers' && (
                  <Box sx={{ mt: 0.5 }}>
                    {project.publication && (
                      <Typography
                        sx={{
                          fontFamily: accentFont,
                          fontSize: '0.75rem',
                          fontStyle: 'italic',
                          color: '#000000',
                        }}
                      >
                        {project.publication}{project.year ? ` (${project.year})` : ''}
                      </Typography>
                    )}
                    {project.authors && (
                      <Typography
                        sx={{
                          fontFamily: accentFont,
                          fontSize: '0.75rem',
                          color: '#000000',
                        }}
                      >
                        {project.authors}
                      </Typography>
                    )}
                  </Box>
                )}

                {/* Tags */}
                {project.tags?.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mt: 1 }}>
                    {project.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontFamily: accentFont,
                          fontSize: '0.65rem',
                          borderColor: '#000000',
                          color: '#000000',
                          borderRadius: 0,
                          height: 22,
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </motion.div>
          ))}
        </Box>

        {projects.length === 0 && (
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
