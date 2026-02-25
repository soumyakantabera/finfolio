import React from 'react';
import useIsMobile from './useIsMobile';

/**
 * ResponsiveRoute — renders mobile or desktop component based on viewport.
 * Uses CSS media query (max-width: 768px) for detection.
 *
 * Usage:
 *   <ResponsiveRoute
 *     desktop={<DesktopComponent />}
 *     mobile={<MobileComponent />}
 *   />
 */
export default function ResponsiveRoute({ desktop, mobile }) {
  const isMobile = useIsMobile();
  return isMobile ? mobile : desktop;
}
