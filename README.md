# Ticket Management App - Vue.js Implementation

This is a Vue.js implementation of a ticket management application with authentication, dashboard, and CRUD functionality for tickets.

## Features

- Landing page with hero section and wavy background
- Authentication system with login/signup
- Dashboard with ticket statistics
- Full CRUD functionality for tickets
- Responsive design for all devices
- Consistent design language across all pages

## Technologies Used

- Vue.js 3
- Vue Router
- Pinia (for state management)
- Vue Toastification (for notifications)
- LocalStorage for session management

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Application Structure

```
src/
├── assets/            # Static assets
├── components/        # Reusable components
│   ├── Header.vue     # Main header component
│   └── Footer.vue     # Main footer component
├── router/            # Vue Router configuration
│   └── index.js       # Route definitions
├── stores/            # Pinia stores
├── views/             # Page components
│   ├── LandingPage.vue
│   ├── LoginPage.vue
│   ├── SignupPage.vue
│   ├── DashboardPage.vue
│   └── TicketsPage.vue
├── App.vue            # Main app component
└── main.js            # App entry point
```

## UI Components

- **Header**: Contains navigation and logout button
- **Footer**: Consistent footer across all pages
- **TicketCard**: Displays ticket information with status tag
- **TicketForm**: Form for creating/editing tickets
- **StatCard**: Displays statistics on the dashboard

## State Management

The application uses localStorage to persist:

- User session (key: `ticketapp_session`)
- Ticket data (key: `tickets`)

## Authentication

- Login and signup forms with validation
- Session management using localStorage
- Route protection for authenticated pages
- Logout functionality

## Ticket Management

- Create, Read, Update, Delete operations
- Form validation for all fields
- Status tags with color coding:
  - Open: Green
  - In Progress: Amber
  - Closed: Gray

## Design System

- Max width: 1440px (centered)
- Wavy background in hero section
- Decorative circles and box-shaped sections
- Consistent spacing and typography
- Responsive grid layouts

## Example Credentials

For testing purposes, you can use:

- Email: user@example.com
- Password: password123

## Accessibility

The application follows accessibility best practices:

- Semantic HTML
- Proper alt text for images
- Sufficient color contrast
- Focus states for interactive elements

## Known Issues

- None at this time

## Future Improvements

- Add real API integration
- Implement user roles and permissions
- Add ticket filtering and sorting
- Improve error handling for network issues
