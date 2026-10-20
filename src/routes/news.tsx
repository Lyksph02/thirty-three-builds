import { createFileRoute } from "@tanstack/react-router";
import { ClosingCta, PageHero } from "@/components/site/blocks";
import { images, news } from "@/lib/site-data";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Media | 3T Construction Group" },
      { name: "description", content: "Groundbreakings, project announcements and media coverage of 3T Construction Group's affordable housing developments in Harrisburg and beyond." },
      { property: "og:title", content: "News & Media | 3T Construction Group" },
      { property: "og:description", content: "Project milestones and media coverage from 3T Construction Group." },
      { name: "author", content: "Lyks Saavedra" },
    ],
  }),
  component: News,
});

function News() {
  return (
    <>
      <PageHero eyebrow="News & media" title="Milestones and coverage" intro="Groundbreakings, project announcements and community development updates." image={images.groundbreaking} />
      <section className="py-20">
        <div className="container-site">
          <ul className="divide-y border-y">
            {news.map((n) => (
              <li key={n.url}>
                <a href={n.url} target="_blank" rel="noopener noreferrer" className="group grid gap-3 py-8 md:grid-cols-12 md:gap-8">
                  <time dateTime={n.iso} className="text-sm text-muted-foreground md:col-span-2">{n.date}</time>
                  <div className="md:col-span-8">
                    <h2 className="text-2xl font-bold leading-snug group-hover:text-primary">{n.title}</h2>
                    <p className="mt-2 text-muted-foreground">{n.summary}</p>
                  </div>
                  <span className="font-display text-sm font-semibold text-primary md:col-span-2 md:text-right">Read article →</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
