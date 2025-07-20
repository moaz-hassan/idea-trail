import AuthWrapperServer from "@/components/AuthWrapper.server";
import PublisherDashboardAside from "@/components/publisher/PublisherDashboardAside";
import PublisherDashboardHeader from "@/components/publisher/PublisherDashboardHeader";

export default function PublisherLayout({ children }) {
  return (
  <AuthWrapperServer requiredRoles={["publisher"]} requireAuth={true} redirectTo="/">
    <div className="flex h-screen bg-gray-50">
      {/* Mobile backdrop */}
      <div id="mobile-sidebar-backdrop" className="fixed inset-0 z-30 bg-black/50 hidden transition-opacity duration-300" />
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white lg:z-40">
        <PublisherDashboardAside />
      </div>
      
      {/* Mobile Sidebar */}
      <div id="mobile-sidebar" className="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out -translate-x-full lg:hidden">
        <PublisherDashboardAside isMobile />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:pl-64">
        <PublisherDashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  </AuthWrapperServer>
  );
}
