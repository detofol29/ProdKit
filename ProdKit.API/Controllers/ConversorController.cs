using Microsoft.AspNetCore.Mvc;
using ProdKit.Domain.Enumeradores;
using ProdKit.Domain.Inferfaces;

namespace ProdKit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConversorController : ControllerBase
    {
        private readonly IConversorService _conversorService;

        const string extensaoDocx = ".docx";
        const string extensaoPdf = ".pdf";
        const string tipoDeConteudoDocx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        const string tipoDeConteudoPdf = "application/pdf";
        const string complemetoConvertido = "_convertido";
        const string mensagemConversaoInvalida = "Tipo de conversão inválido.";

        public ConversorController(IConversorService conversorService)
        {
            _conversorService = conversorService;
        }

        [HttpPost("converterArquivo")]
        public async Task<IActionResult> ConverterArquivo(IFormFile file, [FromForm] string tipoDeConversao)
        {
            try
            {
                if (!Enum.TryParse<TipoDeConversao>(tipoDeConversao, out var tipo))
                    return BadRequest(mensagemConversaoInvalida);

                var arquivoConvertido = await _conversorService.ConverterArquivo(file, tipo);

                var extensao = ObterExtensao(tipo);
                var tipoDeConteudo = ObterTipoDeConteudo(tipo);


                var nomeArquivo = Path.GetFileNameWithoutExtension(file.FileName) 
                    + complemetoConvertido 
                    + extensao;

                return File(arquivoConvertido, tipoDeConteudo, nomeArquivo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");
            }
        }

        private static string ObterExtensao(TipoDeConversao tipo)
        {
            return tipo == TipoDeConversao.PdfToWord
                ? extensaoDocx
                : extensaoPdf;
        }

        private static string ObterTipoDeConteudo(TipoDeConversao tipo)
        {
            return tipo == TipoDeConversao.PdfToWord
                ? tipoDeConteudoDocx
                : tipoDeConteudoPdf;
        }
    }
}