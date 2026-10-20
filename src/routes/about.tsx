import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ClosingCta, MetricsBand, PageHero, SectionHeading } from "@/components/site/blocks";
import { company, images, partnerTypes, services } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About 3T Construction Group | Real Estate Development Firm" },
      { name: "description", content: "Learn about 3T Construction Group, a real estate development firm with 15+ years of experience in affordable and market-rate housing and government relations." },
      { property: "og:title", content: "About 3T Construction Group" },
      { property: "og:description", content: "15+ years of real estate development experience in affordable and market-rate housing." },
      { name: "author", content: "Lyks Saavedra" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="About 3T"
        title="Pioneers in public-private housing development"
        intro="With more than fifteen years in the industry, 3T is a seasoned real estate development firm specializing in affordable and market-rate housing."
        image={images.team}
      />

      <section className="py-24">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Who we are" title="Development expertise meets government relations" />
          </div>
          <div className="space-y-6 text-lg text-muted-foreground lg:col-span-7">
            <p>Our expertise lies not only in our design and construction capabilities, but in our understanding of the complex interplay between real estate development and government relations.</p>
            <p>We work with government entities, nonprofit organizations and private firms — understanding the unique needs and goals of each and delivering tailored solutions that move projects forward.</p>
            <p>Our mission is to create communities that are affordable, sustainable and inclusive, because everyone deserves a place to call home.</p>
          </div>
        </div>
      </section>

      <section className="border-y">
        <div className="container-site py-2"><MetricsBand /></div>
      </section>

      <section className="py-24">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <img src={images.groundbreaking} alt="Ryan Sanders with partners at a 3T groundbreaking" loading="lazy" className="aspect-[4/3] w-full rounded-sm object-cover" />
          <div>
            <p className="eyebrow rule-accent">Meet the founder</p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">{company.founder}</h2>
            <p className="mt-2 font-display font-semibold text-muted-foreground">Founder, 3T Construction Group</p>
            <p className="mt-6 text-lg text-muted-foreground">Ryan leads a team of experienced professionals dedicated to transforming and restoring landscapes back into vibrant neighborhoods that enhance the quality of life for their residents.</p>
            <p className="mt-4 text-muted-foreground">Contact: <a className="font-semibold text-primary underline-offset-4 hover:underline" href={`mailto:${company.email}`}>{company.email}</a></p>
          </div>
        </div>
      </section>

      <section className="bg-stone py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Capabilities" title="What we bring to a project" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.slug} className="rounded-sm bg-card p-8">
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-muted-foreground">{s.short}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="ink" size="xl"><Link to="/services">Explore Our Services</Link></Button>
            <Button asChild variant="outline-dark" size="xl"><Link to="/projects">See Our Projects</Link></Button>
          </div>
          <p className="mt-12 text-sm text-muted-foreground">We have worked with: {partnerTypes.join(" · ")}.</p>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
