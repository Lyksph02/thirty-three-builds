import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClosingCta, PageHero, ProjectCard } from "@/components/site/blocks";
import { company, images, projects, services } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Affordable Housing, PPP & LIHTC Consulting | 3T" },
      { name: "description", content: "Affordable housing development, construction management, public-private partnerships, LIHTC feasibility analysis and grant compliance from 3T Construction Group." },
      { property: "og:title", content: "Services | 3T Construction Group" },
      { property: "og:description", content: "Affordable housing development, public-private partnerships and development consulting." },
      { name: "author", content: "Lyks Saavedra" },
    ],
  }),
  component: Services,
});

const related = ["savoy-48", "bethel-village", "jmb-gardens"];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Beyond residences"
        intro="Our services extend beyond traditional real estate development. We are committed to creating communities that are affordable, sustainable and inclusive."
        image={images.groundbreakingTeam}
      />
      {services.map((s, i) => (
        <section key={s.slug} id={s.slug} className={`scroll-mt-24 py-20 md:py-28 ${i % 2 ? "bg-stone" : ""}`}>
          <div className="container-site grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="font-display text-sm font-bold text-primary">0{i + 1}</span>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">{s.title}</h2>
              <p className="mt-6 text-lg text-muted-foreground">{s.description}</p>
              <Button asChild variant="cta" size="xl" className="mt-8"><a href={company.calendly} target="_blank" rel="noopener noreferrer">Discuss Your Project</a></Button>
            </div>
            <ul className="divide-y self-start rounded-sm border bg-card lg:col-span-6">
              {s.items.map((it) => (
                <li key={it} className="flex items-center gap-4 p-6 font-display text-lg font-semibold">
                  <Check className="h-5 w-5 shrink-0 text-primary" aria-hidden />{it}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <section className="py-20">
        <div className="container-site">
          <h2 className="text-3xl font-bold">See this work in practice</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {projects.filter((p) => related.includes(p.slug)).map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
