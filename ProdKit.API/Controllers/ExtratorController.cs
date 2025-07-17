using Microsoft.AspNetCore.Mvc;
using ProdKit.Domain.Inferfaces;

namespace ProdKit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExtratorController : ControllerBase
    {
        private readonly IExtratorService _extratorService;

        public ExtratorController(IExtratorService extratorService)
        {
            _extratorService = extratorService;
        }

        [HttpPost("extrair")]
        public async Task<IActionResult> ConvertVideoToAudio(IFormFile file)
        {
            try
            {
                var audioBytes = await _extratorService.ExtrarAudio(file);
                return File(audioBytes, "audio/mpeg", "audio.mp3");
            }
            catch (Exception ex)
            {
                return BadRequest(new { Erro = ex.Message });
            }
        }
    }
}
