import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export const inquirySchema = z.object({
  full_name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  organization: z.string().trim().max(160).optional().default(""),
  stakeholder_type: z.string().max(80).optional().default(""),
  inquiry_type: z.string().min(1, "Please choose an inquiry type").max(80),
  project_location: z.string().trim().max(160).optional().default(""),
  project_stage: z.string().max(80).optional().default(""),
  budget_range: z.string().max(80).optional().default(""),
  message: z.string().trim().min(10, "Please share at least a few details (10+ characters)").max(4000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree to the privacy policy" }) }),
  website: z.string().max(0).optional().default(""), // honeypot
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => inquirySchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true }; // silently drop bots
    const supabase = createClient(process.env["SUPABASE_URL"]!, process.env["SUPABASE_PUBLISHABLE_KEY"]!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { website: _w, ...row } = data;
    const clean = Object.fromEntries(Object.entries(row).map(([k, v]) => [k, v === "" ? null : v]));
    const { error } = await supabase.from("project_inquiries").insert(clean as never);
    if (error) {
      console.error("inquiry insert failed", error);
      throw new Error("We couldn't send your inquiry. Please try again or email us directly.");
    }
    return { ok: true };
  });
