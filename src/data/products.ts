export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "men" | "women" | "accessories";
  subcategory: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
  tags: string[];
};

const img = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800&q=80`;

export const products: Product[] = [
  {
    id: "p1",
    name: "Cashmere Wool Overcoat",
    brand: "AK Clothes",
    category: "men",
    subcategory: "Outerwear",
    price: 289,
    originalPrice: 389,
    image: img("16952978"),
    images: [img("16952978"), img("16069733"), img("12780639")],
    colors: [
      { name: "Camel", hex: "#c19a6b" },
      { name: "Charcoal", hex: "#36454f" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Tailored from a luxurious cashmere-wool blend, this overcoat is the pinnacle of cold-weather sophistication. Notched lapels, double-breasted closure, and a clean drape that flatters every silhouette.",
    rating: 4.9,
    reviews: 214,
    isBestseller: true,
    tags: ["winter", "premium", "outerwear"],
  },
  {
    id: "p2",
    name: "Saree",
    brand: "Saree ",
    category: "men",
    subcategory: "Saree",
    price: 9000,
    image: "/public/images/WhatsApp Image 2026-07-21 at 4.17.28 PM.jpeg",
    images: ["/public/images/WhatsApp Image 2026-07-21 at 4.17.28 PM.jpeg"],
    colors: [
      { name: "Cognac", hex: "#834333" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Full-grain Italian leather bomber with ribbed cuffs and a timeless silhouette. Ages beautifully, developing a unique patina over time.",
    rating: 4.8,
    reviews: 178,
    isNew: true,
    tags: ["leather", "premium", "jacket"],
  },
  {
    id: "p3",
    name: "Crimson Bomber Jacket",
    brand: "Urban Collective",
    category: "men",
    subcategory: "Jackets",
    price: 168,
    originalPrice: 210,
    image: img("16069733"),
    images: [img("16069733"), img("15869823")],
    colors: [
      { name: "Red", hex: "#b91c1c" },
      { name: "Navy", hex: "#1e3a5f" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Make a statement in this vivid crimson bomber. Lightweight, water-resistant shell with satin lining and zip pockets.",
    rating: 4.6,
    reviews: 92,
    tags: ["bomber", "statement"],
  },
  {
    id: "p4",
    name: "Denim Trucker Jacket",
    brand: "Heritage Co.",
    category: "men",
    subcategory: "Jackets",
    price: 129,
    image: img("12780639"),
    images: [img("12780639"), img("11160573")],
    colors: [
      { name: "Indigo", hex: "#3f51b5" },
      { name: "Stone", hex: "#8b7d6b" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Classic trucker jacket in premium rigid denim. Built to last with reinforced stitching and a vintage-inspired wash.",
    rating: 4.7,
    reviews: 156,
    isBestseller: true,
    tags: ["denim", "classic"],
  },
  {
    id: "p5",
    name: "Statement Graphic Tee",
    brand: "Urban Collective",
    category: "men",
    subcategory: "T-Shirts",
    price: 49,
    image: img("12780647"),
    images: [img("12780647"), img("11160573")],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#111111" },
      { name: "Sand", hex: "#e2c9a6" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Heavyweight 100% organic cotton tee with an exclusive front print. Relaxed fit with a structured collar that holds its shape.",
    rating: 4.5,
    reviews: 234,
    isNew: true,
    tags: ["tee", "casual"],
  },
  {
    id: "p6",
    name: "Forest Casual Shirt",
    brand: "Heritage Co.",
    category: "men",
    subcategory: "Shirts",
    price: 79,
    originalPrice: 99,
    image: img("11160573"),
    images: [img("11160573"), img("12780647")],
    colors: [
      { name: "Olive", hex: "#556b2f" },
      { name: "White", hex: "#ffffff" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Breathable linen-cotton shirt with mother-of-pearl buttons. Perfect for warm-weather styling, dressed up or down.",
    rating: 4.6,
    reviews: 87,
    tags: ["shirt", "casual", "summer"],
  },
  {
    id: "p7",
    name: "Crimson Evening Dress",
    brand: "AK Clothes",
    category: "women",
    subcategory: "Dresses",
    price: 198,
    originalPrice: 260,
    image: img("33045452"),
    images: [img("33045452"), img("38164254"), img("37032483")],
    colors: [
      { name: "Crimson", hex: "#b91c1c" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "A showstopping floor-length gown in flowing crimson crepe. Cinched waist, subtle thigh-high slit, and a flattering V-neckline.",
    rating: 4.9,
    reviews: 142,
    isBestseller: true,
    tags: ["dress", "evening", "premium"],
  },
  {
    id: "p8",
    name: "Striped Riviera Outfit",
    brand: "Maison Noir",
    category: "women",
    subcategory: "Sets",
    price: 159,
    image: img("38023321"),
    images: [img("38023321"), img("8989608")],
    colors: [
      { name: "Blue Stripe", hex: "#3b82f6" },
      { name: "Black Stripe", hex: "#111111" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Effortless Riviera-style co-ord set. Breathable cotton-poplin with a relaxed-fit blouse and matching wide-leg trousers.",
    rating: 4.7,
    reviews: 68,
    isNew: true,
    tags: ["set", "summer", "casual"],
  },
  {
    id: "p9",
    name: "Sunny Day Hoodie",
    brand: "Urban Collective",
    category: "women",
    subcategory: "Tops",
    price: 68,
    image: img("3609558"),
    images: [img("3609558"), img("8346261")],
    colors: [
      { name: "Mustard", hex: "#e1ad01" },
      { name: "Cream", hex: "#f5e6d3" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Ultra-soft fleece-lined hoodie in a cheerful mustard hue. Oversized fit with a kangaroo pocket and adjustable drawstring hood.",
    rating: 4.8,
    reviews: 312,
    isBestseller: true,
    tags: ["hoodie", "casual", "comfort"],
  },
  {
    id: "p10",
    name: "Stage Light Cocktail Dress",
    brand: "AK Clothes",
    category: "women",
    subcategory: "Dresses",
    price: 175,
    image: img("38164254"),
    images: [img("38164254"), img("33045452")],
    colors: [
      { name: "Champagne", hex: "#f7e7c4" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "An elegant midi dress with a draped bodice and subtle shimmer. Designed to move beautifully under any lighting.",
    rating: 4.9,
    reviews: 96,
    isNew: true,
    tags: ["dress", "cocktail", "premium"],
  },
  {
    id: "p11",
    name: "Summer Breeze Sundress",
    brand: "Maison Noir",
    category: "women",
    subcategory: "Dresses",
    price: 119,
    originalPrice: 149,
    image: img("37520907"),
    images: [img("37520907"), img("15759101")],
    colors: [
      { name: "Floral", hex: "#e85d75" },
      { name: "Sky", hex: "#87ceeb" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Lightweight sundress with a playful floral print, adjustable straps, and a flattering A-line skirt. Your new summer go-to.",
    rating: 4.6,
    reviews: 124,
    tags: ["dress", "summer", "floral"],
  },
  {
    id: "p12",
    name: "Cozy Knit Sweater Dress",
    brand: "Heritage Co.",
    category: "women",
    subcategory: "Knitwear",
    price: 98,
    image: img("37032483"),
    images: [img("37032483"), img("8989608")],
    colors: [
      { name: "Rust", hex: "#a0522d" },
      { name: "Cream", hex: "#f5e6d3" },
      { name: "Charcoal", hex: "#36454f" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Chunky knit sweater dress in warm rust tones. Cozy, oversized, and impossibly soft — perfect for crisp autumn days.",
    rating: 4.8,
    reviews: 187,
    isBestseller: true,
    tags: ["knitwear", "winter", "cozy"],
  },
  {
    id: "p13",
    name: "Street Style Denim Overalls",
    brand: "Urban Collective",
    category: "women",
    subcategory: "Denim",
    price: 89,
    image: img("19748803"),
    images: [img("19748803"), img("3609558")],
    colors: [
      { name: "Light Wash", hex: "#7e9bbf" },
      { name: "Dark Wash", hex: "#2c3e50" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Vintage-inspired denim overalls with adjustable straps and a relaxed straight leg. Layer over a tee or wear solo.",
    rating: 4.5,
    reviews: 73,
    isNew: true,
    tags: ["denim", "casual", "streetwear"],
  },
  {
    id: "p14",
    name: "Minimalist White Sneakers",
    brand: "Maison Noir",
    category: "accessories",
    subcategory: "Footwear",
    price: 135,
    originalPrice: 165,
    image: img("12628400"),
    images: [img("12628400"), img("11324518"), img("11324548")],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Cream", hex: "#f5e6d3" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    description:
      "Premium leather sneakers with a clean minimalist profile. Cushioned insole, vulcanized rubber sole, and timeless design.",
    rating: 4.8,
    reviews: 421,
    isBestseller: true,
    tags: ["sneakers", "footwear", "premium"],
  },
  {
    id: "p15",
    name: "Heritage Leather Tote",
    brand: "AK Clothes",
    category: "accessories",
    subcategory: "Bags",
    price: 219,
    image: img("8412739"),
    images: [img("8412739"), img("8412790"), img("28645956")],
    colors: [
      { name: "Tan", hex: "#d2b48c" },
      { name: "Black", hex: "#111111" },
      { name: "Burgundy", hex: "#5c1a1a" },
    ],
    sizes: ["One Size"],
    description:
      "Hand-finished leather tote with a spacious interior, suede lining, and gold-tone hardware. A wardrobe investment piece.",
    rating: 4.9,
    reviews: 156,
    isBestseller: true,
    tags: ["bag", "leather", "premium"],
  },
  {
    id: "p16",
    name: "Weekender Duffel Bag",
    brand: "Heritage Co.",
    category: "accessories",
    subcategory: "Bags",
    price: 159,
    image: img("8412790"),
    images: [img("8412790"), img("8412739")],
    colors: [
      { name: "Cognac", hex: "#834333" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["One Size"],
    description:
      "Full-grain leather weekender with brass hardware and a detachable shoulder strap. Travels in style for years.",
    rating: 4.7,
    reviews: 89,
    isNew: true,
    tags: ["bag", "leather", "travel"],
  },
  {
    id: "p17",
    name: "Aviator Sunglasses",
    brand: "Maison Noir",
    category: "accessories",
    subcategory: "Eyewear",
    price: 79,
    originalPrice: 99,
    image: img("16861662"),
    images: [img("16861662"), img("15869822")],
    colors: [
      { name: "Gold", hex: "#d4af37" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["One Size"],
    description:
      "Classic aviator silhouette with UV400 polarized lenses and a lightweight metal frame. Includes leather case.",
    rating: 4.6,
    reviews: 234,
    tags: ["sunglasses", "eyewear", "accessory"],
  },
  {
    id: "p18",
    name: "Linen Wide-Leg Trousers",
    brand: "Heritage Co.",
    category: "women",
    subcategory: "Trousers",
    price: 89,
    image: img("8989608"),
    images: [img("8989608"), img("38023321")],
    colors: [
      { name: "Sand", hex: "#e2c9a6" },
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Flowy wide-leg trousers in breathable linen. High-waisted with a flattering drape and side pockets.",
    rating: 4.7,
    reviews: 145,
    isBestseller: true,
    tags: ["trousers", "linen", "summer"],
  },
  {
    id: "p19",
    name: "Elegant Navy Saree",
    brand: "Anabiya's Wear",
    category: "women",
    subcategory: "Sarees",
    price: 8500,
    image: "/public/images/WhatsApp Image 2026-07-21 at 4.16.27 PM.jpeg",
    images: ["//public/images/WhatsApp Image 2026-07-21 at 4.16.27 PM.jpeg"],
    colors: [
      { name: "Navy Blue", hex: "#1e3a8a" },
    ],
    sizes: ["One Size"],
    description:
      "Exquisite navy blue saree in premium fabric with subtle embellishments. Perfect for special occasions and elegant evening events.",
    rating: 4.8,
    reviews: 42,
    isNew: true,
    tags: ["saree", "ethnic", "premium", "occasion-wear"],
  },
  {
    id: "p20",
    name: "Designer Lehenga Set - Cream & Red",
    brand: "AnabiyaWear",
    category: "women",
    subcategory: "Lehengas",
    price: 14000,
    originalPrice: 16500,
    image: "/images/cream-red-lehenga.jpg",
    images: ["/images/cream-red-lehenga.jpg"],
    colors: [
      { name: "Cream", hex: "#f5f5dc" },
      { name: "Red", hex: "#dc2626" },
    ],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Stunning three-piece designer lehenga set featuring cream embroidered kurta with vibrant red lehenga skirt and delicate dupatta. Adorned with intricate floral embroidery on sleeves. Ideal for weddings and festive celebrations.",
    rating: 4.9,
    reviews: 87,
    isBestseller: true,
    tags: ["lehenga", "ethnic", "wedding", "premium", "designer"],
  },
  {
    id: "p21",
name: "Embroidery Dress",    brand: "Maison Noir",
    category: "women",
    subcategory: "Sarees",
    price: 14000,
    image: "/public/images/WhatsApp Image 2026-07-21 at 4.17.22 PM.jpeg",
    images: ["/public/images/WhatsApp Image 2026-07-21 at 4.17.22 PM.jpeg"],
    colors: [
      { name: "blue", hex: "#6b21a8" },
    ],
    sizes: ["One Size"],
    description:
      "Luxurious deep purple saree with elegant silver pearl border detailing and matching embellished blouse. The rich fabric drapes beautifully for a sophisticated look.",
    rating: 4.7,
    reviews: 56,
    isNew: true,
    tags: ["saree", "ethnic", "premium", "festive"],
  },
  {
    id: "p22",
    name: "Classic Black Saree",
    brand: "Heritage Co.",
    category: "women",
    subcategory: "Sarees",
    price: 8500,
    image: "/images/black-saree.jpg",
    images: ["/images/black-saree.jpg"],
    colors: [
      { name: "Black", hex: "#111111" },
    ],
    sizes: ["One Size"],
    description:
      "Timeless black saree in premium sheer georgette fabric with full sleeves blouse. The elegant drape and sophisticated styling make it perfect for evening events and formal occasions.",
    rating: 4.8,
    reviews: 64,
    tags: ["saree", "ethnic", "classic", "evening-wear"],
  },
];

export const categories = [
  {
    id: "men",
    name: "Men",
    tagline: "Modern essentials & statement pieces",
    image: "https://images.pexels.com/photos/16952978/pexels-photo-16952978.jpeg?auto=compress&cs=tinysrgb&w=900&q=80",
  },
  {
    id: "women",
    name: "Women",
    tagline: "Effortless elegance, every day",
    image: "https://images.pexels.com/photos/33045452/pexels-photo-33045452.jpeg?auto=compress&cs=tinysrgb&w=900&q=80",
  },
  {
    id: "accessories",
    name: "Accessories",
    tagline: "The finishing touch",
    image: "https://images.pexels.com/photos/12628400/pexels-photo-12628400.jpeg?auto=compress&cs=tinysrgb&w=900&q=80",
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const getRelatedProducts = (product: Product, limit = 4) =>
  products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
