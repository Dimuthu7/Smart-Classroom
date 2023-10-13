import React from 'react'
import LoadMenu from "../components/LoadMenu";

const Teacher = () => {
  const images = require.context('../assets/', true);

  const arrMenuItems = [
    { title: "Teacher Details", image: images('./teacher_details.svg'), path: "teacherDetails" },
    { title: "Allocate Subject", image: images('./allocate_subject.svg'), path: "allocateSubject" },
    { title: "Allocate Classroom", image: images('./allocate_class.svg'), path: "allocateClassroom" },
  ];

  return (
    <LoadMenu arrMenuItems={arrMenuItems} />
  )
}

export default Teacher;