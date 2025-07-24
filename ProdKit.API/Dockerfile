## Etapa 1: Build usando .NET 8
#FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
#WORKDIR /src
#
## Copia os arquivos do projeto (ajustado para contexto local)
#COPY . .
#
## Restaura e publica o projeto ProdKit.API
#RUN dotnet restore ProdKit.API/ProdKit.API.csproj
#RUN dotnet publish ProdKit.API/ProdKit.API.csproj -c Release -o /app/publish
#
## Etapa 2: Runtime com ASP.NET 8 + ffmpeg
#FROM mcr.microsoft.com/dotnet/aspnet:8.0
#WORKDIR /app
#
## Instala ffmpeg
#RUN apt-get update && \
    #apt-get install -y ffmpeg && \
    #apt-get clean && \
    #rm -rf /var/lib/apt/lists/*
#
## Copia os arquivos publicados
#COPY --from=build /app/publish .
#
#EXPOSE 80
#ENTRYPOINT ["dotnet", "ProdKit.API.dll"]

# Etapa 1: Build
#FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
#WORKDIR /src
#
#COPY . .
#
#RUN dotnet restore ProdKit.API/ProdKit.API.csproj
#RUN dotnet publish ProdKit.API/ProdKit.API.csproj -c Release -o /app/publish
#
## Etapa 2: Runtime + ffmpeg + libgdiplus
#FROM mcr.microsoft.com/dotnet/aspnet:8.0
#WORKDIR /app
#
#RUN apt-get update && \
    #apt-get install -y ffmpeg libgdiplus libc6-dev && \
    #ln -s libgdiplus.so /usr/lib/libgdiplus.so && \
    #apt-get clean && \
    #rm -rf /var/lib/apt/lists/*
#
#COPY --from=build /app/publish .
#
#EXPOSE 80
#ENTRYPOINT ["dotnet", "ProdKit.API.dll"]


# Etapa 1: Build da aplicação
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore ProdKit.API/ProdKit.API.csproj
RUN dotnet publish ProdKit.API/ProdKit.API.csproj -c Release -o /app/publish

# Etapa 2: Runtime com dependências gráficas
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Instala todas as dependências necessárias
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ffmpeg \
        libgdiplus \
        libc6-dev \
        fontconfig \
        fonts-dejavu \
        libfreetype6 \
        libjpeg-dev \
        libpng-dev \
        libgif-dev \
        libglib2.0-0 \
        ca-certificates && \
    ln -s /usr/lib/libgdiplus.so /usr/lib/gdip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Define variáveis de ambiente para evitar erro de GDI+
ENV LD_LIBRARY_PATH=/usr/lib
ENV FONTCONFIG_PATH=/etc/fonts

COPY --from=build /app/publish .

EXPOSE 80
ENTRYPOINT ["dotnet", "ProdKit.API.dll"]





