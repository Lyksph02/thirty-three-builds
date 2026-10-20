import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin } from "lucide-react";
import { company, images, navLinks } from "@/lib/site-data";

export function SiteFooter() {
  const a = company.address;
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <img src={images.logoLight} alt="" width={40} height={40} className="h-10 w-10" />
            <span className="font-display text-lg font-bold">{company.name}</span>
          </div>
          <p className="mt-5 max-w-sm text-ink-muted">{company.description}</p>
          <a href={company.calendly} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-display font-semibold text-ink-foreground underline decoration-primary decoration-2 underline-offset-8 hover:text-primary">
            Start a project conversation →
          </a>
        </div>
        <div className="md:col-span-3">
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-5 space-y-3">
            <li><Link to="/" className="text-ink-muted hover:text-ink-foreground">Home</Link></li>
            {navLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-ink-muted hover:text-ink-foreground">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <h2 className="eyebrow">Contact</h2>
          <ul className="mt-5 space-y-4 text-ink-muted">
            <li className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden />
              <address className="not-italic">{a.street}<br />{a.city}, {a.region} {a.postal}</address>
            </li>
            <li className="flex gap-3"><Mail className="mt-1 h-4 w-4 shrink-0" aria-hidden />
              <a href={`mailto:${company.email}`} className="hover:text-ink-foreground">{company.email}</a>
            </li>
            <li className="flex gap-3"><Instagram className="mt-1 h-4 w-4 shrink-0" aria-hidden />
              <a href={company.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink-foreground">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-border">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-ink-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</p>
          <Link to="/privacy" className="hover:text-ink-foreground">Privacy Policy</Link><span>Designed and Developed By: Lyks Saavedra</span>
        </div>
      </div>
    </footer>
  );
}
