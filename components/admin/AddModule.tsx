"use client";
import { useState } from "react";
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
import Swal from "sweetalert2";
import { moduleService } from "@/app/service/moduleServoce";

const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

interface AddModuleModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (moduleData: {
    name: string;
    description: string;
    courseId: string;
    moduleNumber: number;
  }) => void;
}

export default function AddModuleModal({
  open,
  onClose,
  onAdd,
}: AddModuleModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState("");
  const [moduleNumber, setModuleNumber] = useState(1); // Default to 1 instead of 0
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleAdd = async () => {
    setErrors([]);

    // Validate inputs
    if (
      !name.trim() ||
      !description.trim() ||
      !courseId.trim() ||
      !moduleNumber
    ) {
      setErrors((prev) => [...prev, "All fields are required!"]);
      return;
    }

    // Check if the courseId is a valid MongoDB ObjectId format
    if (!isValidObjectId(courseId)) {
      setErrors((prev) => [...prev, "Invalid Course ID format."]);
      return;
    }

    if (moduleNumber <= 0) {
      setErrors((prev) => [
        ...prev,
        "Module number must be a positive number.",
      ]);
      return;
    }

    try {
      setLoading(true);

      // Call the API to add the module
      const newModule = await moduleService.addModule({
        name,
        description,
        courseId, 
        moduleNumber,
      });

  
      Swal.fire({
        title: "Success!",
        text: "Module added successfully!",
        icon: "success",
        confirmButtonText: "Okay",
      });

      // Reset the fields and close the modal
      setName("");
      setDescription("");
      setCourseId("");
      setModuleNumber(1); // Reset to default value
      onAdd(newModule); // Pass the new module to the parent
      onClose();
    } catch (error) {
      console.error("Error adding module:", error);
      toast.error("Failed to add module");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Module</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Module Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Module Number"
            value={moduleNumber}
            min="1" // Ensure the number can't go below 1
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1) {
                setModuleNumber(value);
              }
            }}
          />
        </div>
        {errors.length > 0 && (
          <div className="mt-4 text-red-500">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={loading}>
            {loading ? "Adding..." : "Add Module"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
