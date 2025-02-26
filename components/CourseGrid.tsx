// import { Clock, PlayCircle, Calendar, Users } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Countdown } from "@/components/Countdown"
// import Link from "next/link"

// interface Course {
//   id: string
//   title: string
//   description: string
//   thumbnail: string
//   duration: string
//   totalLesson: number
//   originalPrice: number
//   discountedPrice: number
//   category: string
//   batchNumber: number
//   registrationStart: string
//   registrationEnd: string
//   courseStart: string
//   enrollmentStatus: "open" | "closed" | "coming_soon"
//   totalSeats: number
//   seatsAvailable: number
// }

// export function CourseGrid({ courses }: { courses: Course[] }) {
//   if (courses.length === 0) {
//     return <div className="text-center text-muted-foreground py-12">No courses available in this category.</div>
//   }

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {courses.map((course) => (
//         <div
//           key={course.id}
//           className="group relative bg-card rounded-lg border overflow-hidden transition-all hover:shadow-lg"
//         >
//           <div className="relative">
//             <div className="aspect-video overflow-hidden">
//               <img
//                 src={course.thumbnail || "/placeholder.svg"}
//                 alt={course.title}
//                 className="object-cover w-full h-full transition-transform group-hover:scale-105"
//               />
//             </div>
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//             <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
//               <Badge variant="secondary" className="flex items-center gap-1">
//                 <Clock className="h-3 w-3" />
//                 {course.duration}
//               </Badge>
//               <Badge variant="secondary" className="flex items-center gap-1">
//                 <PlayCircle className="h-3 w-3" />
//                 {course.totalLesson} Lessons
//               </Badge>
//             </div>
//           </div>
//           <div className="p-6">
//             <div className="flex items-center gap-2 mb-3">
//               {course.enrollmentStatus === "open" && (
//                 <Badge variant="success" className="uppercase text-xs">
//                   Registration Open
//                 </Badge>
//               )}
//               {course.enrollmentStatus === "closed" && (
//                 <Badge variant="destructive" className="uppercase text-xs">
//                   Registration Closed
//                 </Badge>
//               )}
//               {course.enrollmentStatus === "coming_soon" && (
//                 <Badge variant="secondary" className="uppercase text-xs">
//                   Coming Soon
//                 </Badge>
//               )}
//               <Badge variant="outline" className="text-xs">
//                 Batch {course.batchNumber}
//               </Badge>
//             </div>

//             <h3 className="text-xl font-semibold mb-2 line-clamp-2">{course.title}</h3>
//             <p className="text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

//             <div className="space-y-4">
//               <div className="flex items-center justify-between text-sm">
//                 <div className="flex items-center gap-1 text-muted-foreground">
//                   <Calendar className="h-4 w-4" />
//                   Starts {new Date(course.courseStart).toLocaleDateString()}
//                 </div>
//                 <div className="flex items-center gap-1 text-muted-foreground">
//                   <Users className="h-4 w-4" />
//                   {course.seatsAvailable} seats left
//                 </div>
//               </div>

//               {course.enrollmentStatus === "open" && (
//                 <div className="bg-muted p-3 rounded-lg">
//                   <p className="text-sm text-muted-foreground mb-1">Registration closes in</p>
//                   <Countdown targetDate={new Date(course.registrationEnd)} />
//                 </div>
//               )}

//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-2xl font-bold">৳{course.discountedPrice.toLocaleString()}</p>
//                   {course.originalPrice > course.discountedPrice && (
//                     <p className="text-sm text-muted-foreground line-through">
//                       ৳{course.originalPrice.toLocaleString()}
//                     </p>
//                   )}
//                 </div>
//                 <Link href={`/courses/${course.id}`}>
//                   <Button disabled={course.enrollmentStatus !== "open"}>Enroll Now</Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }
import type { Course } from "@/app/Types/courseType";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, PlayCircle, Calendar, Users } from "lucide-react";
import { Countdown } from "@/components/Countdown";

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-20 pl-12 pr-12">
      {courses.map((course) => (
        <Link
          key={course._id}
          href={`/courses/${course._id}`} // Link wrapping the entire card
          passHref
        >
          <div className="rounded-lg shadow-lg p-4 bg-white relative flex flex-col cursor-pointer">
            <div className="relative w-full h-72 overflow-hidden rounded-md mb-4">
              <img
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-md flex items-center">
                <Clock className="w-4 h-4 mr-1" /> {course.duration}
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-md flex items-center">
                <PlayCircle className="w-4 h-4 mr-1" /> {course.totalLesson}{" "}
                Lessons
              </div>
            </div>
            <div className="flex items-center mb-2">
              <Badge className="bg-green-500 text-white text-xs">
                REGISTRATION OPEN
              </Badge>
              <span className="ml-2 text-lg bg-gray-100 px-2 py-1 rounded-md">
                {course.batch}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              {course.description}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-1" /> Starts{" "}
                {new Date(course.regStart).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-1" /> {course.totalSeats} seats
                left
              </div>
            </div>
            <div className="bg-gray-100 p-3 rounded-md mb-4">
              <p className="text-sm text-gray-600">Registration closes in</p>
              <Countdown targetDate={new Date(course.regEnd)} />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  ৳{course.discountPrice}
                </p>
                <p className="text-xl text-gray-400 line-through">
                  ৳{course.price}
                </p>
              </div>
              <Button asChild>
                <span>Enroll Now</span>
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
