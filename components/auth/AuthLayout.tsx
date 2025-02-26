import type React from "react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function AuthLayout({
  children,
  title,
  description,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-primary/5 to-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center mb-6">
          <span className="sr-only">Your Company</span>
          <img
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1740148980/Screenshot_2025-02-21_183411-removebg-preview_pwuitj.png"
            alt="Company Logo"
            className="h-20 w-auto"
          />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
