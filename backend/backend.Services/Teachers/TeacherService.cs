using backend.DataAccess;
using backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace backend.Services
{
    public class TeacherService : ITeacherRepository
    {
        private readonly AppDbContext _context = new AppDbContext();

        public List<Teachers> GetAllTeachers() => _context.Teachers.ToList();

        public Teachers getTeacherById(int teacherID) => _context.Teachers.Find(teacherID);

        public Teachers AddTeacher(Teachers teachers)
        {
            _context.Teachers.Add(teachers);
            _context.SaveChanges();

            return _context.Teachers.Find(teachers.TeacherID);
        }

        public Teachers UpdateTeacher(Teachers teachers, int teacherID)
        {
            var selectTeacher = _context.Teachers.Where(t => t.TeacherID == teacherID).FirstOrDefault();
            selectTeacher.FirstName = teachers.FirstName;
            selectTeacher.LastName = teachers.LastName;
            selectTeacher.ContactNo = teachers.ContactNo;
            selectTeacher.Email = teachers.Email;

            _context.SaveChanges();
            return _context.Teachers.Find(teacherID);
        }

        public void DeleteTeacher(Teachers teachers)
        {
            _context.Remove(teachers);
            _context.SaveChanges();
        }

        public void AllocateSubjects(int teacherID, int[] arrSubjectID)
        {
            var existingData = _context.AllocateSubjects.Where(s => s.TeacherID == teacherID).FirstOrDefault();
            if (existingData != null)
            {
                // Delete all existing data for this teacher
                _context.AllocateSubjects.RemoveRange(_context.AllocateSubjects.Where(s => s.TeacherID == teacherID));
            }

            // Insert the new data
            foreach (int subjectId in arrSubjectID)
            {
                var teacher = new AllocateSubjects()
                {
                    TeacherID = teacherID,
                    SubjectID = subjectId
                };

                _context.AllocateSubjects.Add(teacher);
            }

            _context.SaveChanges();
        }

        public List<Subjects> GetSubjectByTeacher(int teacherID)
        {
            var arrSubjectId = _context.AllocateSubjects.Where(s => s.TeacherID == teacherID).Select(c => c.SubjectID).ToArray();

            var filteredSubject = _context.Subjects.Where(c => arrSubjectId.Contains(c.SubjectID)).ToList<Subjects>();

            return filteredSubject;
        }

        public void AllocateClassrooms(int teacherID, int[] arrClassroomID)
        {
            var existingData = _context.AllocateClassrooms.Where(s => s.TeacherID == teacherID).FirstOrDefault();
            if (existingData != null)
            {
                // Delete all existing data for this teacher
                _context.AllocateClassrooms.RemoveRange(_context.AllocateClassrooms.Where(s => s.TeacherID == teacherID));
            }

            // Insert the new data
            foreach (int classroomID in arrClassroomID)
            {
                var teacher = new AllocateClassrooms()
                {
                    TeacherID = teacherID,
                    ClassroomID = classroomID
                };

                _context.AllocateClassrooms.Add(teacher);
            }

            _context.SaveChanges();
        }

        public List<Classrooms> GetClassroomByTeacher(int teacherID)
        {
            var arrClassroomId = _context.AllocateClassrooms.Where(s => s.TeacherID == teacherID).Select(c => c.ClassroomID).ToArray();

            var filteredClassroom = _context.Classrooms.Where(c => arrClassroomId.Contains(c.ClassroomID)).ToList<Classrooms>();

            return filteredClassroom;
        }
    }
}
