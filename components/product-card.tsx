"use client";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Product } from "@/lib/products";
import { useHoverTilt } from "@/hooks/use-hover-tilt";
import { useCartStore } from "@/lib/cart-store";

export function ProductCard({ product }: { product: Product }) {
  const { handleMove, handleLeave } = useHoverTilt();
  const addItem = useCartStore((state) => state.addItem);
  const openDrawer = useCartStore((state) => state.openDrawer);

  const onHover = (event: React.MouseEvent<HTMLElement>) => {
    handleMove(event);
    gsap.to(event.currentTarget.querySelector(".product-overlay"), {
      opacity: 1,
      duration: 0.4,
      ease: "power4.out",
    });
  };

  const onLeave = (event: React.MouseEvent<HTMLElement>) => {
    handleLeave(event);
    gsap.to(event.currentTarget.querySelector(".product-overlay"), {
      opacity: 0,
      duration: 0.4,
      ease: "power4.out",
    });
  };

  const addToCart = () => {
    addItem(product.id);
    openDrawer();
  };

  return (
    <article
      className="shop-card group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4"
      onMouseMove={onHover}
      onMouseLeave={onLeave}
    >
      <div className="product-overlay pointer-events-none absolute inset-0 opacity-0" style={{ boxShadow: `inset 0 0 0 1px ${product.accent}` }} />
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-black/15">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{product.category}</p>
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="text-sm text-[var(--muted)]">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <button
        type="button"
        onClick={addToCart}
        className="mt-4 w-full rounded-full border border-[var(--border)] px-4 py-2 text-sm transition hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(184,164,111,0.35)]"
      >
        Add to Cart
      </button>
    </article>
  );
}
