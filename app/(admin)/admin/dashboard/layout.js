import AdminDashboardAside from "@/components/admin/AdminDashboardAside";
import AdminDashboardHeader from "@/components/admin/AdminDashboardHeader";
import AuthWrapperServer from "@/components/AuthWrapper.server";

export default function AdminLayout({ children }) {
  return (
    <AuthWrapperServer requiredRoles={["admin"]} requireAuth redirectTo="/">
      <div className="flex h-screen bg-gray-50">
        {/* Mobile backdrop */}
        <div
          id="mobile-sidebar-backdrop"
          className="fixed inset-0 z-30 bg-black/50 hidden transition-opacity duration-300"
        />

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white lg:z-40">
          <AdminDashboardAside />
        </div>

        {/* Mobile Sidebar */}
        <div
          id="mobile-sidebar"
          className="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out -translate-x-full lg:hidden"
        >
          <AdminDashboardAside isMobile />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:pl-64">
          <AdminDashboardHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </AuthWrapperServer>
  );
}
