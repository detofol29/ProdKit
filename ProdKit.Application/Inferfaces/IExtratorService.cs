using Microsoft.AspNetCore.Http;
using ProdKit.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProdKit.Application.Inferfaces
{
    public interface IExtratorService
    {
        byte[] ExtrarAudio(IFormFile file);
        Task<byte[]> ConverterMp4ParaMp3Async(IFormFile file);
    }
}
