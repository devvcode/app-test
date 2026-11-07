# Student Library

A React + Vite library-management dashboard with its own package manifest, Vite configuration, components, styles, and local build output. It runs as a workspace or as a standalone React project.

## Features

- Dashboard statistics for total, available, borrowed books, and categories
- Search by title, author, or ISBN; filter by category
- Add and remove books
- Check out books to students with due dates and process returns
- Persist changes in browser localStorage
- Responsive desktop and mobile layout

## Run inside app-test

From the repository root:

```bash
npm install
npm run dev --workspace=student-library
```

## Run this folder independently

After copying or downloading only this folder:

```bash
npm install
npm run dev
npm run build
npm run preview
```

When built by the parent repository, `APP_BASE_PATH=/student-library/` is applied and the local `dist/` is copied into the root deployment at `dist/student-library/`.

The catalogue is stored in this browser's localStorage. Changes are not shared between devices or users. There is no authentication or server-side database.
