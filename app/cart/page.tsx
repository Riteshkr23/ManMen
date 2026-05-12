"use client";

import Image from "next/image";
import Link from "next/link";
import { calculateSubtotal, selectCartItemsWithProducts, useCartStore } from "@/lib/cart-store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const entries = selectCartItemsWithProducts(items);
  const subtotal = calculateSubtotal(items);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-32">
      <h1 className="text-4xl md:text-5xl">Your Cart</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          {entries.length === 0 && (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-sm text-[var(--muted)]">
              Your cart is empty. Explore the <Link href="/shop" className="underline">shop</Link>.
            </div>
          )}
          {entries.map((item) => (
            <article key={item.product.id} className="grid grid-cols-[100px_1fr] gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="relative h-[100px] w-[100px] overflow-hidden rounded-2xl bg-black/20">
                <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
              </div>
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg">{item.product.name}</h2>
                    <p className="text-sm text-[var(--muted)]">${item.product.price.toFixed(2)}</p>
                  </div>
                  <button type="button" className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]" onClick={() => removeItem(item.product.id)}>
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm">
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
        <aside className="h-fit rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h3 className="text-xl">Order Summary</h3>
          <div className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between text-[var(--muted)]">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[var(--muted)]">
              <span>Shipping</span>
              <span>{subtotal > 0 ? "$14.00" : "$0.00"}</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-[var(--border)] pt-3 text-base">
              <span>Total</span>
              <span>${(subtotal > 0 ? subtotal + 14 : 0).toFixed(2)}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block rounded-full bg-[var(--fg)] px-4 py-3 text-center text-xs uppercase tracking-[0.2em] text-[var(--bg)]"
          >
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}
