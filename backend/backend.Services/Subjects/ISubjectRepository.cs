using backend.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace backend.Services
{
    public interface ISubjectRepository
    {
        public Subjects AddSubject(Subjects subject);
        public Subjects getSubjectById(int subjectID);
        public List<Subjects> GetAllSubjects();
        public Subjects UpdateSubject(Subjects subject, int subjectID);
        public void DeleteSubject(Subjects subject);
    }
}
