import CourseList from "@/components/admin/CourseList"
import CourseForm from "@/components/admin/CourseForm"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <CourseForm />
      <CourseList />
    </div>
  )
}

