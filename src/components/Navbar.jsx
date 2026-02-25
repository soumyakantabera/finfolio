import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';

const corePages = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'projects', label: 'Projects', path: '/projects' },
  { key: 'about', label: 'About', path: '/about' },
  { key: 'resume', label: 'Resume', path: '/resume' },
  { key: 'contact', label: 'Contact', path: '/contact' },
];

export default function Navbar({ data }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const visiblePages = data?.settings?.visiblePages || {};
  const customPages = data?.settings?.customPages || [];
  const siteTitle = data?.settings?.siteTitle || 'FinFolio';

  const navLinks = corePages.filter((p) => visiblePages[p.key] !== false);
  const customLinks = customPages.map((cp) => ({
    label: cp.title,
    path: `/page/${cp.slug}`,
  }));

  const isActive = (path) => location.pathname === path;

  const linkSx = (path) => ({
    color: isActive(path) ? '#000' : '#555',
    fontWeight: isActive(path) ? 700 : 500,
    borderBottom: isActive(path) ? '2px solid #000' : '2px solid transparent',
    borderRadius: 0,
    mx: 0.5,
    '&:hover': { backgroundColor: 'transparent', color: '#000' },
  });

  const drawerContent = (
    <Box sx={{ width: 240 }} onClick={() => setDrawerOpen(false)}>
      <Typography variant="h6" sx={{ p: 2, fontWeight: 700 }}>
        {siteTitle}
      </Typography>
      <Divider />
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton component={Link} to={item.path} selected={isActive(item.path)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {customLinks.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton component={Link} to={item.path} selected={isActive(item.path)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#fff', color: '#111' }}>
      <Toolbar>
        {/* Mobile menu button */}
        <IconButton
          edge="start"
          aria-label="menu"
          onClick={() => setDrawerOpen(true)}
          sx={{ mr: 1, display: { sm: 'none' }, color: '#111' }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ fontWeight: 700, flexGrow: 1, color: '#111', textDecoration: 'none' }}
        >
          {siteTitle}
        </Typography>

        {/* Desktop links */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
          {navLinks.map((item) => (
            <Button key={item.key} component={Link} to={item.path} sx={linkSx(item.path)}>
              {item.label}
            </Button>
          ))}
          {customLinks.map((item) => (
            <Button key={item.path} component={Link} to={item.path} sx={linkSx(item.path)}>
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Mobile drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          {drawerContent}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
