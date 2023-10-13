using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace backend.Models
{
    public class StudentClassroom
    {
        [Required]
        [Key]
        public int StudentClassroomId { get; set; }

        [Required]
        public int StudentID { get; set; }

        [Required]
        public int ClassroomID { get; set; }
    }
}
