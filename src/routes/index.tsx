import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClosingCta, MetricsBand, ProjectCard, SectionHeading } from "@/components/site/blocks";
import { approach, company, images, news, partnerTypes, projects, services } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "3T Construction Group | Affordable Housing & Real Estate Development" },
      { name: "description", content: "Pennsylvania real estate development firm delivering affordable housing, construction management, LIHTC consulting and public-private partnerships." },
      { property: "og:title", content: "3T Construction Group | Building Housing Solutions" },
      { property: "og:description", content: "Development planning, construction management and strategic consulting for public and private housing partners." },
      { name: "author", content: "Lyks Saavedra" },
    ],
  }),
  component: Home,
});

const reasons = [
  { title: "Development and construction under one roof", body: "We connect planning, design and construction management so decisions on site reflect the project's financial and policy realities." },
  { title: "Fluent in public and private stakeholders", body: "Our roots in public policy help us coordinate with municipalities, agencies, nonprofits and capital partners." },
  { title: "Financing-aware from day one", body: "LIHTC feasibility, market strategy and grant compliance are built into how we evaluate and plan projects." },
  { title: "Focused on community outcomes", body: "We pursue practical housing solutions that restore neighborhoods and improve quality of life for residents." },
];

function Home() {
  const featured = projects.filter((p) => p.featured);
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img src={images.hero} alt="Multi-story housing development under construction" className="absolute inset-0 -z-10 h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" aria-hidden />
        <div className="container-site flex min-h-[78vh] flex-col justify-center py-24">
          <p className="eyebrow rule-accent">Real estate development · Construction management · Public-private partnerships</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-[1.02] md:text-7xl">
            Building housing solutions. Strengthening communities.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted md:text-xl">
            From development planning to construction management and strategic consulting, 3T Construction Group works with public and private partners to advance housing developments and create lasting community value.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="cta" size="xl"><a href={company.calendly} target="_blank" rel="noopener noreferrer">Discuss Your Project <ArrowRight /></a></Button>
            <Button asChild variant="outline-light" size="xl"><Link to="/projects">Explore Our Projects</Link></Button>
          </div>
          <p className="mt-10 text-sm text-ink-muted">15+ years of development experience across Pennsylvania communities.</p>
        </div>
      </section>

      {/* Metrics */}
      <section aria-label="Company metrics" className="border-b">
        <div className="container-site py-2"><MetricsBand /></div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="What we do" title="Expertise across the full development lifecycle" intro="We go beyond the brick and mortar — navigating from concept to completion to create sustainable, accessible communities." />
            <Button asChild variant="outline-dark" size="xl" className="self-start md:self-auto"><Link to="/services">Explore Our Capabilities</Link></Button>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border bg-border md:grid-cols-3">
            {services.map((s, i) => (
              <Link key={s.slug} to="/services" hash={s.slug} className="group flex flex-col bg-card p-8 transition-colors hover:bg-accent md:p-10">
                <span className="font-display text-sm font-bold text-primary">0{i + 1}</span>
                <h3 className="mt-6 text-2xl font-bold leading-tight">{s.title}</h3>
                <p className="mt-3 text-muted-foreground">{s.short}</p>
                <ul className="mt-6 space-y-2 border-t pt-6 text-sm">
                  {s.items.map((it) => <li key={it} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />{it}</li>)}
                </ul>
                <span className="mt-8 inline-flex items-center gap-2 font-display text-sm font-semibold text-primary">
                  Learn about this service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="bg-stone py-24 md:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="Featured projects" title="Housing developments across Pennsylvania" intro="We have worked with government entities, nonprofit organizations and private firms on developments from Philadelphia to New Castle." />
            <Button asChild variant="ink" size="xl" className="self-start md:self-auto"><Link to="/projects">View All Projects</Link></Button>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <div key={p.slug} className={i === 0 ? "md:col-span-2 lg:row-span-2" : ""}>
                <ProjectCard project={p} size={i === 0 ? "lg" : "md"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-24 md:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Why partner with 3T" title="A development partner that understands the whole picture" intro="Complex housing projects stall when design, financing and public process are handled in isolation. We bring them together." />
            <img src={images.groundbreakingTeam} alt="3T team and partners at a project groundbreaking" loading="lazy" className="mt-10 aspect-[4/3] w-full rounded-sm object-cover" />
          </div>
          <div className="grid gap-px self-start overflow-hidden rounded-sm border bg-border sm:grid-cols-2 lg:col-span-7">
            {reasons.map((r) => (
              <div key={r.title} className="bg-card p-8">
                <div className="h-0.5 w-8 bg-primary" aria-hidden />
                <h3 className="mt-6 text-xl font-bold leading-snug">{r.title}</h3>
                <p className="mt-3 text-muted-foreground">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-ink py-24 text-ink-foreground md:py-32">
        <div className="container-site">
          <SectionHeading tone="dark" eyebrow="Our approach" title="How we work with partners" intro="A straightforward framework that adapts to the scope of each engagement." />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-sm bg-ink-border sm:grid-cols-2 lg:grid-cols-5">
            {approach.map((s, i) => (
              <li key={s.title} className="bg-ink p-7">
                <span className="font-display text-5xl font-extrabold text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-ink-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 md:py-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <img src={images.groundbreaking} alt="3T Construction Group leadership at a groundbreaking event" loading="lazy" className="aspect-[4/3] w-full rounded-sm object-cover" />
          <div>
            <p className="eyebrow rule-accent">Leadership</p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">{company.founder}</h2>
            <p className="mt-2 font-display font-semibold text-muted-foreground">Founder</p>
            <p className="mt-6 text-lg text-muted-foreground">
              Under Ryan's leadership, 3T's team of experienced professionals is dedicated to transforming and restoring landscapes back into vibrant neighborhoods that enhance the quality of life for their residents.
            </p>
            <Button asChild variant="outline-dark" size="xl" className="mt-8"><Link to="/about">About 3T</Link></Button>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-y bg-secondary py-20">
        <div className="container-site">
          <SectionHeading align="center" eyebrow="Pioneers in public-private partnerships" title="Trusted by public, nonprofit and private partners" intro="We understand the unique needs and goals of each client and deliver tailored solutions that drive progress." />
          <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
            {partnerTypes.map((p) => <li key={p} className="rounded-full border bg-card px-5 py-2 font-display text-sm font-medium">{p}</li>)}
          </ul>
        </div>
      </section>

      {/* News */}
      <section className="py-24 md:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="News & community impact" title="Project milestones and coverage" />
            <Button asChild variant="outline-dark" size="xl" className="self-start md:self-auto"><Link to="/news">All News</Link></Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {news.map((n) => (
              <a key={n.url} href={n.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col border-t-2 border-foreground pt-6">
                <time dateTime={n.iso} className="text-sm text-muted-foreground">{n.date}</time>
                <h3 className="mt-3 text-lg font-bold leading-snug group-hover:text-primary">{n.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{n.summary}</p>
                <span className="mt-auto pt-5 font-display text-sm font-semibold text-primary">Read article →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
