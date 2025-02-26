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
import { toast } from "sonner"; // Toast for error/success messages
import { lectureService } from "@/app/service/lectureService";

interface AddLectureModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export default function AddLectureModal({
  open,
  onClose,
  onAdd,
}: AddLectureModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [courseId, setCourseId] = useState("");
  const [videoNum, setVideoNum] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [moduleId, setModuleId] = useState("");

  const handleAddLecture = async () => {
    const lectureData = {
      title,
      description,
      videoLink,
      course: courseId,
      videoNum,
      duration,
      moduleId,
    };

    try {
      await lectureService.addLecture(lectureData);
      toast.success("Lecture added successfully");
      onAdd(); // Call the parent component to refresh the list
      onClose(); // Close the modal
    } catch (err) {
      toast.error("Failed to add lecture");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Lecture</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Lecture Title"
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Lecture Description"
          />
          <Input
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="Video Link"
          />
          <Input
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            placeholder="Course ID"
          />
          <Input
            type="number"
            value={videoNum}
            onChange={(e) => setVideoNum(Number(e.target.value))}
            placeholder="Video Number"
          />
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            placeholder="Duration"
          />
          <Input
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value)}
            placeholder="Module ID"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleAddLecture}>Add Lecture</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
