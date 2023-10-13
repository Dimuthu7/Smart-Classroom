using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace backend.Controllers
{
    [Route("api/classrooms")]
    [ApiController]
    public class ClassroomsController : ControllerBase
    {
        private IClassroomRepository _classroomRepository;

        public ClassroomsController(IClassroomRepository classroomRepository)
        {
            _classroomRepository = classroomRepository;
        }

        [HttpGet]
        public ActionResult GetAllClassrooms()
        {
            try
            {
                var getClassrooms = _classroomRepository.GetAllClassrooms();
                if (getClassrooms.Count == 0)
                {
                    return NotFound("No Classrooms found.");
                }

                return Ok(getClassrooms);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Classrooms> AddClassroom(Classrooms classroom)
        {
            try
            {
                var saveClassroom = _classroomRepository.AddClassroom(classroom);

                return Ok(saveClassroom);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{classroomId}")]
        public ActionResult UpdateClassroom(int classroomId, Classrooms Classrooms)
        {
            try
            {
                var checkClassroom = _classroomRepository.getClassroomById(classroomId);

                if (checkClassroom is null)
                {
                    return NotFound("No classroom found");
                }

                var updateClassroom = _classroomRepository.UpdateClassroom(Classrooms, classroomId);

                return Ok(updateClassroom);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{classroomId}")]
        public ActionResult DeleteClassroom(int classroomId)
        {
            try
            {
                var checkClassroom = _classroomRepository.getClassroomById(classroomId);

                if (checkClassroom is null)
                {
                    return NotFound("No classroom found");
                }

                _classroomRepository.DeleteClassroom(checkClassroom);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
