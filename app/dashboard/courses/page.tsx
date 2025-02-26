// "use client";

// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Search, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { courseService } from "@/app/service/CourseService";
// import toast from "react-hot-toast";
// import { Course } from "@/app/Types/courseType";

// export default function CoursesPage() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const response = await courseService.getCourses();
//       // Add null check and provide default empty array
//       setCourses(response?.courses || []);
//       console.log("API Response:", response); // For debugging
//     } catch (err) {
//       console.error("Error fetching courses:", err);
//       setError("Failed to fetch courses");
//       toast.error("Failed to load courses");
//       setCourses([]); // Set empty array on error
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (courseId: string) => {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       try {
//         // Add your delete API call here
//         toast.success("Course deleted successfully");
//         fetchCourses(); // Refresh the list
//       } catch (err) {
//         toast.error("Failed to delete course");
//       }
//     }
//   };

//   // Add null checks in filter function
//   const filteredCourses =
//     courses?.filter(
//       (course) =>
//         course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         course?._id?.toLowerCase().includes(searchTerm.toLowerCase())
//     ) || [];

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight">Manage Courses</h2>
//           <p className="text-muted-foreground">
//             Create and manage your courses
//           </p>
//         </div>
//         <Button>
//           <Plus className="mr-2 h-4 w-4" /> Add Course
//         </Button>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="relative flex-1 max-w-sm">
//           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search courses..."
//             className="pl-8"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="border rounded-lg">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Course</TableHead>
//               <TableHead>Price</TableHead>
//               <TableHead>Registration Period</TableHead>
//               <TableHead>Duration</TableHead>
//               <TableHead>Batch</TableHead>
//               <TableHead>Details</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredCourses.map((course) => (
//               <TableRow key={course._id}>
//                 <TableCell>
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={course.thumbnail || "/placeholder.svg"}
//                       alt={course.title}
//                       className="w-10 h-10 rounded-lg object-cover"
//                     />
//                     <div>
//                       <div className="font-medium">{course.title}</div>
//                       <div className="text-sm text-muted-foreground">
//                         ID: {course._id}
//                       </div>
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="space-y-1">
//                     <div className="font-medium">৳{course.price}</div>
//                     {course.discountPrice && (
//                       <div className="text-sm text-muted-foreground line-through">
//                         ৳{course.discountPrice}
//                       </div>
//                     )}
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="text-sm">
//                     {course.regStart
//                       ? new Date(course.regStart).toLocaleDateString()
//                       : "N/A"}{" "}
//                     -
//                     {course.regEnd
//                       ? new Date(course.regEnd).toLocaleDateString()
//                       : "N/A"}
//                   </div>
//                 </TableCell>
//                 <TableCell>{course.duration || "N/A"}</TableCell>
//                 <TableCell>
//                   <Badge variant="secondary">{course.batch || "N/A"}</Badge>
//                 </TableCell>
//                 <TableCell>
//                   <div className="text-sm space-y-1">
//                     <div>{course.totalLesson || 0} lectures</div>
//                     <div>{course.totalAssignment || 0} assignments</div>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center gap-2">
//                     <Button variant="ghost" size="icon">
//                       <Pencil className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleDelete(course._id)}
//                     >
//                       <Trash2 className="h-4 w-4 text-destructive" />
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Pencil, Trash2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { courseService } from "@/app/service/CourseService";
import Swal from "sweetalert2";
import type { Course } from "@/app/Types/courseType";
import { AddCourseModal } from "@/components/admin/AddCourseModal";
import { UpdateCourseModal } from "@/components/admin/updateCourseModal";


export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await courseService.getCourses();
      console.log("API Response:", response);

      if (response?.data && Array.isArray(response.data)) {
        console.log("Courses Data:", response.data);
        setCourses([...response.data]);
      } else {
        console.error("Invalid API response structure:", response);
        setCourses([]);
        setError("Invalid data received");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load courses",
        });
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to fetch courses");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load courses",
      });
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (courseId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await courseService.deleteCourse(courseId);
        Swal.fire("Deleted!", "The course has been deleted.", "success");
        fetchCourses(); // Refresh the list
      } catch (err) {
        Swal.fire("Error", "Failed to delete course", "error");
      }
    }
  };

  const handleUpdate = (course: Course) => {
    setSelectedCourse(course);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedCourse(null);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course?._id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Courses</h2>
          <p className="text-muted-foreground">
            Create and manage your courses
          </p>
        </div>
        <AddCourseModal onCourseAdded={fetchCourses} />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Registration Period</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-muted-foreground">
                        ID: {course._id}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">৳{course.price}</div>
                    {course.discountPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        ৳{course.discountPrice}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {course.regStart
                      ? new Date(course.regStart).toLocaleDateString()
                      : "N/A"}{" "}
                    -
                    {course.regEnd
                      ? new Date(course.regEnd).toLocaleDateString()
                      : "N/A"}
                  </div>
                </TableCell>
                <TableCell>{course.duration || "N/A"}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{course.batch || "N/A"}</Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm space-y-1">
                    <div>{course.totalLesson || 0} lectures</div>
                    <div>{course.totalAssignment || 0} assignments</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUpdate(course)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(course._id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedCourse && (
        <UpdateCourseModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          course={selectedCourse}
          onCourseUpdated={fetchCourses}
        />
      )}
    </div>
  );
}

