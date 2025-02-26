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
import { Search, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import type { Module } from "@/app/Types/moduleType";
import { moduleService } from "@/app/service/moduleServoce";

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllModules();
  }, []);

  const fetchAllModules = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching all modules...");
      const response = await moduleService.getAllModules();

      if (response?.modules && Array.isArray(response.modules)) {
        console.log("Modules Data:", response.modules);
        setModules(response.modules);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err) {
      console.error("Error fetching modules:", err);
      setError("Failed to fetch modules");
      toast.error("Failed to load modules");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (moduleId: string) => {
    if (!window.confirm("Are you sure you want to delete this module?")) return;

    try {
      console.log("Deleting module:", moduleId);
      const success = await moduleService.deleteModule(moduleId);
      if (success) {
        toast.success("Module deleted successfully");
        fetchAllModules();
      } else {
        toast.error("Failed to delete module");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An error occurred while deleting the module");
    }
  };

  const filteredModules = searchTerm
    ? modules.filter(
        (module) =>
          module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          module._id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : modules;

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
          <h2 className="text-3xl font-bold tracking-tight">Manage Modules</h2>
          <p className="text-muted-foreground">All Available Modules</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Module
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search modules..."
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
              <TableHead>Course ID</TableHead>
              <TableHead>Course Title</TableHead>
              <TableHead>Module Title</TableHead>
              <TableHead>Module Number</TableHead>
              <TableHead>Total Lectures</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredModules.length > 0 ? (
              filteredModules.map((module) => (
                <TableRow key={module._id}>
                  <TableCell>{module.course?._id || "N/A"}</TableCell>
                  <TableCell>{module.course?.title || "N/A"}</TableCell>
                  <TableCell>
                    <div className="font-medium">{module.title}</div>
                    <div className="text-sm text-muted-foreground">
                      ID: {module._id}
                    </div>
                  </TableCell>
                  <TableCell>{module.moduleNumber}</TableCell>
                  <TableCell>{module.lectures?.length || 0} lectures</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(module._id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No Modules Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
