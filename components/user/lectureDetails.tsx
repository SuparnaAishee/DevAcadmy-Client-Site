import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { lectureService } from "@/app/service/lectureService";
import { Lecture } from "@/app/types/types";

const LectureDetailsPage = () => {
  const router = useRouter();
  const { lectureId } = router.query;
  const [lecture, setLecture] = useState<Lecture | null>(null);

  useEffect(() => {
    if (!lectureId) return;

    const fetchLectureDetails = async () => {
      try {
        const lectureData = await lectureService.getLectureById(
          lectureId as string
        );
        setLecture(lectureData);
      } catch (error) {
        console.error("Error fetching lecture details", error);
      }
    };

    fetchLectureDetails();
  }, [lectureId]);

  if (!lecture) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{lecture.title}</h1>
      <p>{lecture.description}</p>
      <p>Video Number: {lecture.videoNum}</p>
      <p>Duration: {lecture.duration} seconds</p>
      <video controls>
        <source src={lecture.videoLink} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LectureDetailsPage;
