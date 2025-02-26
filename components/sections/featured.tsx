"use client";

import { motion } from "framer-motion";
import { Briefcase, Video, BookOpen, Users, Code, Award } from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "Job Placement Coach",
    description:
      "Get personalized career guidance and job placement support from industry experts.",
  },
  {
    icon: Video,
    title: "Live Conceptual Session",
    description:
      "Interactive live sessions to clear your doubts and understand complex concepts.",
  },
  {
    icon: BookOpen,
    title: "Advance Crash Course (ACC)",
    description:
      "Intensive learning programs to fast-track your development career.",
  },
  {
    icon: Users,
    title: "Support Session",
    description: "Get help from mentors and peers whenever you're stuck.",
  },
  {
    icon: Code,
    title: "Interview Preparation",
    description:
      "Mock interviews and preparation sessions with industry professionals.",
  },
  {
    icon: Award,
    title: "Job Ready Projects",
    description: "Build real-world projects that employers are looking for.",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent" />
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose Us_
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to become a successful developer
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative p-6 rounded-xl bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent 
                        backdrop-blur-sm hover:bg-primary/5 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
