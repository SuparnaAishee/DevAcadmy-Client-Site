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
// import toast from "react-hot-toast";

// import type { Module } from "@/app/Types/moduleType";
// import AddModuleModal from "@/components/admin/AddModule";
// import UpdateModuleModal from "@/components/admin/UpdateModule"; // Import UpdateModuleModal
// import { moduleService } from "@/app/service/moduleServoce";


// export default function ModulesPage() {
//   const [modules, setModules] = useState<Module[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // State for update modal
//   const [selectedModule, setSelectedModule] = useState<Module | null>(null); // State to store selected module for update

//   useEffect(() => {
//     fetchAllModules();
//   }, []);

//   const fetchAllModules = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       console.log("Fetching all modules...");
//       const response = await moduleService.getAllModules();

//       if (response?.modules && Array.isArray(response.modules)) {
//         console.log("Modules Data:", response.modules);
//         setModules(response.modules);
//       } else {
//         throw new Error("Invalid API response format");
//       }
//     } catch (err) {
//       console.error("Error fetching modules:", err);
//       setError("Failed to fetch modules");
//       toast.error("Failed to load modules");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (moduleId: string) => {
//     if (!window.confirm("Are you sure you want to delete this module?")) return;

//     try {
//       console.log("Deleting module:", moduleId);
//       const success = await moduleService.deleteModule(moduleId);
//       if (success) {
//         toast.success("Module deleted successfully");
//         fetchAllModules();
//       } else {
//         toast.error("Failed to delete module");
//       }
//     } catch (err) {
//       console.error("Delete error:", err);
//       toast.error("An error occurred while deleting the module");
//     }
//   };

//   const handleAddModule = async (moduleData: {
//     name: string;
//     description: string;
//     courseId: string;
//     moduleNumber: number;
//   }) => {
//     try {
//       console.log("Adding new module:", moduleData);
//       const newModule = await moduleService.addModule(moduleData);
//       toast.success("Module added successfully");
//       setModules((prevModules) => [...prevModules, newModule]);
//     } catch (err) {
//       console.error("Error adding module:", err);
//       toast.error("Failed to add module");
//     }
//   };

//   const handleUpdateModule = (module: Module) => {
//     setSelectedModule(module); // Set the module data to be updated
//     setIsUpdateModalOpen(true); // Open the update modal
//   };

//   const filteredModules = searchTerm
//     ? modules.filter(
//         (module) =>
//           module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           module._id.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : modules;

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
//           <h2 className="text-3xl font-bold tracking-tight">Manage Modules</h2>
//           <p className="text-muted-foreground">All Available Modules</p>
//         </div>
//         <Button onClick={() => setIsModalOpen(true)}>
//           <Plus className="mr-2 h-4 w-4" /> Add Module
//         </Button>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="relative flex-1 max-w-sm">
//           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search modules..."
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
//               <TableHead>Course ID</TableHead>
//               <TableHead>Course Title</TableHead>
//               <TableHead>Module Title</TableHead>
//               <TableHead>Module Number</TableHead>
//               <TableHead>Total Lectures</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredModules.length > 0 ? (
//               filteredModules.map((module) => (
//                 <TableRow key={module._id}>
//                   <TableCell>
//                     {typeof module.course === "object" && module.course
//                       ? (module.course as { _id: string })._id
//                       : "N/A"}
//                   </TableCell>
//                   <TableCell>
//                     {typeof module.course === "object" && module.course
//                       ? (module.course as { title: string }).title
//                       : "N/A"}
//                   </TableCell>
//                   <TableCell>
//                     <div className="font-medium">{module.title}</div>
//                     <div className="text-sm text-muted-foreground">
//                       ID: {module._id}
//                     </div>
//                   </TableCell>
//                   <TableCell>{module.moduleNumber}</TableCell>
//                   <TableCell>{module.lectures?.length || 0} lectures</TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleUpdateModule(module)} // Open update modal
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleDelete(module._id)}
//                       >
//                         <Trash2 className="h-4 w-4 text-destructive" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center py-4">
//                   No Modules Found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Add Module Modal */}
//       <AddModuleModal
//         open={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onAdd={handleAddModule}
//       />

//       {/* Update Module Modal */}
//       {selectedModule && (
//         <UpdateModuleModal
//           open={isUpdateModalOpen}
//           onClose={() => setIsUpdateModalOpen(false)}
//           moduleData={selectedModule} // Passing the selected module data
//           onUpdate={(id, updatedData) => {
//             setModules((prevModules) =>
//               prevModules.map((module) =>
//                 module._id === id ? { ...module, ...updatedData } : module
//               )
//             );
//             setIsUpdateModalOpen(false);
//             toast.success("Module updated successfully");
//           }}
//         />
//       )}
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
import { Search, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import type { Module } from "@/app/Types/moduleType";
import AddModuleModal from "@/components/admin/AddModule";
import UpdateModuleModal from "@/components/admin/UpdateModule";
import { moduleService } from "@/app/service/moduleServoce";

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  useEffect(() => {
    fetchAllModules();
  }, []);

  const fetchAllModules = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching all modules...");
      const response = await moduleService.getAllModules();

      if (response?.modules && Array.isArray(response.modules)) {
        console.log("Modules Data:", response.modules);
        setModules(response.modules);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err) {
      console.error("Error fetching modules:", err);
      setError("Failed to fetch modules");
      toast.error("Failed to load modules");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (moduleId: string) => {
    if (!window.confirm("Are you sure you want to delete this module?")) return;

    try {
      console.log("Deleting module:", moduleId);
      const success = await moduleService.deleteModule(moduleId);
      if (success) {
        toast.success("Module deleted successfully");
        fetchAllModules();
      } else {
        toast.error("Failed to delete module");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An error occurred while deleting the module");
    }
  };

  const handleAddModule = async (moduleData: {
    name: string;
    description: string;
    courseId: string;
    moduleNumber: number;
  }) => {
    try {
      console.log("Adding new module:", moduleData);
      const newModule = await moduleService.addModule(moduleData);
      toast.success("Module added successfully");
      setModules((prevModules) => [...prevModules, newModule]);
    } catch (err) {
      console.error("Error adding module:", err);
      toast.error("Failed to add module");
    }
  };
const handleUpdateModule = async (updatedModule: Module) => {
  // Log the updated module to check if the modal is passing the data properly
  console.log("Updating Module:", updatedModule);

  try {
    // Assuming moduleService.updateModule is the API method for updating
    const updated = await moduleService.updateModule(updatedModule);
    console.log("Updated module response:", updated); // Log the API response

    if (updated) {
      // Update the state with the new module data
      setModules((prevModules) =>
        prevModules.map((module) =>
          module._id === updated._id ? updated : module
        )
      );
      toast.success("Module updated successfully");
      setIsUpdateModalOpen(false);
    } else {
      toast.error("Failed to update module");
    }
  } catch (err) {
    console.error("Error updating module:", err); // Log any errors
    toast.error("An error occurred while updating the module");
  }
};

  const filteredModules = searchTerm
    ? modules.filter(
        (module) =>
          module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          module._id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : modules;

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
          <h2 className="text-3xl font-bold tracking-tight">Manage Modules</h2>
          <p className="text-muted-foreground">All Available Modules</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Module
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search modules..."
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
              <TableHead>Course ID</TableHead>
              <TableHead>Course Title</TableHead>
              <TableHead>Module Title</TableHead>
              <TableHead>Module Number</TableHead>
              <TableHead>Total Lectures</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredModules.length > 0 ? (
              filteredModules.map((module) => (
                <TableRow key={module._id}>
                  <TableCell>
                    {typeof module.course === "object" && module.course
                      ? (module.course as { _id: string })._id
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {typeof module.course === "object" && module.course
                      ? (module.course as { title: string }).title
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{module.title}</div>
                    <div className="text-sm text-muted-foreground">
                      ID: {module._id}
                    </div>
                  </TableCell>
                  <TableCell>{module.moduleNumber}</TableCell>
                  <TableCell>{module.lectures?.length || 0} lectures</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedModule(module);
                          setIsUpdateModalOpen(true); // Open the update modal
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(module._id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No Modules Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Module Modal */}
      <AddModuleModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddModule}
      />

      
      {selectedModule && (
        <UpdateModuleModal
          open={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          moduleData={selectedModule}
          onUpdate={handleUpdateModule} 
        />
      )}
       
    </div>
  );
}
