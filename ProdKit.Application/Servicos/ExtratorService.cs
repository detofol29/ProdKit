using Microsoft.AspNetCore.Http;
using ProdKit.Application.Inferfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xabe.FFmpeg;

namespace ProdKit.Application.Servicos
{
    public class ExtratorService : IExtratorService
    {
        public byte[] ExtrarAudio(IFormFile file)
        {
            //string caminhoArquivo = @"C:\Projetos\ProdKit\ProdKit\ArquivosTeste\somwhatsapp.mp3.mp3";
            string nomeArquivo = "somwhatsapp.mp3.mp3";
            string caminhoProjeto = Directory.GetParent(AppDomain.CurrentDomain.BaseDirectory).Parent.Parent.FullName;
            string caminhoCompleto = Path.Combine(caminhoProjeto, "ArquivosTeste", nomeArquivo).Replace("\\ProdKit.API\\bin", "");

            // Verifica se o arquivo existe
            if (!File.Exists(caminhoCompleto))
            {
                throw new FileNotFoundException("Arquivo de áudio não encontrado no diretório especificado.");
            }

            // Lê todos os bytes do arquivo MP3
            byte[] arquivoBytes = File.ReadAllBytes(caminhoCompleto);

            return arquivoBytes;
        }

        public async Task<byte[]> ConverterMp4ParaMp3Async(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("Arquivo inválido");

            // Caminho temporário para salvar o MP4
            var tempMp4 = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + ".mp4");
            var tempMp3 = Path.ChangeExtension(tempMp4, ".mp3");

            // Salva o arquivo MP4 no disco
            using (var stream = new FileStream(tempMp4, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Define a pasta "ffmpeg" na raiz do projeto como local dos executáveis
            var pastaFFmpeg = Path.Combine(Directory.GetCurrentDirectory(), "ffmpeg");
            FFmpeg.SetExecutablesPath(pastaFFmpeg);

            // Cria a conversão
            var conversao = await FFmpeg.Conversions.FromSnippet.ExtractAudio(tempMp4, tempMp3);

            // Executa a conversão
            await conversao.Start();

            // Lê o arquivo MP3 convertido
            byte[] mp3Bytes = await File.ReadAllBytesAsync(tempMp3);

            // Limpa os arquivos temporários
            File.Delete(tempMp4);
            File.Delete(tempMp3);

            return mp3Bytes;
        }

    }
}
