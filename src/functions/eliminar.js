import { gql } from "@apollo/client";

export const ELIMINAR_PERSONA_MUTATION = gql`
  mutation Mutation($deletePostId: String) {
    deletePost(id: $deletePostId)
  }
`;
