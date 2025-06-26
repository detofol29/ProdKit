using Microsoft.AspNetCore.Mvc;
using ProdKit.Application.Inferfaces;

namespace ProdKit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConversorController : ControllerBase
    {
        private readonly IExtratorService _extratorService;

        public ConversorController(IExtratorService extratorService)
        {
            _extratorService = extratorService;
        }

        [HttpPost("converterArquivo")]
        public async Task<IActionResult> ConverterArquivo(IFormFile file, [FromForm] string tipoDeConversao)
        {
            return Ok();
        }
    }
}
