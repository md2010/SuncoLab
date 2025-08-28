using System.Security.Cryptography;
using System.Text;

namespace SuncoLab.Common
{
    public class PasswordGenerator
    {
        const int keySize = 64;
        const int iterations = 350000;
        HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;
        
        public bool VerifyPassword(string password, string hashedPassword, byte[] salt)
        {
            var hashToCompare = HashPassword(password, salt);
            return hashedPassword.Equals(hashToCompare);
        }

        public Tuple<string, byte[]> HashPassword(string password)
        {
            var salt = RandomNumberGenerator.GetBytes(keySize);

            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                iterations,
                hashAlgorithm,
                keySize);

            return new Tuple<string, byte[]>(Convert.ToHexString(hash), salt);
        }

        public string HashPassword(string password, byte[] salt)
        {
            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                iterations,
                hashAlgorithm,
                keySize);

            return Convert.ToHexString(hash);
        }


    }
}