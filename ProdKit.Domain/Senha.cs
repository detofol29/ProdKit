using System.Text;

namespace ProdKit.Domain
{
    public class Senha
    {
        public int Tamanho { get; }
        public bool IncluirCaracteresEspeciais { get; }
        public bool IncluirNumeros { get; }
        public bool IncluirLetrasMaiusculas { get; }
        public bool IncluirLetrasMinusculas { get; }
        public int TamanhoMinimo { get; }

        private static readonly string LetrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private static readonly string LetrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
        private static readonly string Numeros = "0123456789";
        private static readonly string Especiais = "!@#$%&*()-_=+";

        public Senha(int tamanho, bool incluirCaracteresEspeciais, bool incluirNumeros, bool incluirLetrasMaiusculas, bool incluirLetrasMinusculas)
        {
            if (tamanho < 1 || tamanho > 100)
                throw new Exception("O tamanho da senha deve estar entre 6 e 128 caracteres.");

            if (!incluirCaracteresEspeciais && !incluirNumeros && !incluirLetrasMaiusculas && !incluirLetrasMinusculas)
                throw new Exception("Pelo menos um tipo de caractere deve ser incluído.");

            Tamanho = tamanho;
            IncluirCaracteresEspeciais = incluirCaracteresEspeciais;
            IncluirNumeros = incluirNumeros;
            IncluirLetrasMaiusculas = incluirLetrasMaiusculas;
            IncluirLetrasMinusculas = incluirLetrasMinusculas;
            TamanhoMinimo = ObterTamanhoMinimo();

            if(Tamanho < TamanhoMinimo)
                throw new Exception($"O tamanho mínimo da senha deve ser {TamanhoMinimo.ToString()} de acordo com os critérios fornecidos!");
        }

        private int ObterTamanhoMinimo()
        {
            var tamanhoMinimo = 0;
            if (IncluirCaracteresEspeciais) tamanhoMinimo ++;
            if (IncluirNumeros) tamanhoMinimo ++;
            if (IncluirLetrasMaiusculas) tamanhoMinimo ++;
            if (IncluirLetrasMinusculas) tamanhoMinimo ++;

            return tamanhoMinimo;
        }

        public string Gerar()
        {
            var random = new Random();
            var senha = new List<char>();
            var conjuntoGeral = new List<char>();

            // Adiciona pelo menos um de cada tipo selecionado
            if (IncluirLetrasMaiusculas)
            {
                senha.Add(LetrasMaiusculas[random.Next(LetrasMaiusculas.Length)]);
                conjuntoGeral.AddRange(LetrasMaiusculas);
            }

            if (IncluirLetrasMinusculas)
            {
                senha.Add(LetrasMinusculas[random.Next(LetrasMinusculas.Length)]);
                conjuntoGeral.AddRange(LetrasMinusculas);
            }

            if (IncluirNumeros)
            {
                senha.Add(Numeros[random.Next(Numeros.Length)]);
                conjuntoGeral.AddRange(Numeros);
            }

            if (IncluirCaracteresEspeciais)
            {
                senha.Add(Especiais[random.Next(Especiais.Length)]);
                conjuntoGeral.AddRange(Especiais);
            }

            while (senha.Count < Tamanho)
            {
                senha.Add(conjuntoGeral[random.Next(conjuntoGeral.Count)]);
            }

            return new string(senha.OrderBy(_ => random.Next()).ToArray());
        }
    }
}
