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
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

export default function ResumeEditor({ data, onChange }) {
  const [deleteTarget, setDeleteTarget] = useState(null);

  const update = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  // Section helpers
  const sections = data.sections || [];

  const addSection = () => {
    update('sections', [...sections, { id: uuidv4(), title: '', items: [] }]);
  };

  const updateSection = (id, key, value) => {
    update(
      'sections',
      sections.map((s) => (s.id === id ? { ...s, [key]: value } : s))
    );
  };

  const removeSection = (id) => {
    update(
      'sections',
      sections.filter((s) => s.id !== id)
    );
    setDeleteTarget(null);
  };

  // Item helpers
  const addItem = (sectionId) => {
    update(
      'sections',
      sections.map((s) =>
        s.id === sectionId
          ? { ...s, items: [...(s.items || []), { id: uuidv4(), text: '' }] }
          : s
      )
    );
  };

  const updateItemText = (sectionId, itemId, value) => {
    update(
      'sections',
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: (s.items || []).map((it) =>
                it.id === itemId ? { ...it, text: value } : it
              ),
            }
          : s
      )
    );
  };

  const removeItem = (sectionId, itemId) => {
    update(
      'sections',
      sections.map((s) =>
        s.id === sectionId
          ? { ...s, items: (s.items || []).filter((it) => it.id !== itemId) }
          : s
      )
    );
    setDeleteTarget(null);
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>Resume</Typography>

      <TextField
        label="Resume Summary"
        fullWidth
        multiline
        rows={4}
        value={data.summary || ''}
        onChange={(e) => update('summary', e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Resume File URL"
        fullWidth
        value={data.fileUrl || ''}
        onChange={(e) => update('fileUrl', e.target.value)}
        sx={{ mb: 3 }}
      />

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} mb={1}>Sections</Typography>

      {sections.map((section) => (
        <Card key={section.id} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
            <TextField
              label="Section Title"
              size="small"
              fullWidth
              value={section.title || ''}
              onChange={(e) => updateSection(section.id, 'title', e.target.value)}
            />
            <IconButton
              color="error"
              onClick={() => setDeleteTarget({ type: 'section', id: section.id })}
            >
              <Delete />
            </IconButton>
          </Box>

          {(section.items || []).map((item) => (
            <Box key={item.id} sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 2, mb: 1 }}>
              <TextField
                label="Item"
                size="small"
                fullWidth
                value={item.text || ''}
                onChange={(e) => updateItemText(section.id, item.id, e.target.value)}
              />
              <IconButton
                size="small"
                color="error"
                onClick={() => setDeleteTarget({ type: 'item', sectionId: section.id, itemId: item.id })}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          ))}
          <Button size="small" startIcon={<Add />} onClick={() => addItem(section.id)} sx={{ ml: 2 }}>
            Add Item
          </Button>
        </Card>
      ))}

      <Button startIcon={<Add />} onClick={addSection}>Add Section</Button>

      {/* Delete confirmation */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this {deleteTarget?.type}?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              if (deleteTarget.type === 'section') removeSection(deleteTarget.id);
              else removeItem(deleteTarget.sectionId, deleteTarget.itemId);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
