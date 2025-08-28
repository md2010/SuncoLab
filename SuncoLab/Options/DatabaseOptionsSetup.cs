using Microsoft.Extensions.Options;

namespace SuncoLab.API.Options
{
    public class DatabaseOptionsSetup(IConfiguration configuation) : IConfigureOptions<DatabaseOptions>
    {
        private const string ConfigurationSectionName = "DatabaseOptions";
        public void Configure(DatabaseOptions options) 
        {
            var connectionString = configuation.GetConnectionString("Database");

            options.ConnectionStirng = connectionString;

            configuation.GetSection(ConfigurationSectionName).Bind(options);
        }

    }
}
