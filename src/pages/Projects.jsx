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
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const EMBED_TYPES = ['pdf', 'gdocs', 'gsheets', 'github', 'chart'];

export default function ProjectsPage({ data }) {
  const projects = (data.projects || []).filter((p) => p.status !== 'draft');
  const [filter, setFilter] = useState('All');

  const categories = useMemo(
    () => ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))],
    [projects]
  );

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Projects
      </Typography>

      {/* Category Filters */}
      {categories.length > 1 && (
        <Box sx={{ mb: 4, overflowX: 'auto' }}>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(_, v) => v && setFilter(v)}
            size="small"
          >
            {categories.map((cat) => (
              <ToggleButton
                key={cat}
                value={cat}
                sx={{
                  textTransform: 'none',
                  '&.Mui-selected': { bgcolor: '#000', color: '#fff', '&:hover': { bgcolor: '#333' } },
                }}
              >
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      )}

      {/* Project Grid */}
      <Grid container spacing={3}>
        {filtered.map((project) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease',
                '&:hover': {
                  borderColor: '#000',
                  '& .project-card-accent': { transform: 'scaleX(1)' },
                  '& .project-card-reveal': { opacity: 1, transform: 'translateY(0)' },
                },
                '&:focus-within': { borderColor: '#000' },
              }}
            >
              {/* Animated top border accent */}
              <Box
                className="project-card-accent"
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
                  zIndex: 1,
                }}
              />
              {/* Thumbnail */}
              {project.thumbnail && (
                <Box
                  component="img"
                  src={project.thumbnail}
                  alt={project.title}
                  sx={{ width: '100%', height: 160, objectFit: 'cover' }}
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
                    bgcolor: 'rgba(255,255,255,0.9)',
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

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="overline" color="text.secondary">
                  {project.category}
                </Typography>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {project.title}
                </Typography>
                {project.subtitle && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {project.subtitle}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {project.description}
                </Typography>

                {/* Tags */}
                {project.tags?.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                    {project.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Box>
                )}

                {/* Tech Stack */}
                {project.techStack?.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Tech:&nbsp;
                    </Typography>
                    <Typography variant="caption">{project.techStack.join(', ')}</Typography>
                  </Box>
                )}
              </CardContent>

              {/* Hover-revealed metadata strip */}
              <Box
                className="project-card-reveal"
                sx={{
                  px: 2,
                  py: 1,
                  borderTop: '1px solid #f0f0f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
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
                {project.category && (
                  <Typography variant="caption" sx={{ color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    {project.category}
                  </Typography>
                )}
              </Box>

              {/* Links */}
              <CardActions sx={{ px: 2, pb: 2, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {project.links?.map((link, i) => (
                    <Button
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      sx={{ color: '#000', borderColor: '#000' }}
                      variant="outlined"
                    >
                      {link.label}
                    </Button>
                  ))}
                </Box>
                {project.slug && (
                  <Button
                    component={Link}
                    to={`/projects/${project.slug}`}
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ color: '#000', textTransform: 'none', fontWeight: 600 }}
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
        <Typography variant="body1" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
          No projects found in this category.
        </Typography>
      )}
    </Container>
  );
}
