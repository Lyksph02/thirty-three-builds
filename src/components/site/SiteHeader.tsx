import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { company, images, navLinks } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/95 backdrop-blur transition-shadow",
        scrolled ? "shadow-sm" : "shadow-none",
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-card focus:p-2">
        Skip to content
      </a>
      <div className="container-site flex h-18 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3" aria-label="3T Construction Group home">
          <img src={images.logoDark} alt="" width={36} height={36} className="h-9 w-9" />
          <span className="font-display text-base font-bold leading-tight tracking-tight">
            3T Construction<span className="block text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">Group</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-display text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground underline decoration-primary decoration-2 underline-offset-8" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="cta" className="hidden h-10 rounded-sm px-5 sm:inline-flex">
            <a href={company.calendly} target="_blank" rel="noopener noreferrer">Discuss Your Project</a>
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t bg-background lg:hidden">
          <div className="container-site flex flex-col py-4">
            {[{ to: "/", label: "Home" } as const, ...navLinks].map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="border-b py-3 font-display text-lg font-medium last:border-0">
                {l.label}
              </Link>
            ))}
            <Button asChild variant="cta" size="xl" className="mt-4">
              <a href={company.calendly} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Discuss Your Project</a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
