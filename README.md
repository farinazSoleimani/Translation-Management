# Translation Management

A responsive translation management application built with React, TypeScript, and Vite.

This project was developed as a Front-End Developer technical assignment.

The application provides two main views:

- **Management Dashboard** — for managing, editing, adding, and reordering translations.
- **Public View** — for displaying keywords and their translations to end users.

---

## Demo

### Management Dashboard

The Management Dashboard allows the team to:

- View all keywords and their translations.
- Edit translations for the selected language.
- Add new keywords.
- Provide a translation for one language when creating a keyword.
- Automatically create empty translations for languages that were not provided.
- Reorder keywords using drag and drop.
- Persist all changes locally.

### Public View

The Public View allows end users to:

- View all available keywords.
- View their translations.
- Switch between supported languages.
- See an empty state when a translation is not available.
- See keywords in the same order defined by the Management Dashboard.

---

# Features

## Management Dashboard

- Display all predefined keywords.
- Edit translations directly from the list.
- Add new keywords through a dedicated modal.
- Prevent duplicate keywords.
- Automatically create empty translations for missing languages.
- Drag and drop keyword reordering.
- Keyboard-accessible reordering.
- Persist changes to `localStorage`.
- Restore the previous state after page reload.

---

## Public View

- Display keywords in a clean, readable layout.
- Switch between English, Persian, and German.
- Display missing translations with an empty-state message.
- Preserve the keyword order configured in the Management Dashboard.
- Update the displayed language immediately without a page reload.

---

# Language Selection

The application supports three languages:

| Code | Language |
|------|----------|
| `en` | English |
| `fa` | Persian |
| `de` | German |

The language selector is implemented as a reusable component with different visual variants for the Management Dashboard and Public View to match the provided designs.

The selected language is also persisted in `localStorage`.

Therefore, if a user selects German and refreshes the page, German remains selected.

---

# Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **React Context API**
- **React Hooks**
- **React Router**
- **Tailwind CSS**
- **dnd-kit**
- **Lucide React**
- **localStorage**

---

# Architecture

The application follows a component-based architecture with a clear separation between:

- State management
- Business logic
- Presentation
- Persistence
- Reusable UI components

The translation dataset has a single source of truth provided by React Context.

Both the Management Dashboard and Public View consume the same translation state.

---

# State Management

The application uses **React Context API** to manage the translation dataset.

The context exposes the following operations:

```ts
updateTranslation()
addKeyword()
reorderTranslations()