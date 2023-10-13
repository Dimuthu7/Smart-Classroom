using System;
using System.Collections.Generic;
using System.Text;

namespace backend.Services.ViewModels
{
    public class StudentReportDto
    {
        public int StudentID { get; set; }
        public string StudentName { get; set; }
        public string Classroom { get; set; }
        public string ContactPerson { get; set; }
        public string Email { get; set; }
        public string ContactNo { get; set; }
        public DateTime DateOfBirth { get; set; }
        public List<TeacherSubjectDto> TeacherSubject { get; set; }

    }
}
