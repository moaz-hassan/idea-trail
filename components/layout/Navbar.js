"use client";
import { Menu, X, Moon, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import logout from "@/lib/auth/logout";
import SmallLoader from "@/components/ui/Loader";
import Cookies from "js-cookie";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/check-loggedin", {
          method: "GET",
        });
        const data = await res.json();
        setUser(data.user || null);
        Cookies.set("userInfo", JSON.stringify(data.user));
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Publishers", href: "/publishers" },
    { name: "Trends", href: "/trends" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 shadow-md text-black dark:text-white transition">
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="logo" width={40} height={40} />
          <span className="text-xl font-bold">IdeaTrail</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition hover:text-blue-500 ${
                pathname === item.href ? "text-blue-500" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}

          <input
            type="text"
            placeholder="Search..."
            className="w-[150px] h-8 border border-gray-300 rounded-lg p-2 mx-auto block outline-none transition-all duration-200 focus:w-[250px] focus:ring-1 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.href = `/blog/search?value=${encodeURIComponent(
                  e.target.value
                )}`;
                e.target.value = "";
              }
            }}
          />

          <span className="">|</span>

          {loading ? (
            <SmallLoader />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="cursor-pointer flex items-center gap-2 text-sm font-medium hover:text-blue-500"
              >
                <User className="w-4 h-4" />
                <span>{user?.name}</span>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-md shadow-lg py-1">
                  {user?.role === "admin" || user?.role === "publisher" ? (
                    <Link
                      href={`/${user?.role}/dashboard`}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
                    >
                      Dashboard
                    </Link>
                  ) : null}
                  {user?.role === "user" && (
                    <Link
                      href="/user/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
                    >
                      Profile
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={`text-sm font-medium transition hover:text-blue-500 ${
                  pathname === "/login" ? "text-blue-500" : ""
                }`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={`text-sm font-medium transition hover:text-blue-500 ${
                  pathname === "/signup" ? "text-blue-500" : ""
                }`}
              >
                Signup
              </Link>
            </>
          )}

          <Moon className="w-5 h-5 cursor-pointer hover:text-blue-500" />
        </div>

        <div className="lg:hidden flex items-center gap-4">
          <Moon className="w-6 h-6 bg-gray-200 dark:bg-zinc-700 rounded-full p-1 cursor-pointer" />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="w-6 h-6 cursor-pointer" />
            ) : (
              <Menu className="w-6 h-6 cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      <MobileMenu
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        user={user}
        onLogout={logout}
      />
    </nav>
  );
}
