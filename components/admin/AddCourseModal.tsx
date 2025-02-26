"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { courseService } from "@/app/service/CourseService";

interface AddCourseModalProps {
  onCourseAdded: () => void;
}

export function AddCourseModal({ onCourseAdded }: AddCourseModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState({
    title: "Advanced React Development",
    price: "2000",
    discountPrice: "1500",
    description:
      "An in-depth course on React development, covering advanced concepts and...",
    thumbnail:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1740299608/avatar_1...",
    batch: "Batch 1",
    regStart: "2025-03-01",
    regEnd: "2025-03-31",
    duration: "12 weeks",
    totalSeats: "50",
    totalLesson: "24",
    totalAssignment: "5",
    keySkills: "React,Redux,GraphQL,TypeScript",
    courseCurriculum:
      "Fundamentals,State Management,API Integration,Testing,Deployment",
    category: "Web Development",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formattedData = {
        ...courseData,
        price: Number.parseFloat(courseData.price),
        discountPrice: Number.parseFloat(courseData.discountPrice),
        totalSeats: Number.parseInt(courseData.totalSeats),
        totalLesson: Number.parseInt(courseData.totalLesson),
        totalAssignment: Number.parseInt(courseData.totalAssignment),
        keySkills: courseData.keySkills.split(",").map((skill) => skill.trim()),
        courseCurriculum: courseData.courseCurriculum
          .split(",")
          .map((item) => item.trim()),
      };

      const response = await courseService.createCourse(formattedData);
      console.log("Course created:", response);

      toast.success("Course added successfully!");
      setIsOpen(false);
      onCourseAdded();

      // Reset form
      setCourseData({
        title: "",
        price: "",
        discountPrice: "",
        description: "",
        thumbnail: "",
        batch: "",
        regStart: "",
        regEnd: "",
        duration: "",
        totalSeats: "",
        totalLesson: "",
        totalAssignment: "",
        keySkills: "",
        courseCurriculum: "",
        category: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Failed to add course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                name="title"
                value={courseData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={courseData.category}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              required
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (৳)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={courseData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountPrice">Discount Price (৳)</Label>
              <Input
                id="discountPrice"
                name="discountPrice"
                type="number"
                value={courseData.discountPrice}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={courseData.duration}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="batch">Batch</Label>
              <Input
                id="batch"
                name="batch"
                value={courseData.batch}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalSeats">Total Seats</Label>
              <Input
                id="totalSeats"
                name="totalSeats"
                type="number"
                value={courseData.totalSeats}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalLesson">Total Lessons</Label>
              <Input
                id="totalLesson"
                name="totalLesson"
                type="number"
                value={courseData.totalLesson}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="regStart">Registration Start Date</Label>
              <Input
                id="regStart"
                name="regStart"
                type="date"
                value={courseData.regStart}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="regEnd">Registration End Date</Label>
              <Input
                id="regEnd"
                name="regEnd"
                type="date"
                value={courseData.regEnd}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keySkills">Key Skills (comma-separated)</Label>
            <Input
              id="keySkills"
              name="keySkills"
              value={courseData.keySkills}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseCurriculum">
              Course Curriculum (comma-separated)
            </Label>
            <Input
              id="courseCurriculum"
              name="courseCurriculum"
              value={courseData.courseCurriculum}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalAssignment">Total Assignments</Label>
            <Input
              id="totalAssignment"
              name="totalAssignment"
              type="number"
              value={courseData.totalAssignment}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input
              id="thumbnail"
              name="thumbnail"
              value={courseData.thumbnail}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Course...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Add Course
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
