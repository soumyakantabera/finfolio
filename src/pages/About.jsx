import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider,
  Grid,
} from '@mui/material';

const SectionTitle = ({ children }) => (
  <Typography variant="h5" fontWeight={600} sx={{ mb: 2, mt: 5 }}>
    {children}
  </Typography>
);

const levelColor = (level) => {
  switch (level) {
    case 'Expert': return '#000';
    case 'Advanced': return '#333';
    case 'Intermediate': return '#666';
    default: return '#999';
  }
};

export default function AboutPage({ data }) {
  const { about } = data;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Profile Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 4, mb: 6 }}>
        <Avatar
          src={about.profilePhoto || undefined}
          alt={about.name}
          sx={{ width: 120, height: 120, bgcolor: '#000', fontSize: 48 }}
        >
          {about.name?.[0]}
        </Avatar>
        <Box>
          <Typography variant="h3" fontWeight={700}>
            {about.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {about.introTitle}
          </Typography>
          <Typography variant="body1">{about.introDescription}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* Education */}
      {about.education?.length > 0 && (
        <>
          <SectionTitle>Education</SectionTitle>
          <Grid container spacing={2}>
            {about.education.map((edu) => (
              <Grid size={{ xs: 12, md: 6 }} key={edu.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {edu.degree}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {edu.institution} &middot; {edu.year}
                    </Typography>
                    {edu.details && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {edu.details}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Experience */}
      {about.experience?.length > 0 && (
        <>
          <SectionTitle>Experience</SectionTitle>
          <Box sx={{ position: 'relative', pl: 3, borderLeft: '2px solid #000' }}>
            {about.experience.map((exp) => (
              <Box key={exp.id} sx={{ mb: 3, position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: -21,
                    top: 4,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: '#000',
                  }}
                />
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
          </Box>
        </>
      )}

      {/* Skills */}
      {about.skills?.length > 0 && (
        <>
          <SectionTitle>Skills</SectionTitle>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {about.skills.map((skill) => (
              <Chip
                key={skill.id}
                label={`${skill.name} · ${skill.level}`}
                variant="outlined"
                sx={{ borderColor: levelColor(skill.level), color: levelColor(skill.level) }}
              />
            ))}
          </Box>
        </>
      )}

      {/* Certifications */}
      {about.certifications?.length > 0 && (
        <>
          <SectionTitle>Certifications</SectionTitle>
          <Grid container spacing={2}>
            {about.certifications.map((cert) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cert.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {cert.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {cert.year}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Additional Sections */}
      {about.additionalSections?.map((section) => (
        <Box key={section.id} sx={{ mt: 5 }}>
          <SectionTitle>{section.title}</SectionTitle>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {section.content}
          </Typography>
        </Box>
      ))}
    </Container>
  );
}
