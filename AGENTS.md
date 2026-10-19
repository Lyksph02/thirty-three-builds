<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Use `@lovable.dev/vite-tanstack-config` with the `src/server.ts` entry; it boots TanStack Start, styles and SSR instead of serving an empty legacy HTML shell.
- Company facts (projects, services, news, metrics, contact) live only in `src/lib/site-data.ts`; pages read from it so updates happen in one place.
- Project inquiries go through the `submitInquiry` server function into the `project_inquiries` table (insert-only RLS for the public); never fake a form success message.
- Self-deploys to Vercel use the pinned `nitro: { preset: "vercel" }` in vite.config.ts plus vercel.json (framework null); Lovable builds override the preset, so don't remove either.
