using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace backend.Models
{
    public class AllocateClassrooms
    {
        [Required]
        [Key]
        public int AllocateClassroomID { get; set; }

        [Required]
        public int TeacherID { get; set; }

        [Required]
        public int ClassroomID { get; set; }
    }
}
