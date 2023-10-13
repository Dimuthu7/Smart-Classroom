using backend.Models;
using backend.Services.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IStudentRepository
    {
        public Students AddStudent(Students students);
        public Students getStudentById(int studentId);
        public List<Students> GetAllStudent();
        public Students UpdateStudent(Students students, int studentId);
        public void DeleteStudent(Students students);
        public void AddStudentsForClassroom(int studentId, int[] arrClassroomId);
        public List<Classrooms> GetClassroomByStudent(int studentId);
        public StudentReportDto StudentReport(Students student);
    }
}
