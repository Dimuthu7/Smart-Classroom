using backend.DataAccess;
using backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace backend.Services
{
    public class SubjectService : ISubjectRepository
    {
        private readonly AppDbContext _context = new AppDbContext();

        public List<Subjects> GetAllSubjects() => _context.Subjects.ToList();

        public Subjects getSubjectById(int subjectID) => _context.Subjects.Find(subjectID);

        public Subjects AddSubject(Subjects subject)
        {
            _context.Subjects.Add(subject);
            _context.SaveChanges();

            return _context.Subjects.Find(subject.SubjectID);
        }

        public Subjects UpdateSubject(Subjects subject, int subjectID)
        {
            var selectSubject = _context.Subjects.Where(s => s.SubjectID == subjectID).FirstOrDefault();
            selectSubject.SubjectName = subject.SubjectName;

            _context.SaveChanges();
            return _context.Subjects.Find(subjectID);
        }

        public void DeleteSubject(Subjects subject)
        {
            _context.Remove(subject);
            _context.SaveChanges();
        }
    }
}
