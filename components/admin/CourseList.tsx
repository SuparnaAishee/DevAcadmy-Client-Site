"use client"

import { useState } from "react"
import Link from "next/link"

interface Course {
  id: string
  title: string
  price: number
  description: string
  thumbnail: string
}

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([
    // Sample data, replace with actual API call
    {
      id: "1",
      title: "Introduction to React",
      price: 49.99,
      description: "Learn the basics of React",
      thumbnail: "/placeholder.jpg",
    },
    // Add more sample courses...
  ])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-2">${course.price.toFixed(2)}</p>
              <p className="text-gray-700 mb-4">{course.description}</p>
              <Link
                href={`/admin/courses/${course.id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Manage
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

