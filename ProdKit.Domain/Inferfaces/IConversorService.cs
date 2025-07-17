using Microsoft.AspNetCore.Http;
using ProdKit.Domain.Enumeradores;

namespace ProdKit.Domain.Inferfaces
{
    public interface IConversorService
    {
        Task<byte[]> ConverterArquivo(IFormFile file, TipoDeConversao tipoDeConversao);
    }
}