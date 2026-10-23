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
- Keep the portfolio background in CSS and SVG; do not add Three.js, React Three Fiber, WebGL canvases, or 3D transforms. Browser-only APIs must not be evaluated during SSR.
