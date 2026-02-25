import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  IconButton,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

export default function ContactPage({ data }) {
  const { contact } = data;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    }
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 5 } }}>
      <Typography
        variant="overline"
        sx={{ color: '#000', letterSpacing: '0.15em', display: 'block', mb: 0.5, fontWeight: 700 }}
      >
        Get in Touch
      </Typography>
      <Typography variant="h3" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.75rem', md: '3rem' } }}>
        Contact
      </Typography>

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {/* Contact Info */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card variant="outlined" sx={{ mb: 3, border: '1px solid #000' }}>
            <CardContent sx={{ p: 2 }}>
              {contact.email && (
                <Box
                  component="a"
                  href={`mailto:${contact.email}`}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 1.5, py: 1.5,
                    borderBottom: '1px dashed #000', textDecoration: 'none', color: '#000',
                    minHeight: 48,
                    '&:hover': { fontWeight: 700 },
                    '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                  }}
                >
                  <EmailIcon sx={{ color: '#000', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{contact.email}</Typography>
                </Box>
              )}
              {contact.phone && (
                <Box
                  component="a"
                  href={`tel:${contact.phone}`}
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 1.5, py: 1.5,
                    borderBottom: '1px dashed #000', textDecoration: 'none', color: '#000',
                    minHeight: 48,
                    '&:hover': { fontWeight: 700 },
                    '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
                  }}
                >
                  <PhoneIcon sx={{ color: '#000', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{contact.phone}</Typography>
                </Box>
              )}
              {contact.address && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1.5, minHeight: 48 }}>
                  <LocationOnIcon sx={{ color: '#000', fontSize: 20 }} />
                  <Typography variant="body2">{contact.address}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {contact.linkedin && (
              <IconButton
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{ color: '#000', border: '1px solid #000', borderRadius: 0, width: 44, height: 44, '&:hover': { bgcolor: '#000', color: '#fff' } }}
              >
                <LinkedInIcon />
              </IconButton>
            )}
            {contact.github && (
              <IconButton
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{ color: '#000', border: '1px solid #000', borderRadius: 0, width: 44, height: 44, '&:hover': { bgcolor: '#000', color: '#fff' } }}
              >
                <GitHubIcon />
              </IconButton>
            )}
            {contact.socialLinks?.map((social) => (
              <IconButton
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                sx={{ color: '#000', border: '1px solid #000', borderRadius: 0, width: 44, height: 44, '&:hover': { bgcolor: '#000', color: '#fff' } }}
              >
                <LaunchIcon />
              </IconButton>
            ))}
          </Box>
        </Grid>

        {/* Contact Form */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Name"
              fullWidth
              value={form.name}
              onChange={handleChange('name')}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 2 }}
              inputProps={{ style: { minHeight: 24 } }}
            />
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
              inputProps={{ style: { minHeight: 24 } }}
            />
            <TextField
              label="Message"
              fullWidth
              multiline
              rows={5}
              value={form.message}
              onChange={handleChange('message')}
              error={!!errors.message}
              helperText={errors.message}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ bgcolor: '#000', minHeight: 48, px: 4, '&:hover': { bgcolor: '#000' } }}
            >
              Send Message
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={submitted}
        autoHideDuration={4000}
        onClose={() => setSubmitted(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSubmitted(false)} severity="success" variant="filled">
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
