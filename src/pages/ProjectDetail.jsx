import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Chip,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MarkdownRenderer from '../components/MarkdownRenderer';
import EmbedBlock from '../components/EmbedBlock';

export default function ProjectDetail({ data }) {
  const { slug } = useParams();
  const projects = data.projects || [];
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center', px: { xs: 2.5, sm: 3 } }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Project not found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          The project you're looking for doesn't exist or has been removed.
        </Typography>
        <Button component={Link} to="/projects" variant="outlined" sx={{ color: '#000', borderColor: '#000', minHeight: 48 }}>
          ← Back to Projects
        </Button>
      </Container>
    );
  }

  const relatedProjects = project.relatedProjects?.length
    ? projects.filter((p) => project.relatedProjects.includes(p.slug))
    : [];

  // Determine action bar links
  const githubLink = project.links?.find((l) => l.label?.toLowerCase().includes('github'));
  const docsLink = project.links?.find((l) => l.label?.toLowerCase().includes('doc'));

  return (
    <>
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2.5, sm: 3 }, pb: { xs: 10, sm: 6 } }}>
        {/* Back navigation — hidden on mobile (bottom bar has it) */}
        <Button
          component={Link}
          to="/projects"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, color: '#000', textTransform: 'none', minHeight: 44, display: { xs: 'none', sm: 'inline-flex' } }}
        >
          Back to Projects
        </Button>

        {/* Hero image */}
        {project.heroImage && (
          <Box
            component="img"
            src={project.heroImage}
            alt={project.title}
            sx={{
              width: '100%',
              maxHeight: { xs: 240, md: 400 },
              objectFit: 'cover',
              mb: 4,
              display: 'block',
            }}
          />
        )}

        {/* Header section */}
        <Box sx={{ mb: 4 }}>
          {project.category && (
            <Chip
              label={project.category}
              size="small"
              sx={{ mb: 1.5, bgcolor: '#000', color: '#fff' }}
            />
          )}
          <Typography variant="h3" fontWeight={700} sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' } }}>
            {project.title}
          </Typography>
          {project.subtitle && (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1, lineHeight: 1.6 }}>
              {project.subtitle}
            </Typography>
          )}
          {project.date && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              {project.date}
            </Typography>
          )}
          {project.tags?.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 2 }}>
              {project.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Box>
          )}
        </Box>

        {/* Meta info row */}
        {(project.techStack?.length > 0 || project.links?.length > 0) && (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                flexWrap: 'wrap',
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                gap: 2,
                mb: 4,
              }}
            >
              {project.techStack?.length > 0 && (
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Tech Stack
                  </Typography>
                  <Typography variant="body2">
                    {project.techStack.join(', ')}
                  </Typography>
                </Box>
              )}
              {project.links?.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {project.links.map((link, i) => (
                    <Button
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      variant="outlined"
                      sx={{ color: '#000', borderColor: '#000', minHeight: 44 }}
                    >
                      {link.label}
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
            <Divider sx={{ mb: 4 }} />
          </>
        )}

        {/* Main content */}
        {project.markdownContent && (
          <Box sx={{ mb: 4 }}>
            <MarkdownRenderer content={project.markdownContent} />
          </Box>
        )}

        {project.embeds?.length > 0 && (
          <Box sx={{ mb: 4, '& iframe': { maxWidth: '100%' } }}>
            {project.embeds.map((embed) => (
              <Box key={embed.id} sx={{ mb: 3 }}>
                {embed.title && (
                  <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                    {embed.title}
                  </Typography>
                )}
                <EmbedBlock type={embed.type} url={embed.url} title={embed.title} />
              </Box>
            ))}
          </Box>
        )}

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <>
            <Divider sx={{ mb: 4 }} />
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3, fontSize: { xs: '1.15rem', md: '1.5rem' } }}>
              Related Projects
            </Typography>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {relatedProjects.map((rp) => (
                <Grid size={{ xs: 12, sm: 6 }} key={rp.id}>
                  <Card
                    variant="outlined"
                    component={Link}
                    to={`/projects/${rp.slug}`}
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block',
                      '&:hover': { borderColor: '#000' },
                      '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 2 } }}>
                      {rp.category && (
                        <Typography variant="overline" color="text.secondary">
                          {rp.category}
                        </Typography>
                      )}
                      <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                        {rp.title}
                      </Typography>
                      {rp.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {rp.description}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>

      {/* Sticky bottom action bar — mobile only */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: '#fff',
          borderTop: '1px solid #e0e0e0',
          px: 2,
          py: 1.5,
          gap: 1,
          zIndex: 1200,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          component={Link}
          to="/projects"
          size="small"
          sx={{
            color: '#000',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.8rem',
            minHeight: 44,
            px: 1.5,
          }}
        >
          ← Projects
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {githubLink && (
            <Button
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="outlined"
              sx={{
                color: '#000',
                borderColor: '#e0e0e0',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                minHeight: 44,
                px: 1.5,
              }}
            >
              GitHub
            </Button>
          )}
          {docsLink && (
            <Button
              href={docsLink.url}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="outlined"
              sx={{
                color: '#000',
                borderColor: '#e0e0e0',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                minHeight: 44,
                px: 1.5,
              }}
            >
              Docs
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}
