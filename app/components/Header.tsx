// "use client";

// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { Home, User } from "lucide-react";
// import { useNotification } from "./Notification";

// export default function Header() {
//   const { data: session } = useSession();
//   const { showNotification } = useNotification();

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       showNotification("Signed out successfully", "success");
//     } catch {
//       showNotification("Failed to sign out", "error");
//     }
//   };

//   return (
//     <div className="navbar bg-base-300 sticky top-0 z-40">
//       <div className="container mx-auto">
//         <div className="flex-1 px-2 lg:flex-none">
//           <Link
//             href="/"
//             className="btn btn-ghost text-xl gap-2 normal-case font-bold"
//             prefetch={true}
//             onClick={() =>
//               showNotification("Welcome to ImageKit ReelsPro", "info")
//             }
//           >
//             <Home className="w-5 h-5" />
//             Video with AI
//           </Link>
//         </div>
//         <div className="flex flex-1 justify-end px-2">
//           <div className="flex items-stretch gap-2">
//             <div className="dropdown dropdown-end">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="btn btn-ghost btn-circle"
//               >
//                 <User className="w-5 h-5" />
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-64 mt-4 py-2"
//               >
//                 {session ? (
//                   <>
//                     <li className="px-4 py-1">
//                       <span className="text-sm opacity-70">
//                         {session.user?.email?.split("@")[0]}
//                       </span>
//                     </li>
//                     <div className="divider my-1"></div>

//                     <li>
//                       <Link
//                         href="/upload"
//                         className="px-4 py-2 hover:bg-base-200 block w-full"
//                         onClick={() =>
//                           showNotification("Welcome to Admin Dashboard", "info")
//                         }
//                       >
//                         Video Upload
//                       </Link>
//                     </li>

//                     <li>
//                       <button
//                         onClick={handleSignOut}
//                         className="px-4 py-2 text-error hover:bg-base-200 w-full text-left"
//                       >
//                         Sign Out
//                       </button>
//                     </li>
//                   </>
//                 ) : (
//                   <li>
//                     <Link
//                       href="/login"
//                       className="px-4 py-2 hover:bg-base-200 block w-full"
//                       onClick={() =>
//                         showNotification("Please sign in to continue", "info")
//                       }
//                     >
//                       Login
//                     </Link>
//                   </li>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Search, Upload, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {   // ✅ use props
  const { data: session } = useSession();
  const router = useRouter();
  const [q, setQ] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();

    if (!query) {
      onSearch?.(""); // reset filter
      return;
    }

    // Trigger client-side filter instead of routing
    if (onSearch) {
      onSearch(query);
    } else {
      // fallback: navigate for standalone pages
      router.push(`/?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* left: menu + logo */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md hover:bg-white/5 md:hidden">
            <Menu size={18} />
          </button>

          <Link href="/" className="flex items-center gap-3">
            {/* <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <span className="text-white font-bold">Streamigo</span>
            </div> */}
            <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center">
              <img src="/logo2.jpg" alt="Streamigo Logo" className="w-full h-full object-cover" />
            </div>

            <div className=" sm:block">
              <h1 className="text-white font-semibold">Streamigo</h1>
              <p className="text-xs text-gray-400 -mt-1">
                Upload. Discover. Watch
              </p>
            </div>
          </Link>
        </div>

        {/* center: search */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-2xl mx-4 md:flex items-center"
        >
          <input
            type="text"
            placeholder="Search videos by title..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              onSearch?.(e.target.value); // ✅ live filtering as user types
            }}
            className="w-full bg-gray-900/60 border border-gray-800 rounded-l-md px-4 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-r-md bg-rose-600 hover:bg-rose-500 transition text-white flex items-center gap-2 cursor-pointer"
          >
            <Search size={16} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>

        {/* right: actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/upload"
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/5 border border-gray-800"
          >
            <Upload size={16} />
            <span className="text-sm text-white">Upload</span>
          </Link>

          {session ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/upload")}
                className="p-2 rounded-md hover:bg-white/5 cursor-pointer"
                aria-label="Upload"
              >
                <Upload size={18} />
              </button>

              <div className="flex items-center gap-2">
                <Image
                  src={session.user?.image || "/favicon.ico"}
                  width={36}
                  height={36}
                  alt="avatar"
                  className="rounded-full object-cover border border-gray-700"
                />
                <div className="block">
                  <p className="text-sm text-white">
                    {session.user?.name || session.user?.email}
                  </p>
                  <button
                    onClick={() => signOut()}
                    className="text-xs text-gray-400 hover:underline cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-1 rounded-md border border-gray-700 hover:bg-white/5 text-sm text-white cursor-pointer"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-3 py-1 rounded-md bg-rose-600 hover:bg-rose-500 text-sm text-white cursor-pointer"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
