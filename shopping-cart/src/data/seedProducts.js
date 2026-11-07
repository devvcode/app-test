const image = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=82`;

export const seedProducts = [
  {
    id: "seed-apples", title: "Orchard Pink Lady Apples", description: "Crisp, naturally sweet apples selected for everyday snacking and lunch boxes.",
    category: "groceries", department: "groceries", price: 189, originalPrice: 229, currency: "INR",
    images: [image("photo-1560806887-1e4cd0b6cbd6")], thumbnail: image("photo-1560806887-1e4cd0b6cbd6"),
    rating: 4.8, reviewCount: 124, stock: 35, brand: "Orchard Select", tags: ["fresh", "fruit"], isFeatured: true, unit: "1 kg"
  },
  {
    id: "seed-olive-oil", title: "Cold Pressed Extra Virgin Olive Oil", description: "A smooth everyday finishing oil for salads, pastas and warm bread.",
    category: "groceries", department: "groceries", price: 649, originalPrice: 749, currency: "INR",
    images: [image("photo-1474979266404-7eaacbcd87c5")], thumbnail: image("photo-1474979266404-7eaacbcd87c5"),
    rating: 4.7, reviewCount: 88, stock: 22, brand: "Olive Grove", tags: ["pantry", "cooking"], isFeatured: true, unit: "500 ml"
  },
  {
    id: "seed-tomatoes", title: "Vine-Ripened Cherry Tomatoes", description: "Bright, juicy tomatoes ready for salads, toast and quick weekday meals.",
    category: "groceries", department: "groceries", price: 119, originalPrice: 139, currency: "INR",
    images: [image("photo-1546094096-0df4bcaaa337")], thumbnail: image("photo-1546094096-0df4bcaaa337"),
    rating: 4.6, reviewCount: 61, stock: 48, brand: "Farm Basket", tags: ["fresh", "vegetables"], isFeatured: false, unit: "500 g"
  },
  {
    id: "seed-honey", title: "Wildflower Raw Honey", description: "A fragrant, golden pantry staple for tea, yoghurt and weekend toast.",
    category: "groceries", department: "groceries", price: 329, originalPrice: 379, currency: "INR",
    images: [image("photo-1587049352846-4a222e784d38")], thumbnail: image("photo-1587049352846-4a222e784d38"),
    rating: 4.9, reviewCount: 102, stock: 19, brand: "Meadow & Hive", tags: ["pantry", "natural"], isFeatured: true, unit: "350 g"
  },
  {
    id: "seed-vase", title: "Sculpted Stoneware Vase", description: "A softly textured vase that looks just as good with a single stem as it does on its own.",
    category: "home-decoration", department: "home-living", price: 1190, originalPrice: 1490, currency: "INR",
    images: [image("photo-1578500494198-246f612d3b3d")], thumbnail: image("photo-1578500494198-246f612d3b3d"),
    rating: 4.8, reviewCount: 73, stock: 14, brand: "Morrow Home", tags: ["decor", "ceramic"], isFeatured: true
  },
  {
    id: "seed-lamp", title: "Linen Shade Table Lamp", description: "Warm ambient light and a natural linen shade for bedside tables and reading corners.",
    category: "home-decoration", department: "home-living", price: 2490, originalPrice: 2990, currency: "INR",
    images: [image("photo-1507473885765-e6ed057f782c")], thumbnail: image("photo-1507473885765-e6ed057f782c"),
    rating: 4.7, reviewCount: 46, stock: 8, brand: "Morrow Home", tags: ["lighting", "living"], isFeatured: true
  },
  {
    id: "seed-throw", title: "Woven Cotton Throw", description: "A breathable, soft layer for the sofa, guest room or a slow Sunday morning.",
    category: "home-decoration", department: "home-living", price: 1590, originalPrice: 1890, currency: "INR",
    images: [image("photo-1600210492486-724fe5c67fb0")], thumbnail: image("photo-1600210492486-724fe5c67fb0"),
    rating: 4.5, reviewCount: 39, stock: 17, brand: "Morrow Home", tags: ["textiles", "cotton"], isFeatured: false
  },
  {
    id: "seed-mug", title: "Everyday Ceramic Mug Set", description: "A pair of gently speckled mugs for morning coffee and afternoon tea.",
    category: "kitchen-accessories", department: "home-living", price: 890, originalPrice: 1090, currency: "INR",
    images: [image("photo-1514228742587-6b1558fcca3d")], thumbnail: image("photo-1514228742587-6b1558fcca3d"),
    rating: 4.9, reviewCount: 91, stock: 25, brand: "Morrow Home", tags: ["kitchen", "ceramic"], isFeatured: false
  },
  {
    id: "seed-dress", title: "Sunday Linen Midi Dress", description: "An easy, breathable silhouette made for warm afternoons and plans that turn into dinner.",
    category: "womens-dresses", department: "fashion", price: 2290, originalPrice: 2790, currency: "INR",
    images: [image("photo-1515372039744-b8f02a3ae446")], thumbnail: image("photo-1515372039744-b8f02a3ae446"),
    rating: 4.8, reviewCount: 116, stock: 12, brand: "The Good Edit", tags: ["linen", "everyday"], isFeatured: true,
    variantOptions: { sizes: ["XS", "S", "M", "L", "XL"], colors: ["Sand", "Olive", "Black"] }
  },
  {
    id: "seed-shirt", title: "Relaxed Cotton Poplin Shirt", description: "A versatile, softly structured shirt to wear tucked, layered or loose.",
    category: "tops", department: "fashion", price: 1490, originalPrice: 1790, currency: "INR",
    images: [image("photo-1598554747436-c9293d6a588f")], thumbnail: image("photo-1598554747436-c9293d6a588f"),
    rating: 4.6, reviewCount: 67, stock: 20, brand: "The Good Edit", tags: ["cotton", "wardrobe"], isFeatured: false,
    variantOptions: { sizes: ["XS", "S", "M", "L", "XL"], colors: ["White", "Sky", "Sage"] }
  },
  {
    id: "seed-tote", title: "Daily Canvas Market Tote", description: "A sturdy everyday carry-all for market mornings, books and everything in between.",
    category: "womens-bags", department: "fashion", price: 790, originalPrice: 990, currency: "INR",
    images: [image("photo-1590874103328-eac38a683ce7")], thumbnail: image("photo-1590874103328-eac38a683ce7"),
    rating: 4.7, reviewCount: 54, stock: 31, brand: "The Good Edit", tags: ["accessories", "everyday"], isFeatured: true
  },
  {
    id: "seed-earrings", title: "Organic Shape Brass Earrings", description: "Sculptural, lightweight earrings that bring a little shine to simple outfits.",
    category: "womens-jewellery", department: "fashion", price: 990, originalPrice: 1190, currency: "INR",
    images: [image("photo-1535632066927-ab7c9ab60908")], thumbnail: image("photo-1535632066927-ab7c9ab60908"),
    rating: 4.5, reviewCount: 42, stock: 18, brand: "The Good Edit", tags: ["jewellery", "brass"], isFeatured: false
  }
];

export default seedProducts;
