import React from 'react';
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
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ProjectsPage({ data }) {
  const projects = (data.projects || []).filter((p) => p.status !== 'draft');

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 }, px: { xs: 2, md: 5 } }}>
      <Typography
        variant="overline"
        sx={{ color: '#555', letterSpacing: '0.15em', display: 'block', mb: 0.5, fontWeight: 600 }}
      >
        Gallery
      </Typography>
      <Typography variant="h3" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.75rem', md: '3rem' } }}>
        Projects
      </Typography>

      {/* Project Grid */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {projects.map((project) => (
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
                border: '1px solid #e0e0e0',
                '&:focus-within': { outline: '2px solid #111', outlineOffset: '2px' },
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
                    border: '1px solid #e0e0e0',
                    px: 1,
                    py: 0.25,
                  }}
                >
                  <StarIcon sx={{ fontSize: 16, color: '#111' }} />
                  <Typography variant="caption" fontWeight={600}>
                    Featured
                  </Typography>
                </Box>
              )}

              <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                <Typography variant="overline" sx={{ color: '#555', fontWeight: 600 }}>
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
                      <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderColor: '#e0e0e0', color: '#555' }} />
                    ))}
                  </Box>
                )}

                {/* Tech Stack */}
                {project.techStack?.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      Tech:&nbsp;
                    </Typography>
                    <Typography variant="caption">{project.techStack.join(', ')}</Typography>
                  </Box>
                )}

                {/* Research Paper metadata */}
                {project.category === 'Research Papers' && (
                  <Box sx={{ mt: 1 }}>
                    {project.publication && (
                      <Typography variant="caption" sx={{ display: 'block', fontStyle: 'italic', color: '#555', mb: 0.5 }}>
                        {project.publication}{project.year ? ` (${project.year})` : ''}
                      </Typography>
                    )}
                    {project.authors && (
                      <Typography variant="caption" sx={{ display: 'block', color: '#555', mb: 0.5 }}>
                        {project.authors}
                      </Typography>
                    )}
                  </Box>
                )}
              </CardContent>

              <CardActions sx={{ px: 2.5, pb: 2.5, pt: 1, justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, borderTop: '1px solid #eee' }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {project.category === 'Research Papers' ? (
                    <>
                      {project.pdfLink && (
                        <Button
                          href={project.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          sx={{ color: '#fff', bgcolor: '#111', minHeight: 44, '&:hover': { bgcolor: '#333' } }}
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
                          sx={{ color: '#111', borderColor: '#111', minHeight: 44 }}
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
                        sx={{ color: '#111', borderColor: '#111', minHeight: 44 }}
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
                    sx={{ color: '#111', textTransform: 'none', fontWeight: 600, minHeight: 44 }}
                  >
                    Details
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {projects.length === 0 && (
        <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
          No projects found.
        </Typography>
      )}
    </Container>
  );
}
