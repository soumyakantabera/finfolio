import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';

function extractYouTubeId(url) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/))([\w-]+)/
  );
  return match ? match[1] : null;
}

function ensurePreviewSuffix(url) {
  return url.replace(/\/?(preview)?$/, '/preview');
}

function EmbedFallback({ url, title }) {
  return (
    <Card variant="outlined" sx={{ my: 2 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, mr: 2, overflow: 'hidden', textOverflow: 'ellipsis', color: '#000' }}
        >
          {title}
        </Typography>
        {url && (
          <Button
            variant="outlined"
            size="small"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<OpenInNewIcon />}
            sx={{ color: '#000', borderColor: '#000', '&:hover': { borderColor: '#333', bgcolor: '#f5f5f5' } }}
          >
            Open
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function EmbedBlock({ type, url, title }) {
  const [error, setError] = useState(false);

  if (error || !url) {
    return <EmbedFallback url={url} title={title || 'Embedded Content'} />;
  }

  const iframeProps = {
    title: title || 'Embedded Content',
    width: '100%',
    frameBorder: '0',
    sandbox: 'allow-scripts allow-same-origin allow-popups',
    loading: 'lazy',
    onError: () => setError(true),
    style: { border: '1px solid #e0e0e0', borderRadius: 0 },
  };

  switch (type) {
    case 'youtube': {
      const videoId = extractYouTubeId(url);
      if (!videoId) {
        return <EmbedFallback url={url} title={title || 'YouTube Video'} />;
      }
      return (
        <Box sx={{ position: 'relative', pb: '56.25%', height: 0, overflow: 'hidden', my: 2, borderRadius: 0 }}>
          <iframe
            {...iframeProps}
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              ...iframeProps.style,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      );
    }

    case 'pdf':
      return (
        <Box sx={{ my: 2 }}>
          <iframe {...iframeProps} src={url} height="600" />
        </Box>
      );

    case 'gdocs':
    case 'gsheets':
      return (
        <Box sx={{ my: 2 }}>
          <iframe {...iframeProps} src={ensurePreviewSuffix(url)} height="600" />
        </Box>
      );

    case 'msoffice':
      return (
        <Box sx={{ my: 2 }}>
          <iframe
            {...iframeProps}
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
            height="600"
          />
        </Box>
      );

    case 'github':
      return (
        <Card variant="outlined" sx={{ my: 2 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden', mr: 2 }}>
              <GitHubIcon sx={{ mr: 1.5, color: '#000', fontSize: 28 }} />
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#000' }}
              >
                {title || url}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<OpenInNewIcon />}
              sx={{ color: '#000', borderColor: '#000', flexShrink: 0, '&:hover': { borderColor: '#333', bgcolor: '#f5f5f5' } }}
            >
              Open on GitHub
            </Button>
          </CardContent>
        </Card>
      );

    case 'image':
      return (
        <Box sx={{ my: 2, textAlign: 'center' }}>
          <Box
            component="img"
            src={url}
            alt={title || 'Embedded image'}
            onError={() => setError(true)}
            sx={{ maxWidth: '100%', borderRadius: 0, objectFit: 'cover' }}
          />
        </Box>
      );

    default:
      return <EmbedFallback url={url} title={title || 'Embedded Content'} />;
  }
}
