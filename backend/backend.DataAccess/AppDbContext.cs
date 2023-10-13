using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace backend.DataAccess
{
    public class AppDbContext: DbContext
    {
        public DbSet<Students> Students { get; set; }
        public DbSet<Teachers> Teachers { get; set; }
        public DbSet<Subjects> Subjects { get; set; }
        public DbSet<Classrooms> Classrooms { get; set; }
        public DbSet<StudentClassroom> StudentClassroom { get; set; }
        public DbSet<AllocateSubjects> AllocateSubjects { get; set; }
        public DbSet<AllocateClassrooms> AllocateClassrooms { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "";
            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
