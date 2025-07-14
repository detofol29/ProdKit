using ProdKit.Application.DTOs;
using ProdKit.Application.Inferfaces;
using ProdKit.Domain;

namespace ProdKit.Application.Servicos
{
    public class SenhaAppService : ISenhaAppService
    {
        private static readonly string LetrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private static readonly string LetrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
        private static readonly string Numeros = "0123456789";
        private static readonly string Especiais = "!@#$%&*()-_=+";

        public string GerarSenha(GerarSenhaRequest request)
        {

            var senha = new Senha(
                request.Tamanho,
                request.IncluirCaracteresEspeciais,
                request.IncluirNumeros,
                request.IncluirLetrasMaiusculas,
                request.IncluirLetrasMinusculas
            );

            return Gerar(senha);
        }

        private static string Gerar(Senha senha)
        {
            var random = new Random();
            var senhaGerada = new List<char>();
            var conjuntoGeral = new List<char>();

            if (senha.IncluirLetrasMaiusculas)
            {
                senhaGerada.Add(LetrasMaiusculas[random.Next(LetrasMaiusculas.Length)]);
                conjuntoGeral.AddRange(LetrasMaiusculas);
            }

            if (senha.IncluirLetrasMinusculas)
            {
                senhaGerada.Add(LetrasMinusculas[random.Next(LetrasMinusculas.Length)]);
                conjuntoGeral.AddRange(LetrasMinusculas);
            }

            if (senha.IncluirNumeros)
            {
                senhaGerada.Add(Numeros[random.Next(Numeros.Length)]);
                conjuntoGeral.AddRange(Numeros);
            }

            if (senha.IncluirCaracteresEspeciais)
            {
                senhaGerada.Add(Especiais[random.Next(Especiais.Length)]);
                conjuntoGeral.AddRange(Especiais);
            }

            while (senhaGerada.Count < senha.Tamanho)
            {
                senhaGerada.Add(conjuntoGeral[random.Next(conjuntoGeral.Count)]);
            }

            return new string(senhaGerada.OrderBy(_ => random.Next()).ToArray());
        }
    }
}
