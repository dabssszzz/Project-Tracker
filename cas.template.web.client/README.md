# Template Web Client

A clean, production-ready React template built with **Vite**, **React 18**, **React Router**, **TanStack Query**, and **Tailwind CSS**. This template follows **SOLID principles** and **DRY** methodology for maintainable and scalable applications.

## 🚀 Features

- ⚡ **Vite** - Lightning-fast build tool and dev server
- ⚛️ **React 18** - Latest React with concurrent features
- 🎨 **Tailwind CSS** - Utility-first CSS framework with custom design system
- 🔐 **Authentication** - JWT-based auth with protected routes
- 🎯 **React Router v7** - Modern routing solution
- 📡 **TanStack Query** - Powerful data fetching and caching
- 🎭 **Theme System** - Light/Dark/System theme support
- 📦 **Component Library** - Pre-built UI components
- 🔧 **ESLint** - Code quality and consistency
- 📱 **Responsive** - Mobile-first design approach

## 📁 Project Structure

```
TEMPLATE.WEB.CLIENT/
├── public/                 # Static assets
├── src/
│   ├── app/
│   │   ├── layouts/       # Layout components (MainLayout, AuthLayout, Header, Sidebar)
│   │   ├── providers/     # Context providers (Auth, Theme, Query)
│   │   └── routes/        # Route configuration and guards
│   ├── features/          # Feature-based modules
│   │   ├── auth/         # Authentication pages (Login, Register)
│   │   ├── dashboard/    # Dashboard page
│   │   ├── error/        # Error pages (404)
│   │   └── home/         # Home page
│   ├── shared/
│   │   ├── components/   # Reusable UI components
│   │   ├── services/     # API services (http, auth)
│   │   └── utils/        # Utility functions (storage, helpers, cn)
│   ├── App.jsx           # Root application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles and Tailwind imports
├── .env.example          # Environment variables template
├── .gitignore
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🏗️ Architecture Principles

### SOLID Principles

1. **Single Responsibility Principle (SRP)**
   - Each component/service has one reason to change
   - `QueryProvider` only handles data fetching
   - `ThemeProvider` only manages theme state
   - `AuthProvider` only handles authentication

2. **Open/Closed Principle (OCP)**
   - Components are open for extension, closed for modification
   - Button component uses variants via `class-variance-authority`
   - AuthService can be extended for different auth strategies

3. **Liskov Substitution Principle (LSP)**
   - Components accept proper prop types
   - All UI components follow consistent interfaces

4. **Interface Segregation Principle (ISP)**
   - Providers expose only necessary methods
   - Services have focused, minimal APIs

5. **Dependency Inversion Principle (DIP)**
   - High-level modules depend on abstractions
   - HTTP client is injected, not hardcoded

### DRY (Don't Repeat Yourself)

- **Shared Components**: Reusable Button, Input, Card components
- **Utility Functions**: Common helpers in `shared/utils`
- **HTTP Client**: Centralized API communication with interceptors
- **Storage Helpers**: Abstracted localStorage operations
- **Style Utilities**: `cn()` function for className merging

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. **Navigate to the template directory:**
   ```bash
   cd TEMPLATE.WEB.CLIENT
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_AUTH_PROVIDER=jwt
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📦 Available Scripts

- `npm run dev` - Start development server on port 5173
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎨 Component Usage

### Button Component

```jsx
import { Button } from "@shared/components";

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Card Component

```jsx
import { Card, CardHeader, CardTitle, CardContent } from "@shared/components";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

## 🔐 Authentication

The template includes a complete authentication system:

### Login
```jsx
const { login } = useAuth();

await login({ email, password });
```

### Register
```jsx
const { register } = useAuth();

await register({ name, email, password });
```

### Logout
```jsx
const { logout } = useAuth();

await logout();
```

### Protected Routes
```jsx
<Route
  element={
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  }
>
  <Route path="/dashboard" element={<DashboardPage />} />
</Route>
```

## 🎭 Theme System

Toggle between light, dark, and system themes:

```jsx
import { useTheme } from "@app/providers";

const { theme, setTheme } = useTheme();

// Set theme
setTheme("dark");  // "light" | "dark" | "system"
```

## 🌐 API Integration

### HTTP Client

The template includes a configured Axios instance with interceptors:

```jsx
import { httpClient } from "@shared/services";

// GET request
const data = await httpClient.get("/users");

// POST request
const user = await httpClient.post("/users", userData);

// With auth token (automatic)
// Token is added via interceptor if available
```

### Creating New Services

```jsx
// src/shared/services/user.service.js
import { httpClient } from "./http.service";

class UserService {
  async getUsers() {
    return await httpClient.get("/users");
  }

  async createUser(userData) {
    return await httpClient.post("/users", userData);
  }
}

export const userService = new UserService();
```

## 📚 Adding New Features

### 1. Create Feature Directory

```
src/features/my-feature/
├── MyFeaturePage.jsx
├── components/
├── hooks/
└── services/
```

### 2. Create Route

```jsx
// src/app/routes/index.jsx
import { MyFeaturePage } from "@features/my-feature/MyFeaturePage";

<Route path="/my-feature" element={<MyFeaturePage />} />
```

### 3. Add to Navigation

```jsx
// src/app/layouts/Sidebar.jsx
const menuItems = [
  { path: "/my-feature", label: "My Feature", icon: "🎯" },
];
```

## 🎯 Best Practices

1. **Component Structure**
   - Keep components small and focused
   - Use composition over inheritance
   - Extract reusable logic into custom hooks

2. **State Management**
   - Use Context API for global state
   - Use TanStack Query for server state
   - Keep local state when possible

3. **Styling**
   - Use Tailwind utilities
   - Create custom components for repeated patterns
   - Use `cn()` utility for conditional classes

4. **File Naming**
   - PascalCase for components: `MyComponent.jsx`
   - camelCase for utilities: `myHelper.js`
   - kebab-case for CSS files: `my-styles.css`

## 🔧 Customization

### Theme Colors

Edit `tailwind.config.js` to customize colors:

```js
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ },
    }
  }
}
```

### API Base URL

Update `.env`:

```env
VITE_API_BASE_URL=https://api.yourapp.com
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | API endpoint | `http://localhost:3000/api` |
| `VITE_API_TIMEOUT` | Request timeout (ms) | `30000` |
| `VITE_AUTH_PROVIDER` | Auth strategy | `jwt` |

## 🤝 Contributing

When contributing to this template:

1. Follow existing code style
2. Write meaningful commit messages
3. Keep components reusable and documented
4. Test your changes thoroughly

## 📄 License

This template is open source and available for use in your projects.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TanStack Query](https://tanstack.com/query)
- [React Router](https://reactrouter.com)

## 💡 Tips

- Use React DevTools for debugging
- Enable VS Code extensions: ESLint, Tailwind CSS IntelliSense
- Check console for helpful error messages
- Use the Network tab to debug API calls

---

**Built with ❤️ following SOLID principles and DRY methodology**
