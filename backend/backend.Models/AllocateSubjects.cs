using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace backend.Models
{
    public class AllocateSubjects
    {
        [Required]
        [Key]
        public int AllocateSubjectID { get; set; }

        [Required]
        public int TeacherID { get; set; }

        [Required]
        public int SubjectID { get; set; }
    }
}
