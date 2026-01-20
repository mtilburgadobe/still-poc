/* eslint-disable */
/* global WebImporter */

/**
 * DOM Cleanup Transformer for STILL website
 *
 * This transformer runs before parsing to clean up the DOM
 * by removing non-content elements like headers, footers,
 * navigation, cookie banners, etc.
 *
 * Source: https://www.still.de/
 * Generated: 2026-01-20
 */
export default function transform(document) {
  // Remove header/navigation elements
  const headerSelectors = [
    '.page-header',
    'header',
    'nav',
    '.navigation',
    '.page-header-nav',
    '.page-header-meta-links'
  ];

  // Remove footer elements
  const footerSelectors = [
    '.page-footer',
    'footer',
    '.footer'
  ];

  // Remove cookie/consent banners
  const bannerSelectors = [
    '.cookie-banner',
    '.consent-banner',
    '#ccm-widget',
    '[class*="cookie"]',
    '[class*="consent"]',
    '.ccm19'
  ];

  // Remove scripts and styles
  const scriptSelectors = [
    'script',
    'style',
    'noscript'
  ];

  // Remove hidden/utility elements
  const utilitySelectors = [
    '.sr-only',
    '.visually-hidden',
    '[aria-hidden="true"]',
    '.slick-cloned'
  ];

  // Combine all selectors
  const allSelectors = [
    ...headerSelectors,
    ...footerSelectors,
    ...bannerSelectors,
    ...scriptSelectors,
    ...utilitySelectors
  ];

  // Remove all matching elements
  allSelectors.forEach((selector) => {
    try {
      document.querySelectorAll(selector).forEach((el) => {
        el.remove();
      });
    } catch (e) {
      // Ignore invalid selectors
    }
  });

  // Clean up empty containers
  document.querySelectorAll('div:empty, span:empty').forEach((el) => {
    if (!el.querySelector('img, video, iframe')) {
      el.remove();
    }
  });
}
