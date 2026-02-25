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
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Contact
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Info */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              {contact.email && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <EmailIcon />
                  <Link href={`mailto:${contact.email}`} color="inherit" underline="hover">
                    {contact.email}
                  </Link>
                </Box>
              )}
              {contact.phone && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <PhoneIcon />
                  <Link href={`tel:${contact.phone}`} color="inherit" underline="hover">
                    {contact.phone}
                  </Link>
                </Box>
              )}
              {contact.address && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <LocationOnIcon />
                  <Typography variant="body1">{contact.address}</Typography>
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
                sx={{ color: '#000' }}
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
                sx={{ color: '#000' }}
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
                sx={{ color: '#000' }}
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
              sx={{ bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}
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
