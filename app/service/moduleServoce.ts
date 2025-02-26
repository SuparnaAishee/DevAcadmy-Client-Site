import axios from "axios";
import type { Module } from "../Types/moduleType"; 

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";


const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach Authorization token to each request if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const moduleService = {
  async getModulesByCourse(courseId: string): Promise<Module[]> {
    try {
      const response = await axiosInstance.get<Module[]>(
        `/module/course/${courseId}`
      );
      console.log("Modules fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching modules:", error);
      throw new Error("Failed to fetch modules");
    }
  },

  async getModuleById(moduleId: string): Promise<Module> {
    try {
      const response = await axiosInstance.get<Module>(`/module/${moduleId}`);
      console.log("Module fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching module by ID:", error);
      throw new Error("Failed to fetch module by ID");
    }
  },

  async getLecturesByModule(moduleId: string): Promise<any[]> {
    try {
      const response = await axiosInstance.get<any[]>(
        `/lectures/module/${moduleId}`
      );
      console.log("Lectures fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching lectures:", error);
      throw new Error("Failed to fetch lectures");
    }
  },
  async deleteModule(moduleId: string): Promise<boolean> {
    try {
      await axiosInstance.delete(`/module/${moduleId}`);
      return true;
    } catch (error) {
      console.error("Error deleting module:", error);
      return false;
    }
  },
  async getAllModules() {
    try {
      const response = await axios.get(`${API_URL}/module`);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching modules:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
  async addModule(moduleData: {
    courseId: string;
    name: string;
    description: string;
    moduleNumber: number;
  }) {
    try {
      const response = await axiosInstance.post("/module/create", {
        course: moduleData.courseId, 
        title: moduleData.name, 
        description: moduleData.description,
        moduleNumber: moduleData.moduleNumber,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding module:", error);
      throw new Error("Failed to add module");
    }
  },
  async checkCourseExists(courseId: string): Promise<boolean> {
    try {
      const response = await axiosInstance.get(`/course/${courseId}`);
      return response.status === 200;
    } catch (error) {
      console.error("Error checking course existence:", error);
      return false;
    }
  },
};
