import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import EditarPersonaModal from "./EditarPersonaModal";
import { OBTENER_PERSONAS_QUERY } from "../functions/mostrar";
import { ACTUALIZAR_PERSONA_MUTATION } from "../functions/editar";
import { ELIMINAR_PERSONA_MUTATION } from "../functions/eliminar";

export default function Persona() {
  const [modalVisible, setModalVisible] = useState(false);
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);
  const { loading, error, data, refetch } = useQuery(OBTENER_PERSONAS_QUERY);
  const [actualizarPersona] = useMutation(ACTUALIZAR_PERSONA_MUTATION);
  const [eliminarPersona] = useMutation(ELIMINAR_PERSONA_MUTATION);

  const handleEditarPersona = (persona) => {
    setPersonaSeleccionada(persona);
    setModalVisible(true);
  };

  const handleEliminarPersona = async (id) => {
    try {
      const response = await eliminarPersona({
        variables: {
          deletePostId: id,
        },
      });
  
      if (response && response.errors) {
        console.error("Error al eliminar persona:", response.errors);
        // Puedes hacer un manejo específico del error aquí si lo necesitas
      } else {
        console.log("Persona eliminada exitosamente");
        await refetch(); // Refrescar datos después de eliminar
      }
    } catch (error) {
      console.error("Error al eliminar persona:", error);
    }
  };
  

  const cerrarModal = () => {
    setModalVisible(false);
    setPersonaSeleccionada(null);
  };

  const actualizarPersonaEnLista = async (personaActualizada) => {
    try {
      await actualizarPersona({
        variables: {
          id: personaActualizada.id,
          nombre: personaActualizada.nombre,
          apellidos: personaActualizada.apellidos,
          edad: personaActualizada.edad,
          pais: personaActualizada.pais,
        },
      });
      await refetch(); // Refrescar datos después de actualizar
      cerrarModal(); // Cerrar modal después de actualizar
    } catch (error) {
      console.error("Error al actualizar persona:", error);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos.{"\t\t" + error.message}</p>;

  return (
    <div className="m-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6 mt-8 sm:text-4xl">
        Personas Registradas
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Apellidos</th>
              <th className="border border-gray-300 px-2 py-2">Edad</th>
              <th className="border border-gray-300 px-2 py-2">País</th>
              <th className="border border-gray-300 px-2 py-2">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {data.mostrar.map((persona) => (
              <tr key={persona.id}>
                <td className="border border-gray-300 px-1 py-2 text-center">{persona.id}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{persona.nombre}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{persona.apellidos}</td>
                <td className="border border-gray-300 px-2 py-2 text-center">{persona.edad}</td>
                <td className="border border-gray-300 px-2 py-2 text-center">{persona.pais}</td>
                <td className="border border-gray-300 px-2 py-2 text-center">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                   onClick={() => handleEditarPersona(persona)}>
                    Editar
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                   onClick={() => handleEliminarPersona(persona.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalVisible && personaSeleccionada && (
        <EditarPersonaModal
          persona={personaSeleccionada}
          cerrarModal={cerrarModal}
          actualizarPersonaEnLista={actualizarPersonaEnLista}
        />
      )}

    </div>
  );
}
