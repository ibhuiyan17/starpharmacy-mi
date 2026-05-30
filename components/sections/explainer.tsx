"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "@/components/reveal";

function embedUrl(): string | null {
  const { youtubeId, vimeoId } = site.explainerVideo;
  if (youtubeId)
    return `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
  if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
  return null;
}

export default function Explainer() {
  const [playing, setPlaying] = useState(false);
  const url = embedUrl();
  const hasVideo = !!url;

  return (
    <section id="watch" className="mx-auto max-w-6xl px-4 py-16 md:py-24 scroll-mt-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          60-second tour
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl">{site.explainerVideo.title}</h2>
        <p className="mt-4 text-text-body">
          A quick look at how we save you from pharmacy lines — free delivery,
          synced refills, and a team that does the work for you.
        </p>
      </Reveal>

      <Reveal className="mx-auto mt-10 max-w-4xl">
        <div className="glass-card overflow-hidden rounded-3xl p-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-brand-dark">
            {playing && hasVideo ? (
              <iframe
                src={url!}
                title={site.explainerVideo.title}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <Image
                  src={site.explainerVideo.poster}
                  alt={site.explainerVideo.title}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                  {hasVideo ? (
                    <button
                      onClick={() => setPlaying(true)}
                      aria-label="Play video"
                      className="group flex flex-col items-center gap-3"
                    >
                      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-brand shadow-2xl transition-transform group-hover:scale-110">
                        <Play className="ml-1 h-9 w-9 fill-current" />
                      </span>
                      <span className="font-semibold">Watch the 60-second tour</span>
                    </button>
                  ) : (
                    <div className="px-6">
                      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Play className="ml-1 h-9 w-9 fill-current" />
                      </span>
                      <p className="mt-4 text-lg font-semibold">Video coming soon</p>
                      <p className="mx-auto mt-1 max-w-md text-sm text-white/80">
                        Our 60-second walkthrough is on the way. In the meantime,
                        switching takes less time than the video itself.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {!hasVideo && (
          <div className="mt-6 flex justify-center">
            <Link href="/transfer" className="btn-brand">
              Switch in 60 Seconds <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </Reveal>
    </section>
  );
}
