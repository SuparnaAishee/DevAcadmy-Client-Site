// app/dashboard/page.tsx
"use client";

import Sidebar from "@/components/sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold">
          Welcome to the Admin Dashboard
        </h1>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
};

export default Dashboard; // This should be the default export
