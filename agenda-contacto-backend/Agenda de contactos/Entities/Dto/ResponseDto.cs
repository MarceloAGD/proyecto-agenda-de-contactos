namespace Agenda_de_contactos.Entities.Dto
{
    public class ResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public object? Data { get; set; }
    }
}
