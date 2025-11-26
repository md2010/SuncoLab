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
using SuncoLab.Service.Service.Mosaic;
using SuncoLab.Model.Mapping;
using AutoMapper;
using SuncoLab.Service.Service.Carousel;
using SuncoLab.Repository.Mosaic;
using SuncoLab.Repository.ContactForm;

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
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

var allowedOrigins = new[] 
{
    builder.Configuration["LocalUrl"], 
    builder.Configuration["ProductionUrl"] 
};

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

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .CreateLogger();

builder.Host.UseSerilog(Log.Logger);

builder.Services.AddAutoMapper((IMapperConfigurationExpression a) => {
    a.AddProfile<ToDtoMapping>();
});

var app = builder.Build();

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

#if DEBUG
using (var scope = app.Services.CreateScope())
{
    var userService = scope.ServiceProvider.GetRequiredService<ICoreUserService>();
    var roleRepository = scope.ServiceProvider.GetRequiredService<IRoleRepository>();

    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    db.Database.Migrate();

    if (!db.Roles.Any(u => u.Name == "admin"))
    {
        await roleRepository.CreateRole("admin");
    }       

    if (!db.CoreUsers.Any(u => u.UserName == "admin"))
    {
        await userService.Create("admin", "admin123!");
    }
}
#endif

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
        builder.RegisterType<BlogService>().As<IBlogService>();
        builder.RegisterType<MosaicService>().As<IMosaicService>();
        builder.RegisterType<CarouselService>().As<ICarouselService>();

        //repository
        builder.RegisterType<BaseRepository>().As<IBaseRepository>();

        builder.RegisterType<CoreUserRepository>().As<ICoreUserRepository>();
        builder.RegisterType<CoreFileRepository>().As<ICoreFileRepository>();
        builder.RegisterType<ImageRepository>().As<IImageRepository>();
        builder.RegisterType<AlbumRepository>().As<IAlbumRepository>();
        builder.RegisterType<BlogRepository>().As<IBlogRepository>();
        builder.RegisterType<RoleRepository>().As<IRoleRepository>();
        builder.RegisterType<MosaicRepository>().As<IMosaicRepository>();
        builder.RegisterType<ContactFormRepository>().As<IContactFormRepository>();
    }
}
