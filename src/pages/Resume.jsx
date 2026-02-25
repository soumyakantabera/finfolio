import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Chip,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const SectionTitle = ({ children }) => (
  <Typography variant="h5" fontWeight={600} sx={{ mb: 2, mt: 4 }}>
    {children}
  </Typography>
);

export default function ResumePage({ data }) {
  const { resume, about } = data;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Typography variant="h3" fontWeight={700}>
          Resume
        </Typography>
        {resume.fileUrl && (
          <Button
            variant="contained"
            href={resume.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<DownloadIcon />}
            sx={{ bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}
          >
            Download Resume
          </Button>
        )}
      </Box>

      {/* Summary */}
      {resume.summary && (
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Summary
            </Typography>
            <Typography variant="body1">{resume.summary}</Typography>
          </CardContent>
        </Card>
      )}

      <Divider />

      {/* Custom Resume Sections */}
      {resume.sections?.map((section, i) => (
        <Box key={i}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.items?.map((item, j) => (
            <Box key={j} sx={{ mb: 2, pl: 2, borderLeft: '2px solid #e0e0e0' }}>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {typeof item === 'string' ? item : item.content || JSON.stringify(item)}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}

      {/* Experience from About */}
      {about.experience?.length > 0 && (
        <>
          <SectionTitle>Experience</SectionTitle>
          {about.experience.map((exp) => (
            <Box key={exp.id} sx={{ mb: 3, pl: 2, borderLeft: '2px solid #000' }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {exp.role}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {exp.company} &middot; {exp.period}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {exp.description}
              </Typography>
            </Box>
          ))}
        </>
      )}

      {/* Education from About */}
      {about.education?.length > 0 && (
        <>
          <SectionTitle>Education</SectionTitle>
          {about.education.map((edu) => (
            <Box key={edu.id} sx={{ mb: 2, pl: 2, borderLeft: '2px solid #000' }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {edu.degree}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {edu.institution} &middot; {edu.year}
              </Typography>
              {edu.details && (
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {edu.details}
                </Typography>
              )}
            </Box>
          ))}
        </>
      )}

      {/* Skills from About */}
      {about.skills?.length > 0 && (
        <>
          <SectionTitle>Skills</SectionTitle>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {about.skills.map((skill) => (
              <Chip
                key={skill.id}
                label={`${skill.name} · ${skill.level}`}
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        </>
      )}

      {/* Certifications from About */}
      {about.certifications?.length > 0 && (
        <>
          <SectionTitle>Certifications</SectionTitle>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {about.certifications.map((cert) => (
              <Chip key={cert.id} label={`${cert.name} (${cert.year})`} variant="outlined" size="small" />
            ))}
          </Box>
        </>
      )}
    </Container>
  );
}
