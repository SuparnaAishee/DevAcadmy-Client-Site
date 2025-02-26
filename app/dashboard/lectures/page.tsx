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
import { Search, Plus, Pencil, Trash2, Loader2, Video } from "lucide-react";
import toast from "react-hot-toast";

import type { Lecture } from "@/app/Types/lectureType";
import { lectureService } from "@/app/service/lectureService";

export default function LecturesPage() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await lectureService.getAllLectures(); // Fetch all lectures
      console.log("API Response:", response); // Debugging API Response
      setLectures(response);
    } catch (err) {
      console.error("Error fetching lectures:", err);
      setError("Failed to fetch lectures");
      toast.error("Failed to load lectures");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (lectureId: string) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      try {
        // Add delete API call here
        await lectureService.deleteLecture(lectureId);
        toast.success("Lecture deleted successfully");
        fetchLectures(); // Refresh the list
      } catch (err) {
        toast.error("Failed to delete lecture");
      }
    }
  };

  const filteredLectures = lectures.filter(
    (lecture) =>
      lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h2 className="text-3xl font-bold tracking-tight">Manage Lectures</h2>
          <p className="text-muted-foreground">Organize your course lectures</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Lecture
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lectures..."
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
              <TableHead>Lecture Title</TableHead>
              <TableHead>Course Title</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Video Number</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Video Link</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLectures.map((lecture) => (
              <TableRow key={lecture._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg border flex items-center justify-center bg-muted">
                      <Video className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{lecture.title}</div>
                      <div className="text-sm text-muted-foreground">
                        ID: {lecture._id}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {lecture.moduleId?.courseId?.title || "N/A"}
                </TableCell>
                <TableCell>{lecture.moduleId?.name || "N/A"}</TableCell>
                <TableCell>Lecture {lecture.videoNum}</TableCell>
                <TableCell>{lecture.duration}</TableCell>
                <TableCell>
                  <a
                    href={lecture.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View Video
                  </a>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(lecture._id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
