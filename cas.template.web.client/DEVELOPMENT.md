# Development Guide

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Git
- VS Code (recommended)

### Recommended VS Code Extensions

- ESLint
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Prettier

### First Time Setup

1. Clone or copy the template
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env`
4. Start dev server: `npm run dev`

## Development Workflow

### Creating a New Feature

1. **Create feature directory**
   ```bash
   mkdir -p src/features/my-feature
   ```

2. **Create page component**
   ```jsx
   // src/features/my-feature/MyFeaturePage.jsx
   export const MyFeaturePage = () => {
     return (
       <div>
         <h1>My Feature</h1>
       </div>
     );
   };
   ```

3. **Add route**
   ```jsx
   // src/app/routes/index.jsx
   import { MyFeaturePage } from "@features/my-feature/MyFeaturePage";
   
   <Route path="/my-feature" element={<MyFeaturePage />} />
   ```

4. **Add to navigation**
   ```jsx
   // src/app/layouts/Sidebar.jsx
   const menuItems = [
     { path: "/my-feature", label: "My Feature", icon: "🎯" },
   ];
   ```

### Creating a Custom Hook

```jsx
// src/features/my-feature/hooks/useMyFeature.js
import { useState, useEffect } from "react";
import { httpClient } from "@shared/services";

export const useMyFeature = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await httpClient.get("/my-endpoint");
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading };
};
```

### Creating a Service

```jsx
// src/shared/services/product.service.js
import { httpClient } from "./http.service";

class ProductService {
  async getProducts() {
    return await httpClient.get("/products");
  }

  async getProduct(id) {
    return await httpClient.get(`/products/${id}`);
  }

  async createProduct(data) {
    return await httpClient.post("/products", data);
  }

  async updateProduct(id, data) {
    return await httpClient.put(`/products/${id}`, data);
  }

  async deleteProduct(id) {
    return await httpClient.delete(`/products/${id}`);
  }
}

export const productService = new ProductService();
```

### Using TanStack Query

```jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@shared/services";

export const ProductList = () => {
  const queryClient = useQueryClient();

  // Fetch data
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getProducts(),
  });

  // Mutation
  const mutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};
```

## Component Patterns

### Form Handling with React Hook Form

```jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
});

export const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}
      
      <Input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <Button type="submit">Submit</Button>
    </form>
  );
};
```

### Modal Pattern

```jsx
import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";

export const MyModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Content>
          <Dialog.Title>Modal Title</Dialog.Title>
          <Dialog.Description>Modal content here</Dialog.Description>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Dialog.Content>
      </Dialog>
    </>
  );
};
```

### Table Pattern

```jsx
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

export const DataTable = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
```

## Styling Guidelines

### Using Tailwind

```jsx
// ✅ Good - Use utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 className="text-xl font-bold">Title</h2>
</div>

// ❌ Avoid - Inline styles
<div style={{ display: "flex", padding: "16px" }}>
  <h2 style={{ fontSize: "20px" }}>Title</h2>
</div>
```

### Conditional Classes

```jsx
import { cn } from "@shared/utils";

<Button
  className={cn(
    "base-class",
    isActive && "active-class",
    isDisabled && "disabled-class"
  )}
>
  Click me
</Button>
```

### Responsive Design

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>
```

## State Management

### Local State

```jsx
const [count, setCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);
```

### Context API

```jsx
// Create context
const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

// Use context
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within MyProvider");
  }
  return context;
};
```

### Zustand (Alternative)

```jsx
import create from "zustand";

export const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// In component
const { count, increment } = useStore();
```

## API Integration

### GET Request

```jsx
const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: () => httpClient.get("/users"),
});
```

### POST Request

```jsx
const mutation = useMutation({
  mutationFn: (data) => httpClient.post("/users", data),
  onSuccess: () => {
    toast.success("User created!");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});

mutation.mutate({ name: "John", email: "john@example.com" });
```

### Pagination

```jsx
const [page, setPage] = useState(1);

const { data } = useQuery({
  queryKey: ["users", page],
  queryFn: () => httpClient.get(`/users?page=${page}`),
  keepPreviousData: true,
});
```

### Search/Filter

```jsx
const [search, setSearch] = useState("");

const { data } = useQuery({
  queryKey: ["users", search],
  queryFn: () => httpClient.get(`/users?search=${search}`),
  enabled: search.length > 2, // Only search if 3+ characters
});
```

## Error Handling

### Component-Level

```jsx
try {
  await someAsyncOperation();
} catch (error) {
  toast.error(error.message);
  console.error("Operation failed:", error);
}
```

### Global Error Handling

Already configured in `http.service.js`:
- 401: Redirects to login
- Network errors: Shows friendly message
- Other errors: Logs to console

## Performance Tips

### Memoization

```jsx
import { useMemo, useCallback } from "react";

// Expensive computation
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Callback function
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### Lazy Loading

```jsx
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

<Suspense fallback={<Spinner />}>
  <HeavyComponent />
</Suspense>
```

### Virtual Lists

For long lists, use virtualization:

```jsx
import { useVirtualizer } from "@tanstack/react-virtual";

export const VirtualList = ({ items }) => {
  const parentRef = useRef();

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: "400px", overflow: "auto" }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div key={virtualRow.index}>
            {items[virtualRow.index]}
          </div>
        ))}
      </div>
    </div>
  );
};
```

## Debugging

### React DevTools

- Install React DevTools browser extension
- Inspect component tree
- View props and state
- Profile performance

### Network Debugging

- Check Network tab in DevTools
- Look for failed requests
- Inspect request/response headers
- Check response data

### Console Logging

```jsx
console.log("Data:", data);
console.error("Error:", error);
console.table(arrayOfObjects);
```

## Building for Production

### Optimize Bundle

```bash
npm run build
```

### Analyze Bundle Size

```bash
npm install -D vite-bundle-visualizer
```

Add to `vite.config.js`:
```js
import { visualizer } from "rollup-plugin-visualizer";

plugins: [
  visualizer({ open: true })
]
```

### Environment Variables

Production `.env`:
```env
VITE_API_BASE_URL=https://api.production.com
```

## Common Issues

### Port Already in Use

```bash
# Kill process on port 5173
npx kill-port 5173
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Styling Not Applied

```bash
# Restart dev server
# Clear browser cache
```

## Best Practices Checklist

- [ ] Components are small and focused
- [ ] Reusable logic extracted to hooks
- [ ] PropTypes or TypeScript for type safety
- [ ] Error handling in place
- [ ] Loading states shown
- [ ] Responsive design implemented
- [ ] Accessibility considered
- [ ] Code formatted with ESLint
- [ ] Git commits are meaningful
- [ ] Documentation updated

---

Happy coding! 🚀
