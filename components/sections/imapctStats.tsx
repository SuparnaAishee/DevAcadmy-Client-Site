"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

interface Stat {
  value: number;
  label: string;
  suffix: string;
}

const stats: Stat[] = [
  {
    value: 4300,
    label: "Job placement worldwide",
    suffix: "+",
  },
  {
    value: 2280,
    label: "Connected companies",
    suffix: "+",
  },
  {
    value: 18,
    label: "Dedicated Job Placement Executives",
    suffix: "+",
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} />;
}

export default function ImpactStats() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent" />
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Impact_</h2>
          <div className="w-20 h-1 bg-primary/20 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative p-6 rounded-xl bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent"
            >
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-primary mb-4">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground text-lg">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
