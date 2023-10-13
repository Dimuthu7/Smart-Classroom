using backend.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace backend.Services
{
    public interface ITeacherRepository
    {
        public Teachers AddTeacher(Teachers teachers);
        public Teachers getTeacherById(int teacherID);
        public List<Teachers> GetAllTeachers();
        public Teachers UpdateTeacher(Teachers teachers, int teacherID);
        public void DeleteTeacher(Teachers teachers);
        public void AllocateSubjects(int teacherID, int[] arrSubjectID);
        public List<Subjects> GetSubjectByTeacher(int teacherID);
        public void AllocateClassrooms(int teacherID, int[] arrClassroomID);
        public List<Classrooms> GetClassroomByTeacher(int teacherID);
    }
}
