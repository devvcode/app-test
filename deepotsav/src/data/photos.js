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
    eyebrow: "COLOURS OF DEEPAVALI",
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

export const galleryPhotos = [
  family,
  diya,
  fireworks,
  rangoli,
  rangoliDiya,
  {
    ...family,
    id: "family-again",
    title: "A tradition passed hand to hand",
    caption: "Little rituals become the memories we keep."
  },
  {
    ...rangoli,
    id: "rangoli-detail",
    title: "A welcome made of colour",
    caption: "A festive pattern at the entrance of home."
  },
  {
    ...fireworks,
    id: "night-sparks",
    title: "A moment in the night",
    caption: "The sparkle of a shared celebration."
  }
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
  }
];

export const galleryCategories = ["All moments", "Diyas", "Fireworks", "Rangoli", "Togetherness"];
