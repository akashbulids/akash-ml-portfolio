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

- Portfolio content, palettes and sound live in `src/content` and `src/lib`, never inline in components — keeps copy editable without touching presentation.
- The 3D background (`Universe3D`) is lazy-loaded client-only behind a WebGL check and error boundary — SSR must never evaluate three.js.
