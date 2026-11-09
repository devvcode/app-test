const diya = {
  id: "diya-glow",
  image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/The_Diwali_Diya.jpg",
  alt: "A traditional Diwali diya glowing against a deep, dark background.",
  title: "A little flame, a thousand hopes",
  category: "Diyas",
  caption: "The quiet warmth of a single lamp.",
  credit: "Ramesh NG",
  source: "https://commons.wikimedia.org/wiki/File:The_Diwali_Diya.jpg",
  license: "CC BY-SA 2.0"
};

const family = {
  id: "family-lights",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Diwali_Celebration_01.jpg/1280px-Diwali_Celebration_01.jpg",
  alt: "An Indian family lighting traditional diyas together during Diwali.",
  title: "The brightest moments are shared",
  category: "Togetherness",
  caption: "A family lights lamps together on Diwali.",
  credit: "Arnav",
  source: "https://commons.wikimedia.org/wiki/File:Diwali_Celebration_01.jpg",
  license: "CC BY-SA 4.0"
};

const fireworks = {
  id: "fireworks-night",
  image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Diwali_Fireworks.jpg",
  alt: "Fireworks illuminate the night sky during Diwali.",
  title: "A sky full of wonder",
  category: "Fireworks",
  caption: "A burst of light above the night.",
  credit: "Wind Hashira",
  source: "https://commons.wikimedia.org/wiki/File:Diwali_Fireworks.jpg",
  license: "CC BY-SA 4.0"
};

const rangoli = {
  id: "rangoli-colours",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Rangoli_during_diwali.jpg/1280px-Rangoli_during_diwali.jpg",
  alt: "A colourful rangoli design with a glowing diya at its centre.",
  title: "Colour, patience and celebration",
  category: "Rangoli",
  caption: "Rangoli brings colour to the threshold.",
  credit: "Sunidhi243",
  source: "https://commons.wikimedia.org/wiki/File:Rangoli_during_diwali.jpg",
  license: "CC BY-SA 4.0"
};

const rangoliDiya = {
  id: "rangoli-diya",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Rangoli_and_Diya.jpg/1280px-Rangoli_and_Diya.jpg",
  alt: "A flower-shaped rangoli design surrounding a lit diya.",
  title: "Where colour meets light",
  category: "Rangoli",
  caption: "A diya at the heart of a festive rangoli.",
  credit: "Kushal Patel 07",
  source: "https://commons.wikimedia.org/wiki/File:Rangoli_and_Diya.jpg",
  license: "CC BY-SA 4.0"
};

// These four gallery images were supplied by the site owner.
// Their original creator and licence details were not included with the URLs.
const suppliedPinterestImages = [
  {
    id: "pinterest-diwali-01",
    image: "https://i.pinimg.com/1200x/75/d2/63/75d26371c7e097fade41b316c9a44abe.jpg",
    alt: "Diwali celebration photograph supplied by the site owner.",
    title: "A night wrapped in light",
    category: "Celebration",
    caption: "A festive moment from the celebration of Diwali.",
    credit: "Site-supplied Pinterest image",
    source: "https://i.pinimg.com/1200x/75/d2/63/75d26371c7e097fade41b316c9a44abe.jpg",
    license: "Original creator and image licence not identified; confirm permission before reuse.",
    fallbackImage: family.image
  },
  {
    id: "pinterest-diwali-02",
    image: "https://i.pinimg.com/736x/7c/17/6b/7c176b2c32792010dafe2d8bdb161bc8.jpg",
    alt: "Diwali celebration photograph supplied by the site owner.",
    title: "Let the evening glow",
    category: "Celebration",
    caption: "A little festive inspiration for a season of togetherness.",
    credit: "Site-supplied Pinterest image",
    source: "https://i.pinimg.com/736x/7c/17/6b/7c176b2c32792010dafe2d8bdb161bc8.jpg",
    license: "Original creator and image licence not identified; confirm permission before reuse.",
    fallbackImage: diya.image
  },
  {
    id: "pinterest-diwali-03",
    image: "https://i.pinimg.com/736x/0f/dc/6c/0fdc6ca0275441dfce34b720894504a4.jpg",
    alt: "Diwali celebration photograph supplied by the site owner.",
    title: "Tradition in every detail",
    category: "Celebration",
    caption: "A celebration shaped by colour, light and meaningful rituals.",
    credit: "Site-supplied Pinterest image",
    source: "https://i.pinimg.com/736x/0f/dc/6c/0fdc6ca0275441dfce34b720894504a4.jpg",
    license: "Original creator and image licence not identified; confirm permission before reuse.",
    fallbackImage: rangoli.image
  },
  {
    id: "pinterest-diwali-04",
    image: "https://i.pinimg.com/736x/72/73/c5/7273c5b36d89155d1e576ef231866f2f.jpg",
    alt: "Diwali celebration photograph supplied by the site owner.",
    title: "Make room for magic",
    category: "Celebration",
    caption: "May the season bring brightness to every home and heart.",
    credit: "Site-supplied Pinterest image",
    source: "https://i.pinimg.com/736x/72/73/c5/7273c5b36d89155d1e576ef231866f2f.jpg",
    license: "Original creator and image licence not identified; confirm permission before reuse.",
    fallbackImage: rangoliDiya.image
  }
];

// The header keeps the original five image slides and does not use the new Pinterest images.
export const heroSlides = [
  {
    id: "welcome",
    image: family.image,
    alt: family.alt,
    eyebrow: "THE FESTIVAL OF LIGHTS",
    title: "A thousand little lights.",
    emphasis: "One beautiful celebration.",
    description: "A season of warmth, new beginnings and the joy of being together.",
    theme: "gold"
  },
  {
    id: "diyas",
    image: diya.image,
    alt: diya.alt,
    eyebrow: "A LIGHT WITHIN",
    title: "Let every little flame",
    emphasis: "carry a little hope.",
    description: "Across doorways and courtyards, a diya turns an ordinary evening into something special.",
    theme: "rose"
  },
  {
    id: "fireworks",
    image: fireworks.image,
    alt: fireworks.alt,
    eyebrow: "THE NIGHT SKY",
    title: "Tonight, the sky",
    emphasis: "celebrates with us.",
    description: "A moment of wonder, colour and light against the quiet of the night.",
    theme: "blue"
  },
  {
    id: "rangoli",
    image: rangoli.image,
    alt: rangoli.alt,
    eyebrow: "COLOURS OF DEEPAWALI",
    title: "Every colour",
    emphasis: "has a story.",
    description: "Patterns made with care welcome the season at the threshold of home.",
    theme: "pink"
  },
  {
    id: "together",
    image: rangoliDiya.image,
    alt: rangoliDiya.alt,
    eyebrow: "A CELEBRATION OF TOGETHERNESS",
    title: "Make room for",
    emphasis: "more light.",
    description: "May every home find peace, every heart find joy and every new beginning shine.",
    theme: "gold"
  }
];

// The gallery contains the five original Commons photographs plus the four supplied images.
export const galleryPhotos = [
  family,
  diya,
  fireworks,
  rangoli,
  rangoliDiya,
  ...suppliedPinterestImages
];

export const photoCredits = [
  {
    name: "Diwali Celebration 01.jpg",
    author: "Arnav",
    license: "CC BY-SA 4.0",
    source: family.source,
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "The Diwali Diya.jpg",
    author: "Ramesh NG",
    license: "CC BY-SA 2.0",
    source: diya.source,
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/"
  },
  {
    name: "Diwali Fireworks.jpg",
    author: "Wind Hashira",
    license: "CC BY-SA 4.0",
    source: fireworks.source,
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Rangoli during diwali.jpg",
    author: "Sunidhi243",
    license: "CC BY-SA 4.0",
    source: rangoli.source,
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  {
    name: "Rangoli and Diya.jpg",
    author: "Kushal Patel 07",
    license: "CC BY-SA 4.0",
    source: rangoliDiya.source,
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  ...suppliedPinterestImages.map((photo, index) => ({
    name: "Site-owner supplied Pinterest image " + (index + 1),
    author: photo.credit,
    license: photo.license,
    source: photo.source,
    licenseUrl: null
  }))
];

export const galleryCategories = [
  "All moments",
  "Diyas",
  "Fireworks",
  "Rangoli",
  "Togetherness",
  "Celebration"
];
