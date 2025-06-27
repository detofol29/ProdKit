using Microsoft.AspNetCore.Http;
using ProdKit.Domain.Enumeradores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProdKit.Application.Inferfaces
{
    public interface IConversorService
    {
        Task<byte[]> ConverterArquivo(IFormFile file, TipoDeConversao tipoDeConversao);
    }
}
