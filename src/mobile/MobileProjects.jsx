import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function MobileProjects({ data }) {
  const projects = (data.projects || []).filter((p) => p.status !== 'draft');
  const [filter, setFilter] = useState('All');

  const categories = useMemo(
    () => ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))],
    [projects]
  );

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <Box sx={{ px: '14px', py: '20px' }}>
      <Typography
        variant="overline"
        sx={{ color: '#000', letterSpacing: '0.12em', display: 'block', mb: 0.5, fontWeight: 700, fontSize: '0.6rem' }}
      >
        Gallery
      </Typography>
      <Typography
        component="h1"
        sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1.4rem', mb: 2 }}
      >
        Projects
      </Typography>

      {/* Compact horizontal tab bar */}
      {categories.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            gap: 0,
            mb: 2,
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            mx: '-14px',
            px: '14px',
            borderBottom: '1px solid #000',
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
                px: 1.5,
                py: 0.75,
                cursor: 'pointer',
                border: 'none',
                borderBottom: filter === cat ? '2px solid #000' : '2px solid transparent',
                bgcolor: 'transparent',
                color: '#000',
                fontSize: '0.7rem',
                fontWeight: filter === cat ? 700 : 500,
                fontFamily: 'inherit',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                minHeight: 36,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
              }}
            >
              {cat}
            </Box>
          ))}
        </Box>
      )}

      {/* List view */}
      {filtered.map((project, i, arr) => (
        <Box
          key={project.id}
          component={Link}
          to={`/projects/${project.slug}`}
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: 1.25,
            borderBottom: i < arr.length - 1 ? '1px dashed #000' : 'none',
            textDecoration: 'none',
            color: '#000',
            minHeight: 48,
            '&:active': { pl: 0.5 },
            '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0, mr: 1 }}>
            <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#000' }}>
              {project.category}
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.3 }}>
              {project.title}
            </Typography>
            {project.tags?.length > 0 && (
              <Box sx={{ display: 'flex', gap: 0.5, mt: 0.25 }}>
                {project.tags.slice(0, 2).map((tag) => (
                  <Typography key={tag} sx={{ fontSize: '0.6rem', color: '#000', border: '1px solid #000', px: 0.5, py: 0.125, lineHeight: 1.4 }}>
                    {tag}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
          <Typography sx={{ color: '#000', fontWeight: 600, fontSize: '0.85rem', flexShrink: 0 }}>→</Typography>
        </Box>
      ))}

      {filtered.length === 0 && (
        <Typography sx={{ mt: 3, textAlign: 'center', fontSize: '0.85rem' }}>
          No projects found in this category.
        </Typography>
      )}
    </Box>
  );
}
