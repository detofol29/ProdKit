using ProdKit.Domain.DTOs;
using ProdKit.Domain.Inferfaces;
using System.Drawing.Imaging.Effects;

namespace ProdKit.Application.Servicos
{
    public class CotacaoService : ICotacaoService
    {
        private readonly ICotacaoComunicador _cotacaoComunicador;
        private readonly Dictionary<string, int> _moedas;

        public CotacaoService(ICotacaoComunicador cotacaoComunicador)
        {
            _cotacaoComunicador = cotacaoComunicador;
            _moedas = ObterCodigosSeriesPrincipaisMoedas();
        }

        public decimal ObterCotacao(CotacaoRequest request)
        {
            decimal cotacaoOrigem;
            decimal cotacaoDestino;

            if(request.MoedaOrigem == _moedas.First().Key)
            {
                cotacaoDestino = _cotacaoComunicador.ObterCotacaoAsync(_moedas.Where(m => m.Key == request.MoedaDestino).First().Value).Result;
                cotacaoOrigem = 1;
            }

            else if (request.MoedaDestino == _moedas.First().Key)
            {
                cotacaoOrigem = _cotacaoComunicador.ObterCotacaoAsync(_moedas.Where(m => m.Key == request.MoedaOrigem).First().Value).Result;
                cotacaoDestino = 1;
            }

            else
            {
                cotacaoOrigem = _cotacaoComunicador.ObterCotacaoAsync(_moedas.Where(m => m.Key == request.MoedaOrigem).First().Value).Result;
                cotacaoDestino = _cotacaoComunicador.ObterCotacaoAsync(_moedas.Where(m => m.Key == request.MoedaDestino).First().Value).Result;
            }

            var resultado = request.Valor * cotacaoOrigem / cotacaoDestino;

            return resultado;
        }

        private static Dictionary<string, int> ObterCodigosSeriesPrincipaisMoedas()
        {
            //Conferir uma por uma
            return new Dictionary<string, int>
            {
                { "BRL", 0 },       // Real Brasileiro
                { "USD", 1 },       // Dólar Americano (venda)
                { "EUR", 21619 },   // Euro (venda)
                { "GBP", 21623 },   // Libra Esterlina (venda)
                { "CHF", 21625 },   // Franco Suíço (venda)
                { "CAD", 21635 },   // Dólar Canadense (venda)
                { "AUD", 21633 },   // Dólar Australiano (venda)
                //{ "CLP", 21630 },   // Peso Chileno (venda)
                //{ "MXN", 21631 },   // Peso Mexicano (venda)
                //{ "ZAR", 21632 },   // Rand Sul-Africano (venda)
                { "SEK", 21631 },   // Coroa Sueca (venda)
                { "NOK", 21629 },   // Coroa Norueguesa (venda)
                { "DKK", 21627 },   // Coroa Dinamarquesa (venda)
                //{ "INR", 21636 },   // Rúpia Indiana (venda)
                //{ "RUB", 21637 },   // Rublo Russo (venda)
                //{ "KRW", 21638 },   // Won Sul-Coreano (venda)
                //{ "TRY", 21639 },   // Lira Turca (venda)
                //{ "ILS", 21640 }    // Shekel Israelense (venda)
            };
        }

    }
}