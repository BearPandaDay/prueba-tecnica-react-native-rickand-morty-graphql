import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        next
        prev
      }
      results {
        id
        name
        image
        status
      }
    }
  }
`;

export const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      origin {
        name
      }
      episode {
        id
        name
      }
    }
  }
`;
