namespace ProdKit.Domain.DTOs
{
    public class CotacaoRequest
    {
        public required string MoedaOrigem { get; set; }
        public required string MoedaDestino { get; set; }
        public required int Valor { get; set; }
    }
}