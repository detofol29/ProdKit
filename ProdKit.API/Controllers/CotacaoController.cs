using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProdKit.Domain.DTOs;
using ProdKit.Domain.Inferfaces;

namespace ProdKit.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CotacaoController : ControllerBase
    {
        private readonly ICotacaoService _cotacaoService;

        public CotacaoController(ICotacaoService cotacaoService)
        {
            _cotacaoService = cotacaoService;
        }

        [HttpPost("obter")]
        public IActionResult ObterCotacao([FromBody] CotacaoRequest cotacao)
        {
            try
            {
                var resultado = _cotacaoService.ObterCotacao(cotacao);
                return Ok(new { Cotacao = resultado });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Erro = ex.Message });
            }
        }
    }
}