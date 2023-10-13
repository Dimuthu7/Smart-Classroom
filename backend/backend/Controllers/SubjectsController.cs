using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace backend.Controllers
{
    [Route("api/subjects")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        private ISubjectRepository _subjectRepository;

        public SubjectsController(ISubjectRepository subjectRepository)
        {
            _subjectRepository = subjectRepository;
        }

        [HttpGet]
        public ActionResult GetAllSubjects()
        {
            try
            {
                var getSubjects = _subjectRepository.GetAllSubjects();
                if (getSubjects.Count == 0)
                {
                    return NotFound("No Subjects found.");
                }

                return Ok(getSubjects);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Subjects> AddSubject(Subjects subject)
        {
            try
            {
                var saveSubject = _subjectRepository.AddSubject(subject);

                return Ok(saveSubject);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{subjectId}")]
        public ActionResult UpdateSubject(int subjectId, Subjects Subjects)
        {
            try
            {
                var checkSubject = _subjectRepository.getSubjectById(subjectId);

                if (checkSubject is null)
                {
                    return NotFound("No subject found");
                }

                var updateSubject = _subjectRepository.UpdateSubject(Subjects, subjectId);

                return Ok(updateSubject);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{subjectId}")]
        public ActionResult DeleteSubject(int subjectId)
        {
            try
            {
                var checkSubject = _subjectRepository.getSubjectById(subjectId);

                if (checkSubject is null)
                {
                    return NotFound("No subject found");
                }

                _subjectRepository.DeleteSubject(checkSubject);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
