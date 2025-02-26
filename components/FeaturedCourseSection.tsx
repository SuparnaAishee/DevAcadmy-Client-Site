"use client";

import { useEffect, useState } from "react";
import { courseService } from "@/app/service/CourseService";
import { Loader2 } from "lucide-react";
import type { Course } from "@/app/Types/courseType";
import { FeaturedCourseGrid } from "./FeaturedCourseGrid";

export default function FeaturedCourseSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await courseService.getCourses();
        console.log("Fetched Featured Courses:", response);

        // Ensure response.data is an array and contains courses
        if (
          response &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          const coursesData: Course[] = response.data;
          // Get only the last 2 courses (or all if fewer than 2)
          const lastTwoCourses =
            coursesData.length >= 2 ? coursesData.slice(-2) : coursesData;
          setCourses(lastTwoCourses);
        } else {
          setError("No courses available");
        }
      } catch (err) {
        console.error("Error in fetchCourses:", err);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  console.log("Featured Courses State:", courses);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-12">Error: {error}</div>;
  }

  if (courses.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No featured courses available
      </div>
    );
  }

  return <FeaturedCourseGrid courses={courses} />;
}
