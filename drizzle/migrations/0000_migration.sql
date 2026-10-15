CREATE TABLE public.project_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  organization text CHECK (char_length(organization) <= 160),
  stakeholder_type text CHECK (char_length(stakeholder_type) <= 80),
  inquiry_type text NOT NULL CHECK (char_length(inquiry_type) <= 80),
  project_location text CHECK (char_length(project_location) <= 160),
  project_stage text CHECK (char_length(project_stage) <= 80),
  budget_range text CHECK (char_length(budget_range) <= 80),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 4000),
  consent boolean NOT NULL CHECK (consent = true),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.project_inquiries TO anon, authenticated;
GRANT ALL ON public.project_inquiries TO service_role;
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an inquiry" ON public.project_inquiries FOR INSERT TO anon, authenticated WITH CHECK (consent = true);