namespace ProdKit.Domain.Inferfaces
{
    public interface ICotacaoComunicador
    {
        Task<decimal> ObterCotacaoAsync(int moeda);
    }
}