using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProdKit.Domain
{
    public class Senha
    {
        public int TamanhoMinimo { get; set; }
        public int TamanhoMaximo { get; set; }
        public bool CaracteresEspeciais { get; set; }
        public bool Numeros { get; set; }
        public bool LetrasMaiusculas { get; set; }
        public bool LetrasMinusculas { get; set; }
    }
}