import Navbar from "@/components/navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";

interface Contact {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}
export default function Inicio() {
  const router = useRouter();
  const [contactos, setContactos] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const Id = localStorage.getItem("id");
    async function getContactos() {
      try {
        const response = await axios.get(
          `https://localhost:7039/api/Contacto/GetContactsByUser/${Id}`
        );

        setContactos(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los contactos:", error);
      }
    }
    getContactos();
  }, []);

  const eliminarContacto = async (id: number) => {
    try {
      await axios.delete(
        `https://localhost:7039/api/Contacto/DeleteContacto/${id}`
      );
      setContactos(contactos.filter((contacto) => contacto.id !== id));
    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
    }
  };

  const editarContacto = (id: number) => {
    router.push(`/editar-contacto?q=${id}`);
  };
  return (
    <div>
      <div className="global__background"></div>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-center mt-8">
            Lista de Contactos
          </h1>
          <div className="flex items-center mt-8 ">
            <Button
              variant="outlined"
              onClick={() => router.push("/nuevo-contacto")}
            >
              Nuevo Contacto
            </Button>
          </div>
        </div>
        {loading ? (
          <p className="text-center mt-4">Cargando...</p>
        ) : (
          <>
            {contactos?.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contactos.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>{contact.nombre}</TableCell>
                      <TableCell>{contact.apellido}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.telefono}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => editarContacto(contact.id)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => eliminarContacto(contact.id)}
                        >
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center mt-4">No hay contactos disponibles.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
