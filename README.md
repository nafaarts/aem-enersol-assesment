# AEM Dashboard

A responsive dashboard application built with Angular 14, featuring an Electron desktop wrapper, offline support via PouchDB, and real-time data visualization with amCharts 5.

**Live Demo:** [aem-enersol-assesment.vercel.app](https://aem-enersol-assesment.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 14 |
| UI / CSS | Foundation Sites 6 |
| Charts | amCharts 5 |
| Offline Storage | PouchDB |
| Desktop | Electron 41 |
| Language | TypeScript 4.7 |

---

## Features

- **Authentication** — online login with Bearer token; offline fallback using locally stored hashed credentials (PouchDB)
- **Dashboard** — donut chart and bar chart powered by amCharts 5, user list with multi-column sort
- **Offline mode** — dashboard data cached locally with a timestamp; app remains usable without network
- **Desktop app** — Electron wrapper with custom menu, dock icon, and reload disabled (desktop-appropriate behaviour)
- **Route guards** — `AuthGuard` protects the dashboard, `GuestGuard` prevents authenticated users from accessing auth pages
- **HTTP interceptor** — automatically attaches the Bearer token to every outgoing API request

---

## Prerequisites

- Node.js ≥ 18
- npm ≥ 9

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment

The app ships with two environment files:

| File | Used when |
|---|---|
| `src/environments/environment.ts` | `ng serve` / development build |
| `src/environments/environment.prod.ts` | `ng build --configuration production` |

Both files must contain:

```ts
export const environment = {
  production: boolean,
  apiUrl: 'https://your-api-base-url/api',
  offlineAuthSalt: 'your-offline-salt',
};
```

---

## Running the App

### Web — development server

```bash
npm start
```

Opens at `http://localhost:4200`. The app reloads automatically on file changes.

### Type checking

```bash
npm run typecheck           # Angular source
npm run typecheck:electron  # Electron main process
```

---

## Building

### Web build

```bash
npm run build
```

Output goes to `dist/aem-dashboard/`. Compiles with the production configuration by default.

### Electron — development

Starts the Angular dev server and Electron side-by-side. The web view supports hot reload.

```bash
npm run electron:dev
```

### Electron — production

Builds the Angular app and Electron main process, then launches the desktop app.

```bash
npm run electron:prod
```

| Output | Path |
|---|---|
| Angular build | `dist/aem-dashboard/` |
| Electron main | `dist-electron/main.mjs` |

---

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── guards/          # AuthGuard, GuestGuard
│   │   ├── interceptors/    # AuthInterceptor (Bearer token)
│   │   ├── layouts/         # MainLayout, AuthLayout
│   │   ├── repositories/    # PouchDB repositories (auth, dashboard)
│   │   └── services/        # AuthService, TokenService
│   ├── features/
│   │   ├── auth/            # Login, Register
│   │   └── dashboard/       # Charts, UserList, DashboardService
│   └── shared/
│       ├── components/ui/   # Button, Card, Input, Table, Charts, ConfirmDialog
│       ├── services/        # ConfirmDialogService
│       └── utils/           # Token extraction, password hashing
├── environments/
electron/
├── main.mts                 # Electron main process
└── assets/                  # App icons (ico, icns, png)
```

---

## API Reference

| Method | Endpoint | Auth required |
|---|---|---|
| `POST` | `/account/login` | No |
| `GET` | `/dashboard` | Bearer token |

---

## Offline Behaviour

1. **Login** — if the server is unreachable (`status: 0`), the app falls back to locally stored credentials. The password is compared against a salted hash stored in PouchDB from the last successful online login.
2. **Dashboard data** — on a successful network fetch the response is saved to PouchDB with a timestamp. If a subsequent fetch fails, the cached data is shown with a "last updated at" notice.
3. **Token** — the Bearer token from the last successful online login is preserved in `localStorage` and reused automatically when connectivity returns.
