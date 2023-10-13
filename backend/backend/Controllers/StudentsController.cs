using backend.Models;
using backend.Services;
using backend.Services.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace backend.Controllers
{
    [Route("api/students")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private IStudentRepository _studentRepository;

        public StudentsController(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        [HttpGet]
        public ActionResult GetAllStudent()
        {
            try
            {
                var getStudents = _studentRepository.GetAllStudent();
                if(getStudents.Count == 0)
                {
                    return NotFound("No students found.");
                }

                return Ok(getStudents);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Students> AddStudent(Students student)
        {
            try
            {
                var saveStudent = _studentRepository.AddStudent(student);

                return Ok(saveStudent);
            }
            catch (Exception ex)
            { 
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{studentId}")]
        public ActionResult UpdateStudent(int studentId, Students students)
        {
            try
            {
                var checkStudent = _studentRepository.getStudentById(studentId);

                if(checkStudent is null)
                {
                    return NotFound("No student found");
                }

                var updateStudent = _studentRepository.UpdateStudent(students, studentId);

                return Ok(updateStudent);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{studentId}")]
        public ActionResult DeleteStudent(int studentId)
        {
            try
            {
                var checkStudent = _studentRepository.getStudentById(studentId);

                if (checkStudent is null)
                {
                    return NotFound("No student found");
                }

                _studentRepository.DeleteStudent(checkStudent);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("{studentId}/classrooms")]
        public ActionResult AddClassroom(int studentId, [FromBody] int[] arrClassroomId)
        {
            try
            {
                _studentRepository.AddStudentsForClassroom(studentId, arrClassroomId);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{studentId}/classrooms")]
        public ActionResult<Classrooms> GetClassroomByStudent(int studentId)
        {
            try
            {
                var classrooms = _studentRepository.GetClassroomByStudent(studentId);

                return Ok(classrooms);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{studentId}/report")]
        public ActionResult<StudentReportDto> GetStudentReport(int studentId)
        {
            try
            {
                var student = _studentRepository.getStudentById(studentId);

                var reportData = _studentRepository.StudentReport(student);

                return Ok(reportData);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
