using LegoBackend.Models;
using LegoBackend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LegoBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LegoController : ControllerBase
    {
        private readonly ILegoRepository legoRepository;

        public LegoController(ILegoRepository _repository)
        {
            legoRepository = _repository;
        }

        // GET: api/Lego
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(legoRepository.GetAll());
        }

        // POST api/Lego
        [HttpPost]
        public IActionResult Post([FromBody] LegoSet legoSet)
        {
            return Ok(legoRepository.Add(legoSet));
        }

        // DELETE api/Lego/:id
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var isDeleted = legoRepository.Delete(id);
            if (isDeleted)
            {
                return Ok("Deleted successfully");
            }
            return NotFound("Lego set not found");
        }
    }
}
