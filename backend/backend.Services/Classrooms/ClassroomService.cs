using backend.DataAccess;
using backend.Models;
using backend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;

namespace backend.Services
{
    public class ClassroomService : IClassroomRepository
    {
        private readonly AppDbContext _context = new AppDbContext();

        public List<Classrooms> GetAllClassrooms() => _context.Classrooms.ToList();

        public Classrooms getClassroomById(int classroomID) => _context.Classrooms.Find(classroomID);

        public Classrooms AddClassroom(Classrooms classroom)
        {
            _context.Classrooms.Add(classroom);
            _context.SaveChanges();

            return _context.Classrooms.Find(classroom.ClassroomID);
        }

        public Classrooms UpdateClassroom(Classrooms classroom, int classroomID)
        {
            var selectClassroom = _context.Classrooms.Where(c => c.ClassroomID == classroomID).FirstOrDefault();
            selectClassroom.ClassroomName = classroom.ClassroomName;

            _context.SaveChanges();
            return _context.Classrooms.Find(classroomID);
        }

        public void DeleteClassroom(Classrooms classroom)
        {
            _context.Remove(classroom);
            _context.SaveChanges();
        }
    }
}
