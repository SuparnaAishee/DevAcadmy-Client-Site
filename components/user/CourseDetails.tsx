"use client";
import { useEffect, useState } from "react";
import { courseService } from "@/app/service/CourseService";
import { Button } from "@/components/ui/button";
import { Course } from "@/app/Types/courseType";
import Link from "next/link"; // ✅ Import Link for navigation

interface CourseDetailsProps {
  courseId: string;
}

export default function CourseDetailsPage({ courseId }: CourseDetailsProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await courseService.getCourseById(courseId);
        if (response) {
          setCourse(response);
        } else {
          setError("Failed to fetch course details");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Error fetching course details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Course Details Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-all duration-500 hover:scale-105">
        <h1 className="text-3xl font-semibold mb-4 text-blue-600">
          {course.title}
        </h1>
        <div className="flex flex-col md:flex-row items-center mb-4">
          <img
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            className="w-48 h-48 object-cover rounded-md shadow-lg transition-transform duration-300 hover:scale-110 mb-4 md:mb-0"
          />
          <div className="md:ml-6">
            <p className="text-xl font-semibold text-green-600">
              Price: ৳{course.discountPrice}
            </p>
            <p className="text-sm text-gray-500 line-through">
              ৳{course.price}
            </p>
            <p className="text-sm text-gray-600 mt-2">Batch: {course.batch}</p>
            <p className="text-sm text-gray-600 mt-2">
              Duration: {course.duration} | Total Lessons: {course.totalLesson}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Registration Starts:{" "}
              {new Date(course.regStart).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Registration Ends: {new Date(course.regEnd).toLocaleDateString()}
            </p>
          </div>
        </div>

        <p className="text-lg text-gray-800">{course.description}</p>
      </div>

      {/* Key Skills Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Key Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {course.keySkills.map((skill, index) => (
            <div
              key={index}
              className="p-4 bg-blue-100 text-center rounded-lg shadow-md hover:bg-blue-300 transition-all duration-300"
            >
              <p className="text-lg font-medium">{skill}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Assignments Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mt-6 mb-4">Assignments</h2>
        <p className="text-gray-600">
          Total Assignments: {course.totalAssignment}
        </p>
      </div>

      {/* Button Section */}
      <div className="flex justify-center mt-6">
        <Link href={`/module/course/${courseId}`} passHref>
          <Button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all duration-300">
            Start Course
          </Button>
        </Link>
      </div>
    </div>
  );
}
