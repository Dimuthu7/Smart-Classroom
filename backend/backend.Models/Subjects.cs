using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace backend.Models
{
    public class Subjects
    {
        [Required]
        [Key]
        public int SubjectID { get; set; }

        [Required]
        [StringLength(50)]
        public string SubjectName { get; set; }
    }
}
