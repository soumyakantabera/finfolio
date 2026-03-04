import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function MobileProjects({ data }) {
  const projects = (data.projects || []).filter((p) => p.status !== 'draft');

  return (
    <Box sx={{ px: 'var(--page-pad-x)', py: 'var(--section-gap)' }}>
      <Typography
        variant="overline"
        sx={{ color: '#000', letterSpacing: '0.12em', display: 'block', mb: 0.5, fontWeight: 600, fontSize: '0.6rem', fontFamily: '"JetBrains Mono", "Menlo", monospace' }}
      >
        Gallery
      </Typography>
      <Typography
        component="h1"
        sx={{ fontFamily: '"Playfair Display", "Georgia", serif', fontWeight: 700, fontSize: '1.4rem', mb: 2 }}
      >
        Projects
      </Typography>

      {/* List view */}
      {projects.map((project, i, arr) => (
        <Box
          key={project.id}
          component={Link}
          to={`/projects/${project.slug}`}
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: 1.25,
            borderBottom: i < arr.length - 1 ? '1px solid #000' : 'none',
            textDecoration: 'none',
            color: '#000',
            minHeight: 48,
            '&:active': { pl: 0.5 },
            '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0, mr: 1 }}>
            <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#000', fontFamily: '"JetBrains Mono", "Menlo", monospace' }}>
              {project.category}
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.3 }}>
              {project.title}
            </Typography>
            {project.tags?.length > 0 && (
              <Box sx={{ display: 'flex', gap: 0.5, mt: 0.25 }}>
                {project.tags.slice(0, 2).map((tag) => (
                  <Typography key={tag} sx={{ fontSize: '0.6rem', color: '#000', border: '1px solid #000', px: 0.5, py: 0.125, lineHeight: 1.4, fontFamily: '"JetBrains Mono", "Menlo", monospace' }}>
                    {tag}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
          <Typography sx={{ color: '#000', fontWeight: 600, fontSize: '0.85rem', flexShrink: 0 }}>→</Typography>
        </Box>
      ))}

      {projects.length === 0 && (
        <Typography sx={{ mt: 3, textAlign: 'center', fontSize: '0.85rem' }}>
          No projects found.
        </Typography>
      )}
    </Box>
  );
}
