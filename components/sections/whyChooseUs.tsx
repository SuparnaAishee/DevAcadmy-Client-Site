"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Users,
  BookOpen,
  Award,
  Target,
  Network,
  Lightbulb,
  Code,
  MessageSquare,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Networking",
    description:
      "Connect with peers, industry experts, and potential employers to expand their network.",
    icon: Network,
    color: "from-blue-500/20 to-blue-600/20",
    position: "left",
  },
  {
    title: "Learning",
    description:
      "Acquire new skills and stay up-to-date with the latest trends in tech.",
    icon: BookOpen,
    color: "from-orange-500/20 to-orange-600/20",
    position: "right",
  },
  {
    title: "Community",
    description:
      "Join a supportive community of developers and collaborate on exciting projects.",
    icon: Users,
    color: "from-yellow-500/20 to-yellow-600/20",
    position: "bottom-left",
  },
  {
    title: "Expert Guidance",
    description:
      "Expert-led sessions to guide them through the maze of development challenges.",
    icon: Lightbulb,
    color: "from-primary/20 to-primary/30",
    position: "top",
  },
];

export default function WhyChooseUsEnhanced() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <section className="relative overflow-hidden py-20" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent" />

      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.25,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="container relative mx-auto px-4"
        style={{ opacity, scale }}
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-3xl lg:text-4xl font-bold mb-4"
          >
            Why Choose Us_
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg sm:text-xl"
          >
            Everything you need to become a successful developer
          </motion.p>
        </div>

        {/* Central devConf layout */}
        <div className="relative max-w-5xl mx-auto mb-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            {/* Empty div for positioning */}
          </motion.div>

          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 relative">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  x: feature.position.includes("left") ? -50 : 50,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-xl bg-gradient-to-r ${
                  feature.color
                } backdrop-blur-sm
                          ${feature.position === "left" && "sm:col-start-1"}
                          ${feature.position === "right" && "sm:col-start-2"}
                          ${
                            feature.position === "bottom-left" &&
                            "sm:col-start-1"
                          }
                          ${feature.position === "top" && "sm:col-start-2"}`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
