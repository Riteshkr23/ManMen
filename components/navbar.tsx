"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeToggle } from "@/components/theme-toggle";
import { calculateCartCount, useCartStore } from "@/lib/cart-store";

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  const openDrawer = useCartStore((state) => state.openDrawer);
  const count = calculateCartCount(cartItems);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 40,
        onUpdate: (self) => {
          gsap.to(navRef.current, {
            backgroundColor: self.scroll() > 40 ? "rgba(16,17,22,0.66)" : "rgba(16,17,22,0)",
            backdropFilter: self.scroll() > 40 ? "blur(12px)" : "blur(0px)",
            borderColor: self.scroll() > 40 ? "var(--border)" : "transparent",
            duration: 0.35,
            overwrite: true,
          });
        },
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-4 top-4 z-50 rounded-2xl border border-transparent px-4 py-3 transition-colors md:inset-x-8"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="text-sm font-semibold tracking-[0.32em]">
          MANMEN
        </Link>
        <div className="flex items-center gap-5 text-xs uppercase tracking-[0.2em]">
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/checkout">Checkout</Link>
          <button
            type="button"
            onClick={openDrawer}
            className="relative rounded-full border border-[var(--border)] px-3 py-1.5"
          >
            Bag
            <span className="ml-1 text-[#b8a46f]">({count})</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
