# Project Architecture

## Overview

This template follows a feature-based architecture with clear separation of concerns, implementing SOLID principles and DRY methodology throughout.

## Directory Structure Explained

### `/src/app`

Core application setup including providers, layouts, and routing configuration.

#### `/app/providers`

Application-level context providers that manage global state:

- **QueryProvider**: TanStack Query setup for data fetching
- **ThemeProvider**: Theme state management (light/dark/system)
- **AuthProvider**: Authentication state and methods

**SOLID Compliance:**
- Each provider has a single responsibility (SRP)
- Providers are extensible without modification (OCP)
- Clean interfaces for consumers (ISP)

#### `/app/layouts`

Layout components that define page structure:

- **MainLayout**: Authenticated pages layout with header and sidebar
- **AuthLayout**: Login/register pages layout
- **Header**: Top navigation bar
- **Sidebar**: Side navigation menu

#### `/app/routes`

Routing configuration and guards:

- **Router**: Central route definitions
- **ProtectedRoute**: Authentication guard component

### `/src/features`

Feature-based modules, each containing related pages, components, and logic.

**Structure per feature:**
```
feature-name/
├── FeaturePage.jsx       # Main page component
├── components/           # Feature-specific components
├── hooks/               # Feature-specific custom hooks
└── services/            # Feature-specific API calls
```

**Current features:**
- `auth`: Login and registration
- `dashboard`: Dashboard page
- `error`: Error pages (404)
- `home`: Landing page

### `/src/shared`

Reusable code shared across features.

#### `/shared/components`

UI component library following composition pattern:

- **Button**: Variants using class-variance-authority
- **Input**: Form input with consistent styling
- **Card**: Container component with sub-components
- **Spinner**: Loading indicators

**Component Design:**
- Forwarded refs for flexibility
- Variant-based styling
- Composable patterns (Card + CardHeader + CardContent)

#### `/shared/services`

Business logic and API communication:

- **http.service.js**: Axios client with interceptors
- **auth.service.js**: Authentication operations

**Benefits:**
- Centralized error handling
- Automatic token injection
- Request/response transformation

#### `/shared/utils`

Helper functions and utilities:

- **storage.js**: localStorage abstraction
- **helpers.js**: Common utility functions
- **cn.js**: className utility (clsx + tailwind-merge)

## Design Patterns

### Provider Pattern

Used for global state management:

```jsx
<AuthProvider>
  <ThemeProvider>
    <QueryProvider>
      <App />
    </QueryProvider>
  </ThemeProvider>
</AuthProvider>
```

### Composition Pattern

Components built through composition:

```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Service Pattern

Business logic separated into service classes:

```jsx
class AuthService {
  async login(credentials) { }
  async logout() { }
}

export const authService = new AuthService();
```

## SOLID Principles Applied

### Single Responsibility Principle (SRP)

Each module has one reason to change:
- `QueryProvider` - only handles data fetching setup
- `ThemeProvider` - only manages theme state
- `http.service` - only handles HTTP communication

### Open/Closed Principle (OCP)

Components open for extension, closed for modification:
- Button variants via CVA, not modifying base component
- AuthService can be extended for OAuth, SAML, etc.

### Liskov Substitution Principle (LSP)

Components maintain consistent interfaces:
- All UI components accept className prop
- Forward refs consistently

### Interface Segregation Principle (ISP)

Providers expose minimal, focused APIs:
- AuthProvider: `{ user, login, logout, isAuthenticated, isLoading }`
- ThemeProvider: `{ theme, setTheme, resolvedTheme }`

### Dependency Inversion Principle (DIP)

High-level modules depend on abstractions:
- Components use `httpClient`, not direct axios
- Services use storage abstraction, not direct localStorage

## DRY Implementation

### Reusable Components

Instead of duplicating button styles:
```jsx
// ✅ DRY
<Button variant="primary">Click me</Button>

// ❌ Not DRY
<button className="px-4 py-2 bg-primary text-white rounded">Click me</button>
```

### Utility Functions

Common operations abstracted:
```jsx
// ✅ DRY
const user = storage.get('user');

// ❌ Not DRY
const user = JSON.parse(localStorage.getItem('user'));
```

### HTTP Client

Single configuration, used everywhere:
```jsx
// ✅ DRY
await httpClient.get('/users');

// ❌ Not DRY
await axios.get(`${API_URL}/users`, { headers: { ... } });
```

## State Management Strategy

### Server State

**Handled by TanStack Query:**
- Data fetching
- Caching
- Background refetching
- Optimistic updates

```jsx
const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: () => httpClient.get('/users'),
});
```

### Global State

**Handled by Context API:**
- Authentication state
- Theme preferences
- User settings

### Local State

**Handled by useState/useReducer:**
- Form state
- UI toggle state
- Component-specific state

## Error Handling Strategy

### HTTP Errors

Handled in axios interceptors:
```jsx
httpClient.interceptors.response.use(
  response => response.data,
  error => {
    // Global error handling
    // 401: Redirect to login
    // 403: Show access denied
    // 500: Show error toast
  }
);
```

### Component Errors

Use React Error Boundaries (can be added):
```jsx
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

## Performance Optimizations

### Code Splitting

Vite automatically handles code splitting:
```js
// Lazy load routes
const Dashboard = lazy(() => import('@features/dashboard'));
```

### Tree Shaking

ES modules enable tree shaking:
```js
// Only imports used functions
import { debounce, throttle } from '@shared/utils';
```

### Bundle Optimization

Vite config includes manual chunks:
```js
manualChunks: {
  vendor: ['react', 'react-dom'],
  ui: ['@radix-ui/react-dialog'],
}
```

## Testing Strategy (Recommended)

### Unit Tests

Test individual components and utilities:
```jsx
// Button.test.jsx
test('renders with correct variant', () => {
  render(<Button variant="primary">Click</Button>);
  expect(screen.getByRole('button')).toHaveClass('bg-primary');
});
```

### Integration Tests

Test feature workflows:
```jsx
// LoginPage.test.jsx
test('logs in user successfully', async () => {
  render(<LoginPage />);
  // Fill form and submit
  // Assert navigation to dashboard
});
```

### E2E Tests (Cypress/Playwright)

Test complete user flows:
```js
test('user can login and view dashboard', async () => {
  await page.goto('/login');
  await page.fill('[name=email]', 'user@test.com');
  await page.click('button[type=submit]');
  await expect(page).toHaveURL('/dashboard');
});
```

## Security Considerations

### Authentication

- JWT tokens stored in localStorage
- Tokens sent via Authorization header
- Automatic token validation and refresh

### XSS Prevention

- React escapes content by default
- Sanitize user input when needed
- Use `dangerouslySetInnerHTML` sparingly

### CSRF Protection

- Use CSRF tokens for state-changing operations
- SameSite cookies when using cookie-based auth

## Scalability

### Adding Features

1. Create feature directory in `src/features`
2. Add route in `src/app/routes`
3. Create feature-specific components and hooks
4. Add navigation link in Sidebar

### Adding Shared Components

1. Create component in `src/shared/components/ui`
2. Export from `src/shared/components/index.js`
3. Document usage in README

### Adding Services

1. Create service in `src/shared/services`
2. Follow singleton pattern
3. Export from index file

## Maintenance

### Code Quality

- ESLint enforces consistent code style
- Components use TypeScript-style JSDoc comments
- PropTypes or TypeScript for type safety

### Documentation

- README for setup and usage
- Inline comments for complex logic
- JSDoc for function documentation

### Dependencies

- Keep dependencies updated
- Audit for security vulnerabilities
- Remove unused packages

---

This architecture provides a solid foundation for building scalable, maintainable React applications while following industry best practices.
