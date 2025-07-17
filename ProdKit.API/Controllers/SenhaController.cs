using Microsoft.AspNetCore.Mvc;
using ProdKit.Domain.DTOs;
using ProdKit.Domain.Inferfaces;

namespace ProdKit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SenhaController : ControllerBase
    {
        private readonly ISenhaAppService _senhaAppService;

        public SenhaController(ISenhaAppService senhaAppService)
        {
            _senhaAppService = senhaAppService;
        }

        [HttpPost("gerar")]
        public IActionResult GerarSenha([FromBody] GerarSenhaRequest request)
        {
            try
            {
                var senhaGerada = _senhaAppService.GerarSenha(request);
                return Ok(new { Senha = senhaGerada });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Erro = ex.Message });
            }
        }
    }
}
