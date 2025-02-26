
export interface Module {
  _id: string;
  title: string;
  description: string;
  moduleNumber: number;
  course: string; // Reference to the Course ID (string)
  lectures: string[]; // Array of Lecture IDs (strings)
  createdAt: string;
  updatedAt: string;
}

// Lecture Interface
export interface Lecture {
  _id: string;
  title: string;
  description: string;
  videoLink: string;
  videoNum: number;
  duration: number;
  course: string; // Reference to the Course ID (string)
  moduleId: string; // Reference to the Module ID (string)
  createdAt: string;
  updatedAt: string;
}
