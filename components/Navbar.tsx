"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Reference for profile dropdown
  const profileRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Disease Library", href: "/library" },
    { name: "Scan History", href: "/history" },
    { name: "About", href: "/about" },
  ];

  // Firebase authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);

      setProfileOpen(false);
      setMenuOpen(false);

      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div
        className="
          max-w-7xl
          mx-auto
          flex
          items-center
          justify-between
          px-5
          md:px-8
          py-4
        "
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpeg"
            alt="LeafLens Logo"
            width={55}
            height={55}
            className="rounded-xl"
          />

          <h1
            className="
              text-2xl
              md:text-3xl
              font-bold
              text-green-700
            "
          >
            LeafLens
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div
          className="
            hidden
            lg:flex
            items-center
            gap-8
          "
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative
                  text-lg
                  transition-all
                  duration-300
                  hover:text-green-700

                  after:absolute
                  after:left-0
                  after:-bottom-1
                  after:h-[2px]
                  after:bg-green-700

                  ${
                    isActive
                      ? "text-green-700 font-semibold after:w-full"
                      : "text-gray-700 after:w-0 hover:after:w-full"
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <>
              {/* Login */}
              <Link
                href="/login"
                className="
                  w-28
                  h-11
                  flex
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-green-700
                  text-green-700
                  font-semibold
                  hover:bg-green-700
                  hover:text-white
                  hover:scale-105
                  active:scale-95
                  transition-all
                  duration-200
                "
              >
                Login
              </Link>

              {/* Register */}
              <Link
                href="/register"
                className="
                  w-28
                  h-11
                  flex
                  items-center
                  justify-center
                  rounded-full
                  bg-green-700
                  text-white
                  font-semibold
                  hover:bg-green-800
                  hover:scale-105
                  active:scale-95
                  transition-all
                  duration-200
                "
              >
                Register
              </Link>
            </>
          ) : (
            /* Profile */
            <div ref={profileRef} className="relative">
              {/* Avatar Button */}
              <button
                type="button"
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((prev) => !prev)}
                className="
                  w-11
                  h-11
                  rounded-full
                  bg-green-50
                  border-2
                  border-green-200
                  flex
                  items-center
                  justify-center
                  text-green-700
                  cursor-pointer
                  hover:bg-green-100
                  hover:border-green-400
                  hover:scale-110
                  hover:shadow-md
                  active:scale-95
                  transition-all
                  duration-200
                "
              >
                <span className="text-xl">👤</span>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div
                  className="
                    absolute
                    right-0
                    mt-3
                    w-60
                    bg-white
                    rounded-2xl
                    shadow-xl
                    border
                    border-gray-100
                    p-4
                    z-50
                  "
                >
                  {/* User Information */}
                  <div className="px-2 py-1">
                    <p className="text-sm text-gray-500">
                      Signed in as
                    </p>

                    <p className="font-semibold text-green-700 truncate mt-1">
                      {user.displayName || user.email}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 my-3" />

                  {/* Scan History */}
                  <Link
                    href="/history"
                    onClick={() => setProfileOpen(false)}
                    className="
                      block
                      w-full
                      px-3
                      py-3
                      rounded-xl
                      text-gray-700
                      font-medium
                      hover:bg-green-100
                      hover:text-green-700
                      hover:shadow-sm
                      transition-all
                      duration-200
                    "
                  >
                    Scan History
                  </Link>

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      w-full
                      flex
                      items-center
                      gap-2
                      text-left
                      px-3
                      py-3
                      rounded-xl
                      text-red-600
                      font-medium
                      cursor-pointer
                      hover:bg-red-100
                      hover:text-red-700
                      hover:shadow-sm
                      transition-all
                      duration-200
                      mt-1
                    "
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Open mobile menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="
            lg:hidden
            text-3xl
            text-green-700
          "
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="
            lg:hidden
            bg-white
            border-t
            px-6
            py-6
          "
        >
          <div className="flex flex-col gap-5">

            {/* Navigation Links */}
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`
                    text-lg
                    transition
                    ${
                      isActive
                        ? "text-green-700 font-semibold"
                        : "text-gray-700 hover:text-green-700"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Authentication */}
            {!user ? (
              <>
                {/* Login */}
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="
                    text-green-700
                    font-semibold
                  "
                >
                  Login
                </Link>

                {/* Register */}
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="
                    bg-green-700
                    text-white
                    text-center
                    py-3
                    rounded-xl
                  "
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {/* User Information */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Signed in as
                  </p>

                  <p className="font-semibold text-green-700 mt-1 truncate">
                    {user.displayName || user.email}
                  </p>
                </div>

                {/* Scan History */}
                <Link
                  href="/history"
                  onClick={() => setMenuOpen(false)}
                  className="
                    block
                    px-3
                    py-3
                    rounded-xl
                    text-gray-700
                    font-medium
                    hover:bg-green-100
                    hover:text-green-700
                    hover:shadow-sm
                    transition-all
                    duration-200
                  "
                >
                  Scan History
                </Link>

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    items-center
                    gap-2
                    text-left
                    text-red-600
                    font-semibold
                    px-3
                    py-3
                    rounded-xl
                    hover:bg-red-100
                    hover:text-red-700
                    transition-all
                    duration-200
                  "
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}