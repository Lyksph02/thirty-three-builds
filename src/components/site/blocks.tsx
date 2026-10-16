import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2 } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { company, metrics, type Project } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, intro, align = "left", tone = "light" }: { eyebrow: string; title: ReactNode; intro?: ReactNode; align?: "left" | "center"; tone?: "light" | "dark" }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow rule-accent">{eyebrow}</p>
      <h2 className={cn("mt-4 text-3xl font-bold leading-[1.1] md:text-5xl", tone === "dark" && "text-ink-foreground")}>{title}</h2>
      {intro && <p className={cn("mt-5 text-lg", tone === "dark" ? "text-ink-muted" : "text-muted-foreground")}>{intro}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />}
      <div className="absolute inset-0 bg-hero-overlay" aria-hidden />
      <div className="container-site relative py-20 md:py-28">
        <p className="eyebrow rule-accent">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-muted md:text-xl">{intro}</p>
      </div>
    </section>
  );
}

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(to);
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setN(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{n}</>;
}

export function MetricsBand({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { ref, seen } = useInView<HTMLDListElement>();
  return (
    <dl ref={ref} className={cn("grid grid-cols-2 gap-px lg:grid-cols-4", tone === "dark" ? "bg-ink-border" : "bg-border")}>
      {metrics.map((m) => (
        <div key={m.label} className={cn("flex flex-col-reverse p-6 md:p-8", tone === "dark" ? "bg-ink" : "bg-background")}>
          <dt className={cn("mt-2 text-sm leading-snug md:text-base", tone === "dark" ? "text-ink-muted" : "text-muted-foreground")}>{m.label}</dt>
          <dd className={cn("font-display text-4xl font-bold tracking-tight md:text-6xl", tone === "dark" ? "text-ink-foreground" : "text-foreground")}>
            <span aria-hidden>{m.prefix}<CountUp to={m.value} run={seen} />{m.suffix}</span>
            <span className="sr-only">{m.prefix}{m.value}{m.suffix}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ProjectCard({ project, size = "md" }: { project: Project; size?: "md" | "lg" }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group relative block overflow-hidden rounded-sm bg-ink text-ink-foreground"
    >
      <div className={cn("relative", size === "lg" ? "aspect-[4/3] md:aspect-[16/11]" : "aspect-[4/3]")}>
        {project.image ? (
          <img src={project.image} alt={`${project.name}, ${project.location}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-stone text-muted-foreground">
            <Building2 className="h-10 w-10" aria-hidden />
          </div>
        )}
        <div className="absolute inset-0 bg-card-overlay" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">{project.type}</p>
            <h3 className={cn("mt-1 font-bold", size === "lg" ? "text-2xl md:text-3xl" : "text-xl")}>{project.name}</h3>
            <p className="mt-1 text-sm text-ink-muted">{project.location}</p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-foreground/40 transition-colors group-hover:border-primary group-hover:bg-primary" aria-hidden>
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
      <span className="sr-only">View project</span>
    </Link>
  );
}

export function ClosingCta({ title = "Have a housing or development project in mind?", body = "Let's discuss your goals, project requirements and opportunities for collaboration." }: { title?: string; body?: string }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-site flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight md:text-5xl">{title}</h2>
          <p className="mt-4 text-lg opacity-90">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="ink" size="xl"><a href={company.calendly} target="_blank" rel="noopener noreferrer">Start a Project Conversation</a></Button>
          <Button asChild variant="outline-light" size="xl"><Link to="/contact" hash="direct">Contact Our Team</Link></Button>
        </div>
      </div>
    </section>
  );
}
