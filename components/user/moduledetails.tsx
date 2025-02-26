import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Module } from "@/app/Types/moduleType";
import { courseService } from "@/app/service/CourseService"; // Ensure you have a method to get the module data
import { moduleService } from "@/app/service/moduleServoce";

const ModuleDetailsPage = () => {
  const router = useRouter();
  const { moduleId } = router.query; // Get moduleId from the URL query
  const [module, setModule] = useState<Module | null>(null);
  const [lectures, setLectures] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // To track loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    if (!moduleId) return; // Wait until the moduleId is available

    const fetchModuleDetails = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error on new fetch

        // Fetch module data by ID
        const moduleData = await moduleService.getModuleById(
          moduleId as string
        );
        setModule(moduleData);

        // Fetch lectures for this module
        const lecturesData = await moduleService.getLecturesByModule(
          moduleId as string
        );
        setLectures(lecturesData);
      } catch (error) {
        console.error("Error fetching module or lectures:", error);
        setError("An error occurred while fetching module details.");
      } finally {
        setLoading(false); // Stop loading after the fetch is complete
      }
    };

    fetchModuleDetails();
  }, [moduleId]); // This will rerun if the moduleId changes

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Display any errors that occur during the fetch
  }

  if (!module) {
    return <div>Module not found</div>; // Display message if no module data is found
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Module Details Section */}
      <h1 className="text-3xl font-semibold mb-4">{module.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{module.description}</p>

      {/* Lectures Section */}
      <h2 className="text-2xl font-semibold mb-4">Lectures</h2>
      <ul className="space-y-2">
        {lectures.map((lecture) => (
          <li
            key={lecture._id}
            className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300"
          >
            <a
              href={`/lectures/${lecture._id}`}
              className="text-blue-600 hover:underline"
            >
              {lecture.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModuleDetailsPage;
