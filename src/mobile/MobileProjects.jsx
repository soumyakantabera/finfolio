import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function MobileProjects({ data }) {
  const projects = (data.projects || []).filter((p) => p.status !== 'draft');
  const [activeTab, setActiveTab] = useState('All');

  const categories = useMemo(() => {
    const cats = [...new Set(projects.map((p) => p.category).filter(Boolean))];
    return ['All', ...cats];
  }, [projects]);

  const filteredProjects = activeTab === 'All'
    ? projects
    : projects.filter((p) => p.category === activeTab);

  return (
    <Box sx={{ px: 'var(--page-pad-x)', py: 'var(--section-gap)' }}>
      <Typography
        variant="overline"
        sx={{ color: '#555', letterSpacing: '0.12em', display: 'block', mb: 0.5, fontWeight: 500, fontSize: '0.6rem', fontFamily: '"Sora", "Helvetica", "Arial", sans-serif' }}
      >
        Gallery
      </Typography>
      <Typography
        component="h1"
        sx={{ fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif', fontWeight: 700, fontSize: '1.4rem', mb: 2 }}
      >
        Projects
      </Typography>

      {/* Filter tabs */}
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2, pb: 1.5, borderBottom: '1px solid #E0E0E0' }}>
        {categories.map((cat) => (
          <Box
            key={cat}
            component="button"
            onClick={() => setActiveTab(cat)}
            sx={{
              fontFamily: '"Sora", "Helvetica", "Arial", sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: activeTab === cat ? '#FFF' : '#111',
              bgcolor: activeTab === cat ? '#000' : 'transparent',
              border: '1px solid #000',
              borderRadius: 0,
              px: 1,
              py: 0.5,
              minHeight: 32,
              cursor: 'pointer',
              '&:active': { bgcolor: '#000', color: '#FFF' },
              '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
            }}
          >
            {cat}
          </Box>
        ))}
      </Box>

      {/* List view */}
      {filteredProjects.map((project, i, arr) => (
        <Box
          key={project.id}
          sx={{
            py: 1.25,
            borderBottom: i < arr.length - 1 ? '1px solid #E0E0E0' : 'none',
          }}
        >
          <Box sx={{ mb: 0.75 }}>
            <Typography sx={{ fontSize: '0.6rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#555', fontFamily: '"Sora", "Helvetica", "Arial", sans-serif' }}>
              {project.category}
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.3 }}>
              {project.title}
            </Typography>
            {(project.description || project.subtitle) && (
              <Typography sx={{ fontSize: '0.75rem', lineHeight: 1.4, color: '#111', mt: 0.25, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {project.description || project.subtitle}
              </Typography>
            )}
            {project.tags?.length > 0 && (
              <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                {project.tags.slice(0, 3).map((tag) => (
                  <Typography key={tag} sx={{ fontSize: '0.6rem', color: '#555', border: '1px solid #E0E0E0', px: 0.5, py: 0.125, lineHeight: 1.4, fontFamily: '"Sora", "Helvetica", "Arial", sans-serif' }}>
                    {tag}
                  </Typography>
                ))}
              </Box>
            )}
            {/* Research paper metadata */}
            {project.category === 'Research Papers' && project.publication && (
              <Typography sx={{ fontSize: '0.65rem', fontStyle: 'italic', color: '#111', mt: 0.5 }}>
                {project.publication}{project.year ? ` (${project.year})` : ''}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {(project.date || project.year) && (
              <Typography sx={{ fontSize: '0.6rem', fontWeight: 500, color: '#555', fontFamily: '"Sora", "Helvetica", "Arial", sans-serif' }}>
                {project.date || project.year}
              </Typography>
            )}
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              {project.category === 'Research Papers' && project.doiLink && (
                <Box
                  component="a"
                  href={project.doiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    color: '#111',
                    border: '1px solid #000',
                    px: 0.75,
                    py: 0.25,
                    textDecoration: 'none',
                    minHeight: 28,
                    display: 'inline-flex',
                    alignItems: 'center',
                    '&:active': { bgcolor: '#000', color: '#FFF' },
                  }}
                >
                  DOI
                </Box>
              )}
              <Box
                component={Link}
                to={`/projects/${project.slug}`}
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#111',
                  textDecoration: 'none',
                  minHeight: 44,
                  display: 'inline-flex',
                  alignItems: 'center',
                  '&:active': { textDecoration: 'underline' },
                  '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                }}
              >
                Details →
              </Box>
            </Box>
          </Box>
        </Box>
      ))}

      {filteredProjects.length === 0 && (
        <Typography sx={{ mt: 3, textAlign: 'center', fontSize: '0.85rem' }}>
          No projects found.
        </Typography>
      )}
    </Box>
  );
}
