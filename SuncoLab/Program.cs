using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using SuncoLab.API.Options;
using Microsoft.EntityFrameworkCore;
using SuncoLab.DAL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using SuncoLab.Service;
using SuncoLab.Repository;
using SuncoLab.Common;
using System.Text.Json.Serialization;
using Serilog;
using Azure.Storage.Blobs;

var builder = WebApplication.CreateBuilder(args);

//DB
builder.Services.ConfigureOptions<DatabaseOptionsSetup>();
builder.Services.AddDbContext<AppDbContext>((serviceProvider, dbConextOptionsBuilder) =>
{
    var databaseOptions = serviceProvider.GetService<IOptions<DatabaseOptions>>()!.Value;

    dbConextOptionsBuilder.UseSqlServer(databaseOptions.ConnectionStirng, sqlServerAction =>
    {
        sqlServerAction.EnableRetryOnFailure(databaseOptions.MaxRetryCount);
        sqlServerAction.CommandTimeout(databaseOptions.CommandTimeout);
    });
});

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
builder.Host.ConfigureContainer<ContainerBuilder>(builder => builder.RegisterModule(new AutofacModule()));

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options =>
                    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

var allowedOrigins = builder.Environment.IsDevelopment()
    ? [builder.Configuration["LocalUrl"]]  // Angular dev server
    : new[] { builder.Configuration["ProductionUrl"] };  // Your deployed frontend

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

builder.Services.AddSingleton<PasswordGenerator>(new PasswordGenerator());
builder.Services.AddSingleton(x => new BlobServiceClient(builder.Configuration.GetConnectionString("StorageAccount")));

//var logger = new LoggerConfiguration()
//  .ReadFrom.Configuration(builder.Configuration)
//  .Enrich.FromLogContext()
//  .CreateLogger();
//
//builder.Logging.ClearProviders();
//builder.Logging.AddSerilog(logger);

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .CreateLogger();

builder.Host.UseSerilog(Log.Logger);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();

app.MapControllers();

app.MapFallbackToFile("index.html");
app.UseStaticFiles();

app.Run();

public class AutofacModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        //service
        builder.RegisterType<CoreUserService>().As<ICoreUserService>();
        builder.RegisterType<AuthService>().As<IAuthService>();
        builder.RegisterType<FileService>().As<IFileService>();
        builder.RegisterType<AlbumService>().As<IAlbumService>();
      
        //repository
        builder.RegisterType<CoreUserRepository>().As<ICoreUserRepository>();
        builder.RegisterType<CoreFileRepository>().As<ICoreFileRepository>();
        builder.RegisterType<ImageRepository>().As<IImageRepository>();
        builder.RegisterType<AlbumRepository>().As<IAlbumRepository>();
    }
}
