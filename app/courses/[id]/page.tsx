import CourseDetailsPage from "@/components/user/CourseDetails";

export default function CoursePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4">
      <CourseDetailsPage courseId={params.id} />
    </div>
  );
}
