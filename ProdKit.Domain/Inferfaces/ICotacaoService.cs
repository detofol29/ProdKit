using ProdKit.Domain.DTOs;

namespace ProdKit.Domain.Inferfaces
{
    public interface ICotacaoService
    {
        decimal ObterCotacao(CotacaoRequest request);
    }
}
