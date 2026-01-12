/**
 * Utility function to get a responsive image URL based on screen width.
 *
 * @param desktopImage - Path to the desktop image (for width ≥ 767px)
 * @param mobileImage - Path to the mobile image (for width < 767px)
 * @param breakpoint - Optional breakpoint (default: 767)
 * @returns The correct image URL for the current device size.
 */
export function getResponsiveImage(
  desktopImage: string,
  mobileImage: string,
  breakpoint: number = 767
): string {
  if (typeof window === 'undefined') {
    // SSR safe fallback — always return desktop image
    return desktopImage;
  }

  const isMobile = window.innerWidth < breakpoint;
  return isMobile ? mobileImage : desktopImage;
}
