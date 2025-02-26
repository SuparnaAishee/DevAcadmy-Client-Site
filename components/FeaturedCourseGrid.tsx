"use client";

import { Clock, PlayCircle, Calendar, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/Countdown";
import Link from "next/link";
import type { Course } from "@/app/Types/courseType"; // shared type

export function FeaturedCourseGrid({ courses }: { courses: Course[] }) {
  // Slice the array to get the last two courses
  const lastTwoCourses = courses.slice(-2);

  if (lastTwoCourses.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No featured courses available at the moment.
      </div>
    );
  }

  return (
    <section className="py-12 mt-20">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-2">
          Featured Courses_
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Registration ongoing - Enroll before seats fill up!
        </p>

        {lastTwoCourses.map((course) => (
          <Link href={`/courses/${course._id}`} key={course._id}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-xl border overflow-hidden transition-all hover:shadow-lg p-6 mb-8 cursor-pointer">
              {/* Left Side: Thumbnail */}
              <div className="relative w-full h-[250px] sm:h-[350px]">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="object-cover w-full h-full rounded-lg"
                />
                {/* If regEnd exists, assume registration is open */}
                {course.regEnd && (
                  <Badge
                    variant="success"
                    className="absolute top-2 right-2 uppercase text-sm"
                  >
                    Registration Open
                  </Badge>
                )}
              </div>

              {/* Right Side: Course Details */}
              <div className="flex flex-col justify-between sm:pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    Batch {course.batch ? course.batch : "N/A"}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Total Seats: {course.totalSeats}
                  </Badge>
                </div>

                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {course.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Starts{" "}
                    {course.regStart
                      ? new Date(course.regStart).toLocaleDateString()
                      : "TBA"}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <PlayCircle className="h-4 w-4" />
                    {course.totalLesson} Lessons
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    Total Seats: {course.totalSeats}
                  </div>
                </div>

                <div className="bg-muted p-3 rounded-lg mb-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Registration closes in
                  </p>
                  {course.regEnd ? (
                    <Countdown targetDate={new Date(course.regEnd)} />
                  ) : (
                    <span className="text-sm">TBA</span>
                  )}
                </div>

                {/* Price and Button Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
                  <div className="flex flex-col justify-between mb-4 sm:mb-0">
                    <p className="text-3xl font-bold text-primary">
                      ৳
                      {course.discountPrice &&
                      course.discountPrice < course.price
                        ? course.discountPrice.toLocaleString()
                        : course.price.toLocaleString()}
                    </p>
                    {course.discountPrice &&
                      course.discountPrice < course.price && (
                        <p className="text-sm text-muted-foreground line-through">
                          ৳{course.price.toLocaleString()}
                        </p>
                      )}
                  </div>

                  <div className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="font-semibold w-full sm:w-auto"
                    >
                      Enroll Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
