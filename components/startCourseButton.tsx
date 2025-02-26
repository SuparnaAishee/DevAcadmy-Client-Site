import { useRouter } from "next/router";

const StartCourseButton = ({ courseId }: { courseId: string }) => {
  const router = useRouter();

  const handleStartCourse = () => {
    router.push(`/modules/course/${courseId}`); // Corrected path
  };

  return (
    <button
      onClick={handleStartCourse}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      Start Course
    </button>
  );
};

export default StartCourseButton;
