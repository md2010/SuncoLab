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
#if DEBUG
                return RelativePath;
#else
                return FullPath;
#endif
            }
        }
    }
}
