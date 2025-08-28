namespace SuncoLab.API.Options
{
    public class DatabaseOptions
    {
        public string ConnectionStirng { get; set; } = string.Empty;
        public int MaxRetryCount { get; set; }
        public int CommandTimeout { get; set; }
        public bool EnabledDetailedErrors { get; set; } 
        public bool EnableSensitiveDataLogging { get; set; }
    }
}
