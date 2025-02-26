# Minimal LMS System - Recruitment Task

## Overview
This is a Learning Management System (LMS) with two main panels:  
- **Admin Dashboard** (for course content management)  
- **User Panel** (for course consumption and progress tracking)  

The system is built using **TypeScript, Next.js, Express.js, and MongoDB**, following the **MVC architectural pattern**. The UI is fully responsive and polished.

---
## Live Link 
https://devacademy-client.vercel.app/  [client site]
https://dev-academy-server.vercel.app/ [server site]

## 🔑 Admin Credentials (For Testing)
- **Email**: `admin@gmail.com`
- **Password**: `admin123`


## 🛠 Tech Stack
- **Frontend**: Next.js (TypeScript) with Tailwind CSS for styling  
- **Backend**: Express.js following the MVC architecture  
- **Database**: MongoDB (Mongoose for ODM)  

---

## ✨ Features

### Admin Dashboard (Authentication Required)
#### 1️⃣ Course Management
- Upload courses with:
  - **Thumbnail** (image)
  - **Title**
  - **Price**
  - **Description**
- Display courses in a **grid of cards** with thumbnails, titles, prices, and descriptions.
- **CRUD operations**: Edit/Delete existing courses.
- **Dynamic Routing**: Clicking a course card navigates to its **Module & Lecture Management** page.

#### 2️⃣ Module & Lecture Management
- **Module Creation**:
  - Add modules with **Title** and **Module Number** (auto-increment).  
- **Lecture Creation**:
  - Add lectures under modules with:
    - **Title**
    - **Video upload/URL** (Embedded YouTube link for simplicity)
    - **Multiple PDF notes** (upload)  
  - **CRUD Operations**: Edit/Delete modules and lectures.
- **Lecture List View**:
  - Display all lectures in a table with filters by **Course** and **Module**.

---

### User Panel Features
#### 1️⃣ Course Details Page
- Dynamic content from **admin uploads**:
  - Course **thumbnail, title, price, description**  
- Static sections for additional details (e.g., **reviews, instructor info**).  
- **Reference**: [Ostad Flutter Course](https://ostad.app/course/flutter)  

#### 2️⃣ Lecture Page
- Numbered **modules with expandable lecture lists**.  
- **Search bar** to filter lessons by title.  
- **Lecture Unlock System**:
  - Users unlock lectures **sequentially** (Next button unlocks subsequent lectures).  
- **Content Delivery**:
  - Embedded **YouTube Video Player** for streaming.  
  - **PDF Notes**: View/download multiple PDFs per lecture.  
- **Progress Tracking**:
  - Visual **progress bar/checkmarks** showing completed lectures.  

---

## 🔹 Mandatory Requirements
- **Responsive UI**:  
  - Fully compatible with all screen sizes.  
- **Backend Architecture**:  
  - MVC pattern with **separate routes, controllers, models, and services**.  
- **Dynamic Content**:  
  - All user-facing content (**courses, modules, lectures**) must reflect **admin uploads**.  

---

## 🚀 Deployment & Submission  
### 🔹 Submission Guidelines
1. **Code Repository**: Hosted on **GitHub/GitLab**.  
2. **Live Demo**:  
   - Deploy frontend on **Vercel**.  
   - Deploy backend on **Render**.  
   - Provide a **live link** and test credentials.  

### 🔹 Evaluation Criteria
- ✅ **Functionality**  
- ✅ **Code quality & architecture**  
- ✅ **UI/UX polish**  
- ✅ **Responsiveness**  

**Submit your task using the following link:**  
🔗 [Submission Form](https://forms.gle/2uiw6KaBp5AFcxWa7)  

---

## ⚡ Setup Instructions
### 🔹 Prerequisites
- **Node.js** (v16+ recommended)  
- **MongoDB** (local or cloud-based)  

### 🔹 Installation
1. Clone the repository:  
   ```sh
   git clone https://github.com/yourusername/minimal-lms.git
   cd minimal-lms
