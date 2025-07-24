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
                Console.WriteLine("Requisição recebida para conversão de arquivo!");
                var audioBytes = await _extratorService.ExtrarAudio(file);
                return File(audioBytes, "audio/mpeg", "audio.mp3");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro: {ex.Message}");
                return BadRequest(new { Erro = ex.Message });
            }
        }
    }
}
