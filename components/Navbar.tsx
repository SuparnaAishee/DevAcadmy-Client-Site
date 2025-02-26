// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Globe, Menu } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { authService } from "@/app/service/AuthService";
// import toast from "react-hot-toast";

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       setIsLoggedIn(authService.isLoggedIn());
//     };

//     checkLoginStatus();
//     window.addEventListener("storage", checkLoginStatus);

//     return () => {
//       window.removeEventListener("storage", checkLoginStatus);
//     };
//   }, []);

//   const handleLogout = () => {
//     authService.logout();
//     setIsLoggedIn(false);
//     toast.success("Logged out successfully!");
//     router.push("/");
//   };

//   return (
//     <nav className="border-b pl-12 pr-12 bg-base-100">
//       <div className="container mx-auto px-4 h-16 flex items-center justify-between">
//         <div className="flex items-center space-x-8">
//           <Link href="/" className="text-2xl font-bold">
//             <img
//               src="https://res.cloudinary.com/dwelabpll/image/upload/v1740142493/Screenshot_2025-02-21_183411_b43uxk.png"
//               alt="DevAcademy Logo"
//               className="h-12 w-auto max-w-[200px]"
//             />
//           </Link>
//           <div className="hidden md:flex space-x-6">
//             <Link
//               href="/courses"
//               className="text-sm font-medium hover:text-primary"
//             >
//               Courses
//             </Link>
//             <Link
//               href="/about"
//               className="text-sm font-medium hover:text-primary"
//             >
//               About
//             </Link>
//             <Link
//               href="/contact"
//               className="text-sm font-medium hover:text-primary"
//             >
//               Contact
//             </Link>
//           </div>
//         </div>
//         <div className="flex items-center space-x-4">
//           <Button variant="ghost" size="icon" className="hidden md:flex">
//             <Globe className="h-5 w-5" />
//           </Button>
//           {isLoggedIn ? (
//             <Button
//               variant="ghost"
//               onClick={handleLogout}
//               className="hidden md:flex"
//             >
//               Log out
//             </Button>
//           ) : (
//             <>
//               <Link href="/login">
//                 <Button variant="ghost" className="hidden md:flex">
//                   Log in
//                 </Button>
//               </Link>
//               <Link href="/signup">
//                 <Button>Sign up</Button>
//               </Link>
//             </>
//           )}
//           <Button variant="ghost" size="icon" className="md:hidden">
//             <Menu className="h-5 w-5" />
//           </Button>
//         </div>
//       </div>
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, Menu } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/app/service/AuthService";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  const checkAuthStatus = useCallback(() => {
    const loggedIn = authService.isLoggedIn();
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      setUserRole(authService.getUserRole());
    } else {
      setUserRole(null);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();

    const isLoginRedirect = sessionStorage.getItem("loginRedirect");
    if (isLoginRedirect === "true" && window.location.pathname === "/") {
      sessionStorage.removeItem("loginRedirect");
      window.location.reload();
    }

    // Listen for route changes
    const handleRouteChange = () => {
      if (window.location.pathname === "/" && authService.isLoggedIn()) {
       
        sessionStorage.setItem("loginRedirect", "true");
         
      }
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [checkAuthStatus]);

  const handleLogout = () => {
    authService.logout();
    toast.success("Logged out successfully!");
    router.push("/");
   
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <nav className="border-b pl-12 pr-12 bg-base-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold">
            <img
              src="https://res.cloudinary.com/dwelabpll/image/upload/v1740142493/Screenshot_2025-02-21_183411_b43uxk.png"
              alt="DevAcademy Logo"
              className="h-12 w-auto max-w-[200px]"
            />
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link
              href="/courses"
              className="text-sm font-medium hover:text-primary"
            >
              Courses
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary"
            >
              Contact
            </Link>

            {isLoggedIn && userRole === "admin" && (
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:text-primary"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Globe className="h-5 w-5" />
          </Button>

          {isLoggedIn ? (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="hidden md:flex"
            >
              Log out
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="hidden md:flex">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

