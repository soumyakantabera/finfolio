import { useMediaQuery } from '@mui/material';

/**
 * Hook to detect mobile viewport (max-width: 768px).
 * Used to switch between desktop and mobile component rendering.
 */
export default function useIsMobile() {
  return useMediaQuery('(max-width: 768px)');
}
