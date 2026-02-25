import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function MobileAbout({ data }) {
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

  const isSectionExpanded = (key) => expandedSections[key] !== false;

  const SectionTitle = ({ label, sectionKey }) => (
    <Box
      component="button"
      onClick={() => toggleSection(sectionKey)}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#fff',
        border: 'none',
        borderBottom: '1px solid #000',
        px: 0,
        py: 1.25,
        cursor: 'pointer',
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 700,
        fontSize: '0.95rem',
        color: '#000',
        minHeight: 40,
        '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
      }}
      aria-expanded={isSectionExpanded(sectionKey)}
    >
      {label}
      <span style={{ fontSize: '0.8rem' }}>{isSectionExpanded(sectionKey) ? '−' : '+'}</span>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      {/* Compact header — name + role + bio */}
      <Box sx={{ borderBottom: '1px solid #000', px: '14px', py: '20px' }}>
        <Typography
          component="h1"
          sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1.3rem', lineHeight: 1.2 }}
        >
          {about.name}
        </Typography>
        {about.introTitle && (
          <Typography sx={{ color: '#000', fontWeight: 400, mt: 0.5, fontSize: '0.85rem' }}>
            {about.introTitle}
          </Typography>
        )}
        {about.introDescription && (
          <Typography sx={{ color: '#000', mt: 1, fontSize: '0.8rem', lineHeight: 1.6 }}>
            {about.introDescription}
          </Typography>
        )}

        {/* Contact links row */}
        {about.contactLinks?.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.75, mt: 1.5, flexWrap: 'wrap' }}>
            {about.contactLinks.map((link) => (
              <Box
                key={link.id}
                component="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                sx={{
                  color: '#000',
                  border: '1px solid #000',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  '&:active': { bgcolor: '#000', color: '#fff' },
                }}
              >
                {(link.platform || '').slice(0, 2).toUpperCase()}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Metrics */}
      {about.metrics?.length > 0 && (
        <Box sx={{ borderBottom: '1px solid #000', px: '14px', py: '14px' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(about.metrics.length, 3)}, 1fr)`, gap: 0 }}>
            {about.metrics.map((m, i) => (
              <Box key={m.id} sx={{
                textAlign: 'center', py: 1,
                borderRight: i < about.metrics.length - 1 ? '1px solid #000' : 'none',
              }}>
                <Typography className="tabular-nums" sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#000' }}>
                  {m.value}
                </Typography>
                <Typography sx={{ color: '#000', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.5rem', fontWeight: 600 }}>
                  {m.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Box sx={{ px: '14px', py: '16px' }}>
        {/* Bio */}
        {about.bio && (
          <Box sx={{ mb: 2 }}>
            <SectionTitle label="About Me" sectionKey="bio" />
            <Collapse in={isSectionExpanded('bio')}>
              <Typography sx={{ py: 1.5, fontSize: '0.8rem', lineHeight: 1.7, whiteSpace: 'pre-line', color: '#000' }}>
                {about.bio}
              </Typography>
            </Collapse>
          </Box>
        )}

        {/* Experience — collapsible timeline list (accordion) */}
        {about.experience?.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <SectionTitle label="Experience" sectionKey="experience" />
            <Collapse in={isSectionExpanded('experience')}>
              {about.experience.map((exp, idx) => (
                <Box key={exp.id} sx={{ py: 1.25, borderBottom: idx < about.experience.length - 1 ? '1px dashed #000' : 'none' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.85rem' }}>{exp.role}</Typography>
                      <Typography sx={{ color: '#000', fontSize: '0.75rem' }}>{exp.company}</Typography>
                    </Box>
                    <Typography sx={{ fontSize: '0.6rem', fontWeight: 600, border: '1px solid #000', px: 0.5, py: 0.25, flexShrink: 0, lineHeight: 1.4 }}>
                      {exp.period}
                    </Typography>
                  </Box>
                  {exp.description && (
                    <Typography sx={{ mt: 0.75, color: '#000', fontSize: '0.75rem', lineHeight: 1.6 }}>
                      {exp.description}
                    </Typography>
                  )}
                </Box>
              ))}
            </Collapse>
          </Box>
        )}

        {/* Education */}
        {about.education?.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <SectionTitle label="Education" sectionKey="education" />
            <Collapse in={isSectionExpanded('education')}>
              {about.education.map((edu, idx) => (
                <Box key={edu.id} sx={{ py: 1.25, borderBottom: idx < about.education.length - 1 ? '1px dashed #000' : 'none' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.85rem' }}>{edu.degree}</Typography>
                  <Typography sx={{ color: '#000', fontSize: '0.75rem' }}>{edu.institution}</Typography>
                  <Typography sx={{ color: '#000', fontSize: '0.65rem', fontWeight: 600 }}>{edu.year}</Typography>
                  {edu.details && (
                    <Typography sx={{ mt: 0.5, color: '#000', fontSize: '0.75rem', lineHeight: 1.6 }}>{edu.details}</Typography>
                  )}
                </Box>
              ))}
            </Collapse>
          </Box>
        )}

        {/* Skills — grouped lists, no progress bars */}
        {about.skills?.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <SectionTitle label="Skills" sectionKey="skills" />
            <Collapse in={isSectionExpanded('skills')}>
              {about.skills.map((skill, idx) => (
                <Box
                  key={skill.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 0.75,
                    borderBottom: idx < about.skills.length - 1 ? '1px dashed #000' : 'none',
                    minHeight: 32,
                  }}
                >
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>{skill.name}</Typography>
                  <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#000' }}>
                    {skill.level}
                  </Typography>
                </Box>
              ))}
            </Collapse>
          </Box>
        )}

        {/* Certifications — compact list, tap opens fullscreen modal */}
        {about.certifications?.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <SectionTitle label="Certifications" sectionKey="certifications" />
            <Collapse in={isSectionExpanded('certifications')}>
              {about.certifications.map((cert, idx) => {
                const hasMedia = !!cert.mediaUrl;
                return (
                  <Box
                    key={cert.id}
                    component={hasMedia ? 'button' : 'div'}
                    onClick={hasMedia ? () => setSelectedCert(cert) : undefined}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      py: 1,
                      minHeight: 40,
                      width: '100%',
                      textAlign: 'left',
                      bgcolor: 'transparent',
                      border: 'none',
                      borderBottom: idx < about.certifications.length - 1 ? '1px dashed #000' : 'none',
                      cursor: hasMedia ? 'pointer' : 'default',
                      fontFamily: 'inherit',
                      px: 0,
                      '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>{cert.title || cert.name}</Typography>
                      {cert.issuer && <Typography sx={{ fontSize: '0.65rem', color: '#000' }}>{cert.issuer}</Typography>}
                      <Typography sx={{ fontSize: '0.6rem', color: '#000', fontWeight: 600 }}>{cert.date || cert.year}</Typography>
                    </Box>
                    {hasMedia && (
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: '#000', flexShrink: 0 }}>View →</Typography>
                    )}
                  </Box>
                );
              })}
            </Collapse>
          </Box>
        )}

        {/* Achievements */}
        {about.achievements?.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <SectionTitle label="Achievements" sectionKey="achievements" />
            <Collapse in={isSectionExpanded('achievements')}>
              {about.achievements.map((ach, idx) => (
                <Box key={ach.id} sx={{ py: 1, borderBottom: idx < about.achievements.length - 1 ? '1px dashed #000' : 'none' }}>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>{ach.title}</Typography>
                  {ach.description && (
                    <Typography sx={{ fontSize: '0.75rem', color: '#000', lineHeight: 1.5 }}>{ach.description}</Typography>
                  )}
                  {ach.year && <Typography sx={{ fontSize: '0.6rem', fontWeight: 600, color: '#000', mt: 0.25 }}>{ach.year}</Typography>}
                </Box>
              ))}
            </Collapse>
          </Box>
        )}

        {/* Additional Sections */}
        {about.additionalSections?.map((section) => (
          <Box key={section.id} sx={{ mb: 2 }}>
            <SectionTitle label={section.title} sectionKey={`additional-${section.id}`} />
            <Collapse in={isSectionExpanded(`additional-${section.id}`)}>
              <Typography sx={{ py: 1.5, fontSize: '0.8rem', whiteSpace: 'pre-line', lineHeight: 1.7, color: '#000' }}>
                {section.content}
              </Typography>
            </Collapse>
          </Box>
        ))}
      </Box>

      {/* Fullscreen certificate modal */}
      <Modal
        open={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        closeAfterTransition
        slotProps={{ backdrop: { sx: { bgcolor: '#fff' } } }}
      >
        <Box sx={{
          position: 'fixed',
          inset: 0,
          bgcolor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          outline: 'none',
        }}>
          {/* Header */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: '14px',
            py: 1,
            borderBottom: '1px solid #000',
            flexShrink: 0,
            minHeight: 48,
          }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', flex: 1, mr: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selectedCert?.title || selectedCert?.name}
            </Typography>
            <IconButton
              onClick={() => setSelectedCert(null)}
              aria-label="Close"
              sx={{ color: '#000', border: '1px solid #000', borderRadius: 0, width: 36, height: 36, p: 0 }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          {/* Body */}
          <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
            {selectedCert?.mediaType === 'pdf' ? (
              <iframe
                src={selectedCert.mediaUrl}
                title={selectedCert.title || selectedCert.name}
                style={{ width: '100%', height: '100%', minHeight: 400, border: 'none', display: 'block' }}
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
            px: '14px',
            py: 1.5,
            borderTop: '1px solid #000',
            flexShrink: 0,
          }}>
            {selectedCert?.issuer && (
              <Typography sx={{ fontSize: '0.75rem' }}><strong>Issuer:</strong> {selectedCert.issuer}</Typography>
            )}
            <Box sx={{ display: 'flex', gap: 0.75, mt: 1 }}>
              <Box
                component="a"
                href={selectedCert?.mediaUrl}
                download
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  border: '1px solid #000',
                  color: '#000',
                  textDecoration: 'none',
                  px: 1,
                  py: 0.5,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  minHeight: 36,
                  '&:active': { bgcolor: '#000', color: '#fff' },
                }}
              >
                <DownloadIcon sx={{ fontSize: 14 }} /> Download
              </Box>
              <Box
                component="a"
                href={selectedCert?.mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  bgcolor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  px: 1,
                  py: 0.5,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  minHeight: 36,
                }}
              >
                <OpenInNewIcon sx={{ fontSize: 14 }} /> Open
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
