using backend.DataAccess;
using backend.Models;
using backend.Services.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace backend.Services
{
    public class StudentService : IStudentRepository
    {
        private readonly AppDbContext _context = new AppDbContext();

        public List<Students> GetAllStudent() => _context.Students.ToList();

        public Students getStudentById(int studentId) => _context.Students.Find(studentId);

        public Students AddStudent(Students students)
        {
            _context.Students.Add(students);
            _context.SaveChanges();

            return _context.Students.Find(students.StudentID);
        }

        public Students UpdateStudent(Students students, int studentId)
        {
            /*       _context.Students.Attach(students);
                   var entry = _context.Entry(students);
                   entry.Property(e => e.StudentID).IsModified = true;*/

            var selectStudent = _context.Students.Where(st => st.StudentID == studentId).FirstOrDefault();
            selectStudent.FirstName = students.FirstName;
            selectStudent.LastName = students.LastName;
            selectStudent.ContactPerson = students.ContactPerson;
            selectStudent.ContactNo = students.ContactNo;
            selectStudent.Email = students.Email;
            selectStudent.DateOfBirth = students.DateOfBirth;
            selectStudent.Age = students.Age;

            _context.SaveChanges();
            return _context.Students.Find(studentId);
        }

        public void DeleteStudent(Students students)
        {
            _context.Remove(students);
            _context.SaveChanges();
        }

        public void AddStudentsForClassroom(int studentId, int[] arrClassroomId)
        {
            var existingData = _context.StudentClassroom.Where(s => s.StudentID == studentId).FirstOrDefault();
            if(existingData != null)
            {
                // Delete all existing data for this student
                _context.StudentClassroom.RemoveRange(_context.StudentClassroom.Where(s => s.StudentID == studentId));
            }

            // Insert the new data
            foreach (int classroomId in arrClassroomId)
            {
                var student = new StudentClassroom()
                {
                    StudentID = studentId,
                    ClassroomID = classroomId
                };

                _context.StudentClassroom.Add(student);
            }

            _context.SaveChanges();
        }

        public List<Classrooms> GetClassroomByStudent(int studentId)
        {
            var arrClassroomId = _context.StudentClassroom.Where(s => s.StudentID == studentId).Select(c => c.ClassroomID).ToArray();

            var filteredClassroom = _context.Classrooms.Where(c => arrClassroomId.Contains(c.ClassroomID)).ToList<Classrooms>();
            
            return filteredClassroom;
        }

        public StudentReportDto StudentReport(Students student)
        {
            //get classroom for student
            int classroomId = _context.StudentClassroom.Where(s => s.StudentID == student.StudentID).Select(c => c.StudentID).FirstOrDefault();
            Classrooms filteredClassroom = _context.Classrooms.Where(c => c.ClassroomID == classroomId).FirstOrDefault();

            //get all teachers Ids related to classroom
            int[] arrTeacherId = _context.AllocateClassrooms.Where(a => a.ClassroomID == classroomId).Select(b => b.TeacherID).ToArray();

            List<TeacherSubjectDto> teacherSubjects = new List<TeacherSubjectDto>();
            foreach (int teacherId in arrTeacherId) 
            {
                string teacherFirstName = _context.Teachers.Where(a => a.TeacherID == teacherId).Select(b => b.FirstName).FirstOrDefault();
                string teacherLastName = _context.Teachers.Where(a => a.TeacherID == teacherId).Select(b => b.LastName).FirstOrDefault();

                int subjectId = _context.AllocateSubjects.Where(a => a.TeacherID == teacherId).Select(b => b.SubjectID).FirstOrDefault();
                string subjectName = _context.Subjects.Where(a => a.SubjectID == subjectId).Select(b => b.SubjectName).FirstOrDefault();

                TeacherSubjectDto teacherSubjectDto = new TeacherSubjectDto();
                teacherSubjectDto.TeacherName = teacherFirstName + " " + teacherLastName;
                teacherSubjectDto.SubjectName = subjectName;
                teacherSubjects.Add(teacherSubjectDto);
            }

 /*           //get teachers by classroom
            var filteredTeachers = _context.Teachers.Where(a => arrTeacherId.Contains(a.TeacherID)).ToList<Teachers>();
            List<string> teachers = new List<string>();
            foreach (Teachers teacher in filteredTeachers) {
                teachers.Add(teacher.FirstName + " " + teacher.LastName);
            }

            //get all subject Ids related to teachers
            int[] arrSubjectId = _context.AllocateSubjects.Where(a => arrTeacherId.Contains(a.TeacherID)).Select(b => b.SubjectID).ToArray();

            //get subjects
            var filteredSubjects = _context.Subjects.Where(a => arrSubjectId.Contains(a.SubjectID)).Select(b => b.SubjectName).ToList<string>();*/

            var studentDetails = new StudentReportDto()
            {
                StudentID = student.StudentID,
                StudentName = student.FirstName + " " + student.LastName,
                Classroom = filteredClassroom.ClassroomName,
                ContactPerson = student.ContactPerson,
                Email = student.Email,
                ContactNo = student.ContactNo,
                DateOfBirth = student.DateOfBirth,
                TeacherSubject = teacherSubjects,
            };

            return studentDetails;
        }
    }
}
