// import { useState } from "react";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Checkbox } from "../ui/checkbox";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { Separator } from "../ui/separator";
// import { Github, Mail } from "lucide-react";
// export function SignUpForm() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Signup attempt", { name, email, password });
//   };

//   return (
//     <form className="space-y-6" onSubmit={handleSubmit}>
//       <div>
//         <Label htmlFor="name">Full name</Label>
//         <Input
//           id="name"
//           name="name"
//           type="text"
//           autoComplete="name"
//           required
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="mt-1"
//         />
//       </div>

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
//           autoComplete="new-password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="mt-1"
//         />
//       </div>

//       <div className="flex items-center">
//         <Checkbox id="terms" required />
//         <Label htmlFor="terms" className="ml-2 text-sm">
//           I agree to the{" "}
//           <Link
//             href="/terms"
//             className="font-medium text-primary hover:text-primary/80"
//           >
//             Terms of Service
//           </Link>{" "}
//           and{" "}
//           <Link
//             href="/privacy"
//             className="font-medium text-primary hover:text-primary/80"
//           >
//             Privacy Policy
//           </Link>
//         </Label>
//       </div>

//       <Button type="submit" className="w-full">
//         Sign up
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
//         <span className="text-muted-foreground">Already have an account?</span>{" "}
//         <Link
//           href="/auth/login"
//           className="font-medium text-primary hover:text-primary/80"
//         >
//           Log in
//         </Link>
//       </div>
//     </form>
//   );
// }
