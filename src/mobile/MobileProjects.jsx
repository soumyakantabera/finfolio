import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const RESEARCH_CATEGORY = 'Research Papers';

export default function MobileProjects({ data }) {
  const allProjects = (data.projects || []).filter((p) => p.status !== 'draft');

  const categories = ['All', ...Array.from(
    new Set(allProjects.map((p) => p.category).filter(Boolean))
  ).sort((a, b) => {
    if (a === RESEARCH_CATEGORY) return 1;
    if (b === RESEARCH_CATEGORY) return -1;
    return a.localeCompare(b);
  })];

  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = activeTab === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === activeTab);

  return (
    <Box sx={{ px: 'var(--page-pad-x)', py: 'var(--section-gap)' }}>
      <Typography
        variant="overline"
        sx={{ color: '#000', letterSpacing: '0.12em', display: 'block', mb: 0.5, fontWeight: 600, fontSize: '0.6rem', fontFamily: '"Sora", "Helvetica", "Arial", sans-serif' }}
      >
        Gallery
      </Typography>
      <Typography
        component="h1"
        sx={{ fontFamily: '"Space Grotesk", "Helvetica", "Arial", sans-serif', fontWeight: 700, fontSize: '1.4rem', mb: 2 }}
      >
        Projects
      </Typography>

      {/* Category filter tabs */}
      {categories.length > 2 && (
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2, borderBottom: '1px solid #000', pb: 1.5 }}
          role="tablist"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => (
            <Box
              key={cat}
              component="button"
              role="tab"
              aria-selected={activeTab === cat}
              onClick={() => setActiveTab(cat)}
              sx={{
                fontFamily: '"Sora", "Helvetica", "Arial", sans-serif',
                fontSize: '0.65rem',
                fontWeight: activeTab === cat ? 700 : 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                background: activeTab === cat ? '#000' : 'transparent',
                color: activeTab === cat ? '#FFF' : '#000',
                border: '1px solid #000',
                px: 1,
                py: 0.5,
                cursor: 'pointer',
                minHeight: 30,
                '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
              }}
            >
              {cat}
            </Box>
          ))}
        </Box>
      )}

      {/* List view */}
      <Box sx={{ borderTop: '1px solid #000' }}>
        {filteredProjects.map((project) => (
          <Box
            key={project.id}
            sx={{ py: 1.5, borderBottom: '1px solid #000' }}
          >
            {/* Category + date */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.25 }}>
              <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#000', fontFamily: '"Sora", "Helvetica", "Arial", sans-serif' }}>
                {project.category}
              </Typography>
              {(project.date || project.year) && (
                <Typography sx={{ fontSize: '0.6rem', color: '#000', fontFamily: '"Sora", "Helvetica", "Arial", sans-serif' }}>
                  {project.date || project.year}
                </Typography>
              )}
            </Box>

            {/* Title */}
            <Typography component="h3" sx={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.3, mb: 0.5 }}>
              {project.title}
            </Typography>

            {/* Description */}
            {project.description && (
              <Typography sx={{ fontSize: '0.78rem', lineHeight: 1.5, color: '#000', mb: 0.75 }}>
                {project.description}
              </Typography>
            )}

            {/* Research paper metadata */}
            {project.category === RESEARCH_CATEGORY && project.publication && (
              <Typography sx={{ fontSize: '0.7rem', fontStyle: 'italic', color: '#000', mb: 0.25, fontFamily: '"Sora", "Helvetica", "Arial", sans-serif' }}>
                {project.publication}
              </Typography>
            )}
            {project.category === RESEARCH_CATEGORY && project.authors && (
              <Typography sx={{ fontSize: '0.7rem', color: '#000', mb: 0.5, fontFamily: '"Sora", "Helvetica", "Arial", sans-serif' }}>
                {project.authors}
              </Typography>
            )}

            {/* Tags */}
            {project.tags?.length > 0 && (
              <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, mb: 0.75, flexWrap: 'wrap' }}>
                {project.tags.slice(0, 3).map((tag) => (
                  <Typography key={tag} sx={{ fontSize: '0.6rem', color: '#000', border: '1px solid #000', px: 0.5, py: 0.125, lineHeight: 1.4, fontFamily: '"Sora", "Helvetica", "Arial", sans-serif' }}>
                    {tag}
                  </Typography>
                ))}
              </Box>
            )}

            {/* Always-visible action row */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {project.slug && (
                <Box
                  component={Link}
                  to={`/projects/${project.slug}`}
                  sx={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    bgcolor: '#000', color: '#FFF',
                    px: 1.25, py: 0.5, fontSize: '0.7rem', fontWeight: 600,
                    textDecoration: 'none', minHeight: 28,
                    fontFamily: '"Sora", "Helvetica", "Arial", sans-serif',
                    '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                  }}
                >
                  Details →
                </Box>
              )}
              {project.doi && (
                <Box
                  component="a"
                  href={project.doi.startsWith('http') ? project.doi : `https://doi.org/${project.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid #000', color: '#000',
                    px: 1.25, py: 0.5, fontSize: '0.7rem', fontWeight: 600,
                    textDecoration: 'none', minHeight: 28,
                    fontFamily: '"Sora", "Helvetica", "Arial", sans-serif',
                    '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                  }}
                >
                  DOI ↗
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      {filteredProjects.length === 0 && (
        <Typography sx={{ mt: 3, textAlign: 'center', fontSize: '0.85rem' }}>
          No projects found.
        </Typography>
      )}
    </Box>
  );
}
