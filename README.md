# 🚀 Exo Dashboard (Community Edition)

Exo Dashboard is a modern, responsive administrative template built with **Angular 22** and **Tailwind CSS v4**. It features a clean, highly-customizable user interface designed to help you build your next web application faster.

![Exo Dash Preview](screenshot.png)

### 👀 [View Live Demo](https://exoui.dev)

> **Note**: This is the free Community Edition of Exo UI. It contains the core layout, standard UI components, and the functional e-commerce dashboard.

## 💎 Upgrade to Exo UI Pro

Ready to take your dashboard to the next level? **[Exo UI Pro](https://exoui.dev)** includes fully functional application views, premium data components, and multiple dashboard layouts.

| Feature | Community | Pro |
|---|:---:|:---:|
| Core Dashboard Layout | ✅ | ✅ |
| Dark Mode & Theming | ✅ | ✅ |
| E-Commerce Dashboard | ✅ | ✅ |
| **SaaS & Analytics Dashboards** | 🔒 | ✅ |
| **Kanban, Chat, Calendar Apps** | 🔒 | ✅ |
| **Advanced Data Tables** | 🔒 | ✅ |
| **Premium Email & Ticket UI** | 🔒 | ✅ |

👉 **[Unlock all features and save hundreds of development hours with Exo UI Pro](https://exoui.dev)**

---

## 🛠 Getting Started

### Prerequisites
Make sure you have Node.js and the Angular CLI installed.

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

## 📁 Architecture Breakdown

Here is a breakdown of the project layout, defining where pages, components, and application state live:

- **`src/app/features/`**: This is where all main application pages (dashboard, users, settings) reside. Includes lazy-loaded routing configurations.
- **`src/app/shared/components/`**: Reusable UI components (buttons, cards, badges) shared across various feature modules.
- **`src/app/layout/`**: Contains the broad structural wrappers for the application, such as `app-shell` (primary dashboard wrapper) and `auth-layout`.
- **`src/app/core/services/`**: Houses application-wide singleton services handling theming, state, and API routing.

## 🎨 Theming
The application leverages Tailwind CSS alongside native CSS variables to provide customizable theme management.
- Open **`src/styles.css`** to uniquely modify your color palettes for dark and light mode.