import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Grid,
  IconButton,
  Chip,
  Collapse,
  Modal,
  Button,
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
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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
      display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, mt: { xs: 6, md: 8 },
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
    <Box sx={{ flex: 1, height: '1px', bgcolor: '#000', ml: 2 }} />
    {collapsible && (
      <Box sx={{ flexShrink: 0, color: '#000', display: 'flex' }}>
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>
    )}
  </Box>
);

export default function AboutPage({ data }) {
  const { about } = data;
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedCert]);

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Default all sections to expanded
  const isSectionExpanded = (key) => expandedSections[key] !== false;

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{
        bgcolor: '#fff', borderBottom: '1px solid #000',
        py: { xs: 4, md: 8 }, px: { xs: 2, md: 5 },
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
                bgcolor: '#000', fontSize: { xs: 40, md: 64 }, fontWeight: 700,
                color: '#fff',
                border: '2px solid #000',
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
                color: '#000', fontWeight: 400, mt: 1, fontSize: { xs: '0.95rem', md: '1.25rem' },
              }}>
                {about.introTitle}
              </Typography>
            )}
            {about.introDescription && (
              <Typography variant="body1" sx={{
                color: '#000', mt: 2, maxWidth: 600, lineHeight: 1.8, fontSize: { xs: '0.95rem', md: '1rem' },
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
                    border: '1px solid #000', minWidth: { xs: 100, md: 120 }, textAlign: 'center',
                  }}>
                    <Typography variant="h6" fontWeight={700} className="tabular-nums" sx={{ color: '#000', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                      {m.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#000', textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.65rem', fontWeight: 600 }}>
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
                      color: '#000', border: '1px solid #000',
                      width: 44, height: 44,
                      transition: 'all 0.2s ease',
                      '&:hover': { bgcolor: '#000', color: '#fff' },
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

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 5 } }}>
        {/* Bio */}
        {about.bio && (
          <Box sx={{ maxWidth: 800, mx: 'auto', mt: { xs: 2, md: 4 }, mb: 2 }}>
            <SectionHeader icon={<ArticleIcon fontSize="small" />}>About Me</SectionHeader>
            <Typography variant="body1" sx={{
              lineHeight: 2, color: '#000', whiteSpace: 'pre-line', fontSize: { xs: '0.95rem', md: '1.05rem' },
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
                  width: 2, bgcolor: '#000',
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
                    <Card sx={{ border: '1px solid #000', bgcolor: '#fff' }} variant="outlined">
                      <CardContent sx={{ p: { xs: 2, md: 3 }, '&:last-child': { pb: { xs: 2, md: 3 } } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
                              {exp.role}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#000', fontWeight: 500 }}>
                              {exp.company}
                            </Typography>
                          </Box>
                          <Chip label={exp.period} size="small" sx={{
                            bgcolor: '#fff', color: '#000', fontWeight: 600, fontSize: '0.7rem',
                            border: '1px solid #000',
                          }} />
                        </Box>
                        {exp.description && (
                          <Typography variant="body2" sx={{ mt: 1.5, color: '#000', lineHeight: 1.7 }}>
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
                    <Card sx={{ border: '1px solid #000', height: '100%' }} variant="outlined">
                      <CardContent sx={{ p: { xs: 2, md: 3 }, '&:last-child': { pb: { xs: 2, md: 3 } } }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <Box sx={{
                            width: 44, height: 44, bgcolor: '#000', color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <SchoolIcon sx={{ fontSize: 22 }} />
                          </Box>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>
                              {edu.degree}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#000' }}>
                              {edu.institution}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#000', fontWeight: 600 }}>
                              {edu.year}
                            </Typography>
                            {edu.details && (
                              <Typography variant="body2" sx={{ mt: 1.5, color: '#000', lineHeight: 1.7 }}>
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

        {/* Skills — no progress bars, use text-based matrix */}
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
                    <Box sx={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      py: 1.5, px: 2,
                      border: '1px solid #000',
                      minHeight: 44,
                    }}>
                      <Typography variant="body2" fontWeight={600}>
                        {skill.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#000', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {skill.level}
                      </Typography>
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
                {about.certifications.map((cert) => {
                  const hasMedia = !!cert.mediaUrl;
                  return (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cert.id}>
                      <Card
                        sx={{
                          border: '1px solid #000',
                          cursor: hasMedia ? 'pointer' : 'default',
                        }}
                        variant="outlined"
                        onClick={hasMedia ? () => setSelectedCert(cert) : undefined}
                        role={hasMedia ? 'button' : undefined}
                        tabIndex={hasMedia ? 0 : undefined}
                        onKeyDown={hasMedia ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedCert(cert); } } : undefined}
                      >
                        <CardContent sx={{ p: { xs: 2, md: 3 }, '&:last-child': { pb: { xs: 2, md: 3 } }, display: 'flex', alignItems: 'center', gap: 2, minHeight: 56 }}>
                          <Box sx={{
                            width: 38, height: 38, bgcolor: '#000', color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <VerifiedUserIcon sx={{ fontSize: 20 }} />
                          </Box>
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Typography variant="body2" fontWeight={700}>
                                {cert.title || cert.name}
                              </Typography>
                              {hasMedia && (
                                cert.mediaType === 'pdf'
                                  ? <PictureAsPdfIcon sx={{ fontSize: 16, color: '#000' }} />
                                  : <ImageIcon sx={{ fontSize: 16, color: '#000' }} />
                              )}
                            </Box>
                            {cert.issuer && (
                              <Typography variant="caption" sx={{ color: '#000', display: 'block' }}>
                                {cert.issuer}
                              </Typography>
                            )}
                            <Typography variant="caption" sx={{ color: '#000', fontWeight: 600 }}>
                              {cert.date || cert.year}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Collapse>
          </Box>
        )}

        {/* Certification Viewer Modal — strict B&W */}
        <Modal
          open={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          closeAfterTransition
          slotProps={{ backdrop: { sx: { bgcolor: '#fff' } } }}
        >
          <Box sx={{
            position: 'absolute',
            top: { xs: 0, md: '50%' },
            left: { xs: 0, md: '50%' },
            transform: { xs: 'none', md: 'translate(-50%, -50%)' },
            width: { xs: '100%', md: '90%' },
            maxWidth: { xs: '100%', md: 900 },
            height: { xs: '100%', md: 'auto' },
            maxHeight: { xs: '100%', md: '85vh' },
            bgcolor: '#fff',
            border: '2px solid #000',
            borderRadius: 0,
            display: 'flex',
            flexDirection: 'column',
            outline: 'none',
          }}>
            {/* Header */}
            <Box sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              px: { xs: 2, md: 3 }, py: 1.5,
              borderBottom: '1px solid #000', flexShrink: 0,
            }}>
              <Typography variant="subtitle1" fontWeight={700} noWrap sx={{ flex: 1, mr: 1 }}>
                {selectedCert?.title || selectedCert?.name}
              </Typography>
              <IconButton
                onClick={() => setSelectedCert(null)}
                aria-label="Close"
                sx={{ color: '#000', flexShrink: 0, border: '1px solid #000', borderRadius: 0, width: 40, height: 40 }}
                size="large"
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Body */}
            <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
              {selectedCert?.mediaType === 'pdf' ? (
                <iframe
                  src={selectedCert.mediaUrl}
                  title={selectedCert.title || selectedCert.name}
                  style={{ width: '100%', height: '100%', minHeight: 500, border: 'none', display: 'block' }}
                />
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                  <img
                    src={selectedCert?.mediaUrl}
                    alt={selectedCert?.title || selectedCert?.name}
                    style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }}
                  />
                </Box>
              )}
            </Box>

            {/* Footer */}
            <Box sx={{
              px: { xs: 2, md: 3 }, py: 2,
              borderTop: '1px solid #000', flexShrink: 0,
              display: 'flex', flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'stretch', md: 'center' },
              gap: 2,
            }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {selectedCert?.issuer && (
                  <Typography variant="body2">
                    <strong>Issuer:</strong> {selectedCert.issuer}
                  </Typography>
                )}
                {(selectedCert?.date || selectedCert?.year) && (
                  <Typography variant="body2">
                    <strong>Date:</strong> {selectedCert.date || selectedCert.year}
                  </Typography>
                )}
                {selectedCert?.credentialId && (
                  <Typography variant="body2">
                    <strong>Credential ID:</strong> {selectedCert.credentialId}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  href={selectedCert?.mediaUrl}
                  download
                  sx={{
                    borderColor: '#000', color: '#000', borderRadius: 0,
                    '&:hover': { bgcolor: '#000', color: '#fff', borderColor: '#000' },
                  }}
                >
                  Download
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<OpenInNewIcon />}
                  href={selectedCert?.mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: '#000', color: '#fff', borderRadius: 0, boxShadow: 'none',
                    '&:hover': { bgcolor: '#000', boxShadow: 'none' },
                  }}
                >
                  Open in new tab
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>

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
                    <Card sx={{ border: '1px solid #000', height: '100%' }} variant="outlined">
                      <CardContent sx={{ p: { xs: 2, md: 3 }, '&:last-child': { pb: { xs: 2, md: 3 } } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                          <EmojiEventsIcon sx={{ color: '#000', fontSize: 24 }} />
                          <Typography variant="subtitle2" fontWeight={700}>
                            {ach.title}
                          </Typography>
                        </Box>
                        {ach.description && (
                          <Typography variant="body2" sx={{ color: '#000', lineHeight: 1.7 }}>
                            {ach.description}
                          </Typography>
                        )}
                        {ach.year && (
                          <Typography variant="caption" sx={{ color: '#000', display: 'block', mt: 1.5, fontWeight: 600 }}>
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
              whiteSpace: 'pre-line', color: '#000', lineHeight: 1.8, fontSize: { xs: '0.95rem', md: '1rem' },
            }}>
              {section.content}
            </Typography>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
