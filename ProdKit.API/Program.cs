using ProdKit.Application.Inferfaces;
using ProdKit.Application.Servicos;

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

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
