"use client";

import { FormEvent, useState } from "react";
import { calculateSubtotal, useCartStore } from "@/lib/cart-store";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = calculateSubtotal(items);
  const [placed, setPlaced] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPlaced(true);
    clearCart();
  };

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 pt-32 md:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={handleSubmit} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h1 className="text-3xl md:text-4xl">Checkout</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">Premium delivery in 3-5 business days.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            ["First name", "firstName"],
            ["Last name", "lastName"],
            ["Email", "email"],
            ["Phone", "phone"],
            ["Address", "address"],
            ["City", "city"],
            ["State", "state"],
            ["Zip code", "zip"],
          ].map(([label, name]) => (
            <label key={name} className="text-sm">
              <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{label}</span>
              <input
                required
                name={name}
                className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 outline-none transition focus:border-[var(--fg)]"
              />
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={subtotal === 0}
          className="mt-7 rounded-full bg-[var(--fg)] px-6 py-3 text-xs uppercase tracking-[0.2em] text-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Place order
        </button>

        {placed && (
          <p className="mt-4 rounded-xl border border-[#6fd8d2] bg-[#6fd8d2]/10 p-3 text-sm">
            Order confirmed. Thank you for choosing ManMen.
          </p>
        )}
      </form>

      <aside className="h-fit rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-xl">Order Summary</h2>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-[var(--muted)]">
            <span>Items</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[var(--muted)]">
            <span>Shipping</span>
            <span>{subtotal > 0 ? "$14.00" : "$0.00"}</span>
          </div>
          <div className="flex justify-between border-t border-[var(--border)] pt-3 text-base">
            <span>Total</span>
            <span>${(subtotal > 0 ? subtotal + 14 : 0).toFixed(2)}</span>
          </div>
        </div>
      </aside>
    </section>
  );
}
