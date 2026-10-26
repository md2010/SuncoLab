using System.ComponentModel.DataAnnotations.Schema;

namespace SuncoLab.Model
{
    public class CoreFile : BaseEntity
    {
        /// <summary>
        /// Locally: images/albumName/fileName
        /// Azure storage: albumName/fileName
        /// </summary>
        public string RelativePath { get; set; }

        /// <summary>
        /// Locally full path to file, on prod it's url 
        /// </summary>
        public string FullPath { get; set; }
        public string FileName { get; set; }
        public string Extension { get; set; }

        [NotMapped]
        public string Path
        {
            get
            {
                // Datoteke uploadane na Azure imaju URL bloba u FullPath, bez obzira na build
                // (lokalni DEBUG API koristi istu Azure bazu kao produkcija)
                if (FullPath.StartsWith("http", StringComparison.OrdinalIgnoreCase))
                {
                    return FullPath;
                }
#if DEBUG
                return RelativePath;
#else
                return FullPath;
#endif
            }
        }
    }
}
