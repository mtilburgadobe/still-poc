/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-campaign block
 *
 * Source: https://www.still.de/
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: Block name header ("Columns-Campaign")
 * - Row 2: Two columns (image | heading + text + CTA)
 *
 * Source HTML Pattern:
 * <div class="content-campaign-teaser">
 *   <div class="content-campaign-teaser__img-box">
 *     <img class="content-campaign-teaser__img" src="..." alt="..." />
 *   </div>
 *   <div class="content-campaign-teaser__body-wrap">
 *     <p class="content-campaign-teaser__body-headline">Headline</p>
 *     <p class="content-campaign-teaser__body-text">Description</p>
 *     <a class="content-campaign-teaser__btn" href="...">CTA</a>
 *   </div>
 * </div>
 *
 * Generated: 2026-01-20
 */
export default function parse(element, { document }) {
  const cells = [];

  // Extract image from campaign teaser
  const image = element.querySelector('.content-campaign-teaser__img, .content-campaign-teaser__img-box img, img');

  // Extract content elements
  const headline = element.querySelector('.content-campaign-teaser__body-headline, .headline, h3, h4');
  const text = element.querySelector('.content-campaign-teaser__body-text, .text, p:not(.content-campaign-teaser__body-headline)');
  const ctaLink = element.querySelector('.content-campaign-teaser__btn, a.btn, .btn-wrap a');

  // Create image cell (column 1)
  const imageCell = [];
  if (image) {
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt || '';
    imageCell.push(img);
  }

  // Create content cell (column 2)
  const contentCell = [];
  if (headline) {
    const h3 = document.createElement('h3');
    h3.textContent = headline.textContent.trim();
    contentCell.push(h3);
  }
  if (text) {
    const p = document.createElement('p');
    p.textContent = text.textContent.trim();
    contentCell.push(p);
  }
  if (ctaLink) {
    const a = document.createElement('a');
    a.href = ctaLink.href;
    a.textContent = ctaLink.textContent.trim();
    contentCell.push(a);
  }

  // Add row with two columns: image | content
  cells.push([imageCell, contentCell]);

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Campaign', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
