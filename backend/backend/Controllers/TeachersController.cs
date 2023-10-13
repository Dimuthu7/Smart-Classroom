using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace backend.Controllers
{
    [Route("api/teachers")]
    [ApiController]
    public class TeachersController : ControllerBase
    {
        private ITeacherRepository _teacherRepository;
        public TeachersController(ITeacherRepository teacherRepository)
        {
            _teacherRepository = teacherRepository;
        }

        [HttpGet]
        public ActionResult GetAllTeachers()
        {
            try
            {
                var getRes = _teacherRepository.GetAllTeachers();
                if (getRes.Count == 0)
                {
                    return NotFound("No teachers found.");
                }

                return Ok(getRes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Teachers> AddTeacher(Teachers teacher)
        {
            try
            {
                var save = _teacherRepository.AddTeacher(teacher);

                return Ok(save);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{teacherID}")]
        public ActionResult UpdateTeacher(Teachers teachers, int teacherID)
        {
            try
            {
                var checkTeacher = _teacherRepository.getTeacherById(teacherID);

                if (checkTeacher is null)
                {
                    return NotFound("No teacher found");
                }

                var updateTeacher = _teacherRepository.UpdateTeacher(teachers, teacherID);

                return Ok(updateTeacher);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{teacherID}")]
        public ActionResult DeleteTeacher(int teacherID)
        {
            try
            {
                var checkTeacher = _teacherRepository.getTeacherById(teacherID);

                if (checkTeacher is null)
                {
                    return NotFound("No teacher found");
                }

                _teacherRepository.DeleteTeacher(checkTeacher);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("{teacherID}/subjects")]
        public ActionResult AddSubject(int teacherID, [FromBody] int[] arrSubjectID)
        {
            try
            {
                _teacherRepository.AllocateSubjects(teacherID, arrSubjectID);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{teacherID}/subjects")]
        public ActionResult<Subjects> GetSubjectsByTeacher(int teacherID)
        {
            try
            {
                var subjects = _teacherRepository.GetSubjectByTeacher(teacherID);

                return Ok(subjects);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("{teacherID}/classrooms")]
        public ActionResult AddClassroom(int teacherID, [FromBody] int[] arrClassroomId)
        {
            try
            {
                _teacherRepository.AllocateClassrooms(teacherID, arrClassroomId);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{teacherID}/classrooms")]
        public ActionResult<Classrooms> GetClassroomByTeacher(int teacherID)
        {
            try
            {
                var classrooms = _teacherRepository.GetClassroomByTeacher(teacherID);

                return Ok(classrooms);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
