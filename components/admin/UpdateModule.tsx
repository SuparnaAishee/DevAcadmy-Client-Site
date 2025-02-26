// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";

// interface UpdateModuleModalProps {
//   open: boolean;
//   onClose: () => void;
//   moduleData: {
//     id: string;
//     name: string;
//     description: string;
//     courseId: string;
//     moduleNumber: number;
//     totalLectures: number;
//     title: string;
//   } | null;
//   onUpdate: (
//     id: string,
//     updatedData: {
//       name: string;
//       description: string;
//       courseId: string;
//       moduleNumber: number;
//       totalLectures: number;
//       title: string;
//     }
//   ) => void;
// }

// export default function UpdateModuleModal({
//   open,
//   onClose,
//   moduleData,
//   onUpdate,
// }: UpdateModuleModalProps) {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [courseId, setCourseId] = useState("");
//   const [moduleNumber, setModuleNumber] = useState<number>(0);
//   const [totalLectures, setTotalLectures] = useState<number>(0);
//   const [title, setTitle] = useState("");

//   useEffect(() => {
//     if (moduleData) {
//       setName(moduleData.name || "");
//       setDescription(moduleData.description || "");
//       setCourseId(moduleData.courseId || "");
//       setModuleNumber(moduleData.moduleNumber || 0);
//       setTotalLectures(moduleData.totalLectures || 0);
//       setTitle(moduleData.title || "");
//     }
//   }, [moduleData]);

//   const handleUpdate = () => {
//     if (!moduleData) {
//       toast.error("Module data is missing!");
//       return;
//     }

//     // Validate fields
//     if (
//       !name?.trim() ||
//       !description?.trim() ||
//       !courseId?.trim() ||
//       moduleNumber <= 0 ||
//       totalLectures <= 0 ||
//       !title?.trim()
//     ) {
//       toast.error("All fields are required!");
//       return;
//     }

//     // Call the update function
//     onUpdate(moduleData.id, {
//       name: name.trim(),
//       description: description.trim(),
//       courseId: courseId.trim(),
//       moduleNumber,
//       totalLectures,
//       title: title.trim(),
//     });
//     toast.success("Module updated successfully!");
//     onClose();
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent aria-describedby="module-description">
//         <DialogHeader>
//           <DialogTitle>Update Module</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4">
//           <Input
//             placeholder="Module Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <Input
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <Input
//             type="number"
//             placeholder="Module Number"
//             value={moduleNumber}
//             onChange={(e) => setModuleNumber(Number(e.target.value))}
//           />
//           <Input
//             type="number"
//             placeholder="Total Lectures"
//             value={totalLectures}
//             onChange={(e) => setTotalLectures(Number(e.target.value))}
//           />
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleUpdate}>Update Module</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface UpdateModuleModalProps {
  open: boolean;
  onClose: () => void;
  moduleData: {
    _id?: string; // ObjectId should be a string in the frontend
    description: string;
    courseId: string;
    moduleNumber: number;
    totalLectures: number;
    title: string;
  } | null;
  onUpdate: (
    id: string,
    updatedData: {
      description: string;
      courseId: string;
      moduleNumber: number;
      totalLectures: number;
      title: string;
    }
  ) => void;
}

export default function UpdateModuleModal({
  open,
  onClose,
  moduleData,
  onUpdate,
}: UpdateModuleModalProps) {
  const [moduleId, setModuleId] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState("");
  const [moduleNumber, setModuleNumber] = useState<number>(0);
  const [totalLectures, setTotalLectures] = useState<number>(0);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (moduleData) {
      console.log("🟢 Received moduleData:", moduleData); // Debugging log

      setModuleId(moduleData._id || ""); // Ensure moduleId is a string
      setDescription(moduleData.description || "");
      setCourseId(moduleData.courseId || "");
      setModuleNumber(moduleData.moduleNumber || 0);
      setTotalLectures(moduleData.totalLectures || 0);
      setTitle(moduleData.title || "");
    }
  }, [moduleData]);

  const handleUpdate = () => {
    if (!moduleId) {
      toast.error("Module ID is missing!");
      console.error("❌ Error: Module ID is undefined", moduleData);
      return;
    }

    const updatedModuleData = {
      description: description.trim(),
      courseId: courseId.trim(),
      moduleNumber,
      totalLectures,
      title: title.trim(),
    };

    console.log("✅ Updating Module ID:", moduleId);
    console.log("✅ Updating with data:", updatedModuleData);

    onUpdate(moduleId, updatedModuleData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Module</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            value={moduleId}
            readOnly
            className="bg-gray-200 cursor-not-allowed"
            placeholder="Module ID"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Module Description"
          />
          <Input
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="bg-gray-200 cursor-not-allowed"
            placeholder="Course ID"
          />
          <Input
            type="number"
            value={moduleNumber}
            onChange={(e) => setModuleNumber(Number(e.target.value))}
            placeholder="Module Number"
          />
          <Input
            type="number"
            value={totalLectures}
            onChange={(e) => setTotalLectures(Number(e.target.value))}
            placeholder="Total Lectures"
          />
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Module Title"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleUpdate}>Update Module</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
