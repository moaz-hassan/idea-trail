import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

export default function MobileMenu({
  setIsMenuOpen,
  isMenuOpen,
  user,
  onLogout,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Authors", href: "/authors" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
      <div
      className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
        isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <input
        type="text"
        placeholder="Search..."
        className="max-sm:w-[200px] w-[350px] h-8 border border-gray-300 rounded-lg p-2 mx-auto my-6 block outline-none transition-all duration-200 focus:w-[250px] focus:ring-1 focus:ring-blue-500"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`/search?value=${encodeURIComponent(e.target.value)}`);
            setIsMenuOpen(false);
            e.target.value = "";
          }
        }}
      />
      <div className="flex flex-col gap-2 px-6 py-4 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 rounded-b-md shadow-md">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
            className={`text-sm font-medium py-2 px-2 rounded hover:text-blue-500 transition ${
              pathname === item.href ? "text-blue-500" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}

        <div className="border-t border-gray-300 dark:border-zinc-700 my-2 pt-2">
          {user ? (
            <>
              <div className="flex items-center gap-2 px-2 py-2 text-sm font-medium">
                <User className="w-4 h-4" />
                <span>{user.name}</span>
              </div>
              {(user?.role === "admin" || user?.role === "publisher") && (
                <Link
                  href={`/${user?.role}/dashboard`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium py-2 px-2 block rounded hover:text-blue-500 transition"
                >
                  Dashboard
                </Link>
              )}
              {user?.role === "user" && (
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium py-2 px-2 block rounded hover:text-blue-500 transition"
                >
                  Profile
                </Link>
              )}
              <button
                onClick={() => {
                  onLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-sm font-medium py-2 px-2 text-red-600 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded transition flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 px-2 block rounded hover:text-blue-500 transition ${
                  pathname === "/login" ? "text-blue-500" : ""
                }`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2 px-2 block rounded hover:text-blue-500 transition ${
                  pathname === "/signup" ? "text-blue-500" : ""
                }`}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
