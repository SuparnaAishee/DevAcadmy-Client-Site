
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import type { Module } from "@/app/Types/moduleType";
// import type { Lecture } from "@/app/Types/lectureType";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { moduleService } from "@/app/service/moduleServoce";
// import { lectureService } from "@/app/service/lectureService";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// function YouTubeEmbed({ videoLink }: { videoLink: string }) {
//   const getYouTubeVideoId = (url: string) => {
//     const regExp =
//       /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//     const match = url.match(regExp);
//     return match && match[2].length === 11 ? match[2] : null;
//   };

//   const videoId = getYouTubeVideoId(videoLink);

//   if (!videoId) {
//     return <div>Invalid YouTube URL</div>;
//   }

//   return (
//     <div className="aspect-w-16 aspect-h-32">
//       <iframe
//         src={`https://www.youtube.com/embed/${videoId}`}
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//         className="w-full h-full"
//       ></iframe>
//     </div>
//   );
// }

// export default function CourseModulesPage() {
//   const { courseId } = useParams();
//   const router = useRouter();

//   const [modules, setModules] = useState<Module[]>([]);
//   const [selectedModule, setSelectedModule] = useState<Module | null>(null);
//   const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
//   const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
//   const [completedLectures, setCompletedLectures] = useState<Set<string>>(
//     new Set()
//   );
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!courseId) return;

//     const fetchModules = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);

//         const response = await moduleService.getModulesByCourse(
//           courseId as string
//         );
//         if (response && response.length > 0) {
//           setModules(response);
//           setSelectedModule(response[0]);
//           if (response[0].lectures && response[0].lectures.length > 0) {
//             fetchLecture(response[0].lectures[0]);
//           }
//         }
//       } catch (err) {
//         setError("Failed to load modules");
//         console.error("Error fetching modules:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchModules();
//   }, [courseId]);

//   const fetchLecture = async (lectureId: string) => {
//     try {
//       const lecture = await lectureService.getLectureById(lectureId);
//       setSelectedLecture(lecture.data.lecture);
//       setCurrentLectureIndex(selectedModule?.lectures.indexOf(lectureId) || 0);
//     } catch (err) {
//       console.error("Error fetching lecture:", err);
//       setError("Failed to load lecture");
//     }
//   };

//   const handleModuleClick = async (module: Module) => {
//     setSelectedModule(module);
//     if (module.lectures && module.lectures.length > 0) {
//       await fetchLecture(module.lectures[0]);
//     } else {
//       setSelectedLecture(null);
//     }
//   };

//   const handleLectureClick = (lectureId: string) => {
//     fetchLecture(lectureId);
//   };

//   const handleNextLecture = () => {
//     if (
//       selectedModule &&
//       currentLectureIndex < selectedModule.lectures.length - 1
//     ) {
//       const nextLectureId = selectedModule.lectures[currentLectureIndex + 1];
//       fetchLecture(nextLectureId);
//       setCompletedLectures((prev) =>
//         new Set(prev).add(selectedModule.lectures[currentLectureIndex])
//       );
//     }
//   };

//   const handlePreviousLecture = () => {
//     if (selectedModule && currentLectureIndex > 0) {
//       const prevLectureId = selectedModule.lectures[currentLectureIndex - 1];
//       fetchLecture(prevLectureId);
//     }
//   };

//   const totalLectures = modules.reduce(
//     (sum, module) => sum + module.lectures.length,
//     0
//   );
//   const progress = (completedLectures.size / totalLectures) * 100;

//   if (isLoading) {
//     return <div className="text-center mt-4">Loading modules...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 mt-4">{error}</div>;
//   }

//   if (!modules.length) {
//     return (
//       <div className="text-center text-gray-500 mt-4">
//         No modules available for this course.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <h1 className="text-3xl font-semibold mb-6 text-blue-600">
//         {selectedModule?.course.title}
//       </h1>

//       <div className="mb-6">
//         <Progress value={progress} className="w-full" />
//         <p className="text-sm text-gray-600 mt-2">
//           {completedLectures.size} of {totalLectures} lectures completed (
//           {Math.round(progress)}%)
//         </p>
//       </div>

//       <div className="flex space-x-6">
//         <div className="flex-1">
//           {selectedLecture ? (
//             <div>
//               <h2 className="text-2xl font-semibold mb-4">
//                 {selectedLecture.title}
//               </h2>
//               <div className="bg-gray-200 p-4 rounded-lg shadow-md">
//                 <YouTubeEmbed videoLink={selectedLecture.videoLink} />
//               </div>
//               <p className="mt-4">{selectedLecture.description}</p>
//               <div className="flex justify-between mt-6">
//                 <Button
//                   onClick={handlePreviousLecture}
//                   disabled={currentLectureIndex === 0}
//                   className="flex items-center"
//                 >
//                   <ChevronLeft className="mr-2" /> Previous
//                 </Button>
//                 <Button
//                   onClick={handleNextLecture}
//                   disabled={
//                     !selectedModule ||
//                     currentLectureIndex === selectedModule.lectures.length - 1
//                   }
//                   className="flex items-center"
//                 >
//                   Next <ChevronRight className="ml-2" />
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <div>Select a lesson to view</div>
//           )}
//         </div>

//         <div className="flex-1 space-y-4">
//           {modules.map((module) => (
//             <div
//               key={module._id}
//               className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-all"
//               onClick={() => handleModuleClick(module)}
//             >
//               <h3 className="text-lg font-semibold">{module.title}</h3>
//               <p className="text-gray-600">{module.description}</p>

//               <div className="mt-2 space-y-2">
//                 {module.lectures && module.lectures.length > 0 ? (
//                   module.lectures.map((lectureId: string) => (
//                     <Button
//                       key={lectureId}
//                       onClick={() => handleLectureClick(lectureId)}
//                       className={`text-white px-4 py-2 rounded-md transition-all duration-300 bg-blue-400 w-full ${
//                         completedLectures.has(lectureId) ? "bg-green-400" : ""
//                       }`}
//                     >
//                       Lecture {module.lectures.indexOf(lectureId) + 1}
//                     </Button>
//                   ))
//                 ) : (
//                   <div>No lessons available for this module.</div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Module } from "@/app/Types/moduleType";
import type { Lecture } from "@/app/Types/lectureType";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { moduleService } from "@/app/service/moduleServoce";
import { lectureService } from "@/app/service/lectureService";
import { ChevronLeft, ChevronRight } from "lucide-react";

function VideoEmbed({ videoLink }: { videoLink: string }) {
  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const isCloudinaryLink = (url: string) => {
    return url.includes("cloudinary.com");
  };

  if (isCloudinaryLink(videoLink)) {
    return (
      <video
        src={videoLink}
        controls
        className="w-full h-[400px] sm:h-[600px] object-contain bg-black"
      >
        Your browser does not support the video tag.
      </video>
    );
  }

  const videoId = getYouTubeVideoId(videoLink);

  if (!videoId) {
    return <div>Invalid video URL</div>;
  }

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-[300px] sm:h-[400px] lg:w-[800px] lg:h-[800px]object-contain"
    ></iframe>
  );
}

export default function CourseModulesPage() {
  const { courseId } = useParams();
  const router = useRouter();

  const [courseTitle, setCourseTitle] = useState<string>("");
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [completedLectures, setCompletedLectures] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchModules = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await moduleService.getModulesByCourse(
          courseId as string
        );
        if (response && response.length > 0) {
          setModules(response);
          setSelectedModule(response[0]);
          setCourseTitle(response[0].course.title); // Set the course title
          if (response[0].lectures && response[0].lectures.length > 0) {
            fetchLecture(response[0].lectures[0]);
          }
        }
      } catch (err) {
        setError("Failed to load modules");
        console.error("Error fetching modules:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, [courseId]);

  const fetchLecture = async (lectureId: string) => {
    try {
      const lecture = await lectureService.getLectureById(lectureId);
      setSelectedLecture(lecture.data.lecture);
      setCurrentLectureIndex(selectedModule?.lectures.indexOf(lectureId) || 0);
    } catch (err) {
      console.error("Error fetching lecture:", err);
      setError("Failed to load lecture");
    }
  };

  const handleModuleClick = async (module: Module) => {
    setSelectedModule(module);
    if (module.lectures && module.lectures.length > 0) {
      await fetchLecture(module.lectures[0]);
    } else {
      setSelectedLecture(null);
    }
  };

  const handleLectureClick = (lectureId: string) => {
    fetchLecture(lectureId);
  };

  const handleNextLecture = () => {
    if (
      selectedModule &&
      currentLectureIndex < selectedModule.lectures.length - 1
    ) {
      const nextLectureId = selectedModule.lectures[currentLectureIndex + 1];
      fetchLecture(nextLectureId);
      setCompletedLectures((prev) =>
        new Set(prev).add(selectedModule.lectures[currentLectureIndex])
      );
    }
  };

  const handlePreviousLecture = () => {
    if (selectedModule && currentLectureIndex > 0) {
      const prevLectureId = selectedModule.lectures[currentLectureIndex - 1];
      fetchLecture(prevLectureId);
    }
  };

  const totalLectures = modules.reduce(
    (sum, module) => sum + module.lectures.length,
    0
  );
  const progress = (completedLectures.size / totalLectures) * 100;

  if (isLoading) {
    return <div className="text-center mt-4">Loading modules...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  if (!modules.length) {
    return (
      <div className="text-center text-gray-500 mt-4">
        No modules available for this course.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-primary/10 via-primary/5 pl-6 pr-6 sm:pl-12 sm:pr-12">
      <div className="max-w-8xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">{courseTitle}</h1>

        <div className="mb-6">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-600 mt-2">
            {completedLectures.size} of {totalLectures} lectures completed (
            {Math.round(progress)}%)
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-8">
          <div className="flex-1 mb-6 sm:mb-0">
            {selectedLecture ? (
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  {selectedLecture.title}
                </h2>
                <div className="bg-gradient-to-tr from-primary/70 via-primary/40 to-transparent p-6 rounded-lg shadow-lg">
                  <VideoEmbed videoLink={selectedLecture.videoLink} />
                </div>
                <p className="mt-4 bg-white p-4 shadow-md ">
                  {selectedLecture.description}
                </p>
                <div className="flex justify-between mt-6">
                  <Button
                    onClick={handlePreviousLecture}
                    disabled={currentLectureIndex === 0}
                    className="flex items-center"
                  >
                    <ChevronLeft className="mr-2" /> Previous
                  </Button>
                  <Button
                    onClick={handleNextLecture}
                    disabled={
                      !selectedModule ||
                      currentLectureIndex === selectedModule.lectures.length - 1
                    }
                    className="flex items-center"
                  >
                    Next <ChevronRight className="ml-2" />
                  </Button>
                </div>
              </div>
            ) : (
              <div>Select a lesson to view</div>
            )}
          </div>

          <div className="flex-1 space-y-6">
            {modules.map((module) => (
              <div
                key={module._id}
                className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-all"
                onClick={() => handleModuleClick(module)}
              >
                <h3 className="text-lg font-bold">{module.title}</h3>
                <p className="text-gray-600">{module.description}</p>

                <div className="mt-2 space-y-2 shadow-md">
                  {module.lectures && module.lectures.length > 0 ? (
                    module.lectures.map((lectureId: string) => (
                      <Button
                        key={lectureId}
                        onClick={() => handleLectureClick(lectureId)}
                        className={`text-white px-4 py-2 rounded-md transition-all duration-300 bg-blue-400 w-full ${
                          completedLectures.has(lectureId) ? "bg-green-400" : ""
                        }`}
                      >
                        Lecture {module.lectures.indexOf(lectureId) + 1}
                      </Button>
                    ))
                  ) : (
                    <div>No lessons available for this module.</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


