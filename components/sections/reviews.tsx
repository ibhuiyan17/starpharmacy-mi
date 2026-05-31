import { Star } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "@/components/reveal";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "text-border"
          }`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { reviews, rating, reviewsUrl } = site;
  if (!reviews.length) return null;

  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 py-16 md:py-24 scroll-mt-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Loved by our neighbors
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl">What our patients say</h2>

        {rating.count > 0 && (
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 text-sm font-medium hover:border-brand"
          >
            <Stars rating={Math.round(rating.value)} />
            <span className="font-bold text-text-header">
              {rating.value.toFixed(1)}
            </span>
            <span className="text-text-muted">
              · {rating.count} {rating.source} reviews
            </span>
          </a>
        )}
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <figure className="surface-card flex h-full flex-col rounded-2xl p-7">
              <Stars rating={r.rating} />
              <blockquote className="mt-4 flex-grow text-text-body">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <span className="font-bold text-text-header">{r.name}</span>
                  <span className="block text-sm text-text-muted">{r.meta}</span>
                </div>
                <span className="text-xs font-medium text-text-muted">via Google</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
