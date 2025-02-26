export interface Course {
  _id: string;
  title: string;
  price: number;
  discountPrice?: number;
  description: string;
  thumbnail: string;
  batch?: string;
  regStart?: string;
  regEnd?: string;
  duration: string;
  totalSeats: number;
  totalLesson: number;
  keySkills: string[];
  totalAssignment?: number;
  courseCurriculum?: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseResponse {
  data: boolean;
  success: boolean;
  courses: Course[];
  totalCourses: number;
  message?: string;
}

export interface CourseFilters {
  category?: string;
  batch?: string;
  search?: string;
  page?: number;
  limit?: number;
}
