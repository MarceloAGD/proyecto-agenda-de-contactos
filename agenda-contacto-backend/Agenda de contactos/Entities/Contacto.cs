using System.ComponentModel.DataAnnotations;

namespace Agenda_de_contactos.Entities
{
    public class Contacto
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "El nombre es obligatorio")]
        public string Nombre { get; set; } = string.Empty;
        public string? Apellido { get; set; }
        public string? Telefono { get; set; }
        public string? Email { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}
