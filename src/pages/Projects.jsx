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
              sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', '&:hover': { borderColor: '#000' }, transition: 'border-color 0.2s' }}
            >
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
