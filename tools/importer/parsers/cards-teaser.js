/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-teaser block
 *
 * Source: https://www.still.de/
 * Base Block: cards
 *
 * Block Structure:
 * - Row 1: Block name header ("Cards-Teaser")
 * - Row 2-N: Card rows (image | title + description + link)
 *
 * Source HTML Pattern:
 * <a class="content-category-teaser" href="...">
 *   <div class="content-category-teaser__img-wrap">
 *     <img src="..." alt="..." />
 *   </div>
 *   <div class="content-category-teaser__body">
 *     <span class="content-category-teaser__body-headline">Title</span>
 *     <span class="content-category-teaser__body-text">Description</span>
 *   </div>
 * </a>
 *
 * Generated: 2026-01-20
 */
export default function parse(element, { document }) {
  // Extract card content from single teaser element
  const cells = [];

  // Get image
  const image = element.querySelector('.content-category-teaser__img-wrap img, .content-category-teaser__img, img');

  // Get title and description
  const title = element.querySelector('.content-category-teaser__body-headline, .headline, h3, h4');
  const description = element.querySelector('.content-category-teaser__body-text, .text, p');

  // Get link - the element itself might be an anchor or contain one
  const link = element.tagName === 'A' ? element : element.querySelector('a');

  // Create image cell
  const imageCell = [];
  if (image) {
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt || '';
    imageCell.push(img);
  }

  // Create content cell
  const contentCell = [];
  if (title) {
    const strong = document.createElement('strong');
    strong.textContent = title.textContent.trim();
    contentCell.push(strong);
  }
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    contentCell.push(p);
  }
  if (link && link.href) {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.title || title?.textContent?.trim() || 'Mehr erfahren';
    contentCell.push(a);
  }

  // Add row with two columns: image | content
  cells.push([imageCell, contentCell]);

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Teaser', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
