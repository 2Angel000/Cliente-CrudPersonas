import { gql } from '@apollo/client';

export const OBTENER_PERSONAS_QUERY = gql`
query Mostrar {
  mostrar {
    id
    nombre
    apellidos
    edad
    pais
  }
}
`;
