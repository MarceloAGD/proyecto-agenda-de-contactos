namespace Agenda_de_contactos.Entities.Dto
{
    public class GetUserDto
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string? Apellido { get; set; }
    }
}
