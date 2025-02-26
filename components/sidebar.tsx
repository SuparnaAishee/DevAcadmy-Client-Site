"use client";

import Link from "next/link"; // Next.js link
import { Book, FileText, Users, Package } from "lucide-react"; // Icons

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-5">
      <div className="text-xl font-bold text-center mb-8">Admin Dashboard</div>
      <div className="space-y-4">
        <Link
          href="/admin/courses"
          className="flex items-center space-x-2 text-white hover:text-primary"
        >
          <Book className="h-5 w-5" />
          <span>Courses</span>
        </Link>
        <Link
          href="/admin/modules"
          className="flex items-center space-x-2 text-white hover:text-primary"
        >
          <Package className="h-5 w-5" />
          <span>Modules</span>
        </Link>
        <Link
          href="/admin/lectures"
          className="flex items-center space-x-2 text-white hover:text-primary"
        >
          <FileText className="h-5 w-5" />
          <span>Lectures</span>
        </Link>
        <Link
          href="/admin/users"
          className="flex items-center space-x-2 text-white hover:text-primary"
        >
          <Users className="h-5 w-5" />
          <span>Users</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
