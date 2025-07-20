'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SidebarToggle() {
  const pathname = usePathname();

  useEffect(() => {
    closeSidebar();
  }, [pathname]);

  const toggleSidebar = () => {
    const backdrop = document.getElementById('mobile-sidebar-backdrop');
    const sidebar = document.getElementById('mobile-sidebar');
    
    if (backdrop && sidebar) {
      if (sidebar.classList.contains('-translate-x-full')) {
        // Open sidebar
        backdrop.classList.remove('hidden');
        setTimeout(() => {
          backdrop.classList.remove('opacity-0');
          backdrop.classList.add('opacity-100');
        }, 10);
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.add('translate-x-0');
      } else {
        // Close sidebar
        closeSidebar();
      }
    }
  };

  const closeSidebar = () => {
    const backdrop = document.getElementById('mobile-sidebar-backdrop');
    const sidebar = document.getElementById('mobile-sidebar');
    
    if (backdrop && sidebar) {
      backdrop.classList.add('opacity-0');
      backdrop.classList.remove('opacity-100');
      setTimeout(() => {
        backdrop.classList.add('hidden');
      }, 300);
      sidebar.classList.add('-translate-x-full');
      sidebar.classList.remove('translate-x-0');
    }
  };

  return (
    <button 
      className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 mr-2"
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}