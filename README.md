# Voldigoade

Independent multilingual publication for sciences, computing and visual culture.

Public site: https://voldigoade.github.io/blog/

## Stack

- Astro
- TypeScript
- Pagefind
- Pages CMS
- GitHub Pages

## Development

Node.js 22.12 or newer is required.

```bash
npm install
npm run dev
npm run check
npm run build
```

`npm run build` produces the static site and search index without translation credentials or external translation access.

## Publishing

Pages CMS writes French Markdown or MDX sources to `src/content/blog/`. Drafts remain private. Publishing a source on `main` starts translation generation, followed by the normal static deployment.

## Localization

French is authoritative. The supported translated locales are English, Spanish, German, Brazilian Portuguese, Italian, Japanese and Simplified Chinese. Static translations live in `src/content/translations/<locale>/` and record a deterministic hash of their French source. Manually reviewed translations are never overwritten automatically.

Use `npm run translate` to inspect translation status. Generation can be scoped with `npm run translate -- --translate --slug <slug>` and `npm run translate -- --translate --locale <locale>`. Add `--force` to regenerate current automatic translations.

The GitHub workflow uses the `TRANSLATION_API_KEY` repository secret and the `TRANSLATION_ENDPOINT` and `TRANSLATION_MODEL` repository variables.

## Deployment

GitHub Actions validates and deploys `main` to GitHub Pages at the `/blog/` project base.

## License

See [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
