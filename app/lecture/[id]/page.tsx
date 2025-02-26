
import LectureDetailsPage from "@/components/user/lectureDetails";

export default function CoursePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4">
      <LectureDetailsPage lectureId={params.id} />
    </div>
  );
}
