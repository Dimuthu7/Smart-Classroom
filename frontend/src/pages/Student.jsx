import React from 'react'
import LoadMenu from "../components/LoadMenu";

const Student = () => {
  const images = require.context('../assets/', true);

  const arrMenuItems = [
    { title: "Student Details", image: images('./student_details.png'), path: "studentDetails" },
    { title: "Allocate Classroom", image: images('./allocate_class.svg'), path: "allocateClassroom" },
    { title: "Student Details Report", image: images('./report.svg'), path: "studentReport" },
  ];

  return (
    <LoadMenu arrMenuItems={arrMenuItems} />
  )
}

export default Student;