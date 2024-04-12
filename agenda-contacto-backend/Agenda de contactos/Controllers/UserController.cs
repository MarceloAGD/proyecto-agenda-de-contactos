using Agenda_de_contactos.Data;
using Agenda_de_contactos.Entities;
using Agenda_de_contactos.Entities.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Agenda_de_contactos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly AgendaContext _context;
        private ResponseDto _response;

        public UserController(AgendaContext context)
        {
            _context = context;
            _response = new ResponseDto();
        }

        [HttpPost("Login")]
        public ResponseDto Login([FromBody] UserDto user)
        {
            var userDb = _context.Users.FirstOrDefault(u => u.Email == user.Email);

            if (userDb == null || !userDb.CheckPassword(user.Password))
            {
                _response.Success = false;
                _response.Message = "Usuario o contraseña incorrectos";
                return _response;
            }
            GetUserDto userDto = new GetUserDto
            {
                Id = userDb.Id,
                Email = userDb.Email,
                Nombre = userDb.Nombre,
            };
            _response.Success = true;
            _response.Message = "Inicio de sesión correcto";
            _response.Data = userDto;
            return _response;
        }

        [HttpPost("Register")]
        public ResponseDto Register([FromBody] User user)
        {
            var userDb = _context.Users.FirstOrDefault(u => u.Email == user.Email);

            if (userDb != null)
            {
                _response.Success = false;
                _response.Message = "El email ya está registrado";
                return _response;
            }

            user.SetPassword(user.Password);
            _context.Users.Add(user);
            _context.SaveChanges();
            _response.Success = true;
            _response.Message = "Usuario registrado correctamente";
            return _response;
        }

        [HttpPut("GetUser/{id}")]
        public ResponseDto GetUser(int id)
        {
            User user = _context.Users.Find(id);
            if (user == null)
            {
                _response.Success = false;
                _response.Message = "Usuario no encontrado";
                return _response;
            }

            GetUserDto userDto = new GetUserDto
            {
                Id = user.Id,
                Nombre = user.Nombre,
                Apellido = user.Apellido,
                Email = user.Email
            };
            _response.Success = true;
            _response.Data = userDto;
            return _response;
        }
    }
}
