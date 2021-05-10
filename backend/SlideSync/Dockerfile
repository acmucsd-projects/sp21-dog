FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["SlideSync.csproj", "./"]
RUN dotnet restore "SlideSync.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "SlideSync.csproj" -c Release -o app.build

FROM build AS publish
RUN dotnet publish "SlideSync.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SlideSync.dll"]