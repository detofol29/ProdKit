using ProdKit.Domain.Inferfaces;
using ProdKit.Application.Servicos;
using ProdKit.Infrastructure.Cotacao;
using Microsoft.AspNetCore.Http.Features;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Porta do Angular
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Injeção de dependência
builder.Services.AddScoped<ISenhaAppService, SenhaAppService>();
builder.Services.AddScoped<IExtratorService, ExtratorService>();
builder.Services.AddScoped<IConversorService, ConversorService>();
builder.Services.AddScoped<ICotacaoService, CotacaoService>();
builder.Services.AddScoped<ICotacaoComunicador, CotacaoComunicador>();
builder.Services.AddHttpClient<ICotacaoComunicador, CotacaoComunicador>();

builder.Services.AddControllers();

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 1_000_000_000; // 1 GB, ajuste conforme necessário
});

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MaxRequestBodySize = 1_000_000_000; // 1 GB
});

var app = builder.Build();

app.UseCors();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
