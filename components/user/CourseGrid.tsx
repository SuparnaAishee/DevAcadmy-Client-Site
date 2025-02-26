
import { Course } from "@/app/Types/courseType";
import Link from "next/link";

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {courses.map((course) => (
        <div key={course._id} className="border rounded-lg p-4">
          <img
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{course.description}</p>
          <p className="font-bold mb-2">Price: ${course.price}</p>
          <Link
            href={`/courses/${course._id}`}
            className="text-blue-500 hover:underline"
          >
            View Course
          </Link>
        </div>
      ))}
    </div>
  );
}
