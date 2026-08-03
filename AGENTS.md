## Local Development Ports Registry (MANDATORY)

ALWAYS use the assigned ports for this environment:
- **Website Ecommerce Astro**: `http://localhost:4390` (Port 4390)
- **Admin Ecommerce Frontend**: `http://localhost:5190` (Port 5190)
- **Admin Ecommerce Backend**: `http://localhost:8090` or `http://admin-ecommerce-backend.test` (Port 8090)

DO NOT use ports reserved by other systems:
- FinanzAI: `5180`, `8010`, `3001`, `3200`, `3300`
- Concreces: `5181`, `8011`, `4321`

When starting the dev server, use background mode on port 4390:

```
astro dev --port 4390 --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
