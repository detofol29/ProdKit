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

        public Senha(int tamanho,
            bool incluirCaracteresEspeciais,
            bool incluirNumeros,
            bool incluirLetrasMaiusculas,
            bool incluirLetrasMinusculas)
        {
            if (tamanho < 1 || tamanho > 100)
                throw new Exception("O tamanho da senha deve estar entre 1 e 100 caracteres.");

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
    }
}
