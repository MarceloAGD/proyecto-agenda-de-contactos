using System.ComponentModel.DataAnnotations;

namespace Agenda_de_contactos.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "El nombre es obligatorio")]
        public string Nombre { get; set; } = string.Empty;
        public string? Apellido { get; set; }

        [Required(ErrorMessage = "El email es obligatorio")]
        public string Email { get; set; } = string.Empty;
        [Required(ErrorMessage = "La contraseña es obligatoria")]
        public string Password { get; set; } = string.Empty;
    
        public void SetPassword(string password)
        {
            Password = BCrypt.Net.BCrypt.EnhancedHashPassword(password, 13);
        }

        public bool CheckPassword(string password)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(password, Password);
        }
    }
}
