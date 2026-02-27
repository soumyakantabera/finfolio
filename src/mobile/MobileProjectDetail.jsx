import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import BlockRenderer from '../components/BlockRenderer';

function slugify(text) {
  return String(text).toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
}

function extractHeadings(blocks, markdownContent) {
  let mdContent = '';
  if (blocks?.length) {
    mdContent = blocks.filter(b => b.type === 'markdown').map(b => b.content).join('\n');
  } else {
    mdContent = markdownContent || '';
  }
  const headings = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(mdContent)) !== null) {
    headings.push({ level: match[1].length, text: match[2], id: slugify(match[2]) });
  }
  return headings;
}

export default function MobileProjectDetail({ data }) {
  const { slug } = useParams();
  const projects = data.projects || [];
  const project = projects.find((p) => p.slug === slug);
  const contentRef = useRef(null);
  const [tocOpen, setTocOpen] = useState(false);

  if (!project) {
    return (
      <Box sx={{ px: 'var(--page-pad-x)', py: 'var(--section-gap)', textAlign: 'center' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 1 }}>Project not found</Typography>
        <Typography sx={{ fontSize: '0.85rem', mb: 2 }}>
          The project you&apos;re looking for doesn&apos;t exist or has been removed.
        </Typography>
        <Box
          component={Link}
          to="/projects"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            border: '1px solid #000',
            color: '#000',
            textDecoration: 'none',
            px: 2,
            py: 1,
            fontSize: '0.8rem',
            fontWeight: 600,
            minHeight: 44,
          }}
        >
          ← Back to Projects
        </Box>
      </Box>
    );
  }

  const headings = extractHeadings(project.blocks, project.markdownContent);
  const showToc = headings.length >= 2;

  const githubLink = project.links?.find((l) => l.label?.toLowerCase().includes('github'));
  const docsLink = project.links?.find((l) => l.label?.toLowerCase().includes('doc'));

  const relatedProjects = project.relatedProjects?.length
    ? projects.filter((p) => project.relatedProjects.includes(p.slug))
    : [];

  return (
    <>
      {/* Sticky back row */}
      <Box
        sx={{
          position: 'sticky',
          top: 48,
          zIndex: 1100,
          bgcolor: '#fff',
          borderBottom: '1px solid #000',
          px: 'var(--page-pad-x)',
          py: 0.75,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          component={Link}
          to="/projects"
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: '#000',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 600,
            minHeight: 36,
            '&:active': { textDecoration: 'underline' },
          }}
        >
          ← Back to Projects
        </Box>
      </Box>

      <Box sx={{ px: 'var(--page-pad-x)', py: 'var(--section-gap)', pb: '80px' }}>
        {/* Hero image */}
        {project.heroImage && (
          <Box
            component="img"
            src={project.heroImage}
            alt={project.title}
            sx={{
              width: 'calc(100% + 2 * var(--page-pad-x))',
              ml: 'calc(-1 * var(--page-pad-x))',
              maxHeight: 200,
              objectFit: 'cover',
              mb: 2,
              display: 'block',
              border: '1px solid #000',
              borderLeft: 'none',
              borderRight: 'none',
            }}
          />
        )}

        {/* Header */}
        <Box sx={{ mb: 2 }}>
          {project.category && (
            <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', bgcolor: '#000', color: '#fff', display: 'inline-block', px: 0.75, py: 0.25, mb: 1 }}>
              {project.category}
            </Typography>
          )}
          <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1.3rem', lineHeight: 1.2 }}>
            {project.title}
          </Typography>
          {project.subtitle && (
            <Typography sx={{ mt: 0.5, fontSize: '0.85rem', lineHeight: 1.5 }}>
              {project.subtitle}
            </Typography>
          )}
          {project.date && (
            <Typography sx={{ mt: 0.5, fontSize: '0.7rem', fontWeight: 600 }}>{project.date}</Typography>
          )}
          {project.tags?.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
              {project.tags.map((tag) => (
                <Typography key={tag} sx={{ fontSize: '0.6rem', color: '#000', border: '1px solid #000', px: 0.5, py: 0.125 }}>
                  {tag}
                </Typography>
              ))}
            </Box>
          )}
        </Box>

        {/* Tech Stack + Links */}
        {(project.techStack?.length > 0 || project.links?.length > 0) && (
          <Box sx={{ mb: 2, pb: 2, borderBottom: '1px solid #000' }}>
            {project.techStack?.length > 0 && (
              <Box sx={{ mb: 1 }}>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tech Stack</Typography>
                <Typography sx={{ fontSize: '0.8rem' }}>{project.techStack.join(', ')}</Typography>
              </Box>
            )}
            {project.links?.length > 0 && (
              <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                {project.links.map((link, i) => (
                  <Box
                    key={i}
                    component="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#000',
                      border: '1px solid #000',
                      px: 1,
                      py: 0.5,
                      textDecoration: 'none',
                      minHeight: 36,
                      display: 'inline-flex',
                      alignItems: 'center',
                      '&:active': { bgcolor: '#000', color: '#fff' },
                    }}
                  >
                    {link.label}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* ToC */}
        {showToc && (
          <Box sx={{ mb: 2 }}>
            <Box
              component="button"
              onClick={() => setTocOpen((prev) => !prev)}
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#000',
                border: '1px solid #000',
                bgcolor: '#fff',
                px: 1.5,
                py: 1,
                fontWeight: 600,
                fontSize: '0.8rem',
                fontFamily: 'inherit',
                cursor: 'pointer',
                minHeight: 40,
                '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
              }}
            >
              Table of Contents
              <span>{tocOpen ? '−' : '+'}</span>
            </Box>
            <Collapse in={tocOpen}>
              <Box sx={{ border: '1px solid #000', borderTop: 0 }}>
                <List dense disablePadding>
                  {headings.map((h) => (
                    <ListItem key={h.id} disablePadding sx={{ pl: h.level === 3 ? 2 : 0 }}>
                      <ListItemButton
                        component="a"
                        href={`#${h.id}`}
                        sx={{ py: 0.5, borderRadius: 0 }}
                        onClick={() => setTocOpen(false)}
                      >
                        <ListItemText
                          primary={h.text}
                          primaryTypographyProps={{ fontSize: h.level === 3 ? '0.75rem' : '0.8rem' }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Collapse>
          </Box>
        )}

        {/* Main content */}
        <Box
          ref={contentRef}
          sx={{
            mb: 3,
            '& img': { maxWidth: '100%', height: 'auto', border: '1px solid #000' },
            '& iframe': { maxWidth: '100%', border: '1px solid #000' },
            '& pre': { overflow: 'auto', maxWidth: '100%', border: '1px solid #000', p: 1.5, fontSize: '0.75rem' },
          }}
        >
          <BlockRenderer
            blocks={project.blocks}
            markdownContent={project.markdownContent}
            embeds={project.embeds}
            config={data.config}
          />
        </Box>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <Box sx={{ borderTop: '1px solid #000', pt: 2 }}>
            <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1rem', mb: 1.5 }}>
              Related Projects
            </Typography>
            {relatedProjects.map((rp, i, arr) => (
              <Box
                key={rp.id}
                component={Link}
                to={`/projects/${rp.slug}`}
                sx={{
                  display: 'block',
                  py: 1.25,
                  borderBottom: i < arr.length - 1 ? '1px dashed #000' : 'none',
                  textDecoration: 'none',
                  color: '#000',
                  '&:active': { fontWeight: 700 },
                }}
              >
                {rp.category && (
                  <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {rp.category}
                  </Typography>
                )}
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{rp.title}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Bottom action bar */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: '#fff',
          borderTop: '1px solid #000',
          px: 'var(--page-pad-x)',
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1200,
          gap: 1,
        }}
      >
        <Box
          component={Link}
          to="/projects"
          sx={{
            color: '#000',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.75rem',
            minHeight: 40,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          ← Projects
        </Box>
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          {githubLink && (
            <Box
              component="a"
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#000',
                border: '1px solid #000',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.7rem',
                px: 1,
                py: 0.5,
                minHeight: 36,
                display: 'flex',
                alignItems: 'center',
                '&:active': { bgcolor: '#000', color: '#fff' },
              }}
            >
              GitHub
            </Box>
          )}
          {docsLink && (
            <Box
              component="a"
              href={docsLink.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#000',
                border: '1px solid #000',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.7rem',
                px: 1,
                py: 0.5,
                minHeight: 36,
                display: 'flex',
                alignItems: 'center',
                '&:active': { bgcolor: '#000', color: '#fff' },
              }}
            >
              Docs
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
