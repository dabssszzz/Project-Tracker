import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import {
  QueryProvider,
  ThemeProvider,
  AuthProvider,
} from "./app/providers";
import { Router } from "./app/routes";
import { Toaster } from "sonner";

export const App = () => {
  return (
    <HelmetProvider>
      <QueryProvider>
        <AuthProvider>
          <ThemeProvider>
            <BrowserRouter>
              <Router />
              <Toaster position="top-right" richColors />
            </BrowserRouter>
          </ThemeProvider>
        </AuthProvider>
      </QueryProvider>
    </HelmetProvider>
  );
};
