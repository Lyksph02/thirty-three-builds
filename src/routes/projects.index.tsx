import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClosingCta, PageHero, ProjectCard } from "@/components/site/blocks";
import { images, projects, projectTypes } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects | Housing Developments in Pennsylvania | 3T" },
      { name: "description", content: "Explore 3T Construction Group's portfolio including Savoy 48, JMB Gardens, Bethel Village, Beacon of Hope, LG Lofts and Tioga Arms." },
      { property: "og:title", content: "Projects | 3T Construction Group" },
      { property: "og:description", content: "Affordable and residential housing developments across Pennsylvania." },
      { name: "author", content: "Lyks Saavedra" },
    ],
  }),
  component: Projects,
});

function Projects() {
  const [filter, setFilter] = useState<(typeof projectTypes)[number]>("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.type === filter);
  return (
    <>
      <PageHero eyebrow="Projects" title="Our portfolio" intro="We have had the privilege of working with diverse clients, including government entities, nonprofit organizations and private firms." image={images.hero} />
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div role="group" aria-label="Filter projects by type" className="flex flex-wrap gap-2">
            {projectTypes.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
                className={cn(
                  "rounded-full border px-5 py-2 font-display text-sm font-semibold transition-colors",
                  filter === t ? "border-ink bg-ink text-ink-foreground" : "bg-card hover:border-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{list.length} projects</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
