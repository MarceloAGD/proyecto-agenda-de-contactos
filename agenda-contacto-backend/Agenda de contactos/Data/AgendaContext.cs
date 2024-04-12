using Agenda_de_contactos.Entities;
using Microsoft.EntityFrameworkCore;

namespace Agenda_de_contactos.Data
{
    public class AgendaContext: DbContext
    {
        public AgendaContext(DbContextOptions<AgendaContext> options): base(options)
        {
        }

        public DbSet<Contacto> Contactos { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
    }
}
