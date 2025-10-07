using Microsoft.AspNetCore.Mvc;
using ProdKit.Domain.Inferfaces;
using System.Diagnostics;

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
                var ip = HttpContext.Request.Headers["X-Forwarded-For"].FirstOrDefault()
                        ?? HttpContext.Connection.RemoteIpAddress?.ToString();
                Console.WriteLine($"Requisição feita por: [{ip}]");
                var sw = new Stopwatch();
                sw.Start();
                var audioBytes = await _extratorService.ExtrarAudio(file);
                sw.Stop();
                Console.WriteLine("Tempo de execussão da extração: " + sw.ElapsedMilliseconds);
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
