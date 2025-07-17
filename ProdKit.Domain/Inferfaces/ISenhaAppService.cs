using ProdKit.Domain.DTOs;

namespace ProdKit.Domain.Inferfaces
{
    public interface ISenhaAppService
    {
        string GerarSenha(GerarSenhaRequest request);
    }
}
