import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Box,
  useMediaQuery,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ProjectsPage({ data }) {
  const projects = (data.projects || []).filter((p) => p.status !== 'draft');
  const [filter, setFilter] = useState('All');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const categories = useMemo(
    () => ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))],
    [projects]
  );

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2.5, sm: 3 } }}>
      <Typography
        variant="overline"
        sx={{ color: '#000', letterSpacing: '0.15em', display: 'block', mb: 0.5, fontWeight: 700 }}
      >
        Gallery
      </Typography>
      <Typography variant="h3" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.75rem', md: '3rem' } }}>
        Projects
      </Typography>

      {/* Category Filters — strict B&W, horizontal scroll on mobile */}
      {categories.length > 1 && (
        <Box
          sx={{
            mb: { xs: 3, md: 4 },
            display: 'flex',
            gap: 1,
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            pb: 1,
            mx: { xs: -0.5, sm: 0 },
            px: { xs: 0.5, sm: 0 },
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
                px: 2,
                py: 1,
                cursor: 'pointer',
                border: '1px solid #000',
                bgcolor: filter === cat ? '#000' : '#fff',
                color: filter === cat ? '#fff' : '#000',
                fontSize: '0.75rem',
                fontWeight: 600,
                fontFamily: 'inherit',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                minHeight: 44,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: prefersReducedMotion ? 'none' : 'all 0.2s ease',
                '&:hover': { bgcolor: '#000', color: '#fff' },
                '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
              }}
            >
              {cat}
            </Box>
          ))}
        </Box>
      )}

      {/* Project Grid */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {filtered.map((project) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
            <Card
              variant="outlined"
              className="frame-shift"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid #000',
                '&:focus-within': { outline: '2px solid #000', outlineOffset: '2px' },
              }}
            >
              {/* Thumbnail */}
              {project.thumbnail && (
                <Box
                  component="img"
                  src={project.thumbnail}
                  alt={project.title}
                  sx={{ width: '100%', height: { xs: 140, sm: 160 }, objectFit: 'cover' }}
                />
              )}

              {/* Featured badge */}
              {project.featured && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    bgcolor: '#fff',
                    border: '1px solid #000',
                    px: 1,
                    py: 0.25,
                  }}
                >
                  <StarIcon sx={{ fontSize: 16, color: '#000' }} />
                  <Typography variant="caption" fontWeight={600}>
                    Featured
                  </Typography>
                </Box>
              )}

              <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2 } }}>
                <Typography variant="overline" sx={{ color: '#000', fontWeight: 700 }}>
                  {project.category}
                </Typography>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                  {project.title}
                </Typography>
                {project.subtitle && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {project.subtitle}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                  {project.description}
                </Typography>

                {/* Tags */}
                {project.tags?.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                    {project.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderColor: '#000', color: '#000' }} />
                    ))}
                  </Box>
                )}

                {/* Tech Stack */}
                {project.techStack?.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      Tech:&nbsp;
                    </Typography>
                    <Typography variant="caption">{project.techStack.join(', ')}</Typography>
                  </Box>
                )}

                {/* Research Paper metadata */}
                {project.category === 'Research Papers' && (
                  <Box sx={{ mt: 1 }}>
                    {project.publication && (
                      <Typography variant="caption" sx={{ display: 'block', fontStyle: 'italic', color: '#000', mb: 0.5 }}>
                        {project.publication}{project.year ? ` (${project.year})` : ''}
                      </Typography>
                    )}
                    {project.authors && (
                      <Typography variant="caption" sx={{ display: 'block', color: '#000', mb: 0.5 }}>
                        {project.authors}
                      </Typography>
                    )}
                  </Box>
                )}
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2, pt: 1, justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, borderTop: '1px dashed #000' }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {project.category === 'Research Papers' ? (
                    <>
                      {project.pdfLink && (
                        <Button
                          href={project.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          sx={{ color: '#fff', bgcolor: '#000', minHeight: 44, '&:hover': { bgcolor: '#000' } }}
                          variant="contained"
                        >
                          Read Paper
                        </Button>
                      )}
                      {project.doiLink && (
                        <Button
                          href={project.doiLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          sx={{ color: '#000', borderColor: '#000', minHeight: 44 }}
                          variant="outlined"
                        >
                          DOI
                        </Button>
                      )}
                    </>
                  ) : (
                    project.links?.map((link, i) => (
                      <Button
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{ color: '#000', borderColor: '#000', minHeight: 44 }}
                        variant="outlined"
                      >
                        {link.label}
                      </Button>
                    ))
                  )}
                </Box>
                {project.slug && (
                  <Button
                    component={Link}
                    to={`/projects/${project.slug}`}
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ color: '#000', textTransform: 'none', fontWeight: 600, minHeight: 44 }}
                  >
                    Details
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filtered.length === 0 && (
        <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
          No projects found in this category.
        </Typography>
      )}
    </Container>
  );
}
