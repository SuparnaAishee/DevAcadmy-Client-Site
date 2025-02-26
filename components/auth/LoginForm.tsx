// "use client";

// import type React from "react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Separator } from "@/components/ui/separator";
// import Link from "next/link";
// import { Github, Mail } from "lucide-react";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Login attempt", { email, password });
//   };

//   return (
//     <form className="space-y-6" onSubmit={handleSubmit}>
//       <div>
//         <Label htmlFor="email">Email address</Label>
//         <Input
//           id="email"
//           name="email"
//           type="email"
//           autoComplete="email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="mt-1"
//         />
//       </div>

//       <div>
//         <Label htmlFor="password">Password</Label>
//         <Input
//           id="password"
//           name="password"
//           type="password"
//           autoComplete="current-password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="mt-1"
//         />
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <Checkbox id="remember-me" />
//           <Label htmlFor="remember-me" className="ml-2 text-sm">
//             Remember me
//           </Label>
//         </div>

//         <div className="text-sm">
//           <Link
//             href="/auth/forgot-password"
//             className="font-medium text-primary hover:text-primary/80"
//           >
//             Forgot your password?
//           </Link>
//         </div>
//       </div>

//       <Button type="submit" className="w-full">
//         Sign in
//       </Button>

//       <div className="mt-6">
//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <Separator />
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 bg-card text-muted-foreground">
//               Or continue with
//             </span>
//           </div>
//         </div>

//         <div className="mt-6 grid grid-cols-2 gap-3">
//           <Button variant="outline" className="w-full">
//             <Github className="mr-2 h-4 w-4" />
//             GitHub
//           </Button>
//           <Button variant="outline" className="w-full">
//             <Mail className="mr-2 h-4 w-4" />
//             Google
//           </Button>
//         </div>
//       </div>

//       <div className="mt-6 text-center text-sm">
//         <span className="text-muted-foreground">Don't have an account?</span>{" "}
//         <Link
//           href="/auth/signup"
//           className="font-medium text-primary hover:text-primary/80"
//         >
//           Sign up
//         </Link>
//       </div>
//     </form>
//   );
// }
