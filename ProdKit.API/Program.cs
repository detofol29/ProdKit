using ProdKit.Application.Inferfaces;
using ProdKit.Application.Servicos;

var builder = WebApplication.CreateBuilder(args);

// Adiciona política de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins("http://localhost:4200") // URL do Angular
            .AllowAnyHeader()
            .AllowAnyMethod());
});

// Injeção de dependência
builder.Services.AddScoped<ISenhaAppService, SenhaAppService>();

builder.Services.AddControllers();

var app = builder.Build();

// Usa o CORS
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
