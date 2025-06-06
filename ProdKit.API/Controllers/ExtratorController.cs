using Microsoft.AspNetCore.Mvc;
using ProdKit.Application.DTOs;
using ProdKit.Application.Inferfaces;
using ProdKit.Domain;
using Xabe.FFmpeg;
using Xabe.FFmpeg.Downloader;

namespace ProdKit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExtratorController : ControllerBase
    {
        private readonly ISenhaAppService _senhaAppService;

        public ExtratorController(ISenhaAppService senhaAppService)
        {
            _senhaAppService = senhaAppService;
        }

        [HttpPost("extrair")]
        public async Task<IActionResult> ConvertVideoToAudio(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Nenhum arquivo enviado.");

            var inputPath = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + Path.GetExtension(file.FileName));
            var outputPath = Path.ChangeExtension(inputPath, ".mp3");

            // Salva o vídeo temporariamente
            using (var stream = new FileStream(inputPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // 1. Baixar FFmpeg para a pasta padrão temporária
            await FFmpegDownloader.GetLatestVersion(FFmpegVersion.Official);

            // 2. Obter o caminho onde o executável foi baixado
            string ffmpegPath = FFmpeg.ExecutablesPath; // caminho onde foi baixado automaticamente

            // 3. Configurar o caminho dos executáveis para o FFmpeg
            FFmpeg.SetExecutablesPath(ffmpegPath);

            // 4. Executar a conversão normalmente
            var conversion = await FFmpeg.Conversions.New()
                .AddParameter($"-i \"{inputPath}\" -vn -acodec libmp3lame \"{outputPath}\"")
                .Start();

            if (!System.IO.File.Exists(outputPath))
                return StatusCode(500, "Erro ao converter o vídeo.");

            var audioBytes = await System.IO.File.ReadAllBytesAsync(outputPath);

            // Limpeza
            System.IO.File.Delete(inputPath);
            System.IO.File.Delete(outputPath);

            return File(audioBytes, "audio/mpeg", "audio.mp3");
        }
    }
}
