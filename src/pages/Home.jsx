import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
} from '@mui/material';

export default function HomePage({ data }) {
  const { home, projects } = data;
  const featuredProjects = (projects || []).filter((p) => p.featured);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" fontWeight={700} gutterBottom>
          {home.heroTitle}
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {home.heroSubtitle}
        </Typography>
        {home.introText && (
          <Typography variant="body1" sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}>
            {home.introText}
          </Typography>
        )}

        {/* CTA Buttons */}
        {home.ctaButtons?.length > 0 && (
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
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
                  '&:hover': {
                    bgcolor: i === 0 ? '#333' : 'rgba(0,0,0,0.04)',
                    borderColor: '#000',
                  },
                }}
              >
                {btn.label}
              </Button>
            ))}
          </Box>
        )}
      </Box>

      {/* Stats Section */}
      {home.stats?.length > 0 && (
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={3} justifyContent="center">
            {home.stats.map((stat, i) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={stat.id || i}>
                <Card variant="outlined" sx={{ textAlign: 'center', py: 3 }}>
                  <CardContent>
                    <Typography variant="h3" fontWeight={700}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
            Featured Projects
          </Typography>
          <Grid container spacing={3}>
            {featuredProjects.map((project) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
                <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {project.tags?.map((tag) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Custom Sections */}
      {home.customSections?.map((section, i) => (
        <Box key={section.id || i} sx={{ mb: 6 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            {section.title}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {section.content}
          </Typography>
        </Box>
      ))}
    </Container>
  );
}
