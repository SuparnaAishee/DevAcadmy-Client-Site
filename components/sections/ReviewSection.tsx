"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    id: 1,
    name: "Rakib Hassan",
    role: "Full Stack Developer at Brain Station 23",
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1740226214/portrait-of-smiling-male-owner-of-fashion-store-standing-in-front-of-clothing-display_ttj1zu.jpg",
    review:
      "This platform transformed my career. The practical approach and job placement support were invaluable.",
    rating: 5,
    company: {
      name: "Brain Station 23",
      logo: "https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvYjBiMDJhMWQtYzAwZi00ODE5LTk0YmUtMGQ2NzNmNGNlMjY2LzE4MDk4MWE3LTkzYTktNDk5NS05YmI4LTQzMjIxZDE2NTg5Mi5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6NjI3LCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=",
    },
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Frontend Developer at Selise Digital",
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1740226235/happy-indian-woman-look-at-webcam-doing-job-interview-videochat_zbcmnl.jpg",
    review:
      "The mentorship and community support helped me land my dream job. Highly recommended!",
    rating: 5,
    company: {
      name: "Selise Digital",
      logo: "https://res.cloudinary.com/dwelabpll/image/upload/v1740507946/Logo_xdab8u.png",
    },
  },
  {
    id: 3,
    name: "Mehedi Hasan",
    role: "MERN Stack Developer at TigerIT",
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1740226096/headshot-with-client-testimonial_t4r8em.jpg",
    review:
      "Best investment in my career. The course content and job placement support are exceptional.",
    rating: 5,
    company: {
      name: "TigerIT",
      logo: "https://res.cloudinary.com/dwelabpll/image/upload/v1740507901/images_iegmfr.jpg",
    },
  },
];

export default function ReviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + newDirection + reviews.length) % reviews.length
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [paginate]);

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0" />
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success Stories_
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from our successful graduates
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full"
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent backdrop-blur-sm">
                  <img
                    src={reviews[currentIndex].image || "/placeholder.svg"}
                    alt={reviews[currentIndex].name}
                    className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-primary/20"
                  />
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-primary fill-primary"
                      />
                    ))}
                  </div>
                  <p className="text-lg mb-6 italic">
                    "{reviews[currentIndex].review}"
                  </p>
                  <h4 className="text-xl font-semibold mb-2">
                    {reviews[currentIndex].name}
                  </h4>
                  <p className="text-primary mb-4">
                    {reviews[currentIndex].role}
                  </p>
                  {reviews[currentIndex].company && (
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={
                          reviews[currentIndex].company.logo ||
                          "/placeholder.svg"
                        }
                        alt={reviews[currentIndex].company.name}
                        className="h-20 w-50"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 md:left-4 md:top-1/2"
            onClick={() => paginate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 md:right-4 md:top-1/2"
            onClick={() => paginate(1)}
          >
            <ArrowRight className="h-6 w-6" />
          </Button>

          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-3 transition-all ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-3 bg-primary/20"
                } rounded-full`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
