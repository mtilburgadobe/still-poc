/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-hero block
 *
 * Source: https://www.still.de/
 * Base Block: carousel
 *
 * Block Structure:
 * - Row 1: Block name header ("Carousel-Hero")
 * - Row 2-N: Slide rows (image | content with heading, text, CTA)
 *
 * Source HTML Pattern:
 * <section class="content-stage-slideshow">
 *   <article class="content-stage-slideshow__slide">
 *     <div class="content-stage-slideshow__slide-img-wrap">
 *       <img class="content-stage-slideshow__slide-img" src="..." />
 *     </div>
 *     <div class="content-stage-slideshow__slide-content">
 *       <h2 class="content-stage-slideshow__slide-headline">...</h2>
 *       <p class="content-stage-slideshow__slide-text">...</p>
 *       <a class="btn" href="...">CTA</a>
 *     </div>
 *   </article>
 * </section>
 *
 * Generated: 2026-01-20
 */
export default function parse(element, { document }) {
  // Find all slides in the carousel
  const slides = element.querySelectorAll('.content-stage-slideshow__slide:not(.slick-cloned)');

  // Build cells array - each slide becomes a row
  const cells = [];

  slides.forEach((slide) => {
    // Extract slide image
    const slideImage = slide.querySelector('.content-stage-slideshow__slide-img');

    // Extract slide content
    const heading = slide.querySelector('.content-stage-slideshow__slide-headline, h2, h1');
    const text = slide.querySelector('.content-stage-slideshow__slide-text, p');
    const ctaLink = slide.querySelector('.content-stage-slideshow__slide-btn-wrap a, a.btn, .btn');

    // Create image cell
    const imageCell = [];
    if (slideImage) {
      const img = document.createElement('img');
      img.src = slideImage.src;
      img.alt = slideImage.alt || '';
      imageCell.push(img);
    }

    // Create content cell with heading, text, and CTA
    const contentCell = [];
    if (heading) {
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent.trim();
      contentCell.push(h2);
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
    if (imageCell.length > 0 || contentCell.length > 0) {
      cells.push([imageCell, contentCell]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Carousel-Hero', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
