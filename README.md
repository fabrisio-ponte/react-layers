# React Layers – Notes

A small notes app that practices a layered React architecture:

```
component -> hook -> action -> api
```

| Layer     | Folder            | Responsibility                                                           |
| --------- | ----------------- | ------------------------------------------------------------------------ |
| Component | `src/components/` | UI only (MUI). Calls hooks.                                              |
| Hook      | `src/hooks/`      | React Query queries/mutations, cache invalidation, toasts.               |
| Action    | `src/actions/`    | Calls the api layer, unwraps the response, throws readable errors.       |
| API       | `src/api/`        | Raw HTTP calls with [apisauce](https://github.com/infinitered/apisauce). |

A fake Express server in `server/index.js` provides the backend (in-memory data, 400ms artificial latency so loading states are visible).

## Stack

React 18, Vite, MUI, TanStack Query, apisauce, notistack, Express.

## Getting started

```bash
npm install
cp .env.example .env
```

Run the API and the client in two terminals:

```bash
npm run server   # API on http://localhost:4100
npm run dev      # App on http://localhost:7531
```

`VITE_REACT_APP_NOTES_API` in `.env` sets the API base URL.

## API

| Method | Endpoint     | Description                                                        |
| ------ | ------------ | ------------------------------------------------------------------ |
| GET    | `/notes`     | List notes. Optional `?term=` filters by title (case-insensitive). |
| POST   | `/notes`     | Create a note from `{ title, body }`. `422` if `title` is missing. |
| DELETE | `/notes/:id` | Delete a note. Always returns `204`.                               |

Data lives in memory and resets when the server restarts.

## Scripts

- `npm run dev` – start the Vite dev server
- `npm run server` – start the Express API
- `npm run build` – production build
- `npm run lint` – ESLint
- `npm run format` – Prettier
