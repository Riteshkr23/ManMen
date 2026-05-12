export type ProductCategory = "outerwear" | "footwear" | "accessories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  features: string[];
  images: string[];
  accent: string;
};

export const products: Product[] = [
  {
    id: "mm-01",
    slug: "noir-kinetic-jacket",
    name: "Noir Kinetic Jacket",
    category: "outerwear",
    price: 420,
    description:
      "A lightweight shell engineered for movement with matte ceramic finish and hidden ventilation channels.",
    features: ["Ceramic matte shell", "Micro-vent channels", "Storm-ready hood"],
    images: [
      "/products/noir-kinetic-1.svg",
      "/products/noir-kinetic-2.svg",
      "/products/noir-kinetic-3.svg",
    ],
    accent: "#b8a46f",
  },
  {
    id: "mm-02",
    slug: "apollo-runner",
    name: "Apollo Runner",
    category: "footwear",
    price: 310,
    description:
      "Precision-knit sneaker with adaptive sole geometry tuned for urban sprint and all-day comfort.",
    features: ["Adaptive midsole", "Breath-knit upper", "Memory insole"],
    images: [
      "/products/apollo-runner-1.svg",
      "/products/apollo-runner-2.svg",
      "/products/apollo-runner-3.svg",
    ],
    accent: "#6fd8d2",
  },
  {
    id: "mm-03",
    slug: "titan-crossbody",
    name: "Titan Crossbody",
    category: "accessories",
    price: 220,
    description:
      "Sculpted crossbody bag with magnetic pockets and reinforced strap webbing for modern daily carry.",
    features: ["Magnetic closure", "Reinforced strap", "Water-resistant lining"],
    images: [
      "/products/titan-crossbody-1.svg",
      "/products/titan-crossbody-2.svg",
      "/products/titan-crossbody-3.svg",
    ],
    accent: "#9f8fff",
  },
  {
    id: "mm-04",
    slug: "lumen-hoodie",
    name: "Lumen Hoodie",
    category: "outerwear",
    price: 260,
    description:
      "Ultra-soft brushed hoodie with angular seam geometry and heat-managed layered core.",
    features: ["Brushed cotton blend", "Heat-managed core", "Structured silhouette"],
    images: [
      "/products/lumen-hoodie-1.svg",
      "/products/lumen-hoodie-2.svg",
      "/products/lumen-hoodie-3.svg",
    ],
    accent: "#ff9f7f",
  },
  {
    id: "mm-05",
    slug: "oblivion-cap",
    name: "Oblivion Cap",
    category: "accessories",
    price: 90,
    description:
      "Contoured six-panel cap featuring bonded brim and shadow-lock stitching for a clean silhouette.",
    features: ["Bonded brim", "Shadow-lock stitch", "Adjustable clasp"],
    images: [
      "/products/oblivion-cap-1.svg",
      "/products/oblivion-cap-2.svg",
      "/products/oblivion-cap-3.svg",
    ],
    accent: "#f4dc74",
  },
  {
    id: "mm-06",
    slug: "aether-slide",
    name: "Aether Slide",
    category: "footwear",
    price: 145,
    description:
      "Minimal slide sandal with pressure-mapped foam bed and anti-slip ridges for post-training recovery.",
    features: ["Pressure-mapped foam", "Anti-slip tread", "Quick-dry strap"],
    images: [
      "/products/aether-slide-1.svg",
      "/products/aether-slide-2.svg",
      "/products/aether-slide-3.svg",
    ],
    accent: "#77c6ff",
  },
];

export const categories: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Outerwear", value: "outerwear" },
  { label: "Footwear", value: "footwear" },
  { label: "Accessories", value: "accessories" },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
