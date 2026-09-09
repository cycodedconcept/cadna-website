// Responsive exports prepared from the supplied CADNA image archive.
const base = import.meta.env.BASE_URL + 'images/cadna/';
const photos = {
  "leadership": {
    "width": 1536,
    "height": 1024,
    "widths": [
      480,
      768,
      1200,
      1536
    ],
    "alt": "Four business leaders in formal attire, looking ahead with confidence"
  },
  "business": {
    "width": 1024,
    "height": 1024,
    "widths": [
      480,
      768,
      1024
    ],
    "alt": "Business advisers reviewing a growth strategy around a boardroom table"
  },
  "education": {
    "width": 1200,
    "height": 800,
    "widths": [
      480,
      768,
      1200
    ],
    "alt": "Colleagues sharing ideas during a collaborative team learning session"
  },
  "financial": {
    "width": 1024,
    "height": 1024,
    "widths": [
      480,
      768,
      1024
    ],
    "alt": "Executives reviewing financial charts in a private evening briefing"
  },
  "technology": {
    "width": 1024,
    "height": 1024,
    "widths": [
      480,
      768,
      1024
    ],
    "alt": "A concierge professional working with digital tools at his office desk"
  },
  "technology-solutions": {
    "width": 596,
    "height": 378,
    "widths": [480, 596],
    "alt": "CADNA technology solutions shown on laptops and phones: AssessAcad, GadaFunds, a logistics platform and CADNA-MART"
  },
  "collaboration": {
    "width": 1200,
    "height": 800,
    "widths": [
      480,
      768,
      1200
    ],
    "alt": "A collaborative team working together on a laptop in a shared workspace"
  },
  "listening": {
    "width": 1200,
    "height": 856,
    "widths": [
      480,
      768,
      1200
    ],
    "alt": "An adviser listening to two clients during a business consultation"
  },
  "boardroom": {
    "width": 1024,
    "height": 1024,
    "widths": [
      480,
      768,
      1024
    ],
    "alt": "A cross-functional team planning together around a boardroom table"
  }
};

export const images = Object.fromEntries(Object.entries(photos).map(([key, image]) => [key, {
  ...image,
  src: base + key + '-' + image.width + '.webp',
  srcSet: image.widths.map((width) => base + key + '-' + width + '.webp ' + width + 'w').join(', '),
}]));

export const serviceIcon = (key) => base + key + '-icon.png';

// Reuse the supplied four-panel artwork without resampling its small mockups.
// ProductArtwork displays the relevant quadrant with a CSS viewport.
Object.assign(images, Object.fromEntries([
  ['assessacad', 'AssessAcad assessment platform on a laptop and phone', 0, 0],
  ['gadafunds', 'GadaFunds crowdfunding platform on a laptop and phone', 1, 0],
  ['logisticsPlatform', 'Logistics platform dispatch map on a laptop and phone', 0, 1],
  ['cadnaMart', 'CADNA-Mart marketplace on a laptop and phone', 1, 1],
].map(([key, alt, column, row]) => [key, { ...images['technology-solutions'], alt, crop: { column, row } }])));
