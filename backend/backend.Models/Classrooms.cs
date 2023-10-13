using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace backend.Models
{
    public class Classrooms
    {
        [Required]
        [Key]
        public int ClassroomID { get; set; }

        [Required]
        [StringLength(50)]
        public string ClassroomName { get; set; }
    }
}
