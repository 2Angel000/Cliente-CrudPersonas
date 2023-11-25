import React, { useState } from "react";
import { ACTUALIZAR_PERSONA_MUTATION } from "../functions/editar";
import { useMutation } from "@apollo/client";

const EditarPersonaModal = ({
  persona,
  cerrarModal,
  actualizarPersonaEnLista,
}) => {
  const [actualizarPersona] = useMutation(ACTUALIZAR_PERSONA_MUTATION);
  const [nombre, setNombre] = useState(persona ? persona.nombre : "");
  const [apellidos, setApellidos] = useState(persona ? persona.apellidos : "");
  const [edad, setEdad] = useState(persona ? persona.edad : "");
  const [pais, setPais] = useState(persona ? persona.pais : "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await actualizarPersona({
      variables: {
        id: persona.id,
        nombre,
        apellidos,
        edad,
        pais,
      },
    });

    // Llamar a la función actualizarPersonaEnLista pasando la persona actualizada
    actualizarPersonaEnLista({
      id: persona.id,
      nombre,
      apellidos,
      edad,
      pais,
    });

    cerrarModal();
  };

  if (!persona) {
    return null; // No se muestra el modal si no hay una persona seleccionada
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Editar Persona</h2>
        <form action="#" onSubmit={handleSubmit} method="POST">
          <div className="mb-4">
            <label htmlFor="nombre" className="block font-bold mb-1">
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apellidos" className="block font-bold mb-1">
              Apellidos:
            </label>
            <input
              type="text"
              id="apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="edad" className="block font-bold mb-1">
              Edad:
            </label>
            <input
              type="number"
              id="edad"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pais" className="block font-bold mb-1">
              País:
            </label>
            <input
              type="text"
              id="pais"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={cerrarModal}
            className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarPersonaModal;
