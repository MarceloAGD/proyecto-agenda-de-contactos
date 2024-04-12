using Agenda_de_contactos.Data;
using Agenda_de_contactos.Entities;
using Agenda_de_contactos.Entities.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Agenda_de_contactos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : Controller
    {
        private readonly AgendaContext _context;
        private ResponseDto _response;

        public ContactoController(AgendaContext context)
        {
            _context = context;
            _response = new ResponseDto();
        }

        [HttpGet("GetContactos")]
        public ResponseDto GetContactos()
        {
            var contactos = _context.Contactos.ToList();
            if (contactos.Count == 0)
            {
                _response.Success = false;
                _response.Message = "No se encontraron contactos";
                return _response;
            }
            _response.Success = true;
            _response.Data = contactos;
            return _response;
        }

        [HttpGet("GetContacto/{id}")]
        public ResponseDto GetContacto(int id)
        {
            _response.Success = true;
            _response.Data = _context.Contactos.Find(id);
            return _response;
        }


        [HttpPost("AddContacto")]
        public ResponseDto AddContacto([FromBody] Contacto contacto)
        {
            var usuario = _context.Users.FirstOrDefault(user => user.Id == contacto.UserId);
            if (usuario == null)
            {
                _response.Success = false;
                _response.Message = "Usuario no encontrado";
                return _response;
            }
            _context.Contactos.Add(contacto);
            _context.SaveChanges();
            _response.Success = true;
            _response.Message = "Contacto agregado correctamente";
            return _response;
        }

        [HttpPut("UpdateContacto/{id}")]
        public ResponseDto UpdateContacto(int id, [FromBody] Contacto contacto)
        {
            var contactoDb = _context.Contactos.Find(id);

            if (contactoDb == null)
            {
                _response.Success = false;
                _response.Message = "El contacto no existe";
                return _response;
            }
            contactoDb.Nombre = contacto.Nombre;
            contactoDb.Apellido = contacto.Apellido;
            contactoDb.Telefono = contacto.Telefono;
            contactoDb.Email = contacto.Email;

            _context.Contactos.Update(contactoDb);
            _context.SaveChanges();
            _response.Success = true;
            _response.Message = "Contacto actualizado correctamente";
            return _response;
        }

        [HttpDelete("DeleteContacto/{id}")]
        public ResponseDto DeleteContacto(int id)
        {
            var contacto = _context.Contactos.Find(id);

            if (contacto == null)
            {
                _response.Success = false;
                _response.Message = "El contacto no existe";
                return _response;
            }

            _context.Contactos.Remove(contacto);
            _context.SaveChanges();
            _response.Success = true;
            _response.Message = "Contacto eliminado correctamente";
            return _response;
        }

        [HttpGet("GetContactsByUser/{userId}")]
        public ResponseDto GetContactsByUser(int userId)
        {
            var contactos = _context.Contactos.Where(c => c.UserId == userId);

            if (contactos == null)
            {
                _response.Success = false;
                _response.Message = "No se encontraron contactos";
            }
            _response.Success = true;
            _response.Data = contactos;
            return _response;
        }
    }
}
