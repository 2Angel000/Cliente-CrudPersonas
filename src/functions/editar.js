import { gql } from "@apollo/client";

export const ACTUALIZAR_PERSONA_MUTATION = gql`
  mutation UpdatePost(
    $id: ID!
    $nombre: String!
    $apellidos: String!
    $edad: String!
    $pais: String!
  ) {
    updatePost(
      id: $id
      nombre: $nombre
      apellidos: $apellidos
      edad: $edad
      pais: $pais
    ) {
      id
      nombre
      apellidos
      edad
      pais
    }
  }
`;
