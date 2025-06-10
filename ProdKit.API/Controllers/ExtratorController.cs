using Microsoft.AspNetCore.Mvc;
using ProdKit.Application.DTOs;
using ProdKit.Application.Inferfaces;
using ProdKit.Application.Servicos;
using ProdKit.Domain;
using Xabe.FFmpeg;
using Xabe.FFmpeg.Downloader;

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
                //var audioBytes = _extratorService.ExtrarAudio(file);
                var audioBytes =  await _extratorService.ConverterMp4ParaMp3Async(file);
                return File(audioBytes, "audio/mpeg", "audio.mp3");
            }
            catch (Exception ex)
            {
                return BadRequest(new { Erro = ex.Message });
            }

            
        }
    }
}
