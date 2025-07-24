using Microsoft.AspNetCore.Http;
using ProdKit.Domain.Inferfaces;
using System.Diagnostics;
using System.Text.Json;
using Xabe.FFmpeg;

namespace ProdKit.Application.Servicos
{
    public class ExtratorService : IExtratorService
    {
        const string MensagemArquivoInvalido = "Arquivo inválido";
        const string FormatoMp4 = ".mp4";
        const string FormatoMp3 = ".mp3";
        //const string PastaFfmpeg = "ffmpeg";
        //const string ExecutavelFfmpeg = "ffmpeg.exe";
        //const string MensagemFfmpegNaoEncontrado = "FFmpeg não encontrado!";
        const string MensagemErroNaConversao = "Erro na conversão com FFmpeg: ";

        public async Task<byte[]> ExtrarAudio(IFormFile file)
        {
            if (file == null || file.Length == decimal.Zero)
                throw new Exception(MensagemArquivoInvalido);

            var tempMp4 = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + FormatoMp4);
            var tempMp3 = Path.ChangeExtension(tempMp4, FormatoMp3);

            await using (var stream = new FileStream(tempMp4, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            //var ffmpegPath = Path.Combine(Directory.GetCurrentDirectory(), PastaFfmpeg, ExecutavelFfmpeg);

            //if (!File.Exists(ffmpegPath))
            //    throw new FileNotFoundException(MensagemFfmpegNaoEncontrado);

            //var startInfo = new ProcessStartInfo
            //{
            //    FileName = ffmpegPath,
            //    Arguments = $"-i \"{tempMp4}\" -vn -ar 44100 -ac 2 -b:a 192k \"{tempMp3}\" -y",
            //    RedirectStandardError = true,
            //    RedirectStandardOutput = true,
            //    UseShellExecute = false,
            //    CreateNoWindow = true
            //};

            var ffmpegPath = "ffmpeg"; // usa diretamente o nome, assumindo que está no PATH

            var startInfo = new ProcessStartInfo
            {
                FileName = ffmpegPath,
                Arguments = $"-i \"{tempMp4}\" -vn -ar 44100 -ac 2 -b:a 192k \"{tempMp3}\" -y",
                RedirectStandardError = true,
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = Process.Start(startInfo);

            // Captura mensagens de erro para debug
            string ffmpegErrors = await process.StandardError.ReadToEndAsync();
            await process.WaitForExitAsync();

            if (process.ExitCode != 0)
                throw new Exception(MensagemErroNaConversao + ffmpegErrors);

            var mp3Bytes = await File.ReadAllBytesAsync(tempMp3);

            File.Delete(tempMp4);
            File.Delete(tempMp3);

            return mp3Bytes;
        }
    }
}
