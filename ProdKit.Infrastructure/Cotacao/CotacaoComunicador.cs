using ProdKit.Domain.Inferfaces;
using System.Text.Json;

namespace ProdKit.Infrastructure.Cotacao
{
    public class CotacaoComunicador : ICotacaoComunicador
    {
        private readonly HttpClient _httpClient;
        private const string MensagemErroApiBancoCentral = "Erro ao obter cotação na API do Banco Central";
        private const string MensagemErroAoConverterDecimal = "Não foi possível converter o valor para decimal.";
        private const string PropriedadeValor = "valor";

        public CotacaoComunicador(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<decimal> ObterCotacaoAsync(int moeda)
        {
            var url = ObterUrl(moeda);
            var resposta = await _httpClient.GetAsync(url);

            if (!resposta.IsSuccessStatusCode)
                throw new Exception(MensagemErroApiBancoCentral);

            var json = await resposta.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);

            var valorString = doc.RootElement[0].GetProperty(PropriedadeValor).GetString();

            if (!decimal.TryParse(valorString, System.Globalization.NumberStyles.Any,
                                  System.Globalization.CultureInfo.InvariantCulture, out var valorDecimal))
            {
                throw new Exception(MensagemErroAoConverterDecimal);
            }

            return valorDecimal;
        }

        private string ObterUrl(int moeda) 
            => $"https://api.bcb.gov.br/dados/serie/bcdata.sgs.{moeda}/dados/ultimos/1?formato=json";
    }
}