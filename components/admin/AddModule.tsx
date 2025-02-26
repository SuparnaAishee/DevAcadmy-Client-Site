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

interface AddModuleModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (moduleData: { name: string; description: string }) => void;
}

export default function AddModuleModal({
  open,
  onClose,
  onAdd,
}: AddModuleModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !description.trim()) {
      toast.error("All fields are required!");
      return;
    }

    // Call the onAdd function with module data
    onAdd({ name, description });

    toast.success("Module added successfully!");
    setName("");
    setDescription("");
    onClose();
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add Module</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
