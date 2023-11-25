import { gql } from '@apollo/client';

export const INSERTAR_DATOS_MUTATION = gql`
  mutation InsertarDatos($post: PostInput!) {
    createPost(post: $post) {
      id
      nombre
      apellidos
      edad
      pais
    }
  }
`;
