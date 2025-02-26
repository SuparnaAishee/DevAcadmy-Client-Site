import { Users, BookOpen, Trophy, Clock } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10K+",
    label: "Active Students",
  },
  {
    icon: BookOpen,
    value: "100+",
    label: "Expert Courses",
  },
  {
    icon: Trophy,
    value: "95%",
    label: "Success Rate",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Support Available",
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 pl-12 pr-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-blue-500 bg-white p-8 rounded-lg shadow-lg ">
              <div className="inline-flex p-4 rounded-full mb-4">
                <stat.icon className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-black">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
