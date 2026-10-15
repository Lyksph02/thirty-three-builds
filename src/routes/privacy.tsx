import { createFileRoute } from "@tanstack/react-router";
import { company } from "@/lib/site-data";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | 3T Construction Group" },
      { name: "description", content: "How 3T Construction Group collects, uses and protects information submitted through this website." },
      { property: "og:title", content: "Privacy Policy | 3T Construction Group" },
      { property: "og:description", content: "How we handle information submitted through our project inquiry form." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <section className="py-20">
      <div className="container-site max-w-3xl space-y-6 text-muted-foreground">
        <p className="eyebrow">Legal</p>
        <h1 className="text-4xl font-bold text-foreground md:text-5xl">Privacy Policy</h1>
        <h2 className="pt-4 text-2xl font-bold text-foreground">Information we collect</h2>
        <p>When you submit our project inquiry form, we collect the details you provide: your name, work email, organization, role, inquiry type, project location, stage, optional budget range and project description.</p>
        <h2 className="pt-4 text-2xl font-bold text-foreground">How we use it</h2>
        <p>We use this information only to respond to your inquiry and evaluate potential collaboration. We do not sell your information.</p>
        <h2 className="pt-4 text-2xl font-bold text-foreground">Storage and security</h2>
        <p>Submissions are stored securely and accessible only to authorized 3T staff. You may request access to or deletion of your information at any time.</p>
        <h2 className="pt-4 text-2xl font-bold text-foreground">Contact</h2>
        <p>Questions about this policy: <a href={`mailto:${company.email}`} className="text-primary hover:underline">{company.email}</a>, {company.address.street}, {company.address.city}, {company.address.region} {company.address.postal}.</p>
      </div>
    </section>
  );
}
