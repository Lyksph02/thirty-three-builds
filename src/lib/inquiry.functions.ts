
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
  message: z
    .string()
    .trim()
    .min(10, "Please share at least a few details (10+ characters)")
    .max(4000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to the privacy policy" }),
  }),
  website: z.string().max(0).optional().default(""),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => inquirySchema.parse(d))
  .handler(async ({ data }) => {
    // Silently ignore bot submissions caught by the honeypot.
    if (data.website) {
      return { ok: true };
    }

    const supabaseUrl = process.env["SUPABASE_URL"];
    const supabaseKey = process.env["SUPABASE_PUBLISHABLE_KEY"];

    if (!supabaseUrl || !supabaseKey) {
      console.error(
        "Contact form configuration error:",
        JSON.stringify({
          SUPABASE_URL: Boolean(supabaseUrl),
          SUPABASE_PUBLISHABLE_KEY: Boolean(supabaseKey),
        }),
      );

      throw new Error(
        "The contact form is temporarily unavailable. Please email us directly.",
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { website: _website, ...row } = data;

    const clean = Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ]),
    );

    const { error } = await supabase
      .from("project_inquiries")
      .insert(clean as never);

    if (error) {
      console.error("Contact form insert failed:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });

      throw new Error(
        "We couldn't send your inquiry. Please try again or email us directly.",
      );
    }

    return { ok: true };
  });
