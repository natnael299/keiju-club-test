# Keiju

Keiju is a full-stack application for caretakers and event organizers.

Caretakers can:

- View people connected to their account
- Review notifications and reports
- Browse Keiju Club events
- Follow external event registration links

Organization representatives can:

- View their organization dashboard
- Create, edit, and delete events
- Upload, replace, and remove event photos
- Control registration status
- Add external registration links

## Technology

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Router
- i18next

### Backend

- Node.js
- Express
- TypeScript
- CouchDB
- Nano
- JWT
- bcrypt
- Multer

## Requirements

- Node.js 20 or newer
- npm
- CouchDB 3
- Git

## Project structure

```
keiju-club/
├── backend/
├── frontend/
└── README.md
```

### Deployment environment variables

Do not upload or commit a production `.env` file.
Configure production variables through the backend hosting provider’s environment-variable settings:

```env
NODE_ENV=production
JWT_SECRET=replace-with-a-long-random-production-secret
COUCHDB_URL=your-production-couchdb-url
COUCHDB_USERNAME=your-production-couchdb-username
COUCHDB_PASSWORD=your-production-couchdb-password
COUCHDB_DATABASE=keiju
```
