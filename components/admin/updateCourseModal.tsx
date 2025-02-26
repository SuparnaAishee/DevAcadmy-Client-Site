"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload } from "lucide-react";
import Swal from "sweetalert2";
import { courseService } from "@/app/service/CourseService";
import type { Course } from "@/app/Types/courseType";

interface UpdateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onCourseUpdated: () => void;
}

export function UpdateCourseModal({
  isOpen,
  onClose,
  course,
  onCourseUpdated,
}: UpdateCourseModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState<Course>(course);

  useEffect(() => {
    setCourseData(course);
  }, [course]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourseData((prev) => {
      if (name === "keySkills" || name === "courseCurriculum") {
        return {
          ...prev,
          [name]: value.split(",").map((item) => item.trim()),
        };
      }
      if (
        name === "price" ||
        name === "discountPrice" ||
        name === "totalSeats" ||
        name === "totalLesson" ||
        name === "totalAssignment"
      ) {
        return {
          ...prev,
          [name]: value === "" ? undefined : Number(value),
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formattedData: Partial<Course> = {
        ...courseData,
        price: Number(courseData.price),
        discountPrice: courseData.discountPrice
          ? Number(courseData.discountPrice)
          : undefined,
        totalSeats: Number(courseData.totalSeats),
        totalLesson: Number(courseData.totalLesson),
        totalAssignment: courseData.totalAssignment
          ? Number(courseData.totalAssignment)
          : undefined,
        keySkills: Array.isArray(courseData.keySkills)
          ? courseData.keySkills
          : (courseData.keySkills as string)
              .split(",")
              .map((skill) => skill.trim()),
        courseCurriculum: Array.isArray(courseData.courseCurriculum)
          ? courseData.courseCurriculum
          : courseData.courseCurriculum
          ? (courseData.courseCurriculum as string)
              .split(",")
              .map((item) => item.trim())
          : undefined,
      };

      await courseService.updateCourse(course._id, formattedData);

      Swal.fire({
        icon: "success",
        title: "Course Updated",
        text: "The course has been updated successfully!",
      });

      onClose();
      onCourseUpdated();
    } catch (error) {
      console.error("Error updating course:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update the course. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Course</DialogTitle>
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
                value={
                  courseData.regStart
                    ? new Date(courseData.regStart).toISOString().split("T")[0]
                    : ""
                }
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
                value={
                  courseData.regEnd
                    ? new Date(courseData.regEnd).toISOString().split("T")[0]
                    : ""
                }
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
              value={
                Array.isArray(courseData.keySkills)
                  ? courseData.keySkills.join(", ")
                  : courseData.keySkills
              }
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
              value={
                Array.isArray(courseData.courseCurriculum)
                  ? courseData.courseCurriculum.join(", ")
                  : courseData.courseCurriculum
              }
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Course...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Update Course
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
