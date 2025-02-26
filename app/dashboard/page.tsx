import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  FileText,
  Library,
  TrendingUp,
  Clock,
} from "lucide-react";

const stats = [
  {
    title: "Total Courses",
    value: "24",
    icon: BookOpen,
    trend: "+4.75%",
    description: "vs. last month",
  },
  {
    title: "Total Students",
    value: "2,567",
    icon: Users,
    trend: "+12.5%",
    description: "vs. last month",
  },
  {
    title: "Total Modules",
    value: "156",
    icon: Library,
    trend: "+8.2%",
    description: "vs. last month",
  },
  {
    title: "Total Lectures",
    value: "892",
    icon: FileText,
    trend: "+6.4%",
    description: "vs. last month",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 ">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your learning management system
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent" />
            <div className="p-6 relative">
              <div className="flex items-center justify-between">
                <stat.icon className="h-8 w-8 text-primary" />
                <span className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-3xl font-bold mt-4">{stat.value}</h3>
              <p className="text-sm font-medium text-muted-foreground mt-2">
                {stat.title}
              </p>
              <div className="flex items-center mt-4 text-xs text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {stat.description}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add more dashboard content here */}
    </div>
  );
}
