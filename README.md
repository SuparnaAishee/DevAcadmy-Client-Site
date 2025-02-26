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


### 🛠️ Tech Stack
- **Frontend:** Next.js (TypeScript) with Tailwind CSS  
- **Backend:** Express.js (MVC Architecture)  
- **Database:** MongoDB (Mongoose ODM)  

## ✨ Features  

### 🔑 Admin Dashboard (Authentication Required)
#### 🏫 Course Management  
- 📌 **Course Upload:** Thumbnail, Title, Price, Description  
- 📌 **Course CRUD:** Edit/Delete existing courses  
- 📌 **Dynamic Routing:** Clicking a course opens **Module & Lecture Management**  

#### 📚 Module & Lecture Management  
- 🏷️ **Module Creation:** Title & auto-incrementing module number  
- 🎥 **Lecture Creation:**  
  - Title  
  - Video (YouTube Embed)  
  - Multiple PDF notes (upload)  
- 📝 **Lecture List View:** Table view with filtering by **Course & Module**  

### 👩‍🎓 User Panel  
#### 📖 Course Details Page  
- 🖼️ Dynamic course display (Thumbnail, Title, Price, Description)  
- 🏆 Static sections (Instructor info, Reviews, etc.)  

#### 🎬 Lecture Page  
- 🔍 **Searchable Lessons** by title  
- 🏗️ **Expandable Module List** with lectures  
- 🔓 **Locked Lectures:** Unlock sequentially via **Next Button**  
- 📺 **Video Player:** Embedded YouTube video streaming  
- 📑 **PDF Notes:** Download/view lecture materials  
- 📊 **Progress Tracking:** Progress bar & checkmarks for completed lectures  

## 📌 Future Aims  
- 💳 **Payment Integration** (Stripe, Razorpay) for paid courses  
- 🔐 **GitHub & Google Login** (OAuth 2.0)  
- 📨 **Password Reset** via email verification  
- 🎓 **Course Completion Certificates**  
- 📈 **User Progress Analytics**  
- 💬 **Discussion Forums** for student interaction

## 🔮 Future Aims  
- ✅ **Payment Integration** (Stripe, Razorpay) for paid courses.  
- ✅ **GitHub & Google Login** (OAuth 2.0 Authentication).  
- ✅ **Password Reset Functionality** via email verification.  
- ✅ **Course Completion Certificates** for users.  
- ✅ **User Progress Analytics** for better tracking.  
- ✅ **Discussion Forums** for student interaction.  
