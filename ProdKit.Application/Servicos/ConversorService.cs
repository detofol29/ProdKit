using Aspose.Pdf;
using Microsoft.AspNetCore.Http;
using ProdKit.Domain.Enumeradores;
using ProdKit.Domain.Inferfaces;

namespace ProdKit.Application.Servicos
{
    public class ConversorService : IConversorService
    {
        const string mensagemTipoDeCoversaoIvalida = "Tipo de conversão inválido.";

        public async Task<byte[]> ConverterArquivo(IFormFile file, TipoDeConversao tipoDeConversao)
        {
            using var inputStream = file.OpenReadStream();
            using var memoryStream = new MemoryStream();

            if (tipoDeConversao == TipoDeConversao.PdfToWord)
                ConverterPdfParaWord(inputStream, memoryStream);

            else if (tipoDeConversao == TipoDeConversao.WordToPdf)
                return ConverterWordParaPdf(inputStream, memoryStream);

            else
                throw new Exception(mensagemTipoDeCoversaoIvalida);

            return memoryStream.ToArray();
        }

        private void ConverterPdfParaWord(Stream inputStream, MemoryStream memoryStream)
        {
            var pdfDoc = new Document(inputStream);

            var options = new DocSaveOptions
            {
                Format = DocSaveOptions.DocFormat.DocX
            };

            pdfDoc.Save(memoryStream, options);
        }

        private byte[] ConverterWordParaPdf(Stream inputStream, MemoryStream memoryStream)
        {
            using var outputStream = new MemoryStream();

            var documentoWord = new Aspose.Words.Document(inputStream);

            documentoWord.Save(outputStream, Aspose.Words.SaveFormat.Pdf);

            return outputStream.ToArray();
        }
    }
}