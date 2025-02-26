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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/app/service/AuthService";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  // Function to check login status and set state accordingly
  const checkLoginStatus = () => {
    const loggedIn = authService.isLoggedIn();
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const role = authService.getUserRole();
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  };

  // useEffect to check login status initially and whenever the component is rendered
  useEffect(() => {
    // Check login status on mount
    checkLoginStatus();

    // Listen for changes to localStorage (triggered on login/logout)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false); // Manually update state on logout
    setUserRole(null); // Clear user role on logout
    toast.success("Logged out successfully!");
    router.push("/"); // Redirect to home page
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

            {/* Show "Dashboard" only for admin */}
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

          {/* Show "Logout" button if logged in */}
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

          {/* Mobile version - show menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
