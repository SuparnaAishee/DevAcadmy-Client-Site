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
  moduleData: { id: string; name: string; description: string } | null;
  onUpdate: (
    id: string,
    updatedData: { name: string; description: string }
  ) => void;
}

export default function UpdateModuleModal({
  open,
  onClose,
  moduleData,
  onUpdate,
}: UpdateModuleModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (moduleData) {
      setName(moduleData.name);
      setDescription(moduleData.description);
    }
  }, [moduleData]);

  const handleUpdate = () => {
    if (!name.trim() || !description.trim()) {
      toast.error("All fields are required!");
      return;
    }

    if (moduleData) {
      onUpdate(moduleData.id, { name, description });
      toast.success("Module updated successfully!");
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Module</DialogTitle>
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Update Module</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
