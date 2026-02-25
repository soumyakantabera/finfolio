import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  Card,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  Select,
  MenuItem,
  Tabs,
  Tab,
} from '@mui/material';
import { Add, Delete, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import MarkdownRenderer from '../../components/MarkdownRenderer';

const EMBED_TYPES = ['none', 'pdf', 'gdocs', 'gsheets', 'github', 'chart'];
const EMBED_ITEM_TYPES = ['youtube', 'pdf', 'gdocs', 'gsheets', 'msoffice', 'image', 'github'];
const STATUS_OPTIONS = ['published', 'draft'];

const generateSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const emptyProject = () => ({
  id: uuidv4(),
  title: '',
  slug: '',
  subtitle: '',
  description: '',
  category: '',
  tags: [],
  techStack: [],
  links: [],
  embedType: '',
  embedUrl: '',
  thumbnail: '',
  heroImage: '',
  date: '',
  featured: false,
  status: 'draft',
  markdownContent: '',
  embeds: [],
  relatedProjects: [],
});

export default function ProjectsEditor({ data, onChange }) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(null);

  const projects = data || [];

  const updateProject = (index, key, value) => {
    const updated = projects.map((p, i) =>
      i === index ? { ...p, [key]: value } : p
    );
    onChange(updated);
  };

  const handleTitleChange = (index, newTitle) => {
    const project = projects[index];
    const prevAutoSlug = generateSlug(project.title || '');
    const currentSlug = project.slug || '';
    const shouldAutoSlug = currentSlug === '' || currentSlug === prevAutoSlug;
    const updates = { title: newTitle };
    if (shouldAutoSlug) updates.slug = generateSlug(newTitle);
    const updated = projects.map((p, i) =>
      i === index ? { ...p, ...updates } : p
    );
    onChange(updated);
  };

  const addProject = () => {
    onChange([...projects, emptyProject()]);
    setEditIndex(projects.length);
  };

  const removeProject = (index) => {
    onChange(projects.filter((_, i) => i !== index));
    setDeleteTarget(null);
    if (editIndex === index) setEditIndex(null);
  };

  const moveProject = (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= projects.length) return;
    const updated = [...projects];
    [updated[index], updated[target]] = [updated[target], updated[index]];
    onChange(updated);
    if (editIndex === index) setEditIndex(target);
  };

  // Link helpers
  const addLink = (pIndex) => {
    const p = projects[pIndex];
    updateProject(pIndex, 'links', [
      ...(p.links || []),
      { id: uuidv4(), label: '', url: '' },
    ]);
  };

  const updateLink = (pIndex, linkId, key, value) => {
    const p = projects[pIndex];
    updateProject(
      pIndex,
      'links',
      (p.links || []).map((l) => (l.id === linkId ? { ...l, [key]: value } : l))
    );
  };

  const removeLink = (pIndex, linkId) => {
    const p = projects[pIndex];
    updateProject(
      pIndex,
      'links',
      (p.links || []).filter((l) => l.id !== linkId)
    );
  };

  // Embed helpers
  const addEmbed = (pIndex) => {
    const p = projects[pIndex];
    updateProject(pIndex, 'embeds', [
      ...(p.embeds || []),
      { id: uuidv4(), type: 'youtube', url: '', title: '' },
    ]);
  };

  const updateEmbed = (pIndex, embedId, key, value) => {
    const p = projects[pIndex];
    updateProject(
      pIndex,
      'embeds',
      (p.embeds || []).map((e) => (e.id === embedId ? { ...e, [key]: value } : e))
    );
  };

  const removeEmbed = (pIndex, embedId) => {
    const p = projects[pIndex];
    updateProject(
      pIndex,
      'embeds',
      (p.embeds || []).filter((e) => e.id !== embedId)
    );
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>Projects</Typography>

      {projects.map((project, index) => (
        <Card key={project.id} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {project.title || 'Untitled Project'}
            </Typography>
            <Box>
              <IconButton size="small" onClick={() => moveProject(index, -1)} disabled={index === 0}><ArrowUpward fontSize="small" /></IconButton>
              <IconButton size="small" onClick={() => moveProject(index, 1)} disabled={index === projects.length - 1}><ArrowDownward fontSize="small" /></IconButton>
              <Button size="small" onClick={() => setEditIndex(editIndex === index ? null : index)}>
                {editIndex === index ? 'Collapse' : 'Edit'}
              </Button>
              <IconButton color="error" onClick={() => setDeleteTarget(index)}><Delete /></IconButton>
            </Box>
          </Box>

          {editIndex === index && (
            <Box sx={{ mt: 1 }}>
              <TextField label="Title" fullWidth size="small" required value={project.title || ''} onChange={(e) => handleTitleChange(index, e.target.value)} sx={{ mb: 1 }} />
              <TextField label="Slug" fullWidth size="small" value={project.slug || ''} onChange={(e) => updateProject(index, 'slug', e.target.value)} sx={{ mb: 1 }} />
              <TextField label="Subtitle" fullWidth size="small" value={project.subtitle || ''} onChange={(e) => updateProject(index, 'subtitle', e.target.value)} sx={{ mb: 1 }} />
              <TextField label="Description" fullWidth size="small" multiline rows={2} value={project.description || ''} onChange={(e) => updateProject(index, 'description', e.target.value)} sx={{ mb: 1 }} />
              <TextField label="Category" fullWidth size="small" value={project.category || ''} onChange={(e) => updateProject(index, 'category', e.target.value)} sx={{ mb: 1 }} />
              <TextField
                label="Tags (comma-separated)"
                fullWidth
                size="small"
                value={(project.tags || []).join(', ')}
                onChange={(e) => updateProject(index, 'tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
                sx={{ mb: 1 }}
              />
              <TextField
                label="Tech Stack (comma-separated)"
                fullWidth
                size="small"
                value={(project.techStack || []).join(', ')}
                onChange={(e) => updateProject(index, 'techStack', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
                sx={{ mb: 1 }}
              />
              <TextField label="Thumbnail URL" fullWidth size="small" value={project.thumbnail || ''} onChange={(e) => updateProject(index, 'thumbnail', e.target.value)} sx={{ mb: 1 }} />
              <TextField label="Hero Image URL" fullWidth size="small" value={project.heroImage || ''} onChange={(e) => updateProject(index, 'heroImage', e.target.value)} sx={{ mb: 1 }} />
              <TextField label="Date / Timeline" fullWidth size="small" value={project.date || ''} onChange={(e) => updateProject(index, 'date', e.target.value)} sx={{ mb: 1 }} />

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                <Typography variant="body2">Status</Typography>
                <Select size="small" value={project.status || 'draft'} onChange={(e) => updateProject(index, 'status', e.target.value)} sx={{ minWidth: 120 }}>
                  {STATUS_OPTIONS.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                <Typography variant="body2">Featured</Typography>
                <Switch checked={!!project.featured} onChange={(e) => updateProject(index, 'featured', e.target.checked)} />
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Select size="small" value={project.embedType || 'none'} onChange={(e) => updateProject(index, 'embedType', e.target.value === 'none' ? '' : e.target.value)} sx={{ minWidth: 140 }}>
                  {EMBED_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </Select>
                <TextField label="Embed URL" size="small" fullWidth value={project.embedUrl || ''} onChange={(e) => updateProject(index, 'embedUrl', e.target.value)} />
              </Box>

              {/* Markdown Content */}
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>Markdown Content</Typography>
                <Button size="small" onClick={() => setPreviewIndex(previewIndex === index ? null : index)}>
                  {previewIndex === index ? 'Editor' : 'Preview'}
                </Button>
              </Box>
              {previewIndex === index ? (
                <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2, mb: 1, minHeight: 200 }}>
                  <MarkdownRenderer content={project.markdownContent || ''} />
                </Box>
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  rows={10}
                  placeholder="Write markdown content..."
                  value={project.markdownContent || ''}
                  onChange={(e) => updateProject(index, 'markdownContent', e.target.value)}
                  sx={{ mb: 0.5 }}
                />
              )}
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Tip: Use [embed:TYPE url=&quot;URL&quot; title=&quot;TITLE&quot;] in markdown. Types: youtube, pdf, gdocs, gsheets, msoffice, image
              </Typography>

              {/* Embeds */}
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" fontWeight={600} mb={1}>Embeds</Typography>
              {(project.embeds || []).map((embed) => (
                <Box key={embed.id} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                  <Select size="small" value={embed.type || 'youtube'} onChange={(e) => updateEmbed(index, embed.id, 'type', e.target.value)} sx={{ minWidth: 120 }}>
                    {EMBED_ITEM_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                  </Select>
                  <TextField label="URL" size="small" value={embed.url || ''} onChange={(e) => updateEmbed(index, embed.id, 'url', e.target.value)} sx={{ flex: 1 }} />
                  <TextField label="Title" size="small" value={embed.title || ''} onChange={(e) => updateEmbed(index, embed.id, 'title', e.target.value)} sx={{ flex: 1 }} />
                  <IconButton size="small" color="error" onClick={() => removeEmbed(index, embed.id)}><Delete fontSize="small" /></IconButton>
                </Box>
              ))}
              <Button size="small" startIcon={<Add />} onClick={() => addEmbed(index)}>Add Embed</Button>

              {/* Links */}
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" fontWeight={600} mb={1}>Links</Typography>
              {(project.links || []).map((link) => (
                <Box key={link.id || link.label} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                  <TextField label="Label" size="small" value={link.label || ''} onChange={(e) => updateLink(index, link.id, 'label', e.target.value)} sx={{ flex: 1 }} />
                  <TextField label="URL" size="small" value={link.url || ''} onChange={(e) => updateLink(index, link.id, 'url', e.target.value)} sx={{ flex: 1 }} />
                  <IconButton size="small" color="error" onClick={() => removeLink(index, link.id)}><Delete fontSize="small" /></IconButton>
                </Box>
              ))}
              <Button size="small" startIcon={<Add />} onClick={() => addLink(index)}>Add Link</Button>

              {/* Related Projects */}
              <Divider sx={{ my: 1 }} />
              <TextField
                label="Related Projects (comma-separated slugs)"
                fullWidth
                size="small"
                value={(project.relatedProjects || []).join(', ')}
                onChange={(e) => updateProject(index, 'relatedProjects', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
                sx={{ mb: 1 }}
              />
            </Box>
          )}
        </Card>
      ))}

      <Button startIcon={<Add />} variant="outlined" onClick={addProject}>Add Project</Button>

      {/* Delete confirmation */}
      <Dialog open={deleteTarget !== null} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this project?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button color="error" onClick={() => removeProject(deleteTarget)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
