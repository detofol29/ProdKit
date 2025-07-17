using Microsoft.AspNetCore.Http;

namespace ProdKit.Domain.Inferfaces
{
    public interface IExtratorService
    {
        Task<byte[]> ExtrarAudio(IFormFile file);
    }
}
