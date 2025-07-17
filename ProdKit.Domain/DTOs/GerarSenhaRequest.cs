namespace ProdKit.Domain.DTOs
{
    public class GerarSenhaRequest
    {
        public int Tamanho { get; set; }
        public bool IncluirCaracteresEspeciais { get; set; }
        public bool IncluirNumeros { get; set; }
        public bool IncluirLetrasMaiusculas { get; set; }
        public bool IncluirLetrasMinusculas { get; set; }
    }
}