"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";
import { getProductBySlug } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const openDrawer = useCartStore((state) => state.openDrawer);

  if (!product) {
    notFound();
  }

  const addToCart = () => {
    addItem(product.id);
    openDrawer();
  };

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-24 pt-32 md:grid-cols-2">
      <div className="space-y-3">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-[var(--border)] bg-black/20">
          <Image src={product.images[activeImage]} alt={product.name} fill className="object-cover" priority />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {product.images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(index)}
              className={`relative aspect-square overflow-hidden rounded-2xl border ${
                activeImage === index ? "border-[var(--fg)]" : "border-[var(--border)]"
              }`}
            >
              <Image src={image} alt={`${product.name} view ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">{product.category}</p>
        <h1 className="text-4xl md:text-5xl">{product.name}</h1>
        <p className="text-lg">${product.price.toFixed(2)}</p>
        <p className="text-sm text-[var(--muted)]">{product.description}</p>

        <ul className="space-y-2 rounded-2xl border border-[var(--border)] p-5 text-sm">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: product.accent }} />
              {feature}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={addToCart}
          className="rounded-full bg-[var(--fg)] px-7 py-3 text-sm uppercase tracking-[0.18em] text-[var(--bg)] transition hover:scale-105"
        >
          Add to bag
        </button>
      </div>
    </section>
  );
}
