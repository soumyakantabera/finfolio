import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { Box, Typography, Link as MuiLink, Button, Card, CardContent } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const EMBED_REGEX = /\[embed:(\w+)\s+url="([^"]+)"(?:\s+title="([^"]*)")?\]/g;
const PLACEHOLDER_PREFIX = '<!--embed-placeholder-';
const PLACEHOLDER_SUFFIX = '-->';

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'iframe'],
  attributes: {
    ...defaultSchema.attributes,
    iframe: ['src', 'width', 'height', 'frameBorder', 'allow', 'allowFullScreen', 'title', 'style'],
  },
};

function extractEmbeds(content) {
  const embeds = [];
  const processed = content.replace(EMBED_REGEX, (_, type, url, title) => {
    const index = embeds.length;
    embeds.push({ type: type.toLowerCase(), url, title: title || url });
    return `${PLACEHOLDER_PREFIX}${index}${PLACEHOLDER_SUFFIX}`;
  });
  return { processed, embeds };
}

function EmbedBlock({ type, url, title }) {
  const [error, setError] = React.useState(false);

  if (error) {
    return <EmbedFallback url={url} title={title} />;
  }

  const iframeProps = {
    title,
    width: '100%',
    frameBorder: '0',
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    allowFullScreen: true,
    onError: () => setError(true),
    style: { border: 'none', borderRadius: 0 },
  };

  switch (type) {
    case 'youtube': {
      const videoId = url.match(/(?:youtu\.be\/|v=)([\w-]+)/)?.[1] || url;
      return (
        <Box sx={{ position: 'relative', pb: '56.25%', height: 0, overflow: 'hidden', my: 2, borderRadius: 0 }}>
          <iframe
            {...iframeProps}
            src={`https://www.youtube.com/embed/${videoId}`}
            style={{ ...iframeProps.style, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
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
          <iframe {...iframeProps} src={url} height="500" />
        </Box>
      );
    case 'msoffice':
      return (
        <Box sx={{ my: 2 }}>
          <iframe
            {...iframeProps}
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
            height="500"
          />
        </Box>
      );
    case 'image':
      return (
        <Box sx={{ my: 2, textAlign: 'center' }}>
          <img
            src={url}
            alt={title}
            onError={() => setError(true)}
            style={{ maxWidth: '100%', borderRadius: 0 }}
          />
        </Box>
      );
    default:
      return <EmbedFallback url={url} title={title} />;
  }
}

function EmbedFallback({ url, title }) {
  return (
    <Card variant="outlined" sx={{ my: 2 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body1" sx={{ fontWeight: 500, mr: 2, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<OpenInNewIcon />}
        >
          Open
        </Button>
      </CardContent>
    </Card>
  );
}

const markdownComponents = {
  h1: ({ children, ...props }) => (
    <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mt: 3, mb: 1.5, color: '#000' }} {...props}>
      {children}
    </Typography>
  ),
  h2: ({ children, ...props }) => (
    <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mt: 2.5, mb: 1.5, color: '#000' }} {...props}>
      {children}
    </Typography>
  ),
  h3: ({ children, ...props }) => (
    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mt: 2, mb: 1, color: '#000' }} {...props}>
      {children}
    </Typography>
  ),
  h4: ({ children, ...props }) => (
    <Typography variant="subtitle1" component="h4" sx={{ fontWeight: 600, mt: 2, mb: 1, color: '#000' }} {...props}>
      {children}
    </Typography>
  ),
  p: ({ children, ...props }) => (
    <Typography variant="body1" sx={{ mb: 1.5, lineHeight: 1.7, color: '#222' }} {...props}>
      {children}
    </Typography>
  ),
  a: ({ href, children, ...props }) => (
    <MuiLink href={href} target="_blank" rel="noopener noreferrer" sx={{ color: '#000', fontWeight: 500 }} {...props}>
      {children}
    </MuiLink>
  ),
  img: ({ src, alt, ...props }) => (
    <Box component="img" src={src} alt={alt} sx={{ maxWidth: '100%', borderRadius: 0, my: 1 }} {...props} />
  ),
  blockquote: ({ children, ...props }) => (
    <Box
      component="blockquote"
      sx={{ borderLeft: '4px solid #000', pl: 2, my: 2, ml: 0, color: '#444' }}
      {...props}
    >
      {children}
    </Box>
  ),
  code: ({ inline, className, children, ...props }) => {
    if (inline) {
      return (
        <Box
          component="code"
          sx={{ bgcolor: '#f5f5f5', px: 0.75, py: 0.25, borderRadius: 0.5, fontSize: '0.875em', fontFamily: 'monospace' }}
          {...props}
        >
          {children}
        </Box>
      );
    }
    return (
      <Box
        component="code"
        sx={{ display: 'block', fontFamily: 'monospace', fontSize: '0.875em' }}
        {...props}
      >
        {children}
      </Box>
    );
  },
  pre: ({ children, ...props }) => (
    <Box
      component="pre"
      sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 0, overflow: 'auto', my: 2, border: '1px solid #e0e0e0', fontSize: { xs: '0.8rem', md: '0.875em' }, maxWidth: '100%' }}
      {...props}
    >
      {children}
    </Box>
  ),
  table: ({ children, ...props }) => (
    <Box sx={{ overflowX: 'auto', my: 2 }}>
      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }} {...props}>
        {children}
      </Box>
    </Box>
  ),
  th: ({ children, ...props }) => (
    <Box
      component="th"
      sx={{ border: '1px solid #ddd', p: 1, fontWeight: 600, textAlign: 'left', bgcolor: '#fafafa' }}
      {...props}
    >
      {children}
    </Box>
  ),
  td: ({ children, ...props }) => (
    <Box component="td" sx={{ border: '1px solid #ddd', p: 1 }} {...props}>
      {children}
    </Box>
  ),
};

export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  const { processed, embeds } = extractEmbeds(content);

  // Split on embed placeholders and interleave markdown segments with embed blocks
  const parts = processed.split(new RegExp(`${PLACEHOLDER_PREFIX.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}(\\d+)${PLACEHOLDER_SUFFIX.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}`));

  return (
    <Box sx={{ color: '#000' }}>
      {parts.map((part, i) => {
        // Odd indices are captured embed indices
        if (i % 2 === 1) {
          const embed = embeds[parseInt(part, 10)];
          return embed ? <EmbedBlock key={`embed-${part}`} {...embed} /> : null;
        }
        if (!part.trim()) return null;
        return (
          <ReactMarkdown
            key={`md-${i}`}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
            components={markdownComponents}
          >
            {part}
          </ReactMarkdown>
        );
      })}
    </Box>
  );
}
