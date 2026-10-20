import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/blocks";
import { company, images } from "@/lib/site-data";
import { inquirySchema, submitInquiry } from "@/lib/inquiry.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Discuss Your Project with 3T Construction Group" },
      { name: "description", content: "Start a conversation about affordable housing development, construction management, public-private partnerships or development consulting." },
      { property: "og:title", content: "Contact 3T Construction Group" },
      { property: "og:description", content: "Tell us about your housing or development project." },
      { name: "author", content: "Lyks Saavedra" },
    ],
  }),
  component: Contact,
});

const inquiryTypes = ["Affordable housing development", "Construction management", "Public-private partnership", "Development consulting", "Investment or funding inquiry", "General partnership", "Other"];
const roles = ["Developer / property owner", "Government agency", "Nonprofit / community organization", "Investor / financial partner", "Business / institution", "Other"];
const stages = ["Early idea", "Feasibility / planning", "Financing / approvals", "Ready for construction", "Under construction", "Not sure"];
const budgets = ["Prefer not to say", "Under $5M", "$5M – $15M", "$15M – $30M", "$30M+"];

const field = "mt-2 block w-full rounded-sm border border-input bg-card px-4 py-3 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30";
const label = "font-display text-sm font-semibold";

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries()) as Record<string, unknown>;
    raw["consent"] = fd.get("consent") === "on";
    const parsed = inquirySchema.safeParse(raw);

    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs);
      const first = Object.keys(errs)[0];
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      // Mabilis na pag-save sa Supabase (ang SQL trigger na ang bahala mag-post sa Make.com)
      await submitInquiry({ data: parsed.data });

      setStatus("done");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const err = (k: string) => errors[k] && <p id={`${k}-error`} className="mt-1 text-sm text-destructive">{errors[k]}</p>;
  const aria = (k: string) => ({ id: k, name: k, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <>
      <PageHero eyebrow="Contact" title="Discuss your project" intro="Tell us about your goals and where you are in the process. We'll follow up to talk through requirements and opportunities for collaboration." image={images.groundbreakingTeam} />
      <section className="py-16 md:py-24">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {status === "done" ? (
              <div role="status" className="rounded-sm border bg-card p-10">
                <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden />
                <h2 className="mt-6 text-3xl font-bold">Thank you — your inquiry was received.</h2>
                <p className="mt-3 text-lg text-muted-foreground">Our team will review your project details and reply to the email you provided. For anything urgent, email <a className="text-primary hover:underline" href={`mailto:${company.email}`}>{company.email}</a>.</p>
                <Button asChild variant="outline-dark" size="xl" className="mt-8"><Link to="/projects">Explore Our Projects</Link></Button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
                <div><label htmlFor="full_name" className={label}>Full name *</label><input {...aria("full_name")} autoComplete="name" className={field} />{err("full_name")}</div>
                <div><label htmlFor="email" className={label}>Work email *</label><input {...aria("email")} type="email" autoComplete="email" className={field} />{err("email")}</div>
                <div><label htmlFor="organization" className={label}>Organization</label><input {...aria("organization")} autoComplete="organization" className={field} /></div>
                <div><label htmlFor="stakeholder_type" className={label}>Your role</label>
                  <select {...aria("stakeholder_type")} className={field} defaultValue=""><option value="">Select…</option>{roles.map((r) => <option key={r}>{r}</option>)}</select></div>
                <div><label htmlFor="inquiry_type" className={label}>Type of inquiry *</label>
                  <select {...aria("inquiry_type")} className={field} defaultValue=""><option value="">Select…</option>{inquiryTypes.map((r) => <option key={r}>{r}</option>)}</select>{err("inquiry_type")}</div>
                <div><label htmlFor="project_location" className={label}>Project location</label><input {...aria("project_location")} placeholder="City, State" className={field} /></div>
                <div><label htmlFor="project_stage" className={label}>Project stage</label>
                  <select {...aria("project_stage")} className={field} defaultValue=""><option value="">Select…</option>{stages.map((r) => <option key={r}>{r}</option>)}</select></div>
                <div><label htmlFor="budget_range" className={label}>Budget range (optional)</label>
                  <select {...aria("budget_range")} className={field} defaultValue=""><option value="">Select…</option>{budgets.map((r) => <option key={r}>{r}</option>)}</select></div>
                <div className="sm:col-span-2"><label htmlFor="message" className={label}>Project description *</label><textarea {...aria("message")} rows={6} className={field} placeholder="Goals, scope, timeline and any key considerations" />{err("message")}</div>
                <div className="hidden" aria-hidden><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 text-sm">
                    <input {...aria("consent")} type="checkbox" className="mt-1 h-4 w-4 accent-primary" />
                    <span>I agree that 3T may use these details to respond to my inquiry, as described in the <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>. *</span>
                  </label>{err("consent")}
                </div>
                {status === "error" && <p role="alert" className="text-destructive sm:col-span-2">{serverError}</p>}
                <div className="sm:col-span-2"><Button type="submit" variant="cta" size="xl" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Start a Project Conversation"}</Button></div>
              </form>
            )}
          </div>
          <aside id="direct" className="scroll-mt-24 self-start rounded-sm bg-ink p-8 text-ink-foreground lg:col-span-4">
            <h2 className="text-2xl font-bold">Prefer email?</h2>
            <p className="mt-3 text-ink-muted">Reach our team directly.</p>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3"><Mail className="mt-1 h-4 w-4" aria-hidden /><a href={`mailto:${company.email}`} className="font-semibold hover:text-primary">{company.email}</a></li>
              <li className="flex gap-3"><MapPin className="mt-1 h-4 w-4" aria-hidden /><address className="not-italic text-ink-muted">{company.address.street}<br />{company.address.city}, {company.address.region} {company.address.postal}</address></li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}