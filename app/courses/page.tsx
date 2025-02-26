import CourseSection from "@/components/CourseSection";

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8  bg-gradient-to-tr from-primary/20 to-primary/10 ">
      <h1 className="text-4xl font-bold mb-6 item-center text-center">
        Our Courses_
      </h1>
      <CourseSection />
    </div>
  );
}
