import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Grid,
  LinearProgress,
  IconButton,
  Chip,
  Collapse,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import ArticleIcon from '@mui/icons-material/Article';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const levelValue = (level) => {
  switch (level) {
    case 'Expert': return 100;
    case 'Advanced': return 75;
    case 'Intermediate': return 50;
    case 'Beginner': return 25;
    default: return 50;
  }
};

const platformIcon = (platform) => {
  const p = platform?.toLowerCase() || '';
  if (p.includes('email') || p.includes('mail')) return <EmailIcon />;
  if (p.includes('linkedin')) return <LinkedInIcon />;
  if (p.includes('github')) return <GitHubIcon />;
  return <LanguageIcon />;
};

const SectionHeader = ({ icon, children, collapsible, expanded, onToggle }) => (
  <Box
    sx={{
      display: 'flex', alignItems: 'center', gap: 1.5, mb: 4, mt: { xs: 6, md: 10 },
      cursor: collapsible ? 'pointer' : 'default',
      minHeight: 44,
    }}
    onClick={collapsible ? onToggle : undefined}
    role={collapsible ? 'button' : undefined}
    tabIndex={collapsible ? 0 : undefined}
    aria-expanded={collapsible ? expanded : undefined}
    onKeyDown={collapsible ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } } : undefined}
  >
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: 40, height: 40, bgcolor: '#000', color: '#fff', flexShrink: 0,
    }}>
      {icon}
    </Box>
    <Typography variant="h5" fontWeight={700} sx={{ letterSpacing: '-0.02em', fontSize: { xs: '1.15rem', md: '1.5rem' } }}>
      {children}
    </Typography>
    <Box sx={{ flex: 1, height: '1px', bgcolor: '#e0e0e0', ml: 2 }} />
    {collapsible && (
      <Box sx={{ flexShrink: 0, color: '#999', display: 'flex' }}>
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>
    )}
  </Box>
);

const hoverCard = {
  transition: 'border-color 0.2s ease',
  border: '1px solid #e0e0e0',
  borderRadius: 0,
  '&:hover': { borderColor: '#000' },
};

export default function AboutPage({ data }) {
  const { about } = data;
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Default all sections to expanded
  const isSectionExpanded = (key) => expandedSections[key] !== false;

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{
        bgcolor: '#fafafa', borderBottom: '1px solid #eee',
        py: { xs: 5, md: 10 }, px: { xs: 2.5, sm: 2 },
      }}>
        <Container maxWidth="md">
          <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          }}>
            <Avatar
              src={about.profilePhoto || undefined}
              alt={about.name}
              sx={{
                width: { xs: 100, md: 160 }, height: { xs: 100, md: 160 },
                bgcolor: '#111', fontSize: { xs: 40, md: 64 }, fontWeight: 700,
                border: '4px solid #fff', boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                mb: 3, borderRadius: 0,
              }}
            >
              {about.name?.[0]}
            </Avatar>
            <Typography variant="h3" fontWeight={800} sx={{
              letterSpacing: '-0.03em', fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
            }}>
              {about.name}
            </Typography>
            {about.introTitle && (
              <Typography variant="h6" sx={{
                color: '#555', fontWeight: 400, mt: 1, fontSize: { xs: '0.95rem', md: '1.25rem' },
              }}>
                {about.introTitle}
              </Typography>
            )}
            {about.introDescription && (
              <Typography variant="body1" sx={{
                color: '#666', mt: 2, maxWidth: 600, lineHeight: 1.8, fontSize: { xs: '0.95rem', md: '1rem' },
              }}>
                {about.introDescription}
              </Typography>
            )}

            {/* Metrics */}
            {about.metrics?.length > 0 && (
              <Box sx={{
                display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: { xs: 1, md: 2 }, mt: 4,
              }}>
                {about.metrics.map((m) => (
                  <Box key={m.id} sx={{
                    px: { xs: 2, md: 3 }, py: 1.5, bgcolor: '#fff',
                    border: '1px solid #e0e0e0', minWidth: { xs: 100, md: 120 }, textAlign: 'center',
                  }}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#000', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                      {m.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#888', textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.65rem' }}>
                      {m.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* Contact Links */}
            {about.contactLinks?.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1, mt: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                {about.contactLinks.map((link) => (
                  <IconButton
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    sx={{
                      color: '#555', border: '1px solid #ddd',
                      width: 44, height: 44,
                      transition: 'all 0.2s ease',
                      '&:hover': { bgcolor: '#000', color: '#fff', borderColor: '#000' },
                    }}
                    size="small"
                  >
                    {platformIcon(link.platform)}
                  </IconButton>
                ))}
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, px: { xs: 2.5, sm: 3 } }}>
        {/* Bio */}
        {about.bio && (
          <Box sx={{ maxWidth: 800, mx: 'auto', mt: { xs: 2, md: 4 }, mb: 2 }}>
            <SectionHeader icon={<ArticleIcon fontSize="small" />}>About Me</SectionHeader>
            <Typography variant="body1" sx={{
              lineHeight: 2, color: '#444', whiteSpace: 'pre-line', fontSize: { xs: '0.95rem', md: '1.05rem' },
            }}>
              {about.bio}
            </Typography>
          </Box>
        )}

        {/* Experience Timeline */}
        {about.experience?.length > 0 && (
          <Box>
            <SectionHeader
              icon={<WorkIcon fontSize="small" />}
              collapsible
              expanded={isSectionExpanded('experience')}
              onToggle={() => toggleSection('experience')}
            >
              Experience
            </SectionHeader>
            <Collapse in={isSectionExpanded('experience')}>
              <Box sx={{ position: 'relative', pl: { xs: 3, md: 5 } }}>
                {/* Timeline line */}
                <Box sx={{
                  position: 'absolute', left: { xs: 10, md: 18 }, top: 8, bottom: 8,
                  width: 2, bgcolor: '#e0e0e0',
                }} />
                {about.experience.map((exp, idx) => (
                  <Box key={exp.id} sx={{
                    position: 'relative', mb: 3,
                    '&:last-child': { mb: 0 },
                  }}>
                    {/* Dot */}
                    <Box sx={{
                      position: 'absolute',
                      left: { xs: -22, md: -36 },
                      top: 20,
                      width: 14, height: 14,
                      bgcolor: idx === 0 ? '#000' : '#fff',
                      border: '3px solid #000',
                      zIndex: 1,
                    }} />
                    <Card sx={{ ...hoverCard, bgcolor: '#fff' }} variant="outlined">
                      <CardContent sx={{ p: { xs: 2, md: 3 }, '&:last-child': { pb: { xs: 2, md: 3 } } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
                              {exp.role}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#555', fontWeight: 500 }}>
                              {exp.company}
                            </Typography>
                          </Box>
                          <Chip label={exp.period} size="small" sx={{
                            bgcolor: '#f5f5f5', color: '#666', fontWeight: 500, fontSize: '0.7rem',
                          }} />
                        </Box>
                        {exp.description && (
                          <Typography variant="body2" sx={{ mt: 1.5, color: '#666', lineHeight: 1.7 }}>
                            {exp.description}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Box>
        )}

        {/* Education */}
        {about.education?.length > 0 && (
          <Box>
            <SectionHeader
              icon={<SchoolIcon fontSize="small" />}
              collapsible
              expanded={isSectionExpanded('education')}
              onToggle={() => toggleSection('education')}
            >
              Education
            </SectionHeader>
            <Collapse in={isSectionExpanded('education')}>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {about.education.map((edu) => (
                  <Grid size={{ xs: 12, md: 6 }} key={edu.id}>
                    <Card sx={{ ...hoverCard, height: '100%' }} variant="outlined">
                      <CardContent sx={{ p: { xs: 2, md: 3 }, '&:last-child': { pb: { xs: 2, md: 3 } } }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <Box sx={{
                            width: 44, height: 44, bgcolor: '#f5f5f5',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <SchoolIcon sx={{ color: '#333', fontSize: 22 }} />
                          </Box>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>
                              {edu.degree}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                              {edu.institution}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#999' }}>
                              {edu.year}
                            </Typography>
                            {edu.details && (
                              <Typography variant="body2" sx={{ mt: 1.5, color: '#555', lineHeight: 1.7 }}>
                                {edu.details}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Box>
        )}

        {/* Skills */}
        {about.skills?.length > 0 && (
          <Box>
            <SectionHeader
              icon={<CodeIcon fontSize="small" />}
              collapsible
              expanded={isSectionExpanded('skills')}
              onToggle={() => toggleSection('skills')}
            >
              Skills
            </SectionHeader>
            <Collapse in={isSectionExpanded('skills')}>
              <Grid container spacing={2}>
                {about.skills.map((skill) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={skill.id}>
                    <Box sx={{ mb: 1, minHeight: 44, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {skill.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#888' }}>
                          {skill.level}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={levelValue(skill.level)}
                        sx={{
                          height: 6, bgcolor: '#eee',
                          '& .MuiLinearProgress-bar': { bgcolor: '#000' },
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Box>
        )}

        {/* Certifications */}
        {about.certifications?.length > 0 && (
          <Box>
            <SectionHeader
              icon={<VerifiedUserIcon fontSize="small" />}
              collapsible
              expanded={isSectionExpanded('certifications')}
              onToggle={() => toggleSection('certifications')}
            >
              Certifications
            </SectionHeader>
            <Collapse in={isSectionExpanded('certifications')}>
              <Grid container spacing={2}>
                {about.certifications.map((cert) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cert.id}>
                    <Card sx={{ ...hoverCard }} variant="outlined">
                      <CardContent sx={{ p: { xs: 2, md: 2.5 }, '&:last-child': { pb: { xs: 2, md: 2.5 } }, display: 'flex', alignItems: 'center', gap: 2, minHeight: 56 }}>
                        <Box sx={{
                          width: 38, height: 38, bgcolor: '#f5f5f5',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <VerifiedUserIcon sx={{ color: '#333', fontSize: 20 }} />
                        </Box>
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography variant="body2" fontWeight={700}>
                            {cert.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#999' }}>
                            {cert.year}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Box>
        )}

        {/* Achievements */}
        {about.achievements?.length > 0 && (
          <Box>
            <SectionHeader
              icon={<EmojiEventsIcon fontSize="small" />}
              collapsible
              expanded={isSectionExpanded('achievements')}
              onToggle={() => toggleSection('achievements')}
            >
              Achievements
            </SectionHeader>
            <Collapse in={isSectionExpanded('achievements')}>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {about.achievements.map((ach) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ach.id}>
                    <Card sx={{ ...hoverCard, height: '100%' }} variant="outlined">
                      <CardContent sx={{ p: { xs: 2, md: 3 }, '&:last-child': { pb: { xs: 2, md: 3 } } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                          <EmojiEventsIcon sx={{ color: '#000', fontSize: 24 }} />
                          <Typography variant="subtitle2" fontWeight={700}>
                            {ach.title}
                          </Typography>
                        </Box>
                        {ach.description && (
                          <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.7 }}>
                            {ach.description}
                          </Typography>
                        )}
                        {ach.year && (
                          <Typography variant="caption" sx={{ color: '#999', display: 'block', mt: 1.5 }}>
                            {ach.year}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Box>
        )}

        {/* Additional Sections */}
        {about.additionalSections?.map((section) => (
          <Box key={section.id}>
            <SectionHeader icon={<ArticleIcon fontSize="small" />}>{section.title}</SectionHeader>
            <Typography variant="body1" sx={{
              whiteSpace: 'pre-line', color: '#444', lineHeight: 1.8, fontSize: { xs: '0.95rem', md: '1rem' },
            }}>
              {section.content}
            </Typography>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
