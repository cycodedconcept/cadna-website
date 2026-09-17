// Assets extracted from Master PRD pages 82–89; editorial scenes generated for this revision.
const base = import.meta.env.BASE_URL + "images/cadna/";
// Additional organizations listed in the supplied PRD. Public logo sources are recorded in docs/website-corrections.md.
export const widerNetwork = [
  { name: 'Renmoney', src: 'clients/renmoney.svg', width: 792, height: 254, dark: true },
  { name: 'Hallmack Finance' },
  { name: 'Sthenic Financials', src: 'clients/sthenic.svg', width: 125, height: 125 },
  { name: 'The Burgeoning House', src: 'clients/burgeoning.webp', width: 300, height: 91 },
  { name: 'Manharttan Capital' },
  { name: 'Letshego', src: 'clients/letshego.webp', width: 480, height: 154 },
].map(client => ({ ...client, ...(client.src ? { src: base + client.src } : {}) }));
const assets = {
  "eventus": {
    "src": "people/eventus.webp",
    "width": 431,
    "height": 657,
    "alt": "Portrait of Eventus Agwu-Idam"
  },
  "stephanie": {
    "src": "people/stephanie.webp",
    "width": 418,
    "height": 572,
    "alt": "Portrait of Stephanie Okpala"
  },
  "cyril": {
    "src": "people/cyril-960.webp",
    "srcSet": `${base}people/cyril-480.webp 480w, ${base}people/cyril-960.webp 960w`,
    "width": 960,
    "height": 960,
    "objectPosition": "center top",
    "alt": "Portrait of Cyril Okeleke"
  },
  "olawande": {
    "src": "people/olawande.webp",
    "width": 411,
    "height": 556,
    "alt": "Portrait of Olawande Olowoyeye"
  },
  "john": {
    "src": "people/john.webp",
    "width": 418,
    "height": 436,
    "alt": "Portrait of John Ogunlela"
  },
  "mary": {
    "src": "people/mary.webp",
    "width": 507,
    "height": 647,
    "alt": "Portrait of Mary Edeh Nee-Opata"
  },
  "temitayo": {
    "src": "people/temitayo.webp",
    "width": 474,
    "height": 664,
    "alt": "Portrait of Temitayo Adewole"
  },
  "ikechukwu": {
    "objectPosition": "center top",
    "src": "people/ikechukwu.webp",
    "width": 379,
    "height": 531,
    "alt": "Portrait of Ikechukwu Kalu"
  },
  "olawale": {
    "objectPosition": "center top",
    "src": "people/olawale.webp",
    "width": 331,
    "height": 496,
    "alt": "Portrait of Olawale S. Amoussa"
  },
  "logisticsStory": {
    "src": "logisticsStory-1200.webp",
    "width": 1200,
    "height": 800,
    "alt": "Illustrative logistics scene: a dispatcher coordinating deliveries at a depot",
    "widths": [
      480,
      768,
      1200
    ]
  },
  "founderStory": {
    "src": "founderStory-1200.webp",
    "width": 1200,
    "height": 800,
    "alt": "Illustrative scene of Nigerian entrepreneurs reviewing products in a manufacturing studio",
    "widths": [
      480,
      768,
      1200
    ]
  },
  "technologyStory": {
    "src": "technologyStory-1200.webp",
    "width": 1200,
    "height": 800,
    "alt": "Illustrative scene of a technology team reviewing a digital workflow",
    "widths": [
      480,
      768,
      1200
    ]
  }
};
export const correctionImages = Object.fromEntries(Object.entries(assets).map(([key, image]) => [key, { ...image, src: base + image.src, ...(image.widths ? { srcSet: image.widths.map(width => `${base}${key}-${width}.webp ${width}w`).join(", ") } : {}) }]));
export const clients = [
  {
    "name": "Attachy",
    "src": "clients/87-0.webp",
    "width": 252,
    "height": 159,
    "dark": false
  },
  {
    "name": "Beacon Light Schools",
    "src": "clients/87-1.webp",
    "width": 231,
    "height": 256,
    "dark": false
  },
  {
    "name": "CrestView Advisory",
    "src": "clients/87-2.webp",
    "width": 480,
    "height": 119,
    "dark": true
  },
  {
    "name": "EarlMend Communications",
    "src": "clients/87-3.webp",
    "width": 295,
    "height": 86,
    "dark": false
  },
  {
    "name": "ECISL",
    "src": "clients/87-4.webp",
    "width": 317,
    "height": 320,
    "dark": false
  },
  {
    "name": "Ecomatera",
    "src": "clients/87-6.webp",
    "width": 480,
    "height": 161,
    "dark": false
  },
  {
    "name": "Ekodrop Logistics",
    "src": "clients/87-7.webp",
    "width": 280,
    "height": 70,
    "dark": false
  },
  {
    "name": "Tower Husbandry Farm",
    "src": "clients/87-8.webp",
    "width": 367,
    "height": 320,
    "dark": false
  },
  {
    "name": "Nclusoft Technologies",
    "src": "clients/87-9.webp",
    "width": 480,
    "height": 108,
    "dark": true
  },
  {
    "name": "JTK Global Consults",
    "src": "clients/88-0.webp",
    "width": 256,
    "height": 320,
    "dark": false
  },
  {
    "name": "Kent Harris and Company",
    "src": "clients/88-1.webp",
    "width": 276,
    "height": 132,
    "dark": false
  },
  {
    "name": "Lockahs",
    "src": "clients/88-2.webp",
    "width": 480,
    "height": 105,
    "dark": false
  },
  {
    "name": "Tower College of Health Science & Management",
    "src": "clients/88-3.webp",
    "width": 197,
    "height": 46,
    "dark": false
  },
  {
    "name": "Orion Pest",
    "src": "clients/88-4.webp",
    "width": 350,
    "height": 78,
    "dark": false
  },
  {
    "name": "Rochester Platforms Services",
    "src": "clients/88-5.webp",
    "width": 230,
    "height": 228,
    "dark": false
  },
  {
    "name": "ESFAM-Benin University",
    "src": "clients/89-0.webp",
    "width": 300,
    "height": 272,
    "dark": false
  },
  {
    "name": "Totes Adorbsz",
    "src": "clients/89-1.webp",
    "width": 273,
    "height": 185,
    "dark": false
  },
  {
    "name": "Western Coast Maritime Academy",
    "src": "clients/89-2.webp",
    "width": 320,
    "height": 320,
    "dark": false
  },
  {
    "name": "Kiki Kash",
    "src": "clients/89-3.webp",
    "width": 480,
    "height": 132,
    "dark": false
  },
  {
    "name": "Flip Farm Resort",
    "src": "clients/89-4.webp",
    "width": 60,
    "height": 80,
    "dark": false
  },
  {
    "name": "Zeconz Enterprise",
    "src": "clients/89-5.webp",
    "width": 320,
    "height": 320,
    "dark": true
  }
].map(client => ({ ...client, src: base + client.src }));
