/**
 * Main Layout
 * Layout for authenticated pages
 */
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:ml-[260px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
