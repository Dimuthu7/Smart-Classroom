import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Student from "./pages/Student.jsx";
import Classroom from "./pages/Classroom.jsx";
import Teacher from "./pages/Teacher.jsx";
import Subject from "./pages/Subject.jsx";
import AllocateSubject from "./pages/AllocateSubject.jsx";
import AllocateClassroom from "./pages/AllocateClassroom.jsx";
import StudentReport from "./pages/StudentReport.jsx";
import AllocateClassToStudent from "./pages/AllocateClassToStudent.jsx";
import TeacherDetails from "./pages/TeacherDetails.jsx";
import StudentDetails from "./pages/StudentDetails.jsx";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/student" element={<Student/>} />
        <Route path="/classroom" element={<Classroom/>} />
        <Route path="/teacher" element={<Teacher/>} />
        <Route path="/subject" element={<Subject/>} />

        <Route path="/teacher/teacherDetails" element={<TeacherDetails/>} />
        <Route path="/teacher/allocateSubject" element={<AllocateSubject/>} />
        <Route path="/teacher/allocateClassroom" element={<AllocateClassroom/>} />

        <Route path="/student/studentDetails" element={<StudentDetails/>} />
        <Route path="/student/studentReport" element={<StudentReport/>} />
        <Route path="/student/allocateClassroom" element={<AllocateClassToStudent/>} />
      </Routes>
      
    </>
  );
}

export default App;
