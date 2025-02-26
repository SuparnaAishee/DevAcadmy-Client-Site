import axios from "axios";
import type { Lecture } from "../Types/lectureType";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const lectureService = {
  async getLecturesByModule(moduleId: string): Promise<Lecture[]> {
    try {
      const response = await axiosInstance.get(`/lecture/module/${moduleId}`);
      console.log("Lectures by module response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error in getLecturesByModule:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to fetch lectures"
      );
    }
  },

  async getLectureById(lectureId: string): Promise<Lecture> {
    try {
      console.log("Fetching lecture with ID:", lectureId);
      const response = await axiosInstance.get(`/lecture/${lectureId}`);
      console.log("Lecture by ID response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error in getLectureById:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to fetch lecture details"
      );
    }
  },

  async getAllLectures(): Promise<Lecture[]> {
    try {
      const response = await axiosInstance.get(`/lecture`);
      console.log("All lectures response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error in getAllLectures:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to fetch all lectures"
      );
    }
  },
};
