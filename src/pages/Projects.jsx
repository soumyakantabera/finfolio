import React, { useState, useMemo } from 'react';
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

const EMBED_TYPES = ['pdf', 'gdocs', 'gsheets', 'github', 'chart'];

export default function ProjectsPage({ data }) {
  const projects = data.projects || [];
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
              sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}
            >
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

                {/* Embed Preview */}
                {project.embedType && EMBED_TYPES.includes(project.embedType) && project.embedUrl && (
                  <Box sx={{ mt: 2, border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
                    <iframe
                      src={project.embedUrl}
                      title={project.title}
                      width="100%"
                      height="200"
                      style={{ border: 'none' }}
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </Box>
                )}
              </CardContent>

              {/* Links */}
              {project.links?.length > 0 && (
                <CardActions sx={{ px: 2, pb: 2 }}>
                  {project.links.map((link, i) => (
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
                </CardActions>
              )}
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
