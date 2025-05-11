"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold text-gray-800 hover:text-blue-600 transition"
          onClick={() => showNotification("Welcome to ImageKit Shop", "info")}
        >
          <Home className="w-5 h-5" />
          <span>ImageKit Shop</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm btn-outline rounded-full hover:bg-blue-100 text-gray-700"
            >
              <User className="w-5 h-5" />
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content mt-3 p-2 shadow-lg rounded-lg w-64 bg-white border border-gray-100"
            >
              {session ? (
                <>
                  <li className="px-3 py-2 text-sm text-gray-600">
                    {session.user?.email?.split("@")[0]}
                  </li>
                  <li>
                    <hr className="my-1" />
                  </li>
                  {session.user?.role === "admin" && (
                    <li>
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 rounded"
                        onClick={() =>
                          showNotification("Welcome to Admin Dashboard", "info")
                        }
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 rounded"
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-blue-300 rounded"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-lg text-blue-600 bg-blue-100 hover:bg-blue-400 rounded"                    onClick={() =>
                      showNotification("Please sign in to continue", "info")
                    }
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
