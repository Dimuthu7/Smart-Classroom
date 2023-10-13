using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace backend.Models
{
    public class Teachers
    {
        [Required]
        [Key]
        public int TeacherID { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [StringLength(10)]
        public string ContactNo { get; set; }

        [Required]
        [StringLength(50)]
        public string Email { get; set; }
    }
}
