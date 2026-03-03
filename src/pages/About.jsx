import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Avatar,
  Grid,
  IconButton,
  Chip,
  Collapse,
  Modal,
  Button,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
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
    setExpandedSections((prev) => ({ ...prev, [key]: prev[key] === false }));
  };

  const isSectionExpanded = (key) => expandedSections[key] !== false;

  const SectionHeading = ({ number, title, collapsible, sectionKey }) => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        mb: { xs: 3, md: 5 },
        flexWrap: 'wrap',
        gap: 2,
        cursor: collapsible ? 'pointer' : 'default',
        minHeight: 44,
      }}
      onClick={collapsible ? () => toggleSection(sectionKey) : undefined}
      role={collapsible ? 'button' : undefined}
      tabIndex={collapsible ? 0 : undefined}
      aria-expanded={collapsible ? isSectionExpanded(sectionKey) : undefined}
      onKeyDown={collapsible ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(sectionKey); } } : undefined}
    >
      <Box>
        {number && (
          <Typography
            variant="overline"
            sx={{ color: '#555', letterSpacing: '0.15em', display: 'block', mb: 0.5, fontWeight: 600 }}
          >
            {number}
          </Typography>
        )}
        <Typography variant="h4" fontWeight={600} sx={{ fontSize: { xs: '1.35rem', md: '2.125rem' } }}>
          {title}
        </Typography>
      </Box>
      {collapsible && (
        <Box sx={{ color: '#555', display: 'flex', alignItems: 'center' }}>
          {isSectionExpanded(sectionKey) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
      )}
    </Box>
  );

  return (
    <Box>
      {/* ── 01 / Hero ── */}
      <Box>
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 }, px: { xs: 2, md: 5 } }}>
          <Grid container spacing={{ xs: 2, md: 3 }} alignItems="flex-start">
            {/* Left: headline */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography
                variant="overline"
                sx={{ color: '#555', letterSpacing: '0.15em', mb: { xs: 1.5, md: 2 }, display: 'block', fontWeight: 600 }}
              >
                01 / About
              </Typography>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  mb: 2,
                }}
              >
                {about.name}
              </Typography>
              {about.introTitle && (
                <Typography
                  variant="h6"
                  sx={{ color: '#333', fontWeight: 400, mb: 2, fontSize: { xs: '1rem', md: '1.25rem' }, lineHeight: 1.6 }}
                >
                  {about.introTitle}
                </Typography>
              )}
              {about.introDescription && (
                <Typography variant="body1" sx={{ color: '#444', maxWidth: 500, mb: 3, lineHeight: 1.7 }}>
                  {about.introDescription}
                </Typography>
              )}
              {/* Contact Links */}
              {about.contactLinks?.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                  {about.contactLinks.map((link) => (
                    <IconButton
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      sx={{
                        color: '#111', border: '1px solid #eee',
                        width: 44, height: 44,
                        '&:hover': { bgcolor: '#111', color: '#fff', borderColor: '#111' },
                      }}
                      size="small"
                    >
                      {platformIcon(link.platform)}
                    </IconButton>
                  ))}
                </Box>
              )}
            </Grid>

            {/* Right: profile card */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ border: '1px solid #eee', p: { xs: 2.5, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar
                    src={about.profilePhoto || undefined}
                    alt={about.name}
                    sx={{
                      width: 64, height: 64,
                      bgcolor: '#111', fontSize: 28, fontWeight: 700,
                      color: '#fff', border: '1px solid #eee',
                    }}
                  >
                    {about.name?.[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>{about.name}</Typography>
                    {about.introTitle && (
                      <Typography variant="body2" sx={{ color: '#555' }}>{about.introTitle}</Typography>
                    )}
                  </Box>
                </Box>
                {/* Metrics */}
                {about.metrics?.length > 0 && (
                  <Box>
                    <Typography
                      variant="overline"
                      sx={{ color: '#555', letterSpacing: '0.15em', mb: 1.5, display: 'block', fontWeight: 600 }}
                    >
                      At a glance
                    </Typography>
                    {about.metrics.map((m, i) => (
                      <Box
                        key={m.id}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          py: 1.5,
                          borderBottom: i < about.metrics.length - 1 ? '1px solid #eee' : 'none',
                          minHeight: 44,
                        }}
                      >
                        <Typography variant="caption" sx={{ color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                          {m.label}
                        </Typography>
                        <Typography variant="body2" className="tabular-nums" sx={{ fontWeight: 600 }}>
                          {m.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── 02 / Bio ── */}
      {about.bio && (
        <Box>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 }, px: { xs: 2, md: 5 } }}>
            <SectionHeading number="02 / Bio" title="About Me" />
            <Typography variant="body1" sx={{
              lineHeight: 1.8, color: '#444', whiteSpace: 'pre-line', maxWidth: 700,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
            }}>
              {about.bio}
            </Typography>
          </Container>
        </Box>
      )}

      {/* ── 03 / Experience ── */}
      {about.experience?.length > 0 && (
        <Box>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 }, px: { xs: 2, md: 5 } }}>
            <SectionHeading
              number="03 / Experience"
              title="Experience"
              collapsible
              sectionKey="experience"
            />
            <Collapse in={isSectionExpanded('experience')}>
              {about.experience.map((exp, idx) => (
                <Box
                  key={exp.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: 1,
                    py: 2.5,
                    borderBottom: idx < about.experience.length - 1 ? '1px solid #eee' : 'none',
                    minHeight: 56,
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body1" fontWeight={600}>
                      {exp.role}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555', mt: 0.5 }}>
                      {exp.company}
                    </Typography>
                    {exp.description && (
                      <Typography variant="body2" sx={{ mt: 1.5, color: '#444', lineHeight: 1.7 }}>
                        {exp.description}
                      </Typography>
                    )}
                  </Box>
                  <Chip label={exp.period} size="small" sx={{
                    bgcolor: '#fff', color: '#555', fontWeight: 600, fontSize: '0.7rem',
                    border: '1px solid #eee',
                  }} />
                </Box>
              ))}
            </Collapse>
          </Container>
        </Box>
      )}

      {/* ── 04 / Education ── */}
      {about.education?.length > 0 && (
        <Box>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 }, px: { xs: 2, md: 5 } }}>
            <SectionHeading
              number="04 / Education"
              title="Education"
              collapsible
              sectionKey="education"
            />
            <Collapse in={isSectionExpanded('education')}>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {about.education.map((edu) => (
                  <Grid size={{ xs: 12, md: 6 }} key={edu.id}>
                    <Box sx={{ border: '1px solid #eee', p: { xs: 2.5, md: 3 }, height: '100%' }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {edu.degree}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#555', mt: 0.5 }}>
                        {edu.institution}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#555', fontWeight: 600, display: 'block', mt: 0.5 }}>
                        {edu.year}
                      </Typography>
                      {edu.details && (
                        <Typography variant="body2" sx={{ mt: 1.5, color: '#444', lineHeight: 1.7 }}>
                          {edu.details}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Container>
        </Box>
      )}

      {/* ── 05 / Skills ── */}
      {about.skills?.length > 0 && (
        <Box>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 }, px: { xs: 2, md: 5 } }}>
            <SectionHeading
              number="05 / Skills"
              title="Skills"
              collapsible
              sectionKey="skills"
            />
            <Collapse in={isSectionExpanded('skills')}>
              <Grid container spacing={2}>
                {about.skills.map((skill) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={skill.id}>
                    <Box sx={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      py: 1.5, px: 2,
                      border: '1px solid #eee',
                      minHeight: 44,
                    }}>
                      <Typography variant="body2" fontWeight={600}>
                        {skill.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {skill.level}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Container>
        </Box>
      )}

      {/* ── 06 / Certifications ── */}
      {about.certifications?.length > 0 && (
        <Box>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 }, px: { xs: 2, md: 5 } }}>
            <SectionHeading
              number="06 / Certifications"
              title="Certifications"
              collapsible
              sectionKey="certifications"
            />
            <Collapse in={isSectionExpanded('certifications')}>
              <Grid container spacing={2}>
                {about.certifications.map((cert) => {
                  const hasMedia = !!cert.mediaUrl;
                  return (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cert.id}>
                      <Box
                        sx={{
                          border: '1px solid #eee',
                          p: { xs: 2, md: 2.5 },
                          cursor: hasMedia ? 'pointer' : 'default',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          minHeight: 56,
                          '&:hover': hasMedia ? { borderColor: '#111' } : {},
                          '&:focus-visible': { outline: '2px solid #111', outlineOffset: '2px' },
                        }}
                        onClick={hasMedia ? () => setSelectedCert(cert) : undefined}
                        role={hasMedia ? 'button' : undefined}
                        tabIndex={hasMedia ? 0 : undefined}
                        onKeyDown={hasMedia ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedCert(cert); } } : undefined}
                      >
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="body2" fontWeight={600}>
                              {cert.title || cert.name}
                            </Typography>
                            {hasMedia && (
                              cert.mediaType === 'pdf'
                                ? <PictureAsPdfIcon sx={{ fontSize: 16, color: '#555' }} />
                                : <ImageIcon sx={{ fontSize: 16, color: '#555' }} />
                            )}
                          </Box>
                          {cert.issuer && (
                            <Typography variant="caption" sx={{ color: '#555', display: 'block' }}>
                              {cert.issuer}
                            </Typography>
                          )}
                          <Typography variant="caption" sx={{ color: '#555', fontWeight: 600 }}>
                            {cert.date || cert.year}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Collapse>
          </Container>
        </Box>
      )}

      {/* Certification Viewer Modal */}
      <Modal
        open={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        closeAfterTransition
        slotProps={{ backdrop: { sx: { bgcolor: 'rgba(255,255,255,0.95)' } } }}
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
          border: '1px solid #eee',
          display: 'flex',
          flexDirection: 'column',
          outline: 'none',
        }}>
          {/* Header */}
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: { xs: 2, md: 3 }, py: 1.5,
            borderBottom: '1px solid #eee', flexShrink: 0,
          }}>
            <Typography variant="subtitle1" fontWeight={600} noWrap sx={{ flex: 1, mr: 1 }}>
              {selectedCert?.title || selectedCert?.name}
            </Typography>
            <IconButton
              onClick={() => setSelectedCert(null)}
              aria-label="Close"
              sx={{ color: '#111', flexShrink: 0, border: '1px solid #eee', width: 40, height: 40 }}
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
            borderTop: '1px solid #eee', flexShrink: 0,
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
                  borderColor: '#111', color: '#111',
                  '&:hover': { bgcolor: '#111', color: '#fff', borderColor: '#111' },
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
                  bgcolor: '#111', color: '#fff', boxShadow: 'none',
                  '&:hover': { bgcolor: '#333', boxShadow: 'none' },
                }}
              >
                Open in new tab
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* ── 07 / Achievements ── */}
      {about.achievements?.length > 0 && (
        <Box>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 }, px: { xs: 2, md: 5 } }}>
            <SectionHeading
              number="07 / Achievements"
              title="Achievements"
              collapsible
              sectionKey="achievements"
            />
            <Collapse in={isSectionExpanded('achievements')}>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {about.achievements.map((ach) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ach.id}>
                    <Box sx={{ border: '1px solid #eee', p: { xs: 2.5, md: 3 }, height: '100%' }}>
                      <Typography variant="body1" fontWeight={600}>
                        {ach.title}
                      </Typography>
                      {ach.description && (
                        <Typography variant="body2" sx={{ color: '#444', lineHeight: 1.7, mt: 1 }}>
                          {ach.description}
                        </Typography>
                      )}
                      {ach.year && (
                        <Typography variant="caption" sx={{ color: '#555', display: 'block', mt: 1.5, fontWeight: 600 }}>
                          {ach.year}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          </Container>
        </Box>
      )}

      {/* ── Additional Sections ── */}
      {about.additionalSections?.map((section) => (
        <Box key={section.id}>
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 }, px: { xs: 2, md: 5 } }}>
            <SectionHeading title={section.title} />
            <Typography variant="body1" sx={{
              whiteSpace: 'pre-line', color: '#444', lineHeight: 1.8, maxWidth: 700,
              fontSize: { xs: '0.95rem', md: '1rem' },
            }}>
              {section.content}
            </Typography>
          </Container>
        </Box>
      ))}
    </Box>
  );
}
