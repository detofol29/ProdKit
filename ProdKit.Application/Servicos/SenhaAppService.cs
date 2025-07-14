using ProdKit.Application.DTOs;
using ProdKit.Application.Inferfaces;
using ProdKit.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProdKit.Application.Servicos
{
    public class SenhaAppService : ISenhaAppService
    {
        public string GerarSenha(GerarSenhaRequest request)
        {

            var senha = new Senha(
                request.Tamanho,
                request.IncluirCaracteresEspeciais,
                request.IncluirNumeros,
                request.IncluirLetrasMaiusculas,
                request.IncluirLetrasMinusculas
            );

            return senha.Gerar();
        }
    }
}
