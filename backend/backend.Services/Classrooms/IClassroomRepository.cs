using backend.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace backend.Services
{
    public interface IClassroomRepository
    {
        public Classrooms AddClassroom(Classrooms classroom);
        public Classrooms getClassroomById(int classroomID);
        public List<Classrooms> GetAllClassrooms();
        public Classrooms UpdateClassroom(Classrooms classroom, int classroomID);
        public void DeleteClassroom(Classrooms classroom);
    }
}
