import React from "react";
import LoadMenu from "../components/LoadMenu";

const Home = () => {
  const images = require.context('../assets/', true);

  const arrMenuItems = [
    { title: "Student", image: images('./student.svg'), path: "student"},
    { title: "Classroom", image: images('./classroom.svg'), path: "classroom" },
    { title: "Teacher", image: images('./teacher.svg'), path: "teacher" },
    { title: "Subject", image: images('./subject.svg'), path: "subject" },    
  ];

  return (
    <>
      <LoadMenu arrMenuItems={arrMenuItems} />
    </>
  );
};

export default Home;
