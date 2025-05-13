using ProdKit.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProdKit.Application.Inferfaces
{
    public interface ISenhaAppService
    {
        string GerarSenha(GerarSenhaRequest request);
    }
}
