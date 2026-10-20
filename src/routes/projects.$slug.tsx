import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClosingCta, ProjectCard } from "@/components/site/blocks";
import { news, projects } from "@/lib/site-data";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Project not found | 3T" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.project;
    const d = `${p.name} in ${p.location} — a ${p.type.toLowerCase()} project from the 3T Construction Group portfolio.`;
    return {
      meta: [
        { title: `${p.name}, ${p.location} | 3T Construction Group` },
        { name: "description", content: d },
        { property: "og:title", content: `${p.name} | 3T Construction Group` },
        { property: "og:description", content: d },
        { name: "author", content: "Lyks Saavedra" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-site py-32 text-center">
      <h1 className="text-4xl font-bold">Project not found</h1>
      <Link to="/projects" className="mt-6 inline-block text-primary">Back to all projects</Link>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  const related = news.filter((n) => n.project === p.slug);
  const others = projects.filter((x) => x.slug !== p.slug && x.image).slice(0, 3);
  return (
    <>
      <section className="py-12 md:py-16">
        <div className="container-site">
          <Link to="/projects" className="inline-flex items-center gap-2 font-display text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <p className="eyebrow rule-accent mt-10">{p.type}</p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">{p.name}</h1>
          <p className="mt-3 text-xl text-muted-foreground">{p.location}</p>
          {p.image && <img src={p.image} alt={`${p.name}, ${p.location}`} className="mt-10 aspect-[16/9] w-full rounded-sm object-cover" />}
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <dl className="grid grid-cols-2 gap-6 self-start rounded-sm border bg-card p-6 lg:col-span-4">
              <div><dt className="text-sm text-muted-foreground">Location</dt><dd className="mt-1 font-display font-semibold">{p.location}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Type</dt><dd className="mt-1 font-display font-semibold">{p.type}</dd></div>
            </dl>
            <div className="text-lg text-muted-foreground lg:col-span-8">
              <p>{p.name} is part of 3T Construction Group's portfolio of housing developments in Pennsylvania. Detailed information on scope, 3T's role and project status will be published here.</p>
              {related.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-foreground">In the news</h2>
                  <ul className="mt-3 space-y-2">
                    {related.map((n) => <li key={n.url}><a href={n.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{n.title}</a> <span className="text-sm">· {n.date}</span></li>)}
                  </ul>
                </div>
              )}
              <Button asChild variant="cta" size="xl" className="mt-10"><Link to="/contact">Discuss a Similar Project</Link></Button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-stone py-20">
        <div className="container-site">
          <h2 className="text-3xl font-bold">More projects</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">{others.map((o) => <ProjectCard key={o.slug} project={o} />)}</div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
