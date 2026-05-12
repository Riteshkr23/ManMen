import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">404</p>
      <h1 className="text-4xl">Product not found</h1>
      <Link href="/shop" className="rounded-full border border-[var(--border)] px-5 py-2 text-sm">
        Return to shop
      </Link>
    </section>
  );
}
