# Etapa 1: Build usando .NET 9 Preview
FROM mcr.microsoft.com/dotnet/sdk:9.0-preview AS build
WORKDIR /src

# Copia toda a raiz do projeto
COPY ../ ./

# Restaura e publica o projeto ProdKit.API
RUN dotnet restore ProdKit.API/ProdKit.API.csproj
RUN dotnet publish ProdKit.API/ProdKit.API.csproj -c Release -o /app/publish

# Etapa 2: Runtime com ASP.NET 9 Preview
FROM mcr.microsoft.com/dotnet/aspnet:9.0-preview
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80
ENTRYPOINT ["dotnet", "ProdKit.API.dll"]
