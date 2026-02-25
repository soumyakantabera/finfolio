import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function MobileContact({ data }) {
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
    <Box sx={{ px: '14px', py: '20px' }}>
      <Typography
        variant="overline"
        sx={{ color: '#000', letterSpacing: '0.12em', display: 'block', mb: 0.5, fontWeight: 700, fontSize: '0.6rem' }}
      >
        Get in Touch
      </Typography>
      <Typography
        component="h1"
        sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: '1.4rem', mb: 2 }}
      >
        Contact
      </Typography>

      {/* Contact methods — tappable rows */}
      <Box sx={{ mb: 2, borderBottom: '1px solid #000' }}>
        {contact.email && (
          <Box
            component="a"
            href={`mailto:${contact.email}`}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1.25,
              borderBottom: '1px dashed #000',
              textDecoration: 'none',
              color: '#000',
              minHeight: 44,
              '&:active': { fontWeight: 700 },
            }}
          >
            <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</Typography>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>{contact.email}</Typography>
          </Box>
        )}
        {contact.phone && (
          <Box
            component="a"
            href={`tel:${contact.phone}`}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1.25,
              borderBottom: '1px dashed #000',
              textDecoration: 'none',
              color: '#000',
              minHeight: 44,
              '&:active': { fontWeight: 700 },
            }}
          >
            <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Phone</Typography>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>{contact.phone}</Typography>
          </Box>
        )}
        {contact.address && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1.25,
              minHeight: 44,
            }}
          >
            <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Location</Typography>
            <Typography sx={{ fontSize: '0.8rem', textAlign: 'right' }}>{contact.address}</Typography>
          </Box>
        )}
      </Box>

      {/* Social links */}
      {(contact.linkedin || contact.github || contact.socialLinks?.length > 0) && (
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 3 }}>
          {contact.linkedin && (
            <Box
              component="a"
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#000',
                border: '1px solid #000',
                px: 1.5,
                py: 0.5,
                textDecoration: 'none',
                fontSize: '0.7rem',
                fontWeight: 600,
                minHeight: 36,
                display: 'flex',
                alignItems: 'center',
                '&:active': { bgcolor: '#000', color: '#fff' },
              }}
            >
              LinkedIn
            </Box>
          )}
          {contact.github && (
            <Box
              component="a"
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#000',
                border: '1px solid #000',
                px: 1.5,
                py: 0.5,
                textDecoration: 'none',
                fontSize: '0.7rem',
                fontWeight: 600,
                minHeight: 36,
                display: 'flex',
                alignItems: 'center',
                '&:active': { bgcolor: '#000', color: '#fff' },
              }}
            >
              GitHub
            </Box>
          )}
          {contact.socialLinks?.map((social) => (
            <Box
              key={social.id}
              component="a"
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#000',
                border: '1px solid #000',
                px: 1.5,
                py: 0.5,
                textDecoration: 'none',
                fontSize: '0.7rem',
                fontWeight: 600,
                minHeight: 36,
                display: 'flex',
                alignItems: 'center',
                '&:active': { bgcolor: '#000', color: '#fff' },
              }}
            >
              {social.platform}
            </Box>
          ))}
        </Box>
      )}

      {/* Contact form — tight spacing */}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Name"
          fullWidth
          size="small"
          value={form.name}
          onChange={handleChange('name')}
          error={!!errors.name}
          helperText={errors.name}
          sx={{ mb: 1.5 }}
          inputProps={{ style: { fontSize: '0.85rem' } }}
        />
        <TextField
          label="Email"
          fullWidth
          size="small"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mb: 1.5 }}
          inputProps={{ style: { fontSize: '0.85rem' } }}
        />
        <TextField
          label="Message"
          fullWidth
          size="small"
          multiline
          rows={4}
          value={form.message}
          onChange={handleChange('message')}
          error={!!errors.message}
          helperText={errors.message}
          sx={{ mb: 2 }}
        />
        <Box
          component="button"
          type="submit"
          sx={{
            width: '100%',
            bgcolor: '#000',
            color: '#fff',
            border: '1px solid #000',
            py: 1.25,
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 600,
            fontSize: '0.8rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            minHeight: 44,
            '&:active': { transform: 'translate(1px, 1px)' },
            '&:focus-visible': { outline: '2px solid #000', outlineOffset: '2px' },
          }}
        >
          Send Message
        </Box>
      </Box>

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
    </Box>
  );
}
