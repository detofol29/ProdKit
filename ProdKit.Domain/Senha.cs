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

        private static readonly string LetrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private static readonly string LetrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
        private static readonly string Numeros = "0123456789";
        private static readonly string Especiais = "!@#$%&*()-_=+";

        public Senha(int tamanho, bool incluirCaracteresEspeciais, bool incluirNumeros, bool incluirLetrasMaiusculas, bool incluirLetrasMinusculas)
        {
            if (tamanho < 1 || tamanho > 128)
                throw new ArgumentException("O tamanho da senha deve estar entre 6 e 128 caracteres.");

            if (!incluirCaracteresEspeciais && !incluirNumeros && !incluirLetrasMaiusculas && !incluirLetrasMinusculas)
                throw new ArgumentException("Pelo menos um tipo de caractere deve ser incluído.");

            Tamanho = tamanho;
            IncluirCaracteresEspeciais = incluirCaracteresEspeciais;
            IncluirNumeros = incluirNumeros;
            IncluirLetrasMaiusculas = incluirLetrasMaiusculas;
            IncluirLetrasMinusculas = incluirLetrasMinusculas;
        }

        public string Gerar()
        {
            var random = new Random();
            var caracteres = new List<char>();

            var pool = new StringBuilder();

            if (IncluirLetrasMinusculas) pool.Append(LetrasMinusculas);
            if (IncluirLetrasMaiusculas) pool.Append(LetrasMaiusculas);
            if (IncluirNumeros) pool.Append(Numeros);
            if (IncluirCaracteresEspeciais) pool.Append(Especiais);

            string todosCaracteres = pool.ToString();

            for (int i = 0; i < Tamanho; i++)
            {
                var index = random.Next(todosCaracteres.Length);
                caracteres.Add(todosCaracteres[index]);
            }

            return new string(caracteres.ToArray());
        }
    }
}
