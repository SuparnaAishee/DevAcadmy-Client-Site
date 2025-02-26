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
import { lectureService } from "@/app/service/lectureService";

interface UpdateLectureModalProps {
  open: boolean;
  onClose: () => void;
  lectureData: any; // Adjust based on your lecture structure
  onUpdate: () => void;
}

export default function UpdateLectureModal({
  open,
  onClose,
  lectureData,
  onUpdate,
}: UpdateLectureModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [courseId, setCourseId] = useState("");
  const [videoNum, setVideoNum] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [moduleId, setModuleId] = useState("");

  useEffect(() => {
    if (lectureData) {
      setTitle(lectureData.title);
      setDescription(lectureData.description);
      setVideoLink(lectureData.videoLink);
      setCourseId(lectureData.course);
      setVideoNum(lectureData.videoNum);
      setDuration(lectureData.duration);
      setModuleId(lectureData.moduleId);
    }
  }, [lectureData]);

  const handleUpdateLecture = async () => {
    const updatedLectureData = {
      title,
      description,
      videoLink,
      course: courseId,
      videoNum,
      duration,
      moduleId,
    };

    try {
      await lectureService.updateLecture(lectureData._id, updatedLectureData);
      toast.success("Lecture updated successfully");
      onUpdate(); // Refresh the lectures list
      onClose(); // Close the modal
    } catch (err) {
      toast.error("Failed to update lecture");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Lecture</DialogTitle>
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
          <Button onClick={handleUpdateLecture}>Update Lecture</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
