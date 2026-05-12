"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useHomeAnimations } from "@/hooks/use-home-animations";
import { useSplitHeadline } from "@/hooks/use-split-headline";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
gsap.registerPlugin(ScrollToPlugin);

export function HomeExperience() {
  useHomeAnimations();
  useSplitHeadline(".hero-title");
  const cinematicLines = ["crafted motion", "soulful textures", "engineered precision", "urban mythology"];

  const scrollToHighlights = () => {
    gsap.to(window, {
      scrollTo: { y: ".home-grid", offsetY: 90 },
      duration: 1.2,
      ease: "power4.inOut",
    });
  };

  return (
    <div className="space-y-24 pb-24">
      <section className="hero relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <div className="hero-depth absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(184,164,111,0.35),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(111,216,210,0.25),transparent_45%),#0a0b10]" />
        <div className="relative z-10 max-w-5xl text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-[var(--muted)]">New Season · Volume 09</p>
          <h1 className="hero-title text-5xl font-semibold leading-tight md:text-7xl">Precision crafted for modern rituals</h1>
          <p className="mx-auto mt-6 max-w-xl text-sm text-[var(--muted)] md:text-base">
            A cinematic collection where engineered silhouettes meet elevated utility. Scroll to enter the ManMen universe.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/shop" className="hero-cta rounded-full bg-[var(--fg)] px-7 py-3 text-sm uppercase tracking-[0.2em] text-[var(--bg)] transition hover:scale-105 hover:shadow-[0_0_28px_rgba(184,164,111,0.45)]">
              Enter Shop
            </Link>
            <button
              type="button"
              onClick={scrollToHighlights}
              className="rounded-full border border-[var(--border)] px-7 py-3 text-sm uppercase tracking-[0.2em] text-[var(--fg)] glow-hover"
            >
              Watch Story
            </button>
          </div>
        </div>
        <div className="hero-visual pointer-events-none absolute bottom-[-10%] h-[52vh] w-[52vh] rounded-full bg-[radial-gradient(circle,rgba(184,164,111,0.45),transparent_70%)] blur-[2px]" />
      </section>

      <section className="reveal mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Product reveal</p>
          <h2 className="mt-3 text-3xl md:text-5xl">Noir Kinetic Jacket</h2>
          <p className="mt-4 max-w-md text-sm text-[var(--muted)]">
            Sculpted shell construction with cinematic light absorption and storm-level utility.
          </p>
        </div>
        <div className="reveal-visual rounded-3xl border border-[var(--border)] bg-[linear-gradient(145deg,#191b22,#0d0f14)] p-12">
          <div className="mx-auto aspect-square max-w-[320px] rounded-2xl bg-[radial-gradient(circle,rgba(184,164,111,0.55),rgba(25,27,34,0.25)_55%,transparent)]" />
        </div>
      </section>

      <section className="horizontal relative h-[90vh] overflow-hidden">
        <div className="horizontal-track flex h-full w-[300vw]">
          {[
            "Materials built for the storm",
            "Signature cuts with motion logic",
            "Every stitch engineered for pace",
          ].map((line) => (
            <article key={line} className="horizontal-panel flex h-full w-screen items-center justify-center border-r border-[var(--border)] bg-[var(--surface)] px-6 text-center">
              <h3 className="max-w-2xl text-4xl leading-tight md:text-6xl">{line}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="features mx-auto max-w-6xl px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Adaptive Design", "Forms that respond to movement, posture, and pace."],
            ["Luxury Build", "Premium materials sourced for tactile depth and longevity."],
            ["Cinematic Presence", "Every product carries visual rhythm in motion."],
          ].map(([title, copy]) => (
            <article key={title} className="feature-card rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h4 className="text-xl">{title}</h4>
              <p className="mt-3 text-sm text-[var(--muted)]">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cinematic mx-auto max-w-5xl px-6 text-center">
        {cinematicLines.map((line) => (
          <p key={line} className="cinematic-line text-4xl uppercase tracking-[0.2em] md:text-6xl">
            {line}
          </p>
        ))}
      </section>

      <section className="home-grid mx-auto max-w-6xl px-6">
        <div className="mb-7 flex items-end justify-between">
          <h2 className="text-3xl md:text-5xl">Shop Highlights</h2>
          <Link href="/shop" className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
            View all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
