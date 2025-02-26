"use client";

import { useEffect, useState } from "react";
import { CourseGrid } from "./CourseGrid";
import { courseService } from "@/app/service/CourseService";
import { Loader2 } from "lucide-react";
import { Course } from "@/app/Types/courseType";
import Link from "next/link"; // Import Link component

interface CourseSectionProps {
  limit?: number; // Optional prop to limit the number of courses displayed
}

export default function CourseSection({ limit = 9 }: CourseSectionProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await courseService.getCourses();

        console.log("Fetched Data:", response); // Debugging log

        if (response && response.data) {
          setCourses(response.data); // ✅ Fix: Use response.data
        } else {
          setError("Failed to fetch courses");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Error in fetchCourses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  console.log("Courses State:", courses); // Debugging log

  // Slice the courses array to show only 'limit' number of courses
  const displayedCourses = limit ? courses.slice(0, limit) : courses;

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
        No courses available
      </div>
    );
  }

  return (
    <div>
      <CourseGrid courses={displayedCourses} />
      {/* Explore More Button */}
      <div className="text-center mt-8">
        <Link href="/courses">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200">
            Explore More 
          </button>
        </Link>
      </div>
    </div>
  );
}
