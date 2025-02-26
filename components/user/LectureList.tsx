"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Lecture {
  id: string
  title: string
  moduleNumber: number
  isLocked: boolean
}

export default function LectureList({ courseId }: { courseId: string }) {
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // TODO: Fetch lectures from API
    setLectures([
      { id: "1", title: "Introduction to React", moduleNumber: 1, isLocked: false },
      { id: "2", title: "Components and Props", moduleNumber: 1, isLocked: true },
      { id: "3", title: "State and Lifecycle", moduleNumber: 2, isLocked: true },
      // Add more lectures...
    ])
  }, [])

  const filteredLectures = lectures.filter((lecture) => lecture.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <input
        type="text"
        placeholder="Search lectures..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      {filteredLectures.map((lecture) => (
        <div key={lecture.id} className="mb-2">
          <Link
            href={`/courses/${courseId}/lectures/${lecture.id}`}
            className={`block p-2 rounded ${lecture.isLocked ? "bg-gray-200" : "bg-blue-100 hover:bg-blue-200"}`}
          >
            Module {lecture.moduleNumber}: {lecture.title}
            {lecture.isLocked && <span className="ml-2 text-gray-500">(Locked)</span>}
          </Link>
        </div>
      ))}
    </div>
  )
}

