"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { calculateSubtotal, selectCartItemsWithProducts, useCartStore } from "@/lib/cart-store";

export function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const drawerRef = useRef<HTMLDivElement>(null);

  const cartItems = selectCartItemsWithProducts(items);
  const subtotal = calculateSubtotal(items);

  useEffect(() => {
    if (!drawerRef.current) return;

    gsap.to(drawerRef.current, {
      xPercent: isDrawerOpen ? 0 : 105,
      duration: 0.65,
      ease: "expo.out",
    });
  }, [isDrawerOpen]);

  return (
    <>
      {isDrawerOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[58] bg-black/45"
          onClick={closeDrawer}
          aria-label="Close cart drawer"
        />
      )}
      <aside
        ref={drawerRef}
        className="fixed right-0 top-0 z-[60] flex h-screen w-full max-w-md translate-x-[105%] flex-col border-l border-[var(--border)] bg-[var(--surface)] p-5"
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your Bag</h3>
          <button type="button" onClick={closeDrawer} className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
            Close
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          {cartItems.length === 0 && <p className="text-sm text-[var(--muted)]">Your bag is empty.</p>}
          {cartItems.map((item) => (
            <article key={item.product.id} className="grid grid-cols-[72px_1fr] gap-3 rounded-2xl border border-[var(--border)] p-2">
              <div className="relative h-[72px] w-[72px] overflow-hidden rounded-xl bg-black/20">
                <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium">{item.product.name}</p>
                <p className="text-xs text-[var(--muted)]">${item.product.price.toFixed(2)}</p>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    className="rounded-full border border-[var(--border)] px-2"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    className="rounded-full border border-[var(--border)] px-2"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 space-y-3 border-t border-[var(--border)] pt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--muted)]">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            onClick={closeDrawer}
            className="block rounded-full bg-[var(--fg)] px-4 py-2 text-center text-sm text-[var(--bg)]"
          >
            Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}
