# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

## Persistence

The application persists the complete translation dataset in `localStorage`
as JSON.

Every translation edit, keyword addition, and drag-and-drop reorder updates
the stored dataset.

The selected interface language is also persisted in `localStorage`, so
refreshing the page keeps the user's last selected language.

The application validates stored data before using it. If the stored dataset
is missing, malformed, or corrupted, the application safely falls back to the
initial dataset instead of breaking.;



### 1. Why did you choose this data structure?

Each keyword is represented as an object containing a stable `id`, the
keyword itself, and a `translations` object keyed by language code.

For example:

{
  "id": "1",
  "keyword": "Hello",
  "translations": {
    "en": "Hello",
    "fa": "سلام",
    "de": "Hallo"
  }
}

This structure keeps all translations for a keyword together and makes
accessing a translation by language straightforward.

Adding a new language is also relatively simple. The language can be added
to the supported language list, and each keyword can receive a new property
inside `translations`. Existing keywords can initially contain an empty
string for the new language until a translation is provided.




### 2. How would you scale this application to thousands of keywords?

For a much larger dataset, the first bottleneck would likely be the
combination of localStorage and rendering the complete keyword list on every
update.

I would move persistence to a backend/database and expose paginated APIs.
The frontend could then load only the visible portion of the dataset.

For the UI, I would introduce list virtualization so that thousands of
keywords do not create thousands of DOM nodes at the same time.

Search/filtering could also be moved to the backend for large datasets.
Translations could be cached and updates could be sent incrementally instead
of rewriting the complete dataset.

The current React Context approach is suitable for this assignment because
the dataset is small. For a larger application, state updates and server
cache management could be separated from the UI state to reduce unnecessary
re-renders.